import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, User, Disc } from 'lucide-react'
import { Button, Tabs } from 'antd'
import DataLoadingGuard from '@/components/guards/DataLoadingGuard'
import SongList from '@/components/SongList'
import OperatingBarOfSongList from '@/components/OperatingBarOfSongList'
import { generateSongCover } from '@/utils/generateSongCover'
import { getArtists, getSongPool, getArtistSongs } from '@/services/dataService'

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

    const sourceMap = {}

    const addFromSource = (src, data) => {
      if (Array.isArray(data) && data.length > 0) sourceMap[src] = data
    }

    // 获取艺人歌曲（优先 API，GitHub Pages 降级到静态数据）
    Promise.allSettled([
      getArtistSongs(decodedName),
      getArtists(),
      getSongPool(),
    ])
      .then(async ([artistSongsRes, artistsData, poolData]) => {
        if (artistSongsRes.status === 'fulfilled' && artistSongsRes.value.length > 0) {
          addFromSource('精选歌曲', artistSongsRes.value)
        }

        // 服务器无数据时降级到本地歌曲池匹配
        if (Object.keys(sourceMap).length === 0) {
          const pool = poolData.status === 'fulfilled' ? poolData.value : []
          if (pool.length > 0) {
            const matched = pool.filter((s) =>
              s.artists?.some(
                (a) =>
                  a.name === decodedName ||
                  a.name.includes(decodedName) ||
                  decodedName.includes(a.name),
              ),
            )
            if (matched.length > 0) addFromSource('本地歌曲库', matched)
          }
        }

        // 获取艺人头像
        const artists = artistsData.status === 'fulfilled' ? artistsData.value : []
        const found = artists.find((a) => a.name === decodedName)
        if (found) setArtistPic(found.pic)

        // 全部去重
        const allSongs = Object.values(sourceMap).flat()
        const seen = new Set()
        const unique = []
        for (const s of allSongs) {
          if (!s.newId || seen.has(s.newId)) continue
          seen.add(s.newId)
          unique.push(s)
        }

        // 各源去重
        Object.keys(sourceMap).forEach((key) => {
          const localSeen = new Set()
          sourceMap[key] = sourceMap[key].filter((s) => {
            if (!unique.some((u) => u.newId === s.newId) || localSeen.has(s.newId)) return false
            localSeen.add(s.newId)
            return true
          })
        })

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
          <div style={{ marginTop: 12 }}><SongList songs={srcSongs} /></div>
        </div>
      ),
    }))

  const tabItems = sourceTabs.length > 1
    ? [{ key: 'all', label: `全部 (${songs.length})`, children: (
        <div className="white-card">
          <OperatingBarOfSongList songs={songs} />
          <div style={{ marginTop: 12 }}><SongList songs={songs} /></div>
        </div>
      )}, ...sourceTabs]
    : null

  return (
    <div>
      <div style={{ padding: '16px 0' }}>
        <Link to="/artists" style={{ display: 'inline-block', marginBottom: 16 }}>
          <Button type="text" icon={<ArrowLeft size={18} />} style={{ color: '#bfbfbf' }}>返回艺人列表</Button>
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 20 }}>
          <div style={{ width: 100, height: 100, borderRadius: '50%', flexShrink: 0,
            background: artistPic ? `url(${artistPic}) center/cover` : generateSongCover(decodedName),
            border: '3px solid rgba(255,165,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>
            {!artistPic && <User size={36} color="#8c8c8c" />}
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <Disc size={16} color="#FFA500" />
              <span style={{ color: '#FFA500', fontSize: 12, fontWeight: 600, letterSpacing: 1 }}>ARTIST</span>
            </div>
            <h2 style={{ fontSize: 28, fontWeight: 700, color: '#f0f0f0', margin: 0 }}>{decodedName}</h2>
            <p style={{ color: '#8c8c8c', fontSize: 14, margin: '4px 0 0' }}>
              {loading ? '加载中...' : `${songs.length} 首歌曲 · ${Object.keys(sourceSongs).length} 个来源`}
            </p>
          </div>
        </div>
      </div>
      <DataLoadingGuard loading={loading}>
        {songs.length > 0 ? (tabItems ? <Tabs defaultActiveKey="all" items={tabItems} /> :
          <div className="white-card"><OperatingBarOfSongList songs={songs} /><div style={{ marginTop: 12 }}><SongList songs={songs} /></div></div>) :
          (!loading && <div className="white-card" style={{ textAlign: 'center', padding: 40, color: '#8c8c8c' }}>暂无 {decodedName} 的歌曲数据</div>)}
      </DataLoadingGuard>
    </div>
  )
}
