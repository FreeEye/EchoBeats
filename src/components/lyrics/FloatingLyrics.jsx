import { useEffect, useRef, useState, useCallback } from 'react'
import { Music, ZoomIn, ZoomOut } from 'lucide-react'
import { useLyricsStore } from '@/stores/useLyricsStore'
import { useAudioTimeStore } from '@/stores/useAudioTimeStore'
import { useSongInPlayerStore } from '@/stores/useSongInPlayerStore'
import { fetchLyrics } from '@/services/dataService'

const MIN_FONT = 14
const MAX_FONT = 36
const DEFAULT_FONT = 22

function parseLRC(lrcText) {
  if (!lrcText) return []
  const lines = lrcText.split('\n')
  const result = []
  const timeRegex = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/
  for (const line of lines) {
    const match = line.match(timeRegex)
    if (match) {
      const mins = parseInt(match[1], 10)
      const secs = parseInt(match[2], 10)
      const ms = parseInt(match[3], 10)
      const time = mins * 60 + secs + ms / (match[3].length === 2 ? 100 : 1000)
      const text = line.replace(timeRegex, '').trim()
      if (text) {
        result.push({ time, text })
      }
    }
  }
  return result.sort((a, b) => a.time - b.time)
}

export default function FloatingLyrics() {
  const { isFloatingOpen, song, lyrics, setLyrics } = useLyricsStore()
  const currentTime = useAudioTimeStore((s) => s.currentTime)
  const songInPlayer = useSongInPlayerStore((s) => s.songInPlayer)
  const [syncedLyrics, setSyncedLyrics] = useState([])
  const [currentIndex, setCurrentIndex] = useState(-1)
  const [fontSize, setFontSize] = useState(() => {
    const saved = localStorage.getItem('lyricsFontSize')
    return saved ? Number(saved) : DEFAULT_FONT
  })
  const rafRef = useRef(null)
  const containerRef = useRef(null)
  const draggingRef = useRef(false)
  const lastYRef = useRef(0)
  const dragStartFontRef = useRef(DEFAULT_FONT)
  const lastFetchedIdRef = useRef(null)

  // Fetch lyrics when floating mode opens or song changes
  useEffect(() => {
    const activeSong = (isFloatingOpen && songInPlayer) ? songInPlayer : song
    if (isFloatingOpen && activeSong && activeSong.newId !== lastFetchedIdRef.current) {
      lastFetchedIdRef.current = activeSong.newId
      setSyncedLyrics([])
      setCurrentIndex(-1)
      fetchLyrics(activeSong).then((result) => {
        const plain = typeof result === 'string' ? result : result.plainLyrics
        const synced = typeof result === 'string' ? '' : result.syncedLyrics
        if (synced) {
          const parsed = parseLRC(synced)
          setSyncedLyrics(parsed)
          setLyrics(synced)
        } else if (plain) {
          setLyrics(plain)
        } else {
          setLyrics('')
        }
      }).catch(() => {
        setLyrics('')
      })
    }
  }, [isFloatingOpen, song?.newId, songInPlayer?.newId])

  // Sync current time to lyrics line using rAF
  useEffect(() => {
    if (!isFloatingOpen || syncedLyrics.length === 0) return

    function update() {
      let idx = -1
      for (let i = syncedLyrics.length - 1; i >= 0; i--) {
        if (currentTime >= syncedLyrics[i].time) {
          idx = i
          break
        }
      }
      setCurrentIndex(idx)
      rafRef.current = requestAnimationFrame(update)
    }

    rafRef.current = requestAnimationFrame(update)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [isFloatingOpen, syncedLyrics, currentTime])

  // Drag-to-resize font
  const handleMouseDown = useCallback((e) => {
    e.preventDefault()
    draggingRef.current = true
    lastYRef.current = e.clientY
    dragStartFontRef.current = fontSize
    document.body.style.cursor = 'ns-resize'
    document.body.style.userSelect = 'none'
  }, [fontSize])

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!draggingRef.current) return
      const deltaY = lastYRef.current - e.clientY // Up = positive delta
      const newSize = Math.round(dragStartFontRef.current + deltaY / 8)
      const clamped = Math.min(MAX_FONT, Math.max(MIN_FONT, newSize))
      setFontSize(clamped)
      localStorage.setItem('lyricsFontSize', clamped)
    }
    const handleMouseUp = () => {
      if (draggingRef.current) {
        draggingRef.current = false
        document.body.style.cursor = ''
        document.body.style.userSelect = ''
      }
    }
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])

  // Also support touch
  const handleTouchStart = useCallback((e) => {
    if (e.touches.length === 1) {
      draggingRef.current = true
      lastYRef.current = e.touches[0].clientY
      dragStartFontRef.current = fontSize
    }
  }, [fontSize])

  useEffect(() => {
    const handleTouchMove = (e) => {
      if (!draggingRef.current) return
      const deltaY = lastYRef.current - e.touches[0].clientY
      const newSize = Math.round(dragStartFontRef.current + deltaY / 8)
      const clamped = Math.min(MAX_FONT, Math.max(MIN_FONT, newSize))
      setFontSize(clamped)
      localStorage.setItem('lyricsFontSize', clamped)
    }
    const handleTouchEnd = () => {
      draggingRef.current = false
    }
    window.addEventListener('touchmove', handleTouchMove, { passive: true })
    window.addEventListener('touchend', handleTouchEnd)
    return () => {
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [])

  const zoomIn = () => {
    const n = Math.min(MAX_FONT, fontSize + 2)
    setFontSize(n)
    localStorage.setItem('lyricsFontSize', n)
  }
  const zoomOut = () => {
    const n = Math.max(MIN_FONT, fontSize - 2)
    setFontSize(n)
    localStorage.setItem('lyricsFontSize', n)
  }

  const displaySong = (isFloatingOpen && songInPlayer) ? songInPlayer : song

  if (!isFloatingOpen || !displaySong) return null

  const hasSynced = syncedLyrics.length > 0
  const prevLine = hasSynced && currentIndex > 0 ? syncedLyrics[currentIndex - 1] : null
  const currLine = hasSynced && currentIndex >= 0 ? syncedLyrics[currentIndex] : null
  const nextLine = hasSynced && currentIndex < syncedLyrics.length - 1 ? syncedLyrics[currentIndex + 1] : null

  const plainLines = !hasSynced && lyrics
    ? lyrics.split('\n').filter((line) => line.trim() && !/^\[.*\]$/.test(line.trim()))
    : []

  const currSize = fontSize
  const prevSize = Math.round(fontSize * 0.72)
  const curveRatio = fontSize / DEFAULT_FONT

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 74,
        left: 0,
        right: 0,
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'center',
        padding: '0 16px',
      }}
    >
      <div
        ref={containerRef}
        style={{
          background: 'rgba(0, 0, 0, 0.55)',
          backdropFilter: 'blur(16px)',
          borderRadius: 16,
          padding: `${Math.round(10 * curveRatio)}px ${Math.round(20 * curveRatio)}px`,
          maxWidth: Math.round(600 * curveRatio),
          width: '100%',
          textAlign: 'center',
          border: '1px solid rgba(255, 255, 255, 0.06)',
          transition: 'padding 0.2s, max-width 0.2s',
        }}
      >
        {/* Header with controls */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 6,
          marginBottom: Math.round(6 * curveRatio),
        }}>
          <Music size={Math.round(11 * curveRatio)} color="#FFA500" />
          <span style={{ fontSize: Math.round(10 * curveRatio), color: '#8c8c8c', fontWeight: 500 }}>
            {displaySong.name} - {displaySong.artists?.map(a => a.name).join('/') || '未知'}
          </span>
          <div style={{ display: 'flex', gap: 2, marginLeft: 8, pointerEvents: 'auto' }}>
            <button onClick={zoomOut}
              style={{ background: 'rgba(255,255,255,0.08)', border: 'none', borderRadius: 4, cursor: 'pointer',
                display: 'flex', alignItems: 'center', padding: 2, color: '#8c8c8c' }}
              onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.background = 'rgba(255,255,255,0.15)' }}
              onMouseLeave={e => { e.currentTarget.style.color = '#8c8c8c'; e.currentTarget.style.background = 'rgba(255,255,255,0.08)' }}
              title="缩小字体">
              <ZoomOut size={Math.round(12 * curveRatio)} />
            </button>
            <button onClick={zoomIn}
              style={{ background: 'rgba(255,255,255,0.08)', border: 'none', borderRadius: 4, cursor: 'pointer',
                display: 'flex', alignItems: 'center', padding: 2, color: '#8c8c8c' }}
              onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.background = 'rgba(255,255,255,0.15)' }}
              onMouseLeave={e => { e.currentTarget.style.color = '#8c8c8c'; e.currentTarget.style.background = 'rgba(255,255,255,0.08)' }}
              title="放大字体">
              <ZoomIn size={Math.round(12 * curveRatio)} />
            </button>
          </div>
          <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.2)', marginLeft: 4 }}>拖动歌词区域缩放</span>
        </div>

        {/* Lyrics area - draggable for font resize */}
        <div
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          style={{ cursor: 'ns-resize', minHeight: 60 }}
        >
          {hasSynced ? (
            <div>
              {prevLine && (
                <div style={{
                  fontSize: prevSize,
                  color: 'rgba(255,255,255,0.3)',
                  transition: 'all 0.3s',
                  lineHeight: 1.7,
                  marginBottom: 2,
                }}>
                  {prevLine.text}
                </div>
              )}
              {currLine && (
                <div style={{
                  fontSize: currSize,
                  fontWeight: 700,
                  color: '#FFA500',
                  transition: 'all 0.3s',
                  textShadow: '0 0 12px rgba(255,165,0,0.4)',
                  lineHeight: 1.5,
                  padding: '2px 0',
                }}>
                  {currLine.text}
                </div>
              )}
              {nextLine && (
                <div style={{
                  fontSize: prevSize,
                  color: 'rgba(255,255,255,0.3)',
                  transition: 'all 0.3s',
                  lineHeight: 1.7,
                  marginTop: 2,
                }}>
                  {nextLine.text}
                </div>
              )}
              {!currLine && !prevLine && nextLine && (
                <div style={{ fontSize: prevSize, color: 'rgba(255,255,255,0.3)', lineHeight: 1.7 }}>
                  {nextLine.text}
                </div>
              )}
            </div>
          ) : plainLines.length > 0 ? (
            <div style={{ maxHeight: 120, overflow: 'hidden' }}>
              {plainLines.slice(0, 4).map((line, i) => (
                <div key={i} style={{ fontSize: prevSize, color: 'rgba(255,255,255,0.4)', lineHeight: 1.7 }}>
                  {line}
                </div>
              ))}
            </div>
          ) : (
            <div style={{ fontSize: prevSize, color: 'rgba(255,255,255,0.25)', padding: '6px 0' }}>
              暂无歌词
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
