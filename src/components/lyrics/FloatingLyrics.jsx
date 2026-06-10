import { useEffect, useRef, useState } from 'react'
import { Music } from 'lucide-react'
import { useLyricsStore } from '@/stores/useLyricsStore'
import { useAudioTimeStore } from '@/stores/useAudioTimeStore'
import { fetchLyrics } from '@/services/dataService'

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
  const { isFloatingOpen, song, lyrics, isLoading, setLyrics } = useLyricsStore()
  const currentTime = useAudioTimeStore((s) => s.currentTime)
  const [syncedLyrics, setSyncedLyrics] = useState([])
  const [currentIndex, setCurrentIndex] = useState(-1)
  const rafRef = useRef(null)

  // Fetch lyrics when floating mode opens
  useEffect(() => {
    if (isFloatingOpen && song) {
      setSyncedLyrics([])
      setCurrentIndex(-1)
      fetchLyrics(song).then((result) => {
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
  }, [isFloatingOpen, song?.newId])

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

  if (!isFloatingOpen || !song) return null

  const hasSynced = syncedLyrics.length > 0
  const prevLine = hasSynced && currentIndex > 0 ? syncedLyrics[currentIndex - 1] : null
  const currLine = hasSynced && currentIndex >= 0 ? syncedLyrics[currentIndex] : null
  const nextLine = hasSynced && currentIndex < syncedLyrics.length - 1 ? syncedLyrics[currentIndex + 1] : null

  // Fallback: plain lyrics (split by newline)
  const plainLines = !hasSynced && lyrics
    ? lyrics.split('\n').filter((line) => line.trim() && !/^\[.*\]$/.test(line.trim()))
    : []

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 74,
        left: 0,
        right: 0,
        zIndex: 1000,
        pointerEvents: 'none',
        display: 'flex',
        justifyContent: 'center',
        padding: '0 16px',
      }}
    >
      <div
        style={{
          background: 'rgba(0, 0, 0, 0.55)',
          backdropFilter: 'blur(12px)',
          borderRadius: 16,
          padding: '12px 24px',
          maxWidth: 600,
          width: '100%',
          textAlign: 'center',
          border: '1px solid rgba(255, 255, 255, 0.06)',
        }}
      >
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 6,
          marginBottom: 8,
        }}>
          <Music size={12} color="#FFA500" />
          <span style={{ fontSize: 11, color: '#8c8c8c', fontWeight: 500 }}>
            {song.name} - {song.artists?.map(a => a.name).join('/') || '未知'}
          </span>
        </div>

        {/* Synced lyrics */}
        {hasSynced ? (
          <div style={{ lineHeight: 2 }}>
            {prevLine && (
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', transition: 'all 0.3s' }}>
                {prevLine.text}
              </div>
            )}
            {currLine && (
              <div style={{
                fontSize: 16,
                fontWeight: 700,
                color: '#FFA500',
                transition: 'all 0.3s',
                textShadow: '0 0 8px rgba(255,165,0,0.3)',
              }}>
                {currLine.text}
              </div>
            )}
            {nextLine && (
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', transition: 'all 0.3s' }}>
                {nextLine.text}
              </div>
            )}
            {!currLine && !prevLine && nextLine && (
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)' }}>
                {nextLine.text}
              </div>
            )}
          </div>
        ) : plainLines.length > 0 ? (
          <div style={{ maxHeight: 80, overflow: 'hidden' }}>
            {plainLines.slice(0, 3).map((line, i) => (
              <div key={i} style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', lineHeight: 1.8 }}>
                {line}
              </div>
            ))}
          </div>
        ) : (
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)', padding: '4px 0' }}>
            暂无歌词
          </div>
        )}
      </div>
    </div>
  )
}
