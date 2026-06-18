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

  // 额外查询的艺人（不在 /api/artists 列表但平台有歌曲数据）
  const EXTRA_ARTISTS = [
    "周杰伦", "谭咏麟", "张国荣", "张学友", "梅艳芳",
    "罗大佑", "李宗盛", "孙燕姿", "蔡依林", "王力宏",
    "陶喆", "张惠妹", "林忆莲", "伍佰", "刘若英", "梁静茹",
    "BEYOND",
    "邓丽君", "S.H.E", "张信哲", "田馥甄", "李健", "朴树",
    "王心凌", "张韶涵", "杨丞琳", "萧亚轩", "莫文蔚", "刘德华",
    "郭富城", "黎明", "陈慧娴", "王杰", "齐秦", "赵传",
    "张宇", "游鸿明", "周华健", "任贤齐", "光良", "品冠",
    "苏打绿", "飞儿乐团", "信乐团", "动力火车", "迪克牛仔",
    "那英", "韩红", "孙楠", "汪峰", "许巍", "郑钧",
    "老狼", "叶倩文", "林子祥", "陈百强", "邰正宵", "孟庭苇",
    "陈奕迅", "邓紫棋", "薛之谦", "许嵩", "张杰", "李荣浩", "毛不易", "周深",
    "五月天", "凤凰传奇", "张碧晨", "胡彦斌", "赵雷", "周传雄", "汪苏泷",
    "于文文", "程响", "告五人", "单依纯", "华晨宇", "刀郎", "叶丽仪", "郑源",
    "王菲", "林俊杰",
    "Alan Walker", "Westlife", "Linkin Park", "Owl City",
    "Coldplay", "Maroon 5", "Ed Sheeran", "Imagine Dragons",
    "Bruno Mars", "Adele", "Rihanna", "Eminem", "Lady Gaga",
    "Katy Perry", "Justin Bieber", "The Weeknd", "Dua Lipa",
    "Billie Eilish", "Ariana Grande", "Post Malone",
    "Queen", "The Beatles", "Eagles", "Michael Jackson",
  ]

  // 合并并去重
  const extraNames = new Set(EXTRA_ARTISTS)
  for (const a of artistList) {
    extraNames.delete(a.name)
  }
  const allArtistNames = [
    ...artistList.map(a => a.name),
    ...extraNames
  ]
  console.log(`  Querying ${allArtistNames.length} artists (${artistList.length} from API + ${extraNames.size} extra)`)
  const artistResults = await batchFetch(allArtistNames, async (name) => {
    const encoded = encodeURIComponent(name)
    // 先尝试艺人歌曲 API
    try {
      const data = await fetchJSON(`/api/songs-of-artist/${encoded}`)
      if (data.songs && data.songs.length > 0) {
        return { name, songs: data.songs }
      }
    } catch (_) { /* fallback to search */ }

    // 降级到搜索 API（覆盖未收录进艺人库但有歌曲的艺人）
    try {
      const searchData = await fetchJSON(`/api/ss?keyword=${encoded}`)
      if (searchData.success && Array.isArray(searchData.data) && searchData.data.length > 0) {
        // 过滤：只保留艺人名匹配的歌曲
        const matched = searchData.data.filter(s =>
          s.artists?.some(a => a.name === name)
        )
        if (matched.length > 0) return { name, songs: matched }
      }
    } catch (_) { /* both failed */ }

    return { name, songs: [] }
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

  // 将所有额外艺人加入 artist list（无论是否有歌曲）
  for (const name of extraNames) {
    const songs = artistSongsMap[name]
    const count = songs ? songs.length : 0
    artistsData.artists.push({ name, id: 0, cover: '', count })
  }

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
