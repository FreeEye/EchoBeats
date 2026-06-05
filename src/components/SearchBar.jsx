import { Input } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useSearchKeyword } from '../contexts/SearchContext'

const { Search } = Input

function SearchBar() {
  const navigate = useNavigate()
  const { keyword: routeKeyword } = useParams()
  const { searchKeyword, updateSearchKeyword } = useSearchKeyword()
  const [inputValue, setInputValue] = useState('')

  // 同步URL关键词到输入框
  useEffect(() => {
    if (routeKeyword) {
      const decoded = decodeURIComponent(routeKeyword)
      setInputValue(decoded)
    }
  }, [routeKeyword])

  const onSearch = (inputKeyword) => {
    inputKeyword = inputKeyword.trim()
    if (inputKeyword !== '') {
      updateSearchKeyword(inputKeyword)
      navigate(`/search/${encodeURIComponent(inputKeyword)}`)
    }
  }

  return (
    <Search
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      onSearch={onSearch}
      enterButton
      placeholder="搜索歌曲、歌手..."
      allowClear
      style={{ width: '100%' }}
    />
  )
}

export default SearchBar
