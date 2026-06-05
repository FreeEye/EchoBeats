import { useEffect, useState } from 'react'
import { Sparkles } from 'lucide-react'
import DataLoadingGuard from '@/components/guards/DataLoadingGuard'
import SongList from '@/components/SongList'
import OperatingBarOfSongList from '@/components/OperatingBarOfSongList'

export default function NewSongs() {
  const [loading, setLoading] = useState(true)
  const [songs, setSongs] = useState([])

  useEffect(() => {
    document.title = 'EchoBeats - 新歌推荐'
    setLoading(true)
    fetch('/api/new-songs')
      .then((res) => res.json())
      .then(({ success, songs: data }) => {
        if (success && Array.isArray(data)) {
          setSongs(data)
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div>
      <div style={{ textAlign: 'center', padding: '30px 20px 20px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <Sparkles size={20} color="#FFA500" />
          <span style={{ color: '#FFA500', fontSize: 13, fontWeight: 600, letterSpacing: 2 }}>
            NEW SONGS
          </span>
        </div>
        <h2 style={{ fontSize: 28, fontWeight: 700, margin: '0 0 6px', color: '#f0f0f0' }}>
          新歌推荐
        </h2>
        <p style={{ color: '#8c8c8c', fontSize: 14, margin: 0 }}>
          最新上架的 {songs.length} 首好歌
        </p>
      </div>
      <div className="panel">
        <DataLoadingGuard loading={loading}>
          <div className="white-card">
            <OperatingBarOfSongList songs={songs} />
            <div style={{ marginTop: 12 }}>
              <SongList songs={songs} />
            </div>
          </div>
        </DataLoadingGuard>
      </div>
    </div>
  )
}
