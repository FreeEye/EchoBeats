import { Link } from 'react-router-dom'

function LinkSearchArtist({ artistName }) {
  return (
    <Link
      to={`/search/${artistName}`}
      style={{
        color: '#bfbfbf',
        fontSize: 12,
        transition: 'color 0.2s',
      }}
      onMouseEnter={(e) => (e.target.style.color = '#FFA500')}
      onMouseLeave={(e) => (e.target.style.color = '#bfbfbf')}
    >
      {artistName}
    </Link>
  )
}

export default LinkSearchArtist
