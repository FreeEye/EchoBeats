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

const searchViaAPI = async (keyword) => {
  // 使用原站搜索 API: /api/ss (聚合搜索) + /api/s/m (咪咕) + /api/s/q (QQ音乐)
  const encoded = encodeURIComponent(keyword)

  const [ssRes, miguRes, qqRes] = await Promise.allSettled([
    fetch(`/api/ss?keyword=${encoded}`, { credentials: 'include' }),
    fetch(`/api/s/m/${encoded}`, { credentials: 'include' }),
    fetch(`/api/s/q/${encoded}`, { credentials: 'include' }),
  ])

  const results = {}

  // 聚合搜索
  if (ssRes.status === 'fulfilled' && ssRes.value.ok) {
    const json = await ssRes.value.json()
    if (json.success && Array.isArray(json.data)) {
      results.aggregated = {
        searchSuccess: true,
        data: { songs: json.data, totalCount: json.data.length },
      }
    }
  }

  // 咪咕搜索
  if (miguRes.status === 'fulfilled' && miguRes.value.ok) {
    const json = await miguRes.value.json()
    if (json.success && Array.isArray(json.songs)) {
      results.migu = {
        searchSuccess: true,
        data: { songs: json.songs, totalCount: json.songs.length },
      }
    }
  }

  // QQ音乐搜索
  if (qqRes.status === 'fulfilled' && qqRes.value.ok) {
    const json = await qqRes.value.json()
    if (json.success && Array.isArray(json.songs)) {
      results.qq = {
        searchSuccess: true,
        data: { songs: json.songs, totalCount: json.songs.length },
      }
    }
  }

  return results
}

export const SearchProvider = ({ children }) => {
  const [searchKeyword, setSearchKeyword] = useState('')
  const [searchStatus, setSearchStatus] = useState('not_searched_yet')
  const [searchResults, setSearchResults] = useState({})
  const lastKeywordRef = useRef('')

  const updateSearchKeyword = (keyword) => {
    setSearchKeyword(keyword)
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
    setSearchStatus('searching')

    const results = await searchViaAPI(keyword)
    setSearchResults(results)
    setSearchStatus('done')
  }

  const value = {
    searchKeyword,
    searchStatus,
    searchResults,
    updateSearchKeyword,
    clearResults,
    performSearch,
  }

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  )
}
