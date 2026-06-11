import { useEffect, useState, useMemo } from 'react'
import { Sparkles, Music, Disc, TrendingUp, Shuffle } from 'lucide-react'
import ArtistsSection from './ArtistsSection'
import { useSongPool } from '@/hooks/useSongPool'
import SongList from '@/components/SongList'
import OperatingBarOfSongList from '@/components/OperatingBarOfSongList'
import DataLoadingGuard from '@/components/guards/DataLoadingGuard'
import EraPlaylists from '@/components/EraPlaylists'
import { useListenlistStore } from '@/stores/useListenlistStore'
import { useSongInPlayerStore } from '@/stores/useSongInPlayerStore'
import { useNavigate } from 'react-router-dom'

function ChartSection({ title, icon, songs, max = 20, subtitle }) {
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
        <span style={{ fontSize: 20 }}>{icon}</span>
        <span style={{ fontSize: 16, fontWeight: 600, color: '#f0f0f0' }}>
          {title}
        </span>
        <span style={{ fontSize: 12, color: '#8c8c8c' }}>
          TOP {display.length}
        </span>
        {subtitle && <span style={{ fontSize: 12, color: '#595959', marginLeft: 'auto' }}>{subtitle}</span>}
      </div>
      <div style={{ marginBottom: 8 }}>
        <OperatingBarOfSongList songs={display} />
      </div>
      <SongList songs={display} ranking />
    </div>
  )
}

function StatsBanner({ totalSongs, totalArtists }) {
  const stats = [
    { icon: <Music size={16} color="#FFA500" />, label: '歌曲', value: totalSongs > 0 ? `${totalSongs}+` : '...' },
    { icon: <Disc size={16} color="#FFA500" />, label: '艺人', value: totalArtists > 0 ? `${totalArtists}+` : '...' },
    { icon: <Sparkles size={16} color="#FFA500" />, label: '无广告', value: '纯净' },
    { icon: <TrendingUp size={16} color="#FFA500" />, label: '实时更新', value: '每日' },
  ]
  return (
    <div style={{
      display: 'flex', justifyContent: 'center', gap: 24, padding: '16px 0 8px',
      flexWrap: 'wrap',
    }}>
      {stats.map((s) => (
        <div key={s.label} style={{ textAlign: 'center', minWidth: 70 }}>
          <div style={{ marginBottom: 4 }}>{s.icon}</div>
          <div style={{ fontSize: 18, fontWeight: 700, color: '#f0f0f0' }}>{s.value}</div>
          <div style={{ fontSize: 11, color: '#8c8c8c' }}>{s.label}</div>
        </div>
      ))}
    </div>
  )
}

function DailyPicks({ songs }) {
  const addListToListenlist = useListenlistStore((s) => s.addListToListenlist)
  const setSongInPlayer = useSongInPlayerStore((s) => s.setSongInPlayer)

  const picks = useMemo(() => {
    if (songs.length === 0) return []
    const shuffled = [...songs].sort(() => Math.random() - 0.5)
    return shuffled.slice(0, 10)
  }, [songs])

  if (picks.length === 0) return null

  return (
    <div className="white-card" style={{ marginTop: 12 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '0 0 12px',
        borderBottom: '1px solid rgba(255,255,255,0.06)', marginBottom: 4 }}>
        <span style={{ fontSize: 20 }}>🎲</span>
        <span style={{ fontSize: 16, fontWeight: 600, color: '#f0f0f0' }}>随机推荐</span>
        <span style={{ fontSize: 12, color: '#8c8c8c', marginLeft: 'auto', cursor: 'pointer' }}
          onClick={() => { addListToListenlist(picks); setSongInPlayer(picks[0]) }}>
          播放全部
        </span>
      </div>
      <SongList songs={picks} />
    </div>
  )
}

function QuickTags() {
  const navigate = useNavigate()
  const tags = [
    { label: '华语', kw: '周杰伦' },
    { label: '粤语', kw: 'BEYOND' },
    { label: '欧美', kw: 'Taylor Swift' },
    { label: '民谣', kw: '赵雷' },
    { label: '摇滚', kw: '五月天' },
    { label: 'R&B', kw: '陶喆' },
    { label: '经典', kw: '邓丽君' },
    { label: '治愈', kw: '陈奕迅' },
  ]
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center', padding: '8px 0 4px' }}>
      {tags.map((t) => (
        <span key={t.label} onClick={() => navigate(`/search/${encodeURIComponent(t.kw)}`)}
          style={{
            fontSize: 12, color: '#bfbfbf', cursor: 'pointer', padding: '4px 14px',
            borderRadius: 20, background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.08)', transition: 'all 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.color = '#FFA500'; e.currentTarget.style.borderColor = 'rgba(255,165,0,0.4)'; e.currentTarget.style.background = 'rgba(255,165,0,0.06)' }}
          onMouseLeave={e => { e.currentTarget.style.color = '#bfbfbf'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)' }}>
          {t.label}
        </span>
      ))}
    </div>
  )
}

export default function Home() {
  const { loading, hotSongs, newSongs, allSongs } = useSongPool()
  const [artistCount, setArtistCount] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    document.title = 'EchoBeats - 发现好音乐'
  }, [])

  // Fetch artist count from API on mount
  useEffect(() => {
    import('@/services/dataService').then(({ getArtists }) => {
      getArtists().then(artists => setArtistCount(artists.length)).catch(() => {})
    })
  }, [])

  return (
    <div>
      {/* Hero */}
      <div style={{ textAlign: 'center', padding: '28px 20px 12px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
          <Sparkles size={20} color="#FFA500" />
          <span style={{ color: '#FFA500', fontSize: 12, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase' }}>
            Discover Music
          </span>
        </div>
        <h2 style={{ fontSize: 28, fontWeight: 700, margin: '0 0 6px', color: '#f0f0f0', letterSpacing: '-0.5px' }}>
          发现你的音乐世界
        </h2>
        <p style={{ color: '#8c8c8c', fontSize: 14, margin: 0 }}>
          纯净听歌 · 无广告 · 无社交 · 随时随地
        </p>

        <StatsBanner totalSongs={allSongs.length} totalArtists={artistCount} />
        <QuickTags />
      </div>

      <div className="panel">
        <ArtistsSection />

        <DataLoadingGuard loading={loading}>
          {/* Daily picks when loaded */}
          {allSongs.length > 0 && <DailyPicks songs={allSongs} />}

          <EraPlaylists />

          <ChartSection
            title="热歌榜"
            icon="🔥"
            songs={hotSongs}
            max={60}
            subtitle="实时热歌"
          />
          <ChartSection
            title="新歌榜"
            icon="🆕"
            songs={newSongs}
            max={60}
            subtitle="最新上架"
          />
        </DataLoadingGuard>
      </div>
    </div>
  )
}
