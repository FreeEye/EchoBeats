import React, { createContext, useContext, useState, useEffect, useRef } from 'react'

const SearchContext = createContext()

export const useSearch = () => {
  const context = useContext(SearchContext)
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider')
  }
  return context
}

export const useSearchStatus = () => {
  const { searchStatus, updateSearchStatus, clearResults } = useSearch()
  return { searchStatus, updateSearchStatus, clearResults }
}

export const useSearchKeyword = () => {
  const { searchKeyword, updateSearchKeyword } = useSearch()
  return { searchKeyword, updateSearchKeyword }
}

export const useSearchResults = () => {
  const { searchResults, updateSearchResults, clearResults } = useSearch()
  return { searchResults, updateSearchResults, clearResults }
}

// 模糊匹配评分: 返回 0-100 的匹配分数
const matchScore = (text, keyword) => {
  if (!text || !keyword) return 0
  const t = text.toLowerCase()
  const k = keyword.toLowerCase()

  // 精确包含匹配 - 最高分
  if (t.includes(k)) {
    // 越短匹配权重越高（精确匹配度更高）
    return 90 + (k.length / t.length) * 10
  }

  // 逐字匹配 - 每个字符都出现
  const chars = [...k]
  const allCharsFound = chars.every((c) => t.includes(c))
  if (allCharsFound) {
    const ratio = chars.length / k.length
    return 60 + ratio * 20
  }

  // 部分字符匹配 - 一半以上字符出现
  const matchedChars = chars.filter((c) => t.includes(c)).length
  if (matchedChars >= Math.ceil(chars.length / 2)) {
    return 30 + (matchedChars / chars.length) * 30
  }

  return 0
}

// 客户端搜索 - 从3个数据源获取并在本地模糊匹配
const clientSideSearch = async (keyword) => {
  try {
    const [songsRes, hotRes, newRes] = await Promise.allSettled([
      fetch('/api/songs', { credentials: 'include' }),
      fetch('/api/hot-songs', { credentials: 'include' }),
      fetch('/api/new-songs', { credentials: 'include' }),
    ])

    const allSongs = []

    if (songsRes.status === 'fulfilled' && songsRes.value.ok) {
      const { success, songs } = await songsRes.value.json()
      if (success && Array.isArray(songs)) allSongs.push(...songs)
    }

    if (hotRes.status === 'fulfilled' && hotRes.value.ok) {
      const { success, songs } = await hotRes.value.json()
      if (success && Array.isArray(songs)) allSongs.push(...songs)
    }

    if (newRes.status === 'fulfilled' && newRes.value.ok) {
      const { success, songs } = await newRes.value.json()
      if (success && Array.isArray(songs)) allSongs.push(...songs)
    }

    if (allSongs.length === 0) {
      return { searchSuccess: false, data: { songs: [], totalCount: 0 }, error: '无法获取歌曲数据' }
    }

    // 去重
    const seen = new Set()
    const uniqueSongs = allSongs.filter((s) => {
      if (seen.has(s.newId)) return false
      seen.add(s.newId)
      return true
    })

    // 对每首歌计算匹配分数
    const scored = uniqueSongs.map((song) => {
      let bestScore = 0

      // 歌名匹配
      const nameScore = matchScore(song.name || '', keyword)
      if (nameScore > bestScore) bestScore = nameScore

      // 别名匹配
      const aliasScore = matchScore(song.alias || '', keyword)
      if (aliasScore > bestScore) bestScore = aliasScore

      // 歌手名匹配（取最高分的歌手）
      if (song.artists) {
        for (const a of song.artists) {
          const artistScore = matchScore(a.name || '', keyword)
          if (artistScore > bestScore) bestScore = artistScore
        }
      }

      return { song, score: bestScore }
    })

    // 过滤有分数的，按分数降序排列
    const filtered = scored
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .map((item) => item.song)

    return {
      searchSuccess: filtered.length > 0,
      data: { songs: filtered, totalCount: filtered.length },
      source: 'local',
    }
  } catch (err) {
    console.error('客户端搜索失败:', err)
    return { searchSuccess: false, data: { songs: [], totalCount: 0 }, error: err.message }
  }
}

export const SearchProvider = ({ children }) => {
  const [searchKeyword, setSearchKeyword] = useState('')
  const [searchStatus, setSearchStatus] = useState('not_searched_yet')
  const [searchResults, setSearchResults] = useState({})
  const lastKeywordRef = useRef('')

  const updateSearchKeyword = (keyword) => {
    setSearchKeyword(keyword)
  }

  const updateSearchStatus = (status) => {
    setSearchStatus(status)
  }

  const updateSearchResults = (provider, data) => {
    setSearchResults((prevResults) => ({
      ...prevResults,
      [provider]: data,
    }))
  }

  const clearResults = () => {
    setSearchResults({})
    setSearchStatus('not_searched_yet')
  }

  useEffect(() => {
    if (searchKeyword && searchKeyword !== lastKeywordRef.current) {
      lastKeywordRef.current = searchKeyword
      performSearch(searchKeyword)
    }
  }, [searchKeyword])

  const performSearch = async (keyword) => {
    clearResults()
    updateSearchStatus('searching')

    const result = await clientSideSearch(keyword)
    updateSearchResults('local', result)
    updateSearchStatus('done')
  }

  const value = {
    searchKeyword,
    searchStatus,
    searchResults,
    updateSearchKeyword,
    updateSearchStatus,
    updateSearchResults,
    clearResults,
    performSearch,
  }

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  )
}
