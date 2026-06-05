import { Input } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useSearchKeyword } from '../contexts/SearchContext'

const { Search } = Input

function SearchBar() {
  const navigate = useNavigate()
  const { searchKeyword, updateSearchKeyword } = useSearchKeyword()

  const onSearch = (inputKeyword) => {
    inputKeyword = inputKeyword.trim()
    if (inputKeyword !== '' && inputKeyword !== searchKeyword) {
      updateSearchKeyword(inputKeyword)
      navigate(`/search/${encodeURIComponent(inputKeyword)}`)
    }
  }

  return (
    <Search
      defaultValue={searchKeyword || ''}
      onSearch={onSearch}
      enterButton
      placeholder="搜索歌曲、歌手..."
      allowClear
      style={{ width: '100%' }}
    />
  )
}

export default SearchBar
