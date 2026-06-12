import { useEffect, useRef, useState, useCallback } from 'react'
import { X, Maximize2 } from 'lucide-react'
import { useSongInPlayerStore } from '@/stores/useSongInPlayerStore'
import { generateSongCover } from '@/utils/generateSongCover'

// 迷你悬浮播放条（后台播放）
export function MiniPlayer({ onRestore, onClose }) {
  const songInPlayer = useSongInPlayerStore((s) => s.songInPlayer)
  if (!songInPlayer) return null
  const coverStyle = songInPlayer.cover
    ? { backgroundImage: `url(${songInPlayer.cover})`, backgroundSize: 'cover', backgroundPosition: 'center' }
    : { backgroundColor: generateSongCover(songInPlayer.newId) }
  return (
    <div style={{
      position: 'fixed', bottom: 74, right: 20, zIndex: 1100,
      background: 'rgba(18, 18, 18, 0.95)', backdropFilter: 'blur(16px)',
      borderRadius: 10, border: '1px solid rgba(255,165,0,0.3)',
      padding: '8px 14px', display: 'flex', alignItems: 'center', gap: 10,
      boxShadow: '0 4px 20px rgba(0,0,0,0.5)', maxWidth: 320,
      animation: 'slideUp 0.3s ease-out',
    }}>
      <div style={{ width: 42, height: 42, borderRadius: 8, flexShrink: 0, ...coverStyle }} />
      <div style={{ minWidth: 0, flex: 1 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: '#f0f0f0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {songInPlayer.name}
        </div>
        <div style={{ fontSize: 11, color: '#8c8c8c', marginTop: 1 }}>
          {songInPlayer.artists?.map(a => a.name).join('/') || '未知'}
        </div>
      </div>
      <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
        <button onClick={onRestore} title="恢复播放器" style={{
          background: 'none', border: 'none', color: '#FFA500', cursor: 'pointer', padding: 4,
          display: 'flex', alignItems: 'center',
        }}><Maximize2 size={16} /></button>
        <button onClick={onClose} title="关闭" style={{
          background: 'none', border: 'none', color: '#8c8c8c', cursor: 'pointer', padding: 4,
          display: 'flex', alignItems: 'center',
        }}><X size={16} /></button>
      </div>
    </div>
  )
}

// Canvas 画中画 Hook
export function useAudioPiP() {
  const songInPlayer = useSongInPlayerStore((s) => s.songInPlayer)
  const [isPiPActive, setIsPiPActive] = useState(false)
  const [isMini, setIsMini] = useState(false)
  const canvasRef = useRef(null)
  const pipWindowRef = useRef(null)
  const animRef = useRef(null)
  const coverImgRef = useRef(null)
  const currentTimeRef = useRef(0)
  const audioRef = useRef(null)

  // 同步播放时间
  useEffect(() => {
    const checkAudio = setInterval(() => {
      const audios = document.querySelectorAll('audio')
      if (audios.length > 0 && audios[0] !== audioRef.current) {
        audioRef.current = audios[0]
      }
      if (audioRef.current) {
        currentTimeRef.current = audioRef.current.currentTime || 0
      }
    }, 200)
    return () => clearInterval(checkAudio)
  }, [])

  const drawFrame = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const w = canvas.width
    const h = canvas.height
    const currentTime = currentTimeRef.current
    const duration = audioRef.current?.duration || 0

    ctx.fillStyle = '#0d0d0d'
    ctx.fillRect(0, 0, w, h)

    // Cover
    const coverSize = Math.min(h * 0.45, 100)
    const coverX = (w - coverSize) / 2
    const coverY = 16
    if (coverImgRef.current) {
      ctx.save()
      ctx.beginPath()
      try { ctx.roundRect(coverX, coverY, coverSize, coverSize, 10) } catch (_) {
        ctx.rect(coverX, coverY, coverSize, coverSize)
      }
      ctx.clip()
      ctx.drawImage(coverImgRef.current, coverX, coverY, coverSize, coverSize)
      ctx.restore()
    } else {
      ctx.fillStyle = generateSongCover(songInPlayer?.newId || '0')
      ctx.beginPath()
      try { ctx.roundRect(coverX, coverY, coverSize, coverSize, 10) } catch (_) {
        ctx.rect(coverX, coverY, coverSize, coverSize)
      }
      ctx.fill()
    }

    // Visualizer
    const barCount = 14
    const barWidth = (w - 36) / barCount - 2
    const barBaseY = coverY + coverSize + 22
    const t = Date.now()
    ctx.fillStyle = '#FFA500'
    for (let i = 0; i < barCount; i++) {
      const freq = Math.sin(t * 0.003 + i * 0.4) * 0.5 + 0.5
      const amp = Math.sin(t * 0.007 + i * 0.7) * 0.3 + 0.7
      const bh = (freq * amp * 24) + 3
      const x = 18 + i * (barWidth + 2)
      ctx.fillRect(x, barBaseY - bh, barWidth, bh)
    }

    // Info
    ctx.fillStyle = '#f0f0f0'
    ctx.font = '600 13px -apple-system, sans-serif'
    ctx.textAlign = 'center'
    const name = songInPlayer?.name || '未在播放'
    ctx.fillText(name.length > 18 ? name.slice(0, 17) + '...' : name, w / 2, barBaseY + 16)

    ctx.fillStyle = '#8c8c8c'
    ctx.font = '11px -apple-system, sans-serif'
    const artist = songInPlayer?.artists?.map(a => a.name).join('/') || ''
    ctx.fillText(artist.length > 22 ? artist.slice(0, 21) + '...' : artist, w / 2, barBaseY + 32)

    // Progress
    const progress = duration > 0 ? currentTime / duration : 0
    ctx.fillStyle = 'rgba(255,255,255,0.1)'
    ctx.fillRect(18, h - 14, w - 36, 2)
    ctx.fillStyle = '#FFA500'
    ctx.fillRect(18, h - 14, (w - 36) * progress, 2)

    animRef.current = requestAnimationFrame(drawFrame)
  }, [songInPlayer])

  // Load cover
  useEffect(() => {
    if (!songInPlayer) return
    const img = new Image()
    img.crossOrigin = 'anonymous'
    if (songInPlayer.cover) {
      img.src = songInPlayer.cover
    } else {
      const c = document.createElement('canvas')
      c.width = 100; c.height = 100
      c.getContext('2d').fillStyle = generateSongCover(songInPlayer.newId)
      c.getContext('2d').fillRect(0, 0, 100, 100)
      img.src = c.toDataURL()
    }
    img.onload = () => { coverImgRef.current = img }
    img.onerror = () => { coverImgRef.current = null }
  }, [songInPlayer?.newId])

  const startPiP = useCallback(() => {
    // 尝试原生 PiP
    if (document.pictureInPictureEnabled && canvasRef.current) {
      const canvas = canvasRef.current
      canvas.width = 300
      canvas.height = 240
      if (animRef.current) cancelAnimationFrame(animRef.current)
      animRef.current = requestAnimationFrame(drawFrame)
      canvas.requestPictureInPicture().then((pw) => {
        pipWindowRef.current = pw
        setIsPiPActive(true)
        pw.addEventListener('leave', () => {
          pipWindowRef.current = null
          setIsPiPActive(false)
          if (animRef.current) cancelAnimationFrame(animRef.current)
        }, { once: true })
      }).catch(() => {
        // Native PiP failed, don't do anything (user can use mini player)
      })
    }
  }, [drawFrame])

  const stopPiP = useCallback(() => {
    if (pipWindowRef.current && document.pictureInPictureElement) {
      document.exitPictureInPicture().catch(() => {})
    }
    pipWindowRef.current = null
    setIsPiPActive(false)
    if (animRef.current) cancelAnimationFrame(animRef.current)
  }, [])

  const toggleMini = useCallback(() => {
    setIsMini(m => !m)
  }, [])

  return { isPiPActive, isMini, startPiP, stopPiP, toggleMini, canvasRef, pipCanvas: canvasRef }
}
