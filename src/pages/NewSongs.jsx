import { useEffect, useState } from 'react'
import { Sparkles } from 'lucide-react'
import { Button } from 'antd'
import DataLoadingGuard from '@/components/guards/DataLoadingGuard'
import SongList from '@/components/SongList'
import OperatingBarOfSongList from '@/components/OperatingBarOfSongList'
import { getNewSongs, getSongPool } from '@/services/dataService'

const PAGE_SIZE = 20

export default function NewSongs() {
  const [loading, setLoading] = useState(true)
  const [allSongs, setAllSongs] = useState([])
  const [displayCount, setDisplayCount] = useState(PAGE_SIZE)
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    document.title = 'EchoBeats - 新歌推荐'
    setLoading(true)
    Promise.allSettled([getNewSongs(), getSongPool()]).then(([news, pool]) => {
      const songs = []
      if (news.status === 'fulfilled') songs.push(...news.value)
      if (pool.status === 'fulfilled') {
        const seen = new Set(songs.map((s) => s.newId))
        songs.push(...pool.value.filter((s) => !seen.has(s.newId)))
      }
      setAllSongs(songs)
      setHasMore(songs.length > PAGE_SIZE)
      setLoading(false)
    })
  }, [])

  const displayed = allSongs.slice(0, displayCount)

  return (
    <div>
      <div style={{ textAlign: 'center', padding: '30px 20px 20px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <Sparkles size={20} color="#FFA500" />
          <span style={{ color: '#FFA500', fontSize: 13, fontWeight: 600, letterSpacing: 2 }}>NEW SONGS</span>
        </div>
        <h2 style={{ fontSize: 28, fontWeight: 700, margin: '0 0 6px', color: '#f0f0f0' }}>新歌推荐</h2>
        <p style={{ color: '#8c8c8c', fontSize: 14, margin: 0 }}>共 {allSongs.length} 首</p>
      </div>
      <div className="panel">
        <DataLoadingGuard loading={loading}>
          <div className="white-card">
            <OperatingBarOfSongList songs={displayed} />
            <div style={{ marginTop: 12 }}><SongList songs={displayed} /></div>
            {hasMore && (
              <div style={{ textAlign: 'center', padding: '20px 0 8px' }}>
                <Button onClick={() => {
                  const next = displayCount + PAGE_SIZE
                  setDisplayCount(next)
                  setHasMore(next < allSongs.length)
                }} type="primary" ghost>加载更多</Button>
              </div>
            )}
          </div>
        </DataLoadingGuard>
      </div>
    </div>
  )
}
