import { useEffect, useState } from 'react'
import { Sparkles } from 'lucide-react'
import { Button } from 'antd'
import DataLoadingGuard from '@/components/guards/DataLoadingGuard'
import SongList from '@/components/SongList'
import OperatingBarOfSongList from '@/components/OperatingBarOfSongList'

const PAGE_SIZE = 20

export default function NewSongs() {
  const [loading, setLoading] = useState(true)
  const [allSongs, setAllSongs] = useState([])
  const [displayCount, setDisplayCount] = useState(PAGE_SIZE)
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    document.title = 'EchoBeats - 新歌推荐'
    setLoading(true)
    // 从两个数据源聚合新歌
    Promise.allSettled([
      fetch('/api/new-songs'),
      fetch('/api/songs'),
    ])
      .then(async ([newRes, songsRes]) => {
        const all = []
        if (newRes.status === 'fulfilled' && newRes.value.ok) {
          const d = await newRes.value.json()
          if (d.success) all.push(...d.songs)
        }
        if (songsRes.status === 'fulfilled' && songsRes.value.ok) {
          const d = await songsRes.value.json()
          if (d.success) all.push(...d.songs)
        }
        // 去重
        const seen = new Set()
        const unique = all.filter((s) => {
          if (seen.has(s.newId)) return false
          seen.add(s.newId)
          return true
        })
        setAllSongs(unique)
        setHasMore(unique.length > PAGE_SIZE)
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const displayed = allSongs.slice(0, displayCount)

  const loadMore = () => {
    const next = displayCount + PAGE_SIZE
    setDisplayCount(next)
    if (next >= allSongs.length) setHasMore(false)
  }

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
          共 {allSongs.length} 首 · 显示前 {displayed.length} 首
        </p>
      </div>
      <div className="panel">
        <DataLoadingGuard loading={loading}>
          <div className="white-card">
            <OperatingBarOfSongList songs={displayed} />
            <div style={{ marginTop: 12 }}>
              <SongList songs={displayed} />
            </div>
            {hasMore && (
              <div style={{ textAlign: 'center', padding: '20px 0 8px' }}>
                <Button onClick={loadMore} type="primary" ghost>
                  加载更多 ({allSongs.length - displayCount} 首)
                </Button>
              </div>
            )}
          </div>
        </DataLoadingGuard>
      </div>
    </div>
  )
}
