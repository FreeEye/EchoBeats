import { useEffect, useRef, useState, useCallback } from 'react'
import { useSongInPlayerStore } from '@/stores/useSongInPlayerStore'
import { useAudioTimeStore } from '@/stores/useAudioTimeStore'
import { generateSongCover } from '@/utils/generateSongCover'

// Canvas-based Picture-in-Picture for audio playback
// Shows album art, song info, and a simple visualizer
export function useAudioPiP() {
  const songInPlayer = useSongInPlayerStore((s) => s.songInPlayer)
  const currentTime = useAudioTimeStore((s) => s.currentTime)
  const [isPiPActive, setIsPiPActive] = useState(false)
  const canvasRef = useRef(null)
  const pipWindowRef = useRef(null)
  const animRef = useRef(null)
  const coverImgRef = useRef(null)

  const drawFrame = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const w = canvas.width
    const h = canvas.height

    // Background
    ctx.fillStyle = '#0d0d0d'
    ctx.fillRect(0, 0, w, h)

    // Cover art
    const coverSize = Math.min(h * 0.5, 120)
    const coverX = (w - coverSize) / 2
    const coverY = 20

    if (coverImgRef.current) {
      ctx.save()
      ctx.beginPath()
      ctx.roundRect(coverX, coverY, coverSize, coverSize, 12)
      ctx.clip()
      ctx.drawImage(coverImgRef.current, coverX, coverY, coverSize, coverSize)
      ctx.restore()
    }

    // Visualizer bars
    const barCount = 16
    const barWidth = (w - 40) / barCount - 2
    const barBaseY = coverY + coverSize + 30
    const t = (currentTime * 1000) || Date.now()
    ctx.fillStyle = '#FFA500'

    for (let i = 0; i < barCount; i++) {
      const freq = Math.sin(t * 0.003 + i * 0.4) * 0.5 + 0.5
      const amp = Math.sin(t * 0.007 + i * 0.7) * 0.3 + 0.7
      const h2 = (freq * amp * 30) + 4
      const x = 20 + i * (barWidth + 2)
      ctx.fillRect(x, barBaseY - h2, barWidth, h2)
    }

    // Song info
    ctx.fillStyle = '#f0f0f0'
    ctx.font = '600 14px -apple-system, sans-serif'
    ctx.textAlign = 'center'
    const name = songInPlayer?.name || '未在播放'
    ctx.fillText(name.length > 20 ? name.slice(0, 19) + '...' : name, w / 2, barBaseY + 20)

    ctx.fillStyle = '#8c8c8c'
    ctx.font = '12px -apple-system, sans-serif'
    const artist = songInPlayer?.artists?.map(a => a.name).join('/') || ''
    ctx.fillText(artist.length > 24 ? artist.slice(0, 23) + '...' : artist, w / 2, barBaseY + 40)

    // Progress bar
    const duration = songInPlayer?.duration || 0
    const progress = duration > 0 ? currentTime / duration : 0
    ctx.fillStyle = 'rgba(255,255,255,0.1)'
    ctx.fillRect(20, h - 16, w - 40, 3)
    ctx.fillStyle = '#FFA500'
    ctx.fillRect(20, h - 16, (w - 40) * progress, 3)

    animRef.current = requestAnimationFrame(drawFrame)
  }, [currentTime, songInPlayer])

  // Load cover image
  useEffect(() => {
    if (!songInPlayer) return
    const img = new Image()
    img.crossOrigin = 'anonymous'
    if (songInPlayer.cover) {
      img.src = songInPlayer.cover
    } else {
      // Generate a colored canvas as fallback
      const c = document.createElement('canvas')
      c.width = 120; c.height = 120
      const cx = c.getContext('2d')
      cx.fillStyle = generateSongCover(songInPlayer.newId)
      cx.fillRect(0, 0, 120, 120)
      img.src = c.toDataURL()
    }
    img.onload = () => { coverImgRef.current = img }
    img.onerror = () => { coverImgRef.current = null }
  }, [songInPlayer?.newId])

  const startPiP = useCallback(async () => {
    if (!document.pictureInPictureEnabled) {
      // Fallback: open a mini popup
      const w = 320, h = 340
      const pip = window.open('', 'EchoBeats_Audio_PiP',
        `width=${w},height=${h},left=${window.screen.width - w - 40},top=${window.screen.height - h - 100},resizable=no,alwaysOnTop=yes`)
      if (pip) {
        pip.document.write(`
          <!DOCTYPE html><html><head><title>EchoBeats PiP</title><style>
            *{margin:0;padding:0;box-sizing:border-box}
            body{background:#0d0d0d;display:flex;align-items:center;justify-content:center;height:100vh;overflow:hidden}
            canvas{max-width:100%;max-height:100%}
          </style></head><body><canvas id="pip-canvas"></canvas></body></html>`)
        const popupCanvas = pip.document.getElementById('pip-canvas')
        if (popupCanvas) {
          popupCanvas.width = 320
          popupCanvas.height = 340
          canvasRef.current = popupCanvas
          pipWindowRef.current = pip
          setIsPiPActive(true)
          drawFrame()
          pip.onbeforeunload = () => {
            canvasRef.current = null
            pipWindowRef.current = null
            setIsPiPActive(false)
            if (animRef.current) cancelAnimationFrame(animRef.current)
          }
        }
      }
      return
    }

    // Native PiP API
    const canvas = document.createElement('canvas')
    canvas.width = 320
    canvas.height = 260
    canvasRef.current = canvas
    drawFrame()

    try {
      const pipWindow = await canvas.requestPictureInPicture()
      pipWindowRef.current = pipWindow
      setIsPiPActive(true)

      pipWindow.addEventListener('resize', () => {
        canvas.width = pipWindow.width
        canvas.height = pipWindow.height
      })

      const handleLeave = () => {
        canvasRef.current = null
        pipWindowRef.current = null
        setIsPiPActive(false)
        if (animRef.current) cancelAnimationFrame(animRef.current)
        canvas.remove()
      }
      pipWindow.addEventListener('leave', handleLeave, { once: true })
    } catch {
      // Native PiP failed, try popup fallback
      canvasRef.current = null
    }
  }, [drawFrame])

  const stopPiP = useCallback(() => {
    if (pipWindowRef.current) {
      try { pipWindowRef.current.close() } catch (_) {}
      pipWindowRef.current = null
    }
    if (animRef.current) cancelAnimationFrame(animRef.current)
    canvasRef.current = null
    setIsPiPActive(false)
  }, [])

  return { isPiPActive, startPiP, stopPiP }
}
