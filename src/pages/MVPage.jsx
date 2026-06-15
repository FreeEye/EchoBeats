import { useEffect, useState, useRef } from 'react'
import { Film, Play, X, Minimize2, Maximize2 } from 'lucide-react'
import { Button, Tabs } from 'antd'
import allMVs from '@/data/mvs.json'
import { generateSongCover } from '@/utils/generateSongCover'

const MV_PAGE_SIZE = 24

function MVCard({ mv, onPlay }) {
  const [imgError, setImgError] = useState(false)
  const fallbackBg = generateSongCover(mv.bvid || mv.title)
  const cardKey = mv.page ? `${mv.bvid}_p${mv.page}` : mv.bvid
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
        {imgError || !mv.pic ? (
          <div style={{
            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
            background: fallbackBg, display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Film size={36} color="#8c8c8c" />
          </div>
        ) : (
          <img
            src={mv.pic.replace(/^http:/, 'https:')}
            alt={mv.title}
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        )}
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

// 内嵌 MV 播放器（支持后台播放）
function MVPlayer({ mv, onClose, onMinimize }) {
  if (!mv) return null
  const page = mv.page || 1
  const playerUrl = `https://player.bilibili.com/player.html?bvid=${mv.bvid}&autoplay=1&danmaku=0&high_quality=1&as_wide=1&page=${page}`
  return (
    <div style={{
      background: '#0a0a0a',
      borderRadius: 12,
      overflow: 'hidden',
      border: '1px solid rgba(255,255,255,0.08)',
      marginBottom: 20,
    }}>
      {/* 顶部栏 */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '10px 16px', background: '#111',
      }}>
        <div style={{ minWidth: 0, flex: 1 }}>
          {mv.collectionTitle && (
            <div style={{ fontSize: 11, color: '#FFA500', marginBottom: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {mv.collectionTitle}
            </div>
          )}
          <div style={{ fontSize: 14, fontWeight: 600, color: '#f0f0f0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {mv.title}
          </div>
          <div style={{ fontSize: 12, color: '#8c8c8c', marginTop: 2 }}>
            {mv.author || mv.artist} · {mv.duration}
          </div>
        </div>
        <div style={{ display: 'flex', gap: 6, flexShrink: 0, marginLeft: 12 }}>
          <button
            onClick={onMinimize}
            title="最小化（继续后台播放）"
            style={{
              background: 'none', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 6,
              color: '#8c8c8c', cursor: 'pointer', padding: '4px 8px', display: 'flex',
              alignItems: 'center', transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)' }}
            onMouseLeave={e => { e.currentTarget.style.color = '#8c8c8c'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)' }}
          >
            <Minimize2 size={14} />
          </button>
          <button
            onClick={onClose}
            title="关闭"
            style={{
              background: 'none', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 6,
              color: '#8c8c8c', cursor: 'pointer', padding: '4px 8px', display: 'flex',
              alignItems: 'center', transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = '#ff4d4f'; e.currentTarget.style.borderColor = 'rgba(255,77,79,0.4)' }}
            onMouseLeave={e => { e.currentTarget.style.color = '#8c8c8c'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)' }}
          >
            <X size={14} />
          </button>
        </div>
      </div>
      {/* 播放器 */}
      <div style={{ position: 'relative', paddingTop: '56.25%' }}>
        <iframe
          src={playerUrl}
          style={{
            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none',
          }}
          allow="autoplay; fullscreen; encrypted-media"
          allowFullScreen
          referrerPolicy="no-referrer"
        />
      </div>
    </div>
  )
}

// Mini 后台播放栏
function MiniPlayer({ mv, onRestore, onClose }) {
  if (!mv) return null
  const page = mv.page || 1
  const miniUrl = `https://player.bilibili.com/player.html?bvid=${mv.bvid}&autoplay=1&danmaku=0&page=${page}`
  return (
    <div style={{
      position: 'fixed', bottom: 74, right: 20, zIndex: 1000,
      background: 'rgba(18, 18, 18, 0.95)', backdropFilter: 'blur(16px)',
      borderRadius: 10, border: '1px solid rgba(255,165,0,0.3)',
      padding: '8px 14px', display: 'flex', alignItems: 'center', gap: 10,
      boxShadow: '0 4px 20px rgba(0,0,0,0.5)', maxWidth: 360,
      animation: 'slideUp 0.3s ease-out',
    }}>
      <div style={{ width: 36, height: 20, borderRadius: 3, overflow: 'hidden', flexShrink: 0, background: '#000' }}>
        <iframe
          src={miniUrl}
          style={{ width: '100%', height: '100%', border: 'none', pointerEvents: 'none' }}
          allow="autoplay"
          referrerPolicy="no-referrer"
        />
      </div>
      <div style={{ minWidth: 0, flex: 1 }}>
        <div style={{ fontSize: 12, fontWeight: 500, color: '#f0f0f0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {mv.title}
        </div>
        <div style={{ fontSize: 11, color: '#FFA500' }}>后台播放中</div>
      </div>
      <button
        onClick={onRestore}
        title="恢复"
        style={{ background: 'none', border: 'none', color: '#FFA500', cursor: 'pointer', padding: 2 }}
      >
        <Maximize2 size={15} />
      </button>
      <button
        onClick={onClose}
        title="关闭"
        style={{ background: 'none', border: 'none', color: '#8c8c8c', cursor: 'pointer', padding: 2 }}
      >
        <X size={15} />
      </button>
    </div>
  )
}

export default function MVPage() {
  const [displayCount, setDisplayCount] = useState(MV_PAGE_SIZE)
  const [playingMV, setPlayingMV] = useState(null)
  const [minimizedMV, setMinimizedMV] = useState(null)
  const [activeTab, setActiveTab] = useState('all')
  const playerRef = useRef(null)

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

  // 点击播放 MV
  const handlePlay = (mv) => {
    setPlayingMV(mv)
    setMinimizedMV(null)
    // 滚动到播放器位置
    setTimeout(() => {
      playerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }

  // 最小化（保持后台播放）
  const handleMinimize = () => {
    setMinimizedMV(playingMV)
    setPlayingMV(null)
  }

  // 关闭播放器
  const handleClose = () => {
    setPlayingMV(null)
    setMinimizedMV(null)
  }

  // 从 mini 恢复
  const handleRestore = () => {
    setPlayingMV(minimizedMV)
    setMinimizedMV(null)
    setTimeout(() => {
      playerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
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
        {/* 内嵌播放器 */}
        <div ref={playerRef}>
          <MVPlayer mv={playingMV} onClose={handleClose} onMinimize={handleMinimize} />
        </div>

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
            <MVCard key={mv.page ? `${mv.bvid}_p${mv.page}` : mv.bvid} mv={mv} onPlay={handlePlay} />
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

      {/* Mini 后台播放器 */}
      <MiniPlayer mv={minimizedMV} onRestore={handleRestore} onClose={handleClose} />

      <style>{`
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  )
}
