import { useRef, useState, useCallback, useEffect } from 'react'
import { X, Maximize2, ExternalLink } from 'lucide-react'
import { useSongInPlayerStore } from '@/stores/useSongInPlayerStore'
import { generateSongCover } from '@/utils/generateSongCover'

// 弹出桌面独立窗口（可脱离浏览器拖动）
function openDesktopPlayer(songInPlayer) {
  const imgSrc = songInPlayer?.cover || ''
  const bgColor = songInPlayer ? generateSongCover(songInPlayer.newId) : '#333'
  const name = (songInPlayer?.name || '未在播放').replace(/</g, '&lt;').replace(/'/g, "\\'")
  const artist = (songInPlayer?.artists?.map(a => a.name).join('/') || '').replace(/</g, '&lt;')

  const w = 360, h = 150
  const pip = window.open('', 'EchoBeats_Desktop',
    `width=${w},height=${h},left=${window.screen.width - w - 40},top=${window.screen.height - h - 120},resizable=yes,alwaysOnTop=yes`)

  if (!pip) return null

  pip.document.write(`
    <!DOCTYPE html>
    <html><head><meta charset="utf-8"><title>EchoBeats - ${name}</title>
    <style>
      *{margin:0;padding:0;box-sizing:border-box}
      body{
        background:#181818;color:#f0f0f0;font-family:-apple-system,sans-serif;
        display:flex;align-items:center;justify-content:center;height:100vh;
        overflow:hidden;cursor:default;-webkit-app-region:drag;
      }
      .player{
        display:flex;align-items:center;gap:12px;padding:14px 18px;
        background:rgba(0,0,0,0.5);border-radius:12px;border:1px solid rgba(255,165,0,0.25);
        width:100%;max-width:340px;
      }
      .cover{width:60px;height:60px;border-radius:10px;flex-shrink:0;
        ${imgSrc ? `background:url(${imgSrc}) center/cover;` : `background:${bgColor};`}}
      .info{flex:1;min-width:0}
      .name{font-size:15px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
      .artist{font-size:12px;color:#8c8c8c;margin-top:3px}
      .time{font-size:12px;color:#8c8c8c;margin-top:6px;font-variant-numeric:tabular-nums}
      .hint{font-size:11px;color:rgba(255,255,255,0.15);text-align:center;margin-top:10px;-webkit-app-region:no-drag}
      button{
        -webkit-app-region:no-drag;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.1);
        border-radius:6px;color:#8c8c8c;cursor:pointer;padding:5px 10px;font-size:12px;
        transition:all 0.15s;
      }
      button:hover{color:#fff;background:rgba(255,255,255,0.15);border-color:rgba(255,165,0,0.3)}
      button.play-btn{background:rgba(255,165,0,0.15);border-color:rgba(255,165,0,0.3);color:#FFA500}
      button.play-btn:hover{background:rgba(255,165,0,0.25)}
    </style></head>
    <body>
      <div class="player">
        <div class="cover"></div>
        <div class="info">
          <div class="name">${name}</div>
          <div class="artist">${artist}</div>
          <div class="time" id="time">--:-- / --:--</div>
        </div>
      </div>
      <div class="hint">拖动标题栏移动 · 双击关闭</div>
      <script>
        let closed = false;
        function fmt(s) { const m = Math.floor(s/60), sec = String(Math.floor(s%60)).padStart(2,'0'); return m+':'+sec; }
        setInterval(() => {
          try {
            const audios = window.opener.document.querySelectorAll('audio');
            if (!audios.length) return;
            const a = audios[0];
            const cur = a.currentTime || 0, dur = a.duration || 0;
            document.getElementById('time').textContent = fmt(cur) + ' / ' + fmt(dur);
            document.title = (a.paused ? '⏸ ' : '▶ ') + '${name}';
          } catch(e) {}
        }, 500);
        window.onbeforeunload = () => { closed = true; };
        window.ondblclick = () => { window.close(); };
      </script>
    </body></html>`)

  return pip
}

// 内页迷你悬浮播放条
function MiniPlayerInner({ onRestore, onClose, onPopout }) {
  const songInPlayer = useSongInPlayerStore((s) => s.songInPlayer)
  if (!songInPlayer) return null
  const coverStyle = songInPlayer.cover
    ? { backgroundImage: `url(${songInPlayer.cover})`, backgroundSize: 'cover', backgroundPosition: 'center' }
    : { backgroundColor: generateSongCover(songInPlayer.newId) }
  return (
    <div style={{
      background: 'rgba(18, 18, 18, 0.95)', backdropFilter: 'blur(16px)',
      borderRadius: 10, border: '1px solid rgba(255,165,0,0.3)',
      padding: '8px 14px', display: 'flex', alignItems: 'center', gap: 10,
      boxShadow: '0 4px 20px rgba(0,0,0,0.5)', maxWidth: 380, width: '100%',
      userSelect: 'none',
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
      <div style={{ display: 'flex', gap: 4, flexShrink: 0 }}>
        <button onClick={onPopout} title="弹到桌面独立窗口" style={{
          background: 'rgba(255,165,0,0.1)', border: '1px solid rgba(255,165,0,0.2)', borderRadius: 6,
          color: '#FFA500', cursor: 'pointer', padding: 4, display: 'flex', alignItems: 'center',
          fontWeight: 600, fontSize: 11, gap: 3,
        }}>
          <ExternalLink size={13} /> 桌面
        </button>
        <button onClick={onRestore} title="恢复播放器" style={{
          background: 'none', border: 'none', color: '#FFA500', cursor: 'pointer', padding: 4,
          display: 'flex', alignItems: 'center',
        }}><Maximize2 size={15} /></button>
        <button onClick={onClose} title="关闭" style={{
          background: 'none', border: 'none', color: '#8c8c8c', cursor: 'pointer', padding: 4,
          display: 'flex', alignItems: 'center',
        }}><X size={15} /></button>
      </div>
    </div>
  )
}

export function MiniPlayer({ onRestore, onClose }) {
  const songInPlayer = useSongInPlayerStore((s) => s.songInPlayer)
  const desktopRef = useRef(null)

  const handlePopout = useCallback(() => {
    if (desktopRef.current && !desktopRef.current.closed) {
      desktopRef.current.focus()
      return
    }
    desktopRef.current = openDesktopPlayer(songInPlayer)
  }, [songInPlayer])

  // 切歌时更新桌面窗口
  useEffect(() => {
    if (desktopRef.current && !desktopRef.current.closed) {
      desktopRef.current.close()
      desktopRef.current = openDesktopPlayer(songInPlayer)
    }
  }, [songInPlayer?.newId])

  // 卸载时关闭桌面窗口
  useEffect(() => {
    return () => {
      if (desktopRef.current && !desktopRef.current.closed) {
        desktopRef.current.close()
      }
    }
  }, [])

  return (
    <div style={{
      position: 'fixed', bottom: 74, right: 20, zIndex: 1100,
      animation: 'slideUp 0.3s ease-out',
    }}>
      <MiniPlayerInner onRestore={onRestore} onClose={onClose} onPopout={handlePopout} />
      <style>{`
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  )
}

export function useAudioPiP() {
  const [isMini, setIsMini] = useState(false)
  const toggleMini = useCallback(() => setIsMini(m => !m), [])
  return { isMini, toggleMini }
}
