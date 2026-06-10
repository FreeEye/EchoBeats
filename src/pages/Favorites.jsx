import { useEffect } from 'react'
import { Heart, Music } from 'lucide-react'
import { useFavoritesStore } from '@/stores/useFavoritesStore'
import SongList from '@/components/SongList'
import OperatingBarOfSongList from '@/components/OperatingBarOfSongList'

export default function Favorites() {
  const favorites = useFavoritesStore((s) => s.favorites)

  useEffect(() => {
    document.title = 'EchoBeats - 我的收藏'
  }, [])

  return (
    <div>
      <div style={{ textAlign: 'center', padding: '30px 20px 20px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <Heart size={20} color="rgb(254, 44, 85)" fill="rgb(254, 44, 85)" />
          <span style={{ color: '#FFA500', fontSize: 13, fontWeight: 600, letterSpacing: 2 }}>FAVORITES</span>
        </div>
        <h2 style={{ fontSize: 28, fontWeight: 700, margin: '0 0 6px', color: '#f0f0f0' }}>
          我的收藏
        </h2>
        <p style={{ color: '#8c8c8c', fontSize: 14, margin: 0 }}>
          共 {favorites.length} 首歌曲
        </p>
      </div>
      <div className="panel">
        {favorites.length > 0 ? (
          <div className="white-card">
            <OperatingBarOfSongList songs={favorites} />
            <div style={{ marginTop: 12 }}><SongList songs={favorites} /></div>
          </div>
        ) : (
          <div className="white-card" style={{ textAlign: 'center', padding: 60 }}>
            <Music size={48} color="#8c8c8c" style={{ marginBottom: 12 }} />
            <div style={{ color: '#bfbfbf', fontSize: 16, marginBottom: 4 }}>还没有收藏歌曲</div>
            <div style={{ color: '#8c8c8c', fontSize: 13 }}>点击歌曲旁边的心形图标即可收藏</div>
          </div>
        )}
      </div>
    </div>
  )
}
