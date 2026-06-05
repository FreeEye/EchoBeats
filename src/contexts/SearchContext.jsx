import React, { createContext, useContext, useState, useEffect, useRef } from 'react'
import { getSongPool, clientSearch } from '@/services/dataService'

const SearchContext = createContext()

export const useSearch = () => {
  const context = useContext(SearchContext)
  if (!context) throw new Error('useSearch must be used within a SearchProvider')
  return context
}

export const useSearchStatus = () => {
  const { searchStatus } = useSearch()
  return { searchStatus }
}

export const useSearchKeyword = () => {
  const { searchKeyword, updateSearchKeyword } = useSearch()
  return { searchKeyword, updateSearchKeyword }
}

export const useSearchResults = () => {
  const { searchResults } = useSearch()
  return { searchResults }
}

export const SearchProvider = ({ children }) => {
  const [searchKeyword, setSearchKeyword] = useState('')
  const [searchStatus, setSearchStatus] = useState('not_searched_yet')
  const [searchResults, setSearchResults] = useState({})
  const [songPool, setSongPool] = useState([])
  const lastKeywordRef = useRef('')
  const poolLoadedRef = useRef(false)

  // 首次加载歌曲池
  useEffect(() => {
    if (!poolLoadedRef.current) {
      poolLoadedRef.current = true
      getSongPool().then((songs) => setSongPool(songs)).catch(() => {})
    }
  }, [])

  useEffect(() => {
    if (searchKeyword && searchKeyword !== lastKeywordRef.current) {
      lastKeywordRef.current = searchKeyword
      performSearch(searchKeyword)
    }
  }, [searchKeyword])

  const performSearch = async (keyword) => {
    setSearchResults({})
    setSearchStatus('searching')

    // 优先尝试服务端搜索
    let results = {}
    const encoded = encodeURIComponent(keyword)

    const [ssRes, miguRes, kRes] = await Promise.allSettled([
      fetch(`/api/ss?keyword=${encoded}`, { credentials: 'include' }),
      fetch(`/api/s/m/${encoded}`, { credentials: 'include' }),
      fetch(`/api/s/k/${encoded}`, { credentials: 'include' }),
    ])

    if (ssRes.status === 'fulfilled' && ssRes.value.ok) {
      const json = await ssRes.value.json()
      if (json.success && Array.isArray(json.data) && json.data.length > 0) {
        results.aggregated = { searchSuccess: true, data: { songs: json.data, totalCount: json.data.length } }
      }
    }
    if (miguRes.status === 'fulfilled' && miguRes.value.ok) {
      const json = await miguRes.value.json()
      if (json.success && Array.isArray(json.songs) && json.songs.length > 0) {
        results.migu = { searchSuccess: true, data: { songs: json.songs, totalCount: json.songs.length } }
      }
    }
    if (kRes.status === 'fulfilled' && kRes.value.ok) {
      const json = await kRes.value.json()
      if (json.success && Array.isArray(json.songs) && json.songs.length > 0) {
        results.kugou = { searchSuccess: true, data: { songs: json.songs, totalCount: json.songs.length } }
      }
    }

    // 服务端无结果时降级到客户端搜索
    if (Object.keys(results).length === 0 && songPool.length > 0) {
      const filtered = clientSearch(songPool, keyword)
      if (filtered.length > 0) {
        results.local = { searchSuccess: true, data: { songs: filtered, totalCount: filtered.length } }
      }
    }

    setSearchResults(results)
    setSearchStatus('done')
  }

  return (
    <SearchContext.Provider value={{
      searchKeyword,
      searchStatus,
      searchResults,
      updateSearchKeyword: setSearchKeyword,
      clearResults: () => { setSearchResults({}); setSearchStatus('not_searched_yet') },
    }}>
      {children}
    </SearchContext.Provider>
  )
}
