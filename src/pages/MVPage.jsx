import { useEffect, useState, Suspense, lazy } from 'react'
import { Film, Play, X } from 'lucide-react'
import { Button, Modal, Spin, Tabs } from 'antd'
import allMVs from '@/data/mvs.json'

const MV_PAGE_SIZE = 24

function MVCard({ mv, onPlay }) {
  return (
    <div
      className="mv-card"
      onClick={() => onPlay(mv)}
      style={{
        cursor: 'pointer',
        borderRadius: 12,
        overflow: 'hidden',
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.05)',
        transition: 'all 0.25s',
        position: 'relative',
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
    >
      <div style={{ position: 'relative', paddingTop: '56.25%', overflow: 'hidden' }}>
        <img
          src={mv.pic}
          alt={mv.title}
          loading="lazy"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
        <div
          className="mv-play-btn"
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
        >
          <Play size={22} color="#fff" style={{ marginLeft: 3 }} />
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: 6,
            right: 6,
            background: 'rgba(0,0,0,0.7)',
            color: '#fff',
            fontSize: 11,
            padding: '2px 6px',
            borderRadius: 4,
          }}
        >
          {mv.duration}
        </div>
      </div>
      <div style={{ padding: '10px 12px' }}>
        <div
          className="truncate"
          style={{ fontSize: 13, fontWeight: 600, color: '#f0f0f0', marginBottom: 3, lineHeight: 1.3 }}
          title={mv.title}
        >
          {mv.title}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span className="truncate" style={{ fontSize: 12, color: '#8c8c8c', flex: 1 }}>
            {mv.author || mv.artist}
          </span>
          {mv.play > 0 && (
            <span style={{ fontSize: 11, color: '#595959', flexShrink: 0, marginLeft: 8 }}>
              {mv.play > 10000 ? `${(mv.play / 10000).toFixed(1)}万` : mv.play}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

function MVPlayer({ mv, onClose }) {
  if (!mv) return null
  // Bilibili 播放器嵌入
  const embedUrl = `https://player.bilibili.com/player.html?bvid=${mv.bvid}&autoplay=1&danmaku=0`
  return (
    <Modal
      open={!!mv}
      onCancel={onClose}
      footer={null}
      width={900}
      centered
      destroyOnClose
      styles={{ body: { padding: 0, background: '#000' } }}
    >
      <div style={{ position: 'relative', paddingTop: '56.25%' }}>
        <iframe
          src={embedUrl}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            border: 'none',
          }}
          allow="autoplay; fullscreen"
          allowFullScreen
        />
      </div>
      <div style={{ padding: '12px 16px', background: '#1a1a1a' }}>
        <div style={{ fontSize: 15, fontWeight: 600, color: '#f0f0f0', marginBottom: 4 }}>{mv.title}</div>
        <div style={{ fontSize: 12, color: '#8c8c8c' }}>
          {mv.author} · {mv.duration}
          {mv.play > 0 && ` · ${mv.play > 10000 ? `${(mv.play / 10000).toFixed(0)}万次播放` : `${mv.play}次播放`}`}
        </div>
      </div>
    </Modal>
  )
}

export default function MVPage() {
  const [displayCount, setDisplayCount] = useState(MV_PAGE_SIZE)
  const [playingMV, setPlayingMV] = useState(null)
  const [activeTab, setActiveTab] = useState('all')

  useEffect(() => {
    document.title = 'EchoBeats - MV精选'
  }, [])

  // 提取所有艺人
  const artists = [...new Set(allMVs.map((m) => m.artist))].sort()

  // 按 Tab 过滤
  const filtered =
    activeTab === 'all'
      ? allMVs
      : allMVs.filter((m) => m.artist === activeTab)

  const displayed = filtered.slice(0, displayCount)
  const hasMore = displayCount < filtered.length

  const loadMore = () => {
    setDisplayCount((prev) => prev + MV_PAGE_SIZE)
  }

  // 切换 Tab 时重置
  const handleTabChange = (key) => {
    setActiveTab(key)
    setDisplayCount(MV_PAGE_SIZE)
  }

  // 生成 Tab items (top artists by count)
  const artistCounts = {}
  allMVs.forEach((m) => {
    artistCounts[m.artist] = (artistCounts[m.artist] || 0) + 1
  })
  const topArtists = Object.entries(artistCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20)
    .map(([name]) => name)

  const tabItems = [
    { key: 'all', label: `全部 (${allMVs.length})` },
    ...topArtists.map((a) => ({
      key: a,
      label: `${a} (${artistCounts[a]})`,
    })),
  ]

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
          共 {allMVs.length} 个 MV · {artists.length} 位艺人 · 显示 {displayed.length} 个
        </p>
      </div>

      <div className="panel">
        <Tabs
          activeKey={activeTab}
          onChange={handleTabChange}
          items={tabItems}
          style={{ marginBottom: 8 }}
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: 14,
          }}
        >
          {displayed.map((mv) => (
            <MVCard key={mv.bvid} mv={mv} onPlay={setPlayingMV} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="white-card" style={{ textAlign: 'center', padding: 40, color: '#8c8c8c' }}>
            暂无该艺人的 MV
          </div>
        )}

        {hasMore && (
          <div style={{ textAlign: 'center', padding: '24px 0 8px' }}>
            <Button onClick={loadMore} type="primary" ghost size="large">
              加载更多 ({filtered.length - displayCount} 个)
            </Button>
          </div>
        )}
      </div>

      <MVPlayer mv={playingMV} onClose={() => setPlayingMV(null)} />
    </div>
  )
}
