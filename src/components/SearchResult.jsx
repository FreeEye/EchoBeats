import React, { useMemo } from 'react'
import { Tag } from 'antd'
import SongList from './SongList'
import Wrapper from './Wrapper'
import OperatingBarOfSongList from './OperatingBarOfSongList'
import { useSearchKeyword } from '../contexts/SearchContext'

const providerConfig = {
  aggregated: { label: '搜索结果', color: '#FFA500' },
  migu: { label: '咪咕音乐', color: '#FF6B35' },
  qq: { label: 'QQ音乐', color: '#1DB954' },
  kugou: { label: '酷狗音乐', color: '#2B8FFF' },
  local: { label: '本地匹配', color: '#722ED1' },
  netease: { label: '网易云音乐', color: '#C62F2F' },
  kuwo: { label: '酷我音乐', color: '#FFD700' },
}

function SearchResult({ result, provider }) {
  const songs = useMemo(() => result?.data?.songs || [], [result])
  const totalCount = useMemo(() => result?.data?.totalCount || 0, [result])
  const { searchKeyword } = useSearchKeyword()

  if (!result || !result.data || songs.length === 0) {
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
            {totalCount} 首
          </span>
          <OperatingBarOfSongList songs={songs} />
        </div>
      }
    >
      <SongList songs={songs} highlight={searchKeyword} />
    </Wrapper>
  )
}

export default React.memo(SearchResult)
