import { useEffect, useState } from 'react'
import { Film, Play } from 'lucide-react'
import DataLoadingGuard from '@/components/guards/DataLoadingGuard'
import { useSongInPlayerStore } from '@/stores/useSongInPlayerStore'
import { useListenlistStore } from '@/stores/useListenlistStore'
import { generateSongCover } from '@/utils/generateSongCover'

function MVCard({ song, onPlay }) {
  const bgColor = generateSongCover(song.newId)
  return (
    <div
      className="mv-card"
      style={{
        cursor: 'pointer',
        borderRadius: 12,
        overflow: 'hidden',
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.05)',
        transition: 'all 0.25s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)'
        e.currentTarget.style.borderColor = 'rgba(255,165,0,0.4)'
        e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.3)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'
        e.currentTarget.style.boxShadow = 'none'
      }}
      onClick={() => onPlay(song)}
    >
      <div style={{ position: 'relative', paddingTop: '56.25%', overflow: 'hidden' }}>
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: song.cover
              ? `url(${song.cover}) center/cover`
              : bgColor,
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)',
            width: 48,
            height: 48,
            borderRadius: '50%',
            background: 'rgba(255,165,0,0.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: 0,
            transition: 'opacity 0.25s',
          }}
          className="mv-play-btn"
        >
          <Play size={22} color="#fff" style={{ marginLeft: 3 }} />
        </div>
      </div>
      <div style={{ padding: '12px' }}>
        <div
          className="truncate"
          style={{ fontSize: 14, fontWeight: 600, color: '#f0f0f0', marginBottom: 4 }}
        >
          {song.name}
        </div>
        <div className="truncate" style={{ fontSize: 12, color: '#8c8c8c' }}>
          {song.artists?.map((a) => a.name).join(' / ')}
        </div>
      </div>
    </div>
  )
}

export default function MVPage() {
  const [loading, setLoading] = useState(true)
  const [mvSongs, setMvSongs] = useState([])
  const [page, setPage] = useState(1)
  const [loadingMore, setLoadingMore] = useState(false)
  const setSongInPlayer = useSongInPlayerStore((s) => s.setSongInPlayer)

  useEffect(() => {
    document.title = 'EchoBeats - MV精选'
    setLoading(true)
    // 使用 new-songs 和 hot-songs 作为 MV 数据源
    Promise.allSettled([
      fetch('/api/new-songs'),
      fetch('/api/hot-songs'),
    ])
      .then(async ([newRes, hotRes]) => {
        const all = []
        if (newRes.status === 'fulfilled' && newRes.value.ok) {
          const d = await newRes.value.json()
          if (d.success) all.push(...d.songs)
        }
        if (hotRes.status === 'fulfilled' && hotRes.value.ok) {
          const d = await hotRes.value.json()
          if (d.success) all.push(...d.songs)
        }
        const seen = new Set()
        setMvSongs(
          all.filter((s) => {
            if (seen.has(s.newId)) return false
            seen.add(s.newId)
            return true
          }),
        )
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const loadMore = async () => {
    setLoadingMore(true)
    const nextPage = page + 1
    try {
      const res = await fetch('/api/new-songs')
      if (res.ok) {
        const d = await res.json()
        if (d.success) {
          const seen = new Set(mvSongs.map((s) => s.newId))
          const more = d.songs.filter((s) => !seen.has(s.newId))
          setMvSongs((prev) => [...prev, ...more])
          setPage(nextPage)
        }
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoadingMore(false)
    }
  }

  const displaySongs = mvSongs.slice(0, 24)

  const handlePlay = (song) => {
    setSongInPlayer(song)
    const store = useListenlistStore.getState()
    if (!store.listenlist.some((s) => s?.newId === song.newId)) {
      store.addSongToListenlist(song)
    }
  }

  return (
    <div>
      <div style={{ textAlign: 'center', padding: '30px 20px 20px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <Film size={20} color="#FFA500" />
          <span style={{ color: '#FFA500', fontSize: 13, fontWeight: 600, letterSpacing: 2 }}>
            MUSIC VIDEO
          </span>
        </div>
        <h2 style={{ fontSize: 28, fontWeight: 700, margin: '0 0 6px', color: '#f0f0f0' }}>
          MV 精选
        </h2>
        <p style={{ color: '#8c8c8c', fontSize: 14, margin: 0 }}>
          精选歌曲视听 · {mvSongs.length} 首
        </p>
      </div>

      <div className="panel">
        <DataLoadingGuard loading={loading}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: 14,
            }}
          >
            {displaySongs.map((song) => (
              <MVCard key={song.newId} song={song} onPlay={handlePlay} />
            ))}
          </div>

          {displaySongs.length === 0 && !loading && (
            <div
              className="white-card"
              style={{ textAlign: 'center', padding: 40, color: '#8c8c8c' }}
            >
              暂无 MV 数据
            </div>
          )}
        </DataLoadingGuard>
      </div>
    </div>
  )
}
