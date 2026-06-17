import { useEffect } from 'react'
import { Spin } from 'antd'
import { useParams } from 'react-router-dom'
import { SearchX } from 'lucide-react'
import SearchResult from '../components/SearchResult'
import { useSearchStatus, useSearchResults, useSearchKeyword } from '../contexts/SearchContext'

export default function Search() {
  const { keyword } = useParams()
  const { updateSearchKeyword } = useSearchKeyword()
  const { searchStatus } = useSearchStatus()
  const { searchResults } = useSearchResults()

  useEffect(() => {
    if (keyword) {
      const decodedKeyword = decodeURIComponent(keyword)
      updateSearchKeyword(decodedKeyword)
    }
  }, [keyword, updateSearchKeyword])

  // 检查是否有任何有效结果
  const providers = Object.keys(searchResults)
  const hasResults = providers.some(
    (key) => searchResults[key]?.searchSuccess && searchResults[key]?.data?.songs?.length > 0
  )

  // 按优先级排序: aggregated > migu > qq
  const orderedProviders = providers.sort((a, b) => {
    const order = { aggregated: 0, migu: 1, qq: 2, kugou: 3 }
    return (order[a] || 99) - (order[b] || 99)
  })

  return (
    <div>
      {searchStatus === 'searching' && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '60px 0',
            flexDirection: 'column',
            gap: 16,
          }}
        >
          <Spin size="large" />
          <span style={{ color: '#8c8c8c', fontSize: 14 }}>
            正在搜索 "{keyword && decodeURIComponent(keyword)}" ...
          </span>
        </div>
      )}
      {orderedProviders.map((key) => (
        <SearchResult result={searchResults[key]} provider={key} key={key} />
      ))}
      {!hasResults && searchStatus === 'done' && (
        <div
          className="white-card"
          style={{
            textAlign: 'center',
            padding: '60px 20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <SearchX size={48} color="#8c8c8c" />
          <div style={{ color: '#bfbfbf', fontSize: 16, fontWeight: 500 }}>
            没有找到相关结果
          </div>
          <div style={{ color: '#8c8c8c', fontSize: 14 }}>
            试试以下全网搜索
          </div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
            <a
              href={`https://search.bilibili.com/all?keyword=${encodeURIComponent(keyword ? decodeURIComponent(keyword) : '')}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: '8px 20px',
                borderRadius: 8,
                background: 'rgba(0, 174, 236, 0.15)',
                color: '#00AECC',
                textDecoration: 'none',
                fontSize: 14,
                fontWeight: 500,
                border: '1px solid rgba(0, 174, 236, 0.3)',
              }}
            >
              在 B站 搜索
            </a>
            <a
              href={`https://music.163.com/#/search/m/?s=${encodeURIComponent(keyword ? decodeURIComponent(keyword) : '')}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: '8px 20px',
                borderRadius: 8,
                background: 'rgba(198, 47, 47, 0.15)',
                color: '#C62F2F',
                textDecoration: 'none',
                fontSize: 14,
                fontWeight: 500,
                border: '1px solid rgba(198, 47, 47, 0.3)',
              }}
            >
              在 网易云音乐 搜索
            </a>
            <a
              href={`https://www.baidu.com/s?wd=${encodeURIComponent((keyword ? decodeURIComponent(keyword) : '') + ' 歌曲')}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: '8px 20px',
                borderRadius: 8,
                background: 'rgba(255, 165, 0, 0.1)',
                color: '#FFA500',
                textDecoration: 'none',
                fontSize: 14,
                fontWeight: 500,
                border: '1px solid rgba(255, 165, 0, 0.3)',
              }}
            >
              在 百度 搜索
            </a>
          </div>
        </div>
      )}
    </div>
  )
}
