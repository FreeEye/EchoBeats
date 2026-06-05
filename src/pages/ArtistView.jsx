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
  const [artistSongs, setArtistSongs] = useState([])
  const [artistPic, setArtistPic] = useState(null)

  useEffect(() => {
    if (!decodedName) return
    document.title = `EchoBeats - ${decodedName}`
    setLoading(true)

    Promise.allSettled([
      fetch('/api/songs'),
      fetch('/api/hot-songs'),
      fetch('/api/new-songs'),
      fetch('/api/artists'),
    ])
      .then(async ([songsRes, hotRes, newRes, artistsRes]) => {
        const songs = []

        if (songsRes.status === 'fulfilled' && songsRes.value.ok) {
          const d = await songsRes.value.json()
          if (d.success) songs.push(...d.songs)
        }
        if (hotRes.status === 'fulfilled' && hotRes.value.ok) {
          const d = await hotRes.value.json()
          if (d.success) songs.push(...d.songs)
        }
        if (newRes.status === 'fulfilled' && newRes.value.ok) {
          const d = await newRes.value.json()
          if (d.success) songs.push(...d.songs)
        }

        // 获取艺人头像
        if (artistsRes.status === 'fulfilled' && artistsRes.value.ok) {
          const d = await artistsRes.value.json()
          if (d.success) {
            const found = d.artists.find((a) => a.name === decodedName)
            if (found) setArtistPic(found.pic)
          }
        }

        // 去重
        const seen = new Set()
        const unique = songs.filter((s) => {
          if (seen.has(s.newId)) return false
          seen.add(s.newId)
          return true
        })

        // 艺人名模糊匹配
        const matched = unique.filter((s) =>
          s.artists?.some(
            (a) =>
              a.name === decodedName ||
              a.name.includes(decodedName) ||
              decodedName.includes(a.name),
          ),
        )

        setArtistSongs(matched)
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
              共 {artistSongs.length} 首歌曲
            </p>
          </div>
        </div>
      </div>
      <div className="panel">
        <DataLoadingGuard loading={loading}>
          {artistSongs.length > 0 ? (
            <div className="white-card">
              <OperatingBarOfSongList songs={artistSongs} />
              <div style={{ marginTop: 12 }}>
                <SongList songs={artistSongs} />
              </div>
            </div>
          ) : (
            <div
              className="white-card"
              style={{
                textAlign: 'center',
                padding: 40,
                color: '#8c8c8c',
              }}
            >
              暂无 {decodedName} 的歌曲数据，尝试搜索获取更多结果
            </div>
          )}
        </DataLoadingGuard>
      </div>
    </div>
  )
}
