import React, { createContext, useContext, useState, useEffect, useRef } from 'react'
import { getSongPool, clientSearch, fetchAPIWithFallback } from '@/services/dataService'

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
      fetchAPIWithFallback(`/api/ss?keyword=${encoded}`),
      fetchAPIWithFallback(`/api/s/m/${encoded}`),
      fetchAPIWithFallback(`/api/s/k/${encoded}`),
    ])

    if (ssRes.status === 'fulfilled' && ssRes.value?.success && Array.isArray(ssRes.value.data) && ssRes.value.data.length > 0) {
      results.aggregated = { searchSuccess: true, data: { songs: ssRes.value.data, totalCount: ssRes.value.data.length } }
    }
    if (miguRes.status === 'fulfilled' && miguRes.value?.success && Array.isArray(miguRes.value.songs) && miguRes.value.songs.length > 0) {
      results.migu = { searchSuccess: true, data: { songs: miguRes.value.songs, totalCount: miguRes.value.songs.length } }
    }
    if (kRes.status === 'fulfilled' && kRes.value?.success && Array.isArray(kRes.value.songs) && kRes.value.songs.length > 0) {
      results.kugou = { searchSuccess: true, data: { songs: kRes.value.songs, totalCount: kRes.value.songs.length } }
    }

    // 始终执行客户端搜索，补充服务端结果
    if (songPool.length > 0) {
      const filtered = clientSearch(songPool, keyword)
      if (filtered.length > 0) {
        // 去重：排除已由服务端返回的歌曲
        const serverNewIds = new Set()
        for (const key of Object.keys(results)) {
          if (results[key]?.data?.songs) {
            results[key].data.songs.forEach(s => { if (s.newId) serverNewIds.add(s.newId) })
          }
        }
        const deduped = filtered.filter(s => !serverNewIds.has(s.newId))
        if (deduped.length > 0) {
          results.local = { searchSuccess: true, data: { songs: deduped, totalCount: deduped.length } }
        }
      }
    }

    // 无任何结果时的兜底
    if (Object.keys(results).length === 0) {
      results.local = { searchSuccess: false, data: { songs: [], totalCount: 0 } }
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
