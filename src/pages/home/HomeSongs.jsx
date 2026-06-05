import { useEffect, useState } from 'react'
import DataLoadingGuard from '@/components/guards/DataLoadingGuard'
import SongList from '@/components/SongList'
import { Flame } from 'lucide-react'

export default function HomeSongs() {
  const [loading, setLoading] = useState(true)
  const [songs, setSongs] = useState([])

  useEffect(() => {
    setLoading(true)
    fetch('/api/hot-songs')
      .then((res) => res.json())
      .then(({ success, songs }) => {
        if (success) {
          setSongs(songs)
        }
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false))
  }, [])

  return (
    <DataLoadingGuard loading={loading}>
      <div className="white-card">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '0 0 12px',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            marginBottom: 4,
          }}
        >
          <Flame size={18} color="#FF6B35" />
          <span
            style={{
              fontSize: 16,
              fontWeight: 600,
              color: '#f0f0f0',
            }}
          >
            热门歌曲
          </span>
        </div>
        <SongList songs={songs} />
      </div>
    </DataLoadingGuard>
  )
}
