import { useEffect, useRef } from 'react'
import { X, Music, User, Loader2 } from 'lucide-react'
import { useLyricsStore } from '@/stores/useLyricsStore'
import { fetchLyrics } from '@/services/dataService'
import { generateSongCover } from '@/utils/generateSongCover'

export default function LyricsPanel() {
  const { isOpen, song, lyrics, isLoading, close, setLyrics } = useLyricsStore()
  const panelRef = useRef(null)

  useEffect(() => {
    if (isOpen && song) {
      fetchLyrics(song).then((result) => {
        const text = result.plainLyrics || result.syncedLyrics || ''
        setLyrics(text || '暂无歌词')
      }).catch(() => {
        setLyrics('暂无歌词')
      })
    }
  }, [isOpen, song?.newId])

  useEffect(() => {
    if (!isOpen) return
    const handleKey = (e) => { if (e.key === 'Escape') close() }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [isOpen, close])

  if (!isOpen || !song) return null

  const coverStyle = song.cover
    ? { backgroundImage: `url(${song.cover})` }
    : { backgroundColor: generateSongCover(song.newId) }

  const artistNames = song.artists?.map((a) => a.name).join(' / ') || '未知艺人'

  const lyricsLines = lyrics
    .split('\n')
    .filter((line) => line.trim())

  return (
    <>
      {/* 遮罩层 */}
      <div
        onClick={close}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 1050,
          background: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(4px)',
        }}
      />

      {/* 面板 */}
      <div
        ref={panelRef}
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          width: 420,
          maxWidth: '90vw',
          height: '100vh',
          zIndex: 1060,
          background: 'rgba(24, 24, 24, 0.95)',
          backdropFilter: 'blur(24px)',
          borderLeft: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          flexDirection: 'column',
          animation: 'slideInRight 0.3s ease-out',
        }}
      >
        {/* 背景图片 */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            ...coverStyle,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.08,
            filter: 'blur(10px)',
            zIndex: -1,
          }}
        />

        {/* 顶部操作栏 */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '16px 20px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
            flexShrink: 0,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Music size={18} color="#FFA500" />
            <span style={{ fontSize: 15, fontWeight: 600, color: '#f0f0f0' }}>歌词</span>
          </div>
          <button
            onClick={close}
            style={{
              background: 'none',
              border: 'none',
              color: '#8c8c8c',
              cursor: 'pointer',
              padding: 4,
              borderRadius: 6,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.background = 'rgba(255,255,255,0.08)' }}
            onMouseLeave={(e) => { e.currentTarget.style.color = '#8c8c8c'; e.currentTarget.style.background = 'transparent' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* 歌曲信息 */}
        <div
          style={{
            padding: '20px 20px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            flexShrink: 0,
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 12,
              flexShrink: 0,
              ...coverStyle,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
            }}
          />
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 16, fontWeight: 600, color: '#f0f0f0', marginBottom: 4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {song.name}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <User size={13} color="#8c8c8c" />
              <span style={{ fontSize: 13, color: '#8c8c8c', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {artistNames}
              </span>
            </div>
          </div>
        </div>

        {/* 歌词内容 */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '0 20px 30px',
          }}
        >
          {isLoading ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40, gap: 8, color: '#8c8c8c' }}>
              <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} />
              <span style={{ fontSize: 14 }}>加载歌词中...</span>
            </div>
          ) : lyricsLines.length > 0 ? (
            <div>
              {lyricsLines.map((line, idx) => {
                const isTimeTag = /^\[.*\]$/.test(line.trim())
                if (isTimeTag) return null
                return (
                  <div
                    key={idx}
                    style={{
                      padding: '10px 0',
                      fontSize: 15,
                      lineHeight: 1.8,
                      color: '#bfbfbf',
                      borderBottom: '1px solid rgba(255, 255, 255, 0.03)',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = '#fff' }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = '#bfbfbf' }}
                  >
                    {line}
                  </div>
                )
              })}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: 40, color: '#8c8c8c', fontSize: 14 }}>
              暂无歌词
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  )
}
