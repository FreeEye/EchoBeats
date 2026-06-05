import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Users, ArrowRight } from 'lucide-react'
import DataLoadingGuard from '@/components/guards/DataLoadingGuard'
import { generateSongCover } from '@/utils/generateSongCover'

function ArtistCard({ artist, onClick }) {
  const bgColor = generateSongCover(artist.name)
  return (
    <div
      onClick={onClick}
      className="cursor-pointer"
      style={{
        textAlign: 'center',
        padding: '8px 6px',
        borderRadius: 10,
        transition: 'background 0.2s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'rgba(255,165,0,0.08)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'transparent'
      }}
    >
      <div
        style={{
          width: 64,
          height: 64,
          borderRadius: '50%',
          margin: '0 auto 6px',
          background: artist.pic
            ? `url(${artist.pic}) center/cover`
            : bgColor,
          border: '2px solid rgba(255,255,255,0.08)',
        }}
      />
      <div
        className="truncate"
        style={{ fontSize: 13, fontWeight: 500, color: '#d9d9d9' }}
      >
        {artist.name}
      </div>
    </div>
  )
}

export default function ArtistsSection() {
  const [loading, setLoading] = useState(true)
  const [artists, setArtists] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    setLoading(true)
    fetch('/api/artists')
      .then((res) => res.json())
      .then(({ success, artists: data }) => {
        if (success && Array.isArray(data)) {
          setArtists(data)
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false))
  }, [])

  const handleArtistClick = (artistName) => {
    navigate(`/artist/${encodeURIComponent(artistName)}`)
  }

  const display = artists.slice(0, 24)

  return (
    <DataLoadingGuard loading={loading}>
      {artists.length > 0 && (
        <div className="white-card" style={{ marginTop: 12 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 0 12px',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              marginBottom: 8,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Users size={18} color="#FFA500" />
              <span style={{ fontSize: 16, fontWeight: 600, color: '#f0f0f0' }}>
                热门歌手
              </span>
              <span style={{ fontSize: 12, color: '#8c8c8c' }}>
                {artists.length}位
              </span>
            </div>
            <Link
              to="/artists"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                fontSize: 13,
                color: '#8c8c8c',
                textDecoration: 'none',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#FFA500'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#8c8c8c'
              }}
            >
              查看全部 <ArrowRight size={14} />
            </Link>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))',
              gap: 4,
            }}
          >
            {display.map((artist) => (
              <ArtistCard
                key={artist.name}
                artist={artist}
                onClick={() => handleArtistClick(artist.name)}
              />
            ))}
          </div>
        </div>
      )}
    </DataLoadingGuard>
  )
}
