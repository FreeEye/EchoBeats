import { useEffect, useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Users, Search } from 'lucide-react'
import { Input } from 'antd'
import DataLoadingGuard from '@/components/guards/DataLoadingGuard'
import { generateSongCover } from '@/utils/generateSongCover'

function ArtistCard({ artist, onClick }) {
  const bgColor = generateSongCover(artist.name)
  return (
    <div
      onClick={onClick}
      style={{
        cursor: 'pointer',
        background: 'rgba(255,255,255,0.03)',
        borderRadius: 12,
        padding: 16,
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        transition: 'all 0.2s',
        border: '1px solid rgba(255,255,255,0.05)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'rgba(255,165,0,0.08)'
        e.currentTarget.style.borderColor = 'rgba(255,165,0,0.3)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'rgba(255,255,255,0.03)'
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'
      }}
    >
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: '50%',
          flexShrink: 0,
          background: artist.pic
            ? `url(${artist.pic}) center/cover`
            : bgColor,
          border: '2px solid rgba(255,255,255,0.08)',
        }}
      />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 15, fontWeight: 600, color: '#f0f0f0' }}>
          {artist.name}
        </div>
        {artist.songCount && (
          <div style={{ fontSize: 12, color: '#8c8c8c', marginTop: 2 }}>
            {artist.songCount} 首歌曲
          </div>
        )}
      </div>
    </div>
  )
}

export default function Artists() {
  const [loading, setLoading] = useState(true)
  const [artists, setArtists] = useState([])
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    document.title = 'EchoBeats - 艺人'
    setLoading(true)

    // 同时获取艺人列表和歌曲数据来构建更完整的艺人信息
    Promise.allSettled([
      fetch('/api/artists'),
      fetch('/api/hot-songs'),
      fetch('/api/new-songs'),
      fetch('/api/songs'),
    ])
      .then(async ([artistsRes, hotRes, newRes, songsRes]) => {
        // 从艺人接口获取基础列表
        let baseArtists = []
        if (artistsRes.status === 'fulfilled' && artistsRes.value.ok) {
          const d = await artistsRes.value.json()
          if (d.success && Array.isArray(d.artists)) {
            baseArtists = d.artists
          }
        }

        // 统计每个艺人的歌曲数量
        const allSongs = []
        for (const res of [hotRes, newRes, songsRes]) {
          if (res.status === 'fulfilled' && res.value.ok) {
            const d = await res.value.json()
            if (d.success && Array.isArray(d.songs)) {
              allSongs.push(...d.songs)
            }
          }
        }

        // 统计艺人歌曲数
        const artistCount = new Map()
        for (const s of allSongs) {
          if (s.artists) {
            for (const a of s.artists) {
              const count = artistCount.get(a.name) || 0
              artistCount.set(a.name, count + 1)
            }
          }
        }

        // 给艺人添加歌曲数
        const enriched = baseArtists.map((a) => ({
          ...a,
          songCount: artistCount.get(a.name) || 0,
        }))

        // 按歌曲数降序排列
        enriched.sort((a, b) => (b.songCount || 0) - (a.songCount || 0))
        setArtists(enriched)
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const filtered = useMemo(() => {
    if (!search.trim()) return artists
    const kw = search.toLowerCase()
    return artists.filter((a) =>
      a.name.toLowerCase().includes(kw),
    )
  }, [artists, search])

  return (
    <div>
      <div style={{ textAlign: 'center', padding: '30px 20px 20px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <Users size={20} color="#FFA500" />
          <span style={{ color: '#FFA500', fontSize: 13, fontWeight: 600, letterSpacing: 2 }}>
            ARTISTS
          </span>
        </div>
        <h2 style={{ fontSize: 28, fontWeight: 700, margin: '0 0 6px', color: '#f0f0f0' }}>
          艺人
        </h2>
        <p style={{ color: '#8c8c8c', fontSize: 14, margin: 0 }}>
          共 {artists.length} 位艺人 · 点击查看全部歌曲
        </p>
      </div>
      <div className="panel">
        <DataLoadingGuard loading={loading}>
          <div style={{ marginBottom: 16 }}>
            <Input
              prefix={<Search size={16} color="#8c8c8c" />}
              placeholder="搜索艺人..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              allowClear
              style={{
                borderRadius: 10,
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            />
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: 10,
            }}
          >
            {filtered.map((artist) => (
              <ArtistCard
                key={artist.name}
                artist={artist}
                onClick={() =>
                  navigate(`/artist/${encodeURIComponent(artist.name)}`)
                }
              />
            ))}
          </div>
          {filtered.length === 0 && (
            <div
              className="white-card"
              style={{ textAlign: 'center', padding: 40, color: '#8c8c8c' }}
            >
              没有找到匹配的艺人
            </div>
          )}
        </DataLoadingGuard>
      </div>
    </div>
  )
}
