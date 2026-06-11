import { useEffect } from 'react'
import { Sparkles } from 'lucide-react'
import ArtistsSection from './ArtistsSection'
import { useSongPool } from '@/hooks/useSongPool'
import SongList from '@/components/SongList'
import OperatingBarOfSongList from '@/components/OperatingBarOfSongList'
import DataLoadingGuard from '@/components/guards/DataLoadingGuard'
import EraPlaylists from '@/components/EraPlaylists'

function ChartSection({ title, icon, songs, max = 20 }) {
  if (!songs || songs.length === 0) return null
  const display = songs.slice(0, max)
  return (
    <div className="white-card" style={{ marginTop: 12 }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '0 0 12px',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          marginBottom: 4,
        }}
      >
        {icon}
        <span style={{ fontSize: 16, fontWeight: 600, color: '#f0f0f0' }}>
          {title}
        </span>
        <span style={{ fontSize: 12, color: '#8c8c8c' }}>
          TOP {display.length}
        </span>
      </div>
      <div style={{ marginBottom: 8 }}>
        <OperatingBarOfSongList songs={display} />
      </div>
      <SongList songs={display} ranking />
    </div>
  )
}

export default function Home() {
  const { loading, hotSongs, newSongs } = useSongPool()

  useEffect(() => {
    document.title = 'EchoBeats - 发现好音乐'
  }, [])

  return (
    <div>
      <div
        style={{
          textAlign: 'center',
          padding: '32px 20px 20px',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            marginBottom: 8,
          }}
        >
          <Sparkles size={22} color="#FFA500" />
          <span
            style={{
              color: '#FFA500',
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: 2,
              textTransform: 'uppercase',
            }}
          >
            Discover Music
          </span>
        </div>
        <h2
          style={{
            fontSize: 32,
            fontWeight: 700,
            margin: '0 0 8px',
            color: '#f0f0f0',
            letterSpacing: '-0.5px',
          }}
        >
          发现你的音乐世界
        </h2>
        <p style={{ color: '#8c8c8c', fontSize: 15, margin: 0 }}>
          纯净听歌 · 无广告 · 无社交
        </p>
      </div>

      <div className="panel">
        <ArtistsSection />

        <DataLoadingGuard loading={loading}>
          <EraPlaylists />
          <ChartSection
            title="热歌榜"
            icon={
              <span style={{ fontSize: 18 }}>🔥</span>
            }
            songs={hotSongs}
            max={60}
          />
          <ChartSection
            title="新歌榜"
            icon={
              <span style={{ fontSize: 18 }}>🆕</span>
            }
            songs={newSongs}
            max={60}
          />
        </DataLoadingGuard>
      </div>
    </div>
  )
}
