import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, User, Disc } from 'lucide-react'
import { Button, Tabs } from 'antd'
import DataLoadingGuard from '@/components/guards/DataLoadingGuard'
import SongList from '@/components/SongList'
import OperatingBarOfSongList from '@/components/OperatingBarOfSongList'
import { generateSongCover } from '@/utils/generateSongCover'

export default function ArtistView() {
  const { name } = useParams()
  const decodedName = decodeURIComponent(name || '')
  const [loading, setLoading] = useState(true)
  const [songs, setSongs] = useState([])
  const [sourceSongs, setSourceSongs] = useState({})
  const [artistPic, setArtistPic] = useState(null)

  useEffect(() => {
    if (!decodedName) return
    document.title = `EchoBeats - ${decodedName}`
    setLoading(true)

    const encoded = encodeURIComponent(decodedName)

    // 多数据源聚合：songs-of-artist + SS搜索 + Migu搜索 + QQ搜索
    Promise.allSettled([
      fetch(`/api/songs-of-artist/${encoded}`),
      fetch(`/api/ss?keyword=${encoded}`),
      fetch(`/api/s/m/${encoded}`),
      fetch(`/api/s/q/${encoded}`),
      fetch('/api/artists'),
    ])
      .then(async ([artistRes, ssRes, miguRes, qqRes, artistsRes]) => {
        const allSongs = []
        const sourceMap = {}

        const addFromSource = (src, data) => {
          if (Array.isArray(data)) {
            sourceMap[src] = data
            allSongs.push(...data)
          }
        }

        if (artistRes.status === 'fulfilled' && artistRes.value.ok) {
          const d = await artistRes.value.json()
          if (d.songs) addFromSource('精选歌曲', d.songs)
        }
        if (ssRes.status === 'fulfilled' && ssRes.value.ok) {
          const d = await ssRes.value.json()
          if (d.success && d.data) addFromSource('综合搜索', d.data)
        }
        if (miguRes.status === 'fulfilled' && miguRes.value.ok) {
          const d = await miguRes.value.json()
          if (d.success && d.songs) addFromSource('咪咕音乐', d.songs)
        }
        if (qqRes.status === 'fulfilled' && qqRes.value.ok) {
          const d = await qqRes.value.json()
          if (d.success && d.songs) addFromSource('QQ音乐', d.songs)
        }

        // 全局去重
        const seen = new Set()
        const unique = []
        for (const s of allSongs) {
          if (!s.newId || seen.has(s.newId)) continue
          seen.add(s.newId)
          unique.push(s)
        }

        // 各源去重（只保留出现在全局列表中的）
        Object.keys(sourceMap).forEach((key) => {
          const validIds = new Set(unique.map((s) => s.newId))
          const localSeen = new Set()
          sourceMap[key] = sourceMap[key].filter((s) => {
            if (!validIds.has(s.newId) || localSeen.has(s.newId)) return false
            localSeen.add(s.newId)
            return true
          })
        })

        if (artistsRes.status === 'fulfilled' && artistsRes.value.ok) {
          const d = await artistsRes.value.json()
          if (d.success) {
            const found = d.artists.find((a) => a.name === decodedName)
            if (found) setArtistPic(found.pic)
          }
        }

        setSongs(unique)
        setSourceSongs(sourceMap)
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [decodedName])

  const sourceTabs = Object.entries(sourceSongs)
    .filter(([, v]) => v.length > 0)
    .map(([key, srcSongs]) => ({
      key,
      label: `${key} (${srcSongs.length})`,
      children: (
        <div className="white-card">
          <OperatingBarOfSongList songs={srcSongs} />
          <div style={{ marginTop: 12 }}>
            <SongList songs={srcSongs} />
          </div>
        </div>
      ),
    }))

  const tabItems = sourceTabs.length > 1 ? [
    {
      key: 'all',
      label: `全部 (${songs.length})`,
      children: (
        <div className="white-card">
          <OperatingBarOfSongList songs={songs} />
          <div style={{ marginTop: 12 }}>
            <SongList songs={songs} />
          </div>
        </div>
      ),
    },
    ...sourceTabs,
  ] : null

  return (
    <div>
      <div style={{ padding: '16px 0' }}>
        <Link to="/artists" style={{ display: 'inline-block', marginBottom: 16 }}>
          <Button type="text" icon={<ArrowLeft size={18} />} style={{ color: '#bfbfbf' }}>
            返回艺人列表
          </Button>
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 20 }}>
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
              {loading ? '加载中...' : `${songs.length} 首歌曲 · ${Object.keys(sourceSongs).length} 个来源`}
            </p>
          </div>
        </div>
      </div>

      <DataLoadingGuard loading={loading}>
        {songs.length > 0 ? (
          tabItems ? (
            <Tabs
              defaultActiveKey="all"
              items={tabItems}
            />
          ) : (
            <div className="white-card">
              <OperatingBarOfSongList songs={songs} />
              <div style={{ marginTop: 12 }}>
                <SongList songs={songs} />
              </div>
            </div>
          )
        ) : (
          !loading && (
            <div className="white-card" style={{ textAlign: 'center', padding: 40, color: '#8c8c8c' }}>
              暂无 {decodedName} 的歌曲数据
            </div>
          )
        )}
      </DataLoadingGuard>
    </div>
  )
}
