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
            试试其他关键词搜索吧
          </div>
        </div>
      )}
    </div>
  )
}
