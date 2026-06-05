import React, { useCallback, useMemo } from 'react'
import { Pagination, Tag } from 'antd'
import SongList from './SongList'
import Wrapper from './Wrapper'
import OperatingBarOfSongList from './OperatingBarOfSongList'
import { useSearchKeyword, useSearchResults } from '../contexts/SearchContext'

const providerConfig = {
  local: { label: '搜索结果', color: '#FFA500' },
}

function SearchResult({ result, provider }) {
  const { searchKeyword: keyword } = useSearchKeyword()
  const { updateSearchResults } = useSearchResults()

  const onPageChange = useCallback(
    (page) => {
      fetch(
        `/api/search?provider=${provider}&keyword=${encodeURIComponent(keyword)}&page=${page}`,
      )
        .then((res) => {
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`)
          }
          return res.json()
        })
        .then((json) => {
          updateSearchResults(provider, json)
        })
        .catch((err) => {
          console.error('搜索请求失败:', err)
        })
    },
    [provider, keyword, updateSearchResults],
  )

  const songs = useMemo(() => result?.data?.songs || [], [result])
  const totalCount = useMemo(() => result?.data?.totalCount || 0, [result])

  if (!result || !result.data) {
    return null
  }

  const config = providerConfig[provider] || {
    label: provider,
    color: '#8c8c8c',
  }

  return (
    <Wrapper
      provider={provider}
      operatingBar={
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Tag
            color={config.color}
            style={{
              margin: 0,
              borderRadius: 6,
              fontSize: 13,
              fontWeight: 500,
            }}
          >
            {config.label}
          </Tag>
          <span style={{ color: '#8c8c8c', fontSize: 13 }}>
            共 {totalCount} 首
          </span>
          <OperatingBarOfSongList songs={songs} />
        </div>
      }
    >
      <SongList songs={songs} />
    </Wrapper>
  )
}

export default React.memo(SearchResult)
