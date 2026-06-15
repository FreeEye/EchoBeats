// 数据服务：优先 API（开发/Vercel），降级静态数据（GitHub Pages）

const isDev = import.meta.env.DEV
const API_BASE = 'https://tonzhon.whamon.com'

async function fetchAPI(path) {
  const res = await fetch(path, { credentials: 'include' })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}

// 获取歌曲播放源 URL（优先静态缓存，其次 API，多级降级）
export async function getSongSource(newId) {
  // 1. 优先从静态数据中获取预解析的播放 URL（GitHub Pages）
  let staticUrl = null
  if (!isDev) {
    try {
      const data = await getStaticData()
      if (data.songSources?.[newId]) staticUrl = data.songSources[newId]
    } catch (_) { /* 静态数据不可用 */ }
  }

  // 2. 尝试相对路径 API（开发/Vercel 代理）
  try {
    const res = await fetch(`/api/p/${newId}`)
    if (res.ok) {
      const data = await res.json()
      if (data.success && data.data) return data.data
    }
  } catch (_) { /* 相对路径失败 */ }

  // 3. 降级到上游 API 直接请求
  try {
    const res = await fetch(`${API_BASE}/api/p/${newId}`)
    if (res.ok) {
      const data = await res.json()
      if (data.success && data.data) return data.data
    }
  } catch (_) { /* 上游也失败 */ }

  // 4. 如果 API 都失败了，返回静态缓存（即使可能过期）
  if (staticUrl) return staticUrl

  throw new Error('Failed to get song source')
}

