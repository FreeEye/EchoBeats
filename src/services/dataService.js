// 数据服务：优先 API（开发/Vercel），降级静态数据（GitHub Pages）

const isDev = import.meta.env.DEV

async function fetchAPI(path) {
  const res = await fetch(path, { credentials: 'include' })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}

async function loadStaticData() {
  const res = await fetch('./data/app-data.json')
  if (!res.ok) throw new Error('Static data not found')
  return res.json()
}

let staticCache = null

async function getStaticData() {
  if (!staticCache) staticCache = await loadStaticData()
  return staticCache
}

// 获取热门歌曲
export async function getHotSongs() {
  try {
    const json = await fetchAPI('/api/hot-songs')
    if (json.success) return json.songs
  } catch (e) {
    if (!isDev) {
      const data = await getStaticData()
      return data.hotSongs?.songs || []
    }
    throw e
  }
  return []
}

// 获取新歌
export async function getNewSongs() {
  try {
    const json = await fetchAPI('/api/new-songs')
    if (json.success) return json.songs
  } catch (e) {
    if (!isDev) {
      const data = await getStaticData()
      return data.newSongs?.songs || []
    }
    throw e
  }
  return []
}

// 获取艺人列表
export async function getArtists() {
  try {
    const json = await fetchAPI('/api/artists')
    if (json.success) return json.artists
  } catch (e) {
    if (!isDev) {
      const data = await getStaticData()
      return data.artists?.artists || []
    }
    throw e
  }
  return []
}

// 获取全部歌曲池（用于搜索和艺人页）
export async function getSongPool() {
  try {
    const [songsRes, hotRes, newRes] = await Promise.allSettled([
      fetchAPI('/api/songs'),
      fetchAPI('/api/hot-songs'),
      fetchAPI('/api/new-songs'),
    ])
    const all = []
    if (songsRes.status === 'fulfilled' && songsRes.value.success) all.push(...songsRes.value.songs)
    if (hotRes.status === 'fulfilled' && hotRes.value.success) all.push(...hotRes.value.songs)
    if (newRes.status === 'fulfilled' && newRes.value.success) all.push(...newRes.value.songs)
    if (all.length > 0) {
      const seen = new Set()
      return all.filter((s) => { if (seen.has(s.newId)) return false; seen.add(s.newId); return true })
    }
  } catch (e) {
    if (!isDev) {
      const data = await getStaticData()
      const all = [
        ...(data.songs?.songs || []),
        ...(data.hotSongs?.songs || []),
        ...(data.newSongs?.songs || []),
      ]
      const seen = new Set()
      return all.filter((s) => { if (seen.has(s.newId)) return false; seen.add(s.newId); return true })
    }
    throw e
  }
  return []
}

// 搜索（客户端）
export function clientSearch(songs, keyword) {
  if (!keyword || !songs.length) return []
  const kw = keyword.toLowerCase()
  const chars = [...kw]

  const scored = songs.map((song) => {
    let bestScore = 0
    const name = (song.name || '').toLowerCase()
    const alias = (song.alias || '').toLowerCase()
    const artistStr = (song.artists || []).map((a) => (a.name || '').toLowerCase()).join(' ')

    // 精确匹配
    if (name.includes(kw)) bestScore = Math.max(bestScore, 95)
    if (alias.includes(kw)) bestScore = Math.max(bestScore, 90)
    if (artistStr.includes(kw)) bestScore = Math.max(bestScore, 85)

    // 逐字匹配
    if (bestScore === 0) {
      const allInName = chars.every((c) => name.includes(c))
      const allInArtist = chars.every((c) => artistStr.includes(c))
      if (allInName) bestScore = 75
      else if (allInArtist) bestScore = 65
      else {
        const inName = chars.filter((c) => name.includes(c)).length
        const inArtist = chars.filter((c) => artistStr.includes(c)).length
        const ratio = Math.max(inName, inArtist) / chars.length
        if (ratio >= 0.5) bestScore = 30 + ratio * 30
      }
    }
    return { song, score: bestScore }
  })

  return scored
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((item) => item.song)
}
