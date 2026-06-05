import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, User, Disc } from 'lucide-react'
import { Button } from 'antd'
import DataLoadingGuard from '@/components/guards/DataLoadingGuard'
import SongList from '@/components/SongList'
import OperatingBarOfSongList from '@/components/OperatingBarOfSongList'
import { generateSongCover } from '@/utils/generateSongCover'

export default function ArtistView() {
  const { name } = useParams()
  const decodedName = decodeURIComponent(name || '')
  const [loading, setLoading] = useState(true)
  const [songs, setSongs] = useState([])
  const [artistPic, setArtistPic] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!decodedName) return
    document.title = `EchoBeats - ${decodedName}`
    setLoading(true)
    setError(null)

    Promise.allSettled([
      fetch(`/api/songs-of-artist/${encodeURIComponent(decodedName)}`),
      fetch('/api/artists'),
    ])
      .then(async ([songsRes, artistsRes]) => {
        if (songsRes.status === 'fulfilled' && songsRes.value.ok) {
          const d = await songsRes.value.json()
          if (d.songs && Array.isArray(d.songs)) {
            setSongs(d.songs)
          } else {
            setError('暂无该艺人的歌曲数据')
          }
        } else {
          setError('暂无该艺人的歌曲数据')
        }

        if (artistsRes.status === 'fulfilled' && artistsRes.value.ok) {
          const d = await artistsRes.value.json()
          if (d.success) {
            const found = d.artists.find((a) => a.name === decodedName)
            if (found) setArtistPic(found.pic)
          }
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [decodedName])

  return (
    <div>
      <div style={{ padding: '16px 0' }}>
        <Link to="/artists" style={{ display: 'inline-block', marginBottom: 16 }}>
          <Button type="text" icon={<ArrowLeft size={18} />} style={{ color: '#bfbfbf' }}>
            返回艺人列表
          </Button>
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 24 }}>
          <div
            style={{
              width: 100,
              height: 100,
              borderRadius: '50%',
              flexShrink: 0,
              background: artistPic
                ? `url(${artistPic}) center/cover`
                : generateSongCover(decodedName),
              border: '3px solid rgba(255,165,0,0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
            }}
          >
            {!artistPic && <User size={36} color="#8c8c8c" />}
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <Disc size={16} color="#FFA500" />
              <span style={{ color: '#FFA500', fontSize: 12, fontWeight: 600, letterSpacing: 1 }}>
                ARTIST
              </span>
            </div>
            <h2 style={{ fontSize: 28, fontWeight: 700, color: '#f0f0f0', margin: 0 }}>
              {decodedName}
            </h2>
            <p style={{ color: '#8c8c8c', fontSize: 14, margin: '4px 0 0' }}>
              {loading ? '加载中...' : `${songs.length} 首歌曲`}
            </p>
          </div>
        </div>
      </div>
      <div className="panel">
        <DataLoadingGuard loading={loading}>
          {error ? (
            <div
              className="white-card"
              style={{ textAlign: 'center', padding: 40, color: '#8c8c8c' }}
            >
              {error}
            </div>
          ) : songs.length > 0 ? (
            <div className="white-card">
              <OperatingBarOfSongList songs={songs} />
              <div style={{ marginTop: 12 }}>
                <SongList songs={songs} />
              </div>
            </div>
          ) : null}
        </DataLoadingGuard>
      </div>
    </div>
  )
}