// 安全地调用服务端 API，失败时降级到上游直接请求（GitHub Pages 兼容）
export async function fetchAPIWithFallback(path) {
  const relativeUrl = path
  const absoluteUrl = `${API_BASE}${path}`

  // 先尝试相对路径
  try {
    const res = await fetch(relativeUrl, { credentials: 'include' })
    if (res.ok) {
      const text = await res.text()
      try {
        return JSON.parse(text)
      } catch (_) { /* 返回的是 HTML 不是 JSON（如 GitHub Pages SPA fallback） */ }
    }
  } catch (_) { /* 网络错误，尝试上游 */ }

  // 降级到上游
  try {
    const res = await fetch(absoluteUrl)
    if (res.ok) {
      return res.json()
    }
  } catch (_) { /* 上游也失败 */ }

  return null
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

// 获取指定艺人的歌曲
export async function getArtistSongs(artistName) {
  // 先尝试 API（开发/Vercel 代理环境可用）
  try {
    const path = `/api/songs-of-artist/${encodeURIComponent(artistName)}`
    const json = await fetchAPIWithFallback(path)
    if (json?.songs) return json.songs
  } catch (_) { /* API 不可用，降级到静态数据 */ }

  // 降级到静态数据（GitHub Pages）
  if (!isDev) {
    try {
      const data = await getStaticData()
      if (data.artistSongs?.[artistName]) return data.artistSongs[artistName]
    } catch (_) { /* 静态数据也加载失败 */ }
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
    // API 调用全部失败时（如 GitHub Pages 环境），降级到静态数据
    if (!isDev) {
      const data = await getStaticData()
      const staticAll = [
        ...(data.songs?.songs || []),
        ...(data.hotSongs?.songs || []),
        ...(data.newSongs?.songs || []),
      ]
      // 也加入艺人歌曲数据
      if (data.artistSongs) {
        for (const songs of Object.values(data.artistSongs)) {
          staticAll.push(...songs)
        }
      }
      const seen = new Set()
      return staticAll.filter((s) => { if (seen.has(s.newId)) return false; seen.add(s.newId); return true })
    }
  } catch (e) {
    if (!isDev) {
      const data = await getStaticData()
      const all = [
        ...(data.songs?.songs || []),
        ...(data.hotSongs?.songs || []),
        ...(data.newSongs?.songs || []),
      ]
      if (data.artistSongs) {
        for (const songs of Object.values(data.artistSongs)) {
          all.push(...songs)
        }
      }
      const seen = new Set()
      return all.filter((s) => { if (seen.has(s.newId)) return false; seen.add(s.newId); return true })
    }
    throw e
  }
  return []
}

// 获取歌词（通过 LRCLIB API），返回 { plainLyrics, syncedLyrics }
export async function fetchLyrics(song) {
  const artistName = song.artists?.[0]?.name || ''
  const trackName = song.name || ''
  if (!artistName || !trackName) return { plainLyrics: '', syncedLyrics: '' }

  const attempt = async (url) => {
    const res = await fetch(url)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const results = await res.json()
    if (results?.length > 0) {
      return {
        plainLyrics: results[0].plainLyrics || '',
        syncedLyrics: results[0].syncedLyrics || '',
      }
    }
    return null
  }

  try {
    const url = `https://lrclib.net/api/search?artist_name=${encodeURIComponent(artistName)}&track_name=${encodeURIComponent(trackName)}`
    const result = await attempt(url)
    if (result) return result
  } catch (_) { /* fall through */ }

  try {
    const q = encodeURIComponent(`${artistName} ${trackName}`)
    const result = await attempt(`https://lrclib.net/api/search?q=${q}`)
    if (result) return result
  } catch (_2) { /* fall through */ }

  return { plainLyrics: '', syncedLyrics: '' }
}

// 搜索（客户端）- 精准优先，再模糊
export function clientSearch(songs, keyword) {
  if (!keyword || !songs.length) return []
  const kw = keyword.toLowerCase().trim()
  const chars = [...kw]

  const scored = songs.map((song) => {
    let bestScore = 0
    const name = (song.name || '').toLowerCase()
    const alias = (song.alias || '').toLowerCase()
    const artistNames = (song.artists || []).map((a) => (a.name || '').toLowerCase())
    const artistStr = artistNames.join(' ')

    // 1. 精确匹配：歌名完全包含关键词
    if (name === kw) bestScore = Math.max(bestScore, 100)
    else if (name.startsWith(kw)) bestScore = Math.max(bestScore, 98)
    else if (name.includes(kw)) bestScore = Math.max(bestScore, 95)

    // 2. 别称匹配
    if (alias === kw) bestScore = Math.max(bestScore, 93)
    else if (alias.includes(kw)) bestScore = Math.max(bestScore, 90)

    // 3. 艺人精确匹配
    if (artistStr === kw) bestScore = Math.max(bestScore, 92)
    else if (artistNames.some(a => a === kw)) bestScore = Math.max(bestScore, 91)
    else if (artistStr.includes(kw)) bestScore = Math.max(bestScore, 85)

    // 4. 关键词拆分匹配（处理多词搜索如"人间 共鸣"）
    if (bestScore === 0) {
      const kwParts = kw.split(/\s+/).filter(p => p.length > 0)
      if (kwParts.length > 1) {
        const allPartsInName = kwParts.every(p => name.includes(p))
        const allPartsInArtist = kwParts.every(p => artistStr.includes(p))
        if (allPartsInName) bestScore = Math.max(bestScore, 80)
        else if (allPartsInArtist) bestScore = Math.max(bestScore, 72)
      }
    }

    // 5. 逐字匹配（每个字都在歌名或艺人名中出现）
    if (bestScore === 0) {
      const allInName = chars.every((c) => name.includes(c))
      const allInArtist = chars.every((c) => artistStr.includes(c))
      if (allInName) bestScore = 75
      else if (allInArtist) bestScore = 65
    }

    // 6. 部分字符匹配（放宽条件）
    if (bestScore === 0) {
      const inName = chars.filter((c) => name.includes(c)).length
      const inArtist = chars.filter((c) => artistStr.includes(c)).length
      const maxRatio = Math.max(inName, inArtist) / chars.length
      if (maxRatio >= 0.6) bestScore = 30 + maxRatio * 30
      else if (maxRatio >= 0.4) bestScore = 20 + maxRatio * 25
    }

    return { song, score: bestScore }
  })

  return scored
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((item) => item.song)
}
