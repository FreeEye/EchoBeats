import { writeFileSync, mkdirSync } from 'node:fs'

const BASE = 'https://tonzhon.whamon.com'
const OUT = 'public/data'
const CONCURRENCY = 5

async function fetchJSON(path) {
  const res = await fetch(`${BASE}${path}`)
  if (!res.ok) throw new Error(`${path}: ${res.status}`)
  return res.json()
}

// 批量并发请求
async function batchFetch(items, fn, concurrency = CONCURRENCY) {
  const results = []
  for (let i = 0; i < items.length; i += concurrency) {
    const batch = items.slice(i, i + concurrency)
    const batchResults = await Promise.allSettled(batch.map(fn))
    results.push(...batchResults)
    console.log(`  ... ${Math.min(i + concurrency, items.length)}/${items.length}`)
  }
  return results
}

async function main() {
  mkdirSync(OUT, { recursive: true })

  // 1. 获取基础数据
  console.log('Fetching base data...')
  const [hot, news, artists, songs] = await Promise.allSettled([
    fetchJSON('/api/hot-songs'),
    fetchJSON('/api/new-songs'),
    fetchJSON('/api/artists'),
    fetchJSON('/api/songs'),
  ])

  const hotData = hot.status === 'fulfilled' ? hot.value : { success: false, songs: [] }
  const newsData = news.status === 'fulfilled' ? news.value : { success: false, songs: [] }
  const artistsData = artists.status === 'fulfilled' ? artists.value : { success: false, artists: [] }
  const songsData = songs.status === 'fulfilled' ? songs.value : { success: false, songs: [] }

  // 收集所有唯一歌曲 (按 newId 去重)
  const allSongs = []
  const seen = new Set()
  for (const s of [...hotData.songs || [], ...newsData.songs || [], ...songsData.songs || []]) {
    if (s.newId && !seen.has(s.newId)) {
      seen.add(s.newId)
      allSongs.push(s)
    }
  }

  console.log(`Base data: ${allSongs.length} unique songs, ${artistsData.artists?.length || 0} artists`)

  // 2. 为每位艺人获取完整歌曲列表
  console.log('Fetching artist songs...')
  const artistSongsMap = {}
  const artistList = artistsData.artists || []
  const artistResults = await batchFetch(artistList, async (artist) => {
    const encoded = encodeURIComponent(artist.name)
    const data = await fetchJSON(`/api/songs-of-artist/${encoded}`)
    if (data.songs && data.songs.length > 0) {
      return { name: artist.name, songs: data.songs }
    }
    return { name: artist.name, songs: [] }
  })

  let artistTotalSongs = 0
  for (const r of artistResults) {
    if (r.status === 'fulfilled' && r.value.songs.length > 0) {
      artistSongsMap[r.value.name] = r.value.songs
      artistTotalSongs += r.value.songs.length
      // 将艺人歌曲也加入总池（去重）
      for (const s of r.value.songs) {
        if (s.newId && !seen.has(s.newId)) {
          seen.add(s.newId)
          allSongs.push(s)
        }
      }
    }
  }

  console.log(`Artist songs: ${artistTotalSongs} total, ${allSongs.length} unique songs across all sources`)

  // 3. 预解析所有歌曲的播放 URL
  console.log('Resolving audio sources...')
  const songSources = {}
  const sourceResults = await batchFetch(allSongs, async (song) => {
    const data = await fetchJSON(`/api/p/${song.newId}`)
    if (data.success && data.data) {
      return { newId: song.newId, source: data.data }
    }
    return null
  })

  let resolvedCount = 0
  for (const r of sourceResults) {
    if (r.status === 'fulfilled' && r.value) {
      songSources[r.value.newId] = r.value.source
      resolvedCount++
    }
  }

  console.log(`Audio sources: ${resolvedCount}/${allSongs.length} resolved`)

  // 4. 保存数据
  const data = {
    hotSongs: hotData,
    newSongs: newsData,
    artists: artistsData,
    songs: songsData,
    artistSongs: artistSongsMap,
    songSources,
  }

  writeFileSync(`${OUT}/app-data.json`, JSON.stringify(data))

  const totalArtists = artistsData.artists?.length || 0
  const artistsWithSongs = Object.keys(artistSongsMap).length

  console.log(`✓ Complete: ${allSongs.length} songs, ${resolvedCount} sources, ${totalArtists} artists (${artistsWithSongs} with songs)`)
}

main().catch((e) => {
  console.error('Data fetch failed:', e.message)
  process.exit(1)
})
