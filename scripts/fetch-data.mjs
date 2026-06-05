import { writeFileSync, mkdirSync } from 'node:fs'

const BASE = 'https://tonzhon.whamon.com'
const OUT = 'public/data'

async function fetchJSON(path) {
  const res = await fetch(`${BASE}${path}`)
  if (!res.ok) throw new Error(`${path}: ${res.status}`)
  return res.json()
}

async function main() {
  mkdirSync(OUT, { recursive: true })

  const [hot, news, artists, songs] = await Promise.allSettled([
    fetchJSON('/api/hot-songs'),
    fetchJSON('/api/new-songs'),
    fetchJSON('/api/artists'),
    fetchJSON('/api/songs'),
  ])

  const data = {
    hotSongs: hot.status === 'fulfilled' ? hot.value : { success: false, songs: [] },
    newSongs: news.status === 'fulfilled' ? news.value : { success: false, songs: [] },
    artists: artists.status === 'fulfilled' ? artists.value : { success: false, artists: [] },
    songs: songs.status === 'fulfilled' ? songs.value : { success: false, songs: [] },
  }

  writeFileSync(`${OUT}/app-data.json`, JSON.stringify(data))

  const total =
    (data.hotSongs.songs?.length || 0) +
    (data.newSongs.songs?.length || 0) +
    (data.songs.songs?.length || 0)

  console.log(`✓ Data fetched: ${total} songs, ${data.artists.artists?.length || 0} artists`)
}

main().catch((e) => {
  console.error('Data fetch failed:', e.message)
  process.exit(1)
})
