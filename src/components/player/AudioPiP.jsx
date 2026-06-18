import { useRef, useState, useCallback, useEffect } from 'react'
import { X, Maximize2, ExternalLink } from 'lucide-react'
import { useSongInPlayerStore } from '@/stores/useSongInPlayerStore'
import { useListenlistStore } from '@/stores/useListenlistStore'
import { useListenlistOpenStore } from '@/stores/useListenlistOpenStore'
import { useFavoritesStore } from '@/stores/useFavoritesStore'
import { getPlayMode } from '@/stores/usePlayModeStore'
import { usePlayModeStore } from '@/stores/usePlayModeStore'
import { generateSongCover } from '@/utils/generateSongCover'
import { getSongSource, fetchLyrics } from '@/services/dataService'

// ======================== 桌面弹出窗口 ========================
function buildDesktopHTML(song, songSource, faved, playMode, playlistData, currentIndex) {
  const imgSrc = song?.cover || ''
  const bgColor = song ? generateSongCover(song.newId) : '#333'
  const name = (song?.name || '未在播放').replace(/</g, '&lt;').replace(/'/g, "\\'")
  const artist = (song?.artists?.map(a => a.name).join('/') || '').replace(/</g, '&lt;')
  const favedStr = faved ? 'true' : 'false'
  const songJSON = JSON.stringify(song).replace(/</g, '\\x3c')
  const playlistJSON = JSON.stringify(playlistData).replace(/</g, '\\x3c')
  const MODE_LABELS = { order: '顺序', loop: '列表循环', single: '单曲循环', shuffle: '随机' }
  const modeLabel = MODE_LABELS[playMode] || '顺序'

  return `<!DOCTYPE html><html><head><meta charset="utf-8"><title>${name} - EchoBeats</title><style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#121212;color:#fff;font:14px -apple-system,sans-serif;overflow:hidden;user-select:none;-webkit-app-region:drag;}
#player,#lyrics,#playlist{position:absolute;top:0;left:0;width:100%;height:100%;display:flex;flex-direction:column}
#player{padding:14px 16px 10px}
#lyrics,#playlist{display:none;padding:12px 16px;overflow-y:auto}
#lyrics.show,#playlist.show{display:flex}
#player.hide{display:none}
.top{display:flex;align-items:center;gap:12px;margin-bottom:8px}
.cover{width:56px;height:56px;border-radius:10px;flex-shrink:0;${imgSrc?`background:url(${imgSrc}) center/cover;`:`background:${bgColor};`}}
.info{flex:1;min-width:0}
.name{font-size:15px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.artist{font-size:12px;color:#8c8c8c;margin-top:2px}
.time-row{display:flex;align-items:center;gap:10px;margin:6px 0 10px}
.time{font-size:11px;color:#8c8c8c;min-width:35px}
.progress-wrap{flex:1;height:20px;display:flex;align-items:center;cursor:pointer;-webkit-app-region:no-drag}
.progress-wrap input[type=range]{width:100%;accent-color:#FFA500;height:4px;cursor:pointer}
.controls{display:flex;align-items:center;justify-content:center;gap:8px;margin-bottom:10px}
.controls button{-webkit-app-region:no-drag;width:36px;height:36px;border-radius:50%;border:none;cursor:pointer;
  display:flex;align-items:center;justify-content:center;transition:all 0.15s;font-size:16px}
.btn-main{background:#FFA500;color:#fff;width:44px!important;height:44px!important;font-size:20px!important}
.btn-icon{background:rgba(255,255,255,0.06);color:#bfbfbf}
.btn-icon:hover{background:rgba(255,255,255,0.12);color:#fff}
.btn-on{background:rgba(255,165,0,0.15);color:#FFA500}
.actions{display:flex;justify-content:center;gap:6px;flex-wrap:wrap}
.actions button{-webkit-app-region:no-drag;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.08);
  border-radius:16px;color:#bfbfbf;cursor:pointer;padding:5px 12px;font-size:11px;transition:all 0.15s;display:flex;align-items:center;gap:4px}
.actions button:hover{color:#fff;background:rgba(255,255,255,0.1)}
.actions button.active{color:#FFA500;background:rgba(255,165,0,0.1);border-color:rgba(255,165,0,0.3)}
.hint{font-size:10px;color:rgba(255,255,255,0.12);text-align:center;margin-top:auto;padding-top:6px}
/* Lyrics */
.lyric-line{font-size:14px;line-height:2.2;color:rgba(255,255,255,0.4);text-align:center;transition:color 0.3s}
.lyric-line.active{color:#FFA500;font-size:16px;font-weight:600}
#lyrics-header,#playlist-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;flex-shrink:0}
#lyrics-header span,#playlist-header span{font-size:12px;color:#8c8c8c}
#lyrics-header button,#playlist-header button{-webkit-app-region:no-drag;background:rgba(255,255,255,0.06);border:none;color:#8c8c8c;cursor:pointer;
  padding:4px 10px;border-radius:14px;font-size:11px}
#lyrics-header button:hover,#playlist-header button:hover{color:#fff}
#lyrics-body,#playlist-body{flex:1;overflow-y:auto}
/* Playlist */
.playlist-item{display:flex;align-items:center;gap:8px;padding:8px 10px;border-radius:8px;cursor:pointer;font-size:13px;color:#bfbfbf;-webkit-app-region:no-drag}
.playlist-item:hover{background:rgba(255,255,255,0.06)}
.playlist-item.active{color:#FFA500;background:rgba(255,165,0,0.08)}
.playlist-item .idx{width:24px;text-align:center;font-size:11px;color:rgba(255,255,255,0.3);flex-shrink:0}
.playlist-item.active .idx{color:#FFA500}
.playlist-item .song-info{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
</style></head><body>
<div id="player">
  <div class="top">
    <div class="cover"></div>
    <div class="info">
      <div class="name">${name}</div>
      <div class="artist">${artist}</div>
    </div>
    <button class="btn-icon" onclick="closeWin()" style="width:28px;height:28px;-webkit-app-region:no-drag">✕</button>
  </div>
  <div class="time-row">
    <span class="time" id="cur">0:00</span>
    <div class="progress-wrap"><input type="range" id="prog" min="0" max="100" value="0"></div>
    <span class="time" id="dur" style="text-align:right">0:00</span>
  </div>
  <div class="controls">
    <button class="btn-icon" onclick="prev()">⏮</button>
    <button class="btn-main" id="playBtn" onclick="toggle()">▶</button>
    <button class="btn-icon" onclick="next()">⏭</button>
  </div>
  <div class="actions">
    <button id="likeBtn" class="${favedStr==='true'?'active':''}" onclick="like()">❤ 喜欢</button>
    <button id="downloadBtn" onclick="download()">⏬ 下载</button>
    <button id="modeBtn" onclick="cycleMode()">🔁 ${modeLabel}</button>
    <button id="playlistBtn" onclick="showPlaylist()">📋 歌单(${playlistData.length})</button>
    <button id="lyricBtn" onclick="showLyrics()">🎤 歌词</button>
  </div>
  <div class="hint">EchoBeats 桌面播放 · 双击关闭</div>
</div>
<div id="lyrics">
  <div id="lyrics-header">
    <span>🎤 歌词</span>
    <button onclick="hideLyrics()">✕ 关闭歌词</button>
  </div>
  <div id="lyrics-body"><div class="lyric-line">加载中...</div></div>
</div>
<div id="playlist">
  <div id="playlist-header">
    <span>📋 歌单</span>
    <button onclick="hidePlaylist()">✕ 关闭歌单</button>
  </div>
  <div id="playlist-body"></div>
</div>
<audio id="audio" src="${songSource||''}" autoplay></audio>
<script>
var song = ${songJSON};
var isFav = ${favedStr};
var playMode = '${playMode}';
var playlist = ${playlistJSON};
var currentIdx = ${currentIndex};
var MODES = ['order', 'loop', 'single', 'shuffle'];
var MODE_LABELS = { order: '顺序', loop: '列表循环', single: '单曲循环', shuffle: '随机' };

var audio = document.getElementById('audio');
var prog = document.getElementById('prog');
var playBtn = document.getElementById('playBtn');
var likeBtn = document.getElementById('likeBtn');
var modeBtn = document.getElementById('modeBtn');
var lyricBtn = document.getElementById('lyricBtn');
var playlistBtn = document.getElementById('playlistBtn');
var lyricsPane = document.getElementById('lyrics');
var playlistPane = document.getElementById('playlist');
var playerPane = document.getElementById('player');
var lyricsBody = document.getElementById('lyrics-body');
var playlistBody = document.getElementById('playlist-body');
var lyricsLines = [];
var currentLyricIdx = -1;
var showLyricsMode = false;
var showPlaylistMode = false;

function fmt(s){var m=Math.floor(s/60),sec=String(Math.floor(s%60)).padStart(2,'0');return m+':'+sec}

audio.ontimeupdate = function(){
  prog.value = audio.duration?(audio.currentTime/audio.duration)*100:0;
  document.getElementById('cur').textContent = fmt(audio.currentTime);
  document.getElementById('dur').textContent = fmt(audio.duration||0);
  updateLyricHighlight();
};
audio.onplay = function(){ playBtn.textContent = '⏸'; };
audio.onpause = function(){ playBtn.textContent = '▶'; };
audio.onended = function(){ next(); };
audio.onerror = function(){ next(); };
prog.oninput = function(){ audio.currentTime = (prog.value/100)*(audio.duration||0); };

function toggle(){ audio.paused ? audio.play() : audio.pause(); }
function closeWin(){ window.close(); }

function prev(){
  window.opener.postMessage({type:'prev'},'*');
}
function next(){
  window.opener.postMessage({type:'next'},'*');
}
function like(){
  isFav = !isFav;
  likeBtn.className = isFav ? 'active' : '';
  likeBtn.textContent = isFav ? '❤ 已喜欢' : '❤ 喜欢';
  window.opener.postMessage({type:'toggleLike',newId:song.newId},'*');
}
function download(){
  if(!audio.src || audio.src===window.location.href){
    var toast = document.createElement('div');
    toast.textContent = '暂无播放源';
    toast.style.cssText = 'position:fixed;bottom:40px;left:50%;transform:translateX(-50%);background:rgba(255,100,0,0.9);color:#fff;padding:6px 18px;border-radius:20px;font-size:12px;z-index:999;pointer-events:none;transition:opacity 0.3s';
    document.body.appendChild(toast);
    setTimeout(function(){ toast.style.opacity = '0'; setTimeout(function(){ document.body.removeChild(toast); },300); },1500);
    return;
  }
  var a = document.createElement('a');
  a.href = audio.src;
  a.download = (song.name || 'song') + '.mp3';
  a.target = '_blank';
  a.rel = 'noopener noreferrer';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
function cycleMode(){
  var idx = MODES.indexOf(playMode);
  playMode = MODES[(idx + 1) % MODES.length];
  modeBtn.textContent = '🔁 ' + MODE_LABELS[playMode];
  window.opener.postMessage({type:'setPlayMode', playMode: playMode}, '*');
}
function renderPlaylist(){
  playlistBody.innerHTML = playlist.map(function(s, i){
    var cls = i === currentIdx ? 'playlist-item active' : 'playlist-item';
    return '<div class="'+cls+'" onclick="playAt('+i+')"><span class="idx">'+(i+1)+'</span><span class="song-info">'+(s.name||'')+' - '+(s.artist||'')+'</span></div>';
  }).join('');
  // Auto-scroll to current song
  setTimeout(function(){
    var active = playlistBody.querySelector('.playlist-item.active');
    if(active) active.scrollIntoView({block:'center',behavior:'smooth'});
  }, 100);
}
function showPlaylist(){
  renderPlaylist();
  if(showLyricsMode){
    lyricsPane.className = '';
    showLyricsMode = false;
    lyricBtn.textContent = '🎤 歌词';
    lyricBtn.className = '';
  }
  showPlaylistMode = true;
  playerPane.className = 'hide';
  playlistPane.className = 'show';
  playlistBtn.className = 'active';
  window.resizeTo(360,420);
}
function hidePlaylist(){
  showPlaylistMode = false;
  playerPane.className = '';
  playlistPane.className = '';
  playlistBtn.className = '';
  window.resizeTo(360,240);
}
function playAt(idx){
  window.opener.postMessage({type:'playAtIndex', index: idx}, '*');
}
function showLyrics(){
  if(showPlaylistMode){
    playlistPane.className = '';
    showPlaylistMode = false;
    playlistBtn.className = '';
  }
  if(!lyricsLines.length){
    fetch('https://lrclib.net/api/search?q='+encodeURIComponent((song.artists||[{name:''}])[0].name+' '+song.name))
      .then(r=>r.json()).then(data=>{
        if(data&&data[0]&&data[0].syncedLyrics){
          parseLRC(data[0].syncedLyrics);
        }else if(data&&data[0]&&data[0].plainLyrics){
          lyricsLines = data[0].plainLyrics.split('\\n').filter(function(l){return l.trim()&&!/^\\[.*\\]$/.test(l.trim())}).map(function(t){return{text:t,time:0}});
          renderLyrics();
        }}).catch(function(){lyricsBody.innerHTML='<div class="lyric-line">暂无歌词</div>'});
  }
  showLyricsMode = true;
  playerPane.className = 'hide';
  lyricsPane.className = 'show';
  lyricBtn.textContent = '🎤 歌词(开)';
  lyricBtn.className = 'active';
  window.resizeTo(360,420);
}
function hideLyrics(){
  showLyricsMode = false;
  playerPane.className = '';
  lyricsPane.className = '';
  lyricBtn.textContent = '🎤 歌词';
  lyricBtn.className = '';
  window.resizeTo(360,240);
}
function parseLRC(lrc){
  var lines = lrc.split('\\n'), result=[];
  var re = /\\[(\\d{2}):(\\d{2})\\.(\\d{2,3})\\]/;
  lines.forEach(function(l){
    var m = l.match(re);
    if(m){
      var t = parseInt(m[1])*60+parseInt(m[2])+parseInt(m[3])/(m[3].length===2?100:1000);
      var text = l.replace(re,'').trim();
      if(text) result.push({time:t,text:text});
    }
  });
  lyricsLines = result.sort(function(a,b){return a.time-b.time});
  renderLyrics();
}
function renderLyrics(){
  lyricsBody.innerHTML = lyricsLines.map(function(l,i){return '<div class="lyric-line" data-idx="'+i+'">'+l.text+'</div>'}).join('');
}
function updateLyricHighlight(){
  if(!showLyricsMode||!lyricsLines.length) return;
  var t = audio.currentTime, idx=-1;
  for(var i=lyricsLines.length-1;i>=0;i--){if(t>=lyricsLines[i].time){idx=i;break}}
  if(idx!==currentLyricIdx){
    var prev = lyricsBody.querySelector('.active');
    if(prev) prev.className = 'lyric-line';
    var cur = lyricsBody.querySelector('[data-idx="'+idx+'"]');
    if(cur){ cur.className = 'lyric-line active'; cur.scrollIntoView({block:'center',behavior:'smooth'}); }
    currentLyricIdx = idx;
  }
}

// Listen for messages from parent
window.addEventListener('message',function(e){
  if(!e.data||!e.data.type) return;
  if(e.data.type === 'updateSong' && e.data.song){
    song = e.data.song;
    if(e.data.source){ audio.src = e.data.source; audio.play(); }
    document.querySelector('.name').textContent = song.name;
    document.querySelector('.artist').textContent = (song.artists||[]).map(function(a){return a.name}).join('/');
    document.title = song.name + ' - EchoBeats';
    if(song.cover) document.querySelector('.cover').style.backgroundImage = 'url('+song.cover+')';
    lyricsLines = [];
    if(showLyricsMode) showLyrics();
    if(e.data.playMode !== undefined){
      playMode = e.data.playMode;
      modeBtn.textContent = '🔁 ' + MODE_LABELS[playMode];
    }
    if(e.data.currentIndex !== undefined){
      currentIdx = e.data.currentIndex;
    }
  }
  if(e.data.type === 'updateFav'){ isFav = e.data.faved; likeBtn.className = isFav?'active':''; likeBtn.textContent = isFav?'❤ 已喜欢':'❤ 喜欢'; }
  if(e.data.type === 'updatePlayMode'){
    playMode = e.data.playMode;
    modeBtn.textContent = '🔁 ' + MODE_LABELS[playMode];
  }
  if(e.data.type === 'updatePlaylist'){
    playlist = e.data.playlist;
    currentIdx = e.data.currentIndex;
    playlistBtn.textContent = '📋 歌单('+playlist.length+')';
    if(showPlaylistMode) renderPlaylist();
  }
  if(e.data.type === 'toast' && e.data.msg){
    var toast = document.createElement('div');
    toast.textContent = e.data.msg;
    toast.style.cssText = 'position:fixed;bottom:40px;left:50%;transform:translateX(-50%);background:rgba(255,165,0,0.9);color:#fff;padding:6px 18px;border-radius:20px;font-size:12px;z-index:999;pointer-events:none;transition:opacity 0.3s';
    document.body.appendChild(toast);
    setTimeout(function(){ toast.style.opacity = '0'; setTimeout(function(){ document.body.removeChild(toast); },300); },1500);
  }
});

window.onbeforeunload = function(){ window.opener.postMessage({type:'desktopClosed'},'*'); };
window.ondblclick = function(){ closeWin(); };
</script></body></html>`
}

// ======================== 内页迷你悬浮条 ========================
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
          color: '#FFA500', cursor: 'pointer', padding: '4px 8px', display: 'flex', alignItems: 'center',
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

// ======================== MiniPlayer 容器 ========================
export function MiniPlayer({ onRestore, onClose, onDesktopOpen }) {
  const songInPlayer = useSongInPlayerStore((s) => s.songInPlayer)
  const setSongInPlayer = useSongInPlayerStore((s) => s.setSongInPlayer)
  const listenlist = useListenlistStore((s) => s.listenlist)
  const favorites = useFavoritesStore((s) => s.favorites)
  const toggleFavorite = useFavoritesStore((s) => s.toggleFavorite)
  const playMode = usePlayModeStore((s) => s.playMode)
  const setPlayMode = usePlayModeStore((s) => s.setPlayMode)
  const desktopRef = useRef(null)
  const songSourceRef = useRef(null)
  const playModeRef = useRef(playMode)
  playModeRef.current = playMode

  const filteredListenlist = listenlist.filter((item) => item !== null)

  // Build simplified playlist data for the popup
  const getPlaylistData = useCallback(() => {
    return filteredListenlist.map(s => ({
      newId: s.newId,
      name: s.name,
      artist: s.artists?.map(a => a.name).join('/') || '',
    }))
  }, [filteredListenlist])

  // Build desktop popup with current song data
  const openDesktop = useCallback(async () => {
    if (!songInPlayer) return
    // Already open? Focus it
    if (desktopRef.current) {
      if ('documentPictureInPicture' in window && desktopRef.current instanceof Window && !desktopRef.current.closed) {
        try { desktopRef.current.focus() } catch (_) {}
        return
      }
      if (!('documentPictureInPicture' in window) && !desktopRef.current.closed) {
        desktopRef.current.focus()
        return
      }
    }
    // Pause main player when desktop player opens
    onDesktopOpen?.()

    // Get audio source
    let source = songSourceRef.current
    if (!source) {
      try { source = await getSongSource(songInPlayer.newId) } catch (_) {}
    }
    songSourceRef.current = source
    const faved = favorites.some(f => f.newId === songInPlayer.newId)
    const playlistData = getPlaylistData()
    const currentIndex = filteredListenlist.findIndex(s => s.newId === songInPlayer?.newId)
    const html = buildDesktopHTML(songInPlayer, source, faved, playModeRef.current, playlistData, currentIndex)
    const blob = new Blob([html], { type: 'text/html' })
    const url = URL.createObjectURL(blob)

    // 优先使用 Document Picture-in-Picture API（Chrome 116+）
    if ('documentPictureInPicture' in window) {
      try {
        const pipWindow = await window.documentPictureInPicture.requestWindow({
          width: 360,
          height: 280,
        })
        // 将 PiP 窗口导航到 blob URL
        pipWindow.document.write(html)
        pipWindow.document.close()
        desktopRef.current = pipWindow

        // 监听 PiP 窗口关闭
        pipWindow.addEventListener('pagehide', () => {
          desktopRef.current = null
          URL.revokeObjectURL(url)
        })
        return
      } catch (_) {
        // Document PiP 失败，降级到 window.open
      }
    }

    // Fallback: 传统弹出窗口
    const pip = window.open(url, 'EchoBeats_Desktop',
      `width=360,height=280,left=${window.screen.width-400},top=${window.screen.height-320},resizable=yes,alwaysOnTop=yes,titlebar=no,location=no,toolbar=no,menubar=no,scrollbars=no`)
    if (!pip) { URL.revokeObjectURL(url); return }
    setTimeout(() => URL.revokeObjectURL(url), 3000)
    desktopRef.current = pip
  }, [songInPlayer, favorites, filteredListenlist, getPlaylistData, onDesktopOpen])

  // Send playlist data to popup
  const sendPlaylistToDesktop = useCallback(() => {
    if (!desktopRef.current || desktopRef.current.closed) return
    const playlistData = getPlaylistData()
    const currentIndex = filteredListenlist.findIndex(s => s.newId === songInPlayer?.newId)
    try {
      desktopRef.current.postMessage({
        type: 'updatePlaylist',
        playlist: playlistData,
        currentIndex,
      }, '*')
    } catch (_) {}
  }, [songInPlayer, filteredListenlist, getPlaylistData])

  // Handle messages from desktop popup
  useEffect(() => {
    const handler = async (e) => {
      if (!e.data || !e.data.type) return
      const src = e.source
      switch (e.data.type) {
        case 'prev': {
          const filtered = listenlist.filter(s => s)
          const mode = getPlayMode()
          const idx = filtered.findIndex(s => s.newId === songInPlayer?.newId)
          if (idx < 0) break
          let target
          if (mode === 'order' || mode === 'loop') {
            if (idx > 0) {
              target = filtered[idx - 1]
            } else if (mode === 'loop') {
              target = filtered[filtered.length - 1]
            }
          } else if (mode === 'shuffle') {
            if (filtered.length > 1) {
              let randomIndex
              do {
                randomIndex = Math.floor(Math.random() * filtered.length)
              } while (randomIndex === idx)
              target = filtered[randomIndex]
            }
          }
          // single mode: prev does nothing
          if (target) {
            setSongInPlayer(target)
            let srcUrl
            try { srcUrl = await getSongSource(target.newId) } catch (_) {}
            const faved = favorites.some(f => f.newId === target.newId)
            const newIdx = filtered.findIndex(s => s.newId === target.newId)
            src.postMessage({ type: 'updateSong', song: target, source: srcUrl, playMode: getPlayMode(), currentIndex: newIdx }, '*')
            try { src.postMessage({ type: 'updateFav', faved }, '*') } catch (_) {}
          }
          break
        }
        case 'next': {
          const filtered = listenlist.filter(s => s)
          const mode = getPlayMode()
          const idx = filtered.findIndex(s => s.newId === songInPlayer?.newId)
          if (idx < 0) break
          let target
          if (mode === 'order') {
            if (idx + 1 < filtered.length) {
              target = filtered[idx + 1]
            }
          } else if (mode === 'loop') {
            if (idx + 1 < filtered.length) {
              target = filtered[idx + 1]
            } else {
              target = filtered[0]
            }
          } else if (mode === 'shuffle') {
            if (filtered.length > 1) {
              let randomIndex
              do {
                randomIndex = Math.floor(Math.random() * filtered.length)
              } while (randomIndex === idx)
              target = filtered[randomIndex]
            }
          } else if (mode === 'single') {
            target = filtered[idx]
          }
          if (target) {
            setSongInPlayer(target)
            let srcUrl
            try { srcUrl = await getSongSource(target.newId) } catch (_) {}
            const faved = favorites.some(f => f.newId === target.newId)
            const newIdx = filtered.findIndex(s => s.newId === target.newId)
            src.postMessage({ type: 'updateSong', song: target, source: srcUrl, playMode: getPlayMode(), currentIndex: newIdx }, '*')
            try { src.postMessage({ type: 'updateFav', faved }, '*') } catch (_) {}
          }
          break
        }
        case 'getSong': {
          if (songInPlayer) {
            let srcUrl
            try { srcUrl = await getSongSource(songInPlayer.newId) } catch (_) {}
            const idx = listenlist.filter(s => s).findIndex(s => s.newId === songInPlayer?.newId)
            src.postMessage({ type: 'updateSong', song: songInPlayer, source: srcUrl, playMode: getPlayMode(), currentIndex: idx }, '*')
          }
          break
        }
        case 'toggleLike': {
          const s = listenlist.find(s => s?.newId === e.data.newId) || songInPlayer
          if (s) {
            const added = toggleFavorite(s)
            src.postMessage({ type: 'updateFav', faved: added }, '*')
          }
          break
        }
        case 'setPlayMode': {
          setPlayMode(e.data.playMode)
          // Send confirmation back
          try { src.postMessage({ type: 'updatePlayMode', playMode: e.data.playMode }, '*') } catch (_) {}
          break
        }
        case 'showPlaylist': {
          // Now handled inside the popup - but also open the main page playlist
          useListenlistOpenStore.getState().setIsListenlistOpen(true)
          break
        }
        case 'playAtIndex': {
          const filtered = listenlist.filter(s => s)
          const targetIdx = e.data.index
          if (targetIdx >= 0 && targetIdx < filtered.length) {
            const target = filtered[targetIdx]
            setSongInPlayer(target)
            let srcUrl
            try { srcUrl = await getSongSource(target.newId) } catch (_) {}
            const faved = favorites.some(f => f.newId === target.newId)
            src.postMessage({ type: 'updateSong', song: target, source: srcUrl, playMode: getPlayMode(), currentIndex: targetIdx }, '*')
            try { src.postMessage({ type: 'updateFav', faved }, '*') } catch (_) {}
          }
          break
        }
        case 'desktopClosed': {
          desktopRef.current = null
          break
        }
      }
    }
    window.addEventListener('message', handler)
    return () => window.removeEventListener('message', handler)
  }, [songInPlayer, listenlist, favorites, setSongInPlayer, toggleFavorite, setPlayMode])

  // Sync song changes to desktop
  useEffect(() => {
    if (!desktopRef.current || desktopRef.current.closed) return
    getSongSource(songInPlayer?.newId).then(source => {
      if (desktopRef.current && !desktopRef.current.closed) {
        const filtered = listenlist.filter(s => s)
        const idx = filtered.findIndex(s => s.newId === songInPlayer?.newId)
        desktopRef.current.postMessage({ type: 'updateSong', song: songInPlayer, source, playMode: getPlayMode(), currentIndex: idx }, '*')
        desktopRef.current.postMessage({ type: 'updateFav', faved: favorites.some(f => f.newId === songInPlayer?.newId) }, '*')
      }
    }).catch(() => {})
  }, [songInPlayer?.newId])

  // Sync playlist changes to desktop
  useEffect(() => {
    sendPlaylistToDesktop()
  }, [listenlist, sendPlaylistToDesktop])

  // Sync playMode changes to desktop
  useEffect(() => {
    if (!desktopRef.current || desktopRef.current.closed) return
    try {
      desktopRef.current.postMessage({ type: 'updatePlayMode', playMode }, '*')
    } catch (_) {}
  }, [playMode])

  // Cleanup
  useEffect(() => {
    return () => {
      if (desktopRef.current && !desktopRef.current.closed) {
        desktopRef.current.close()
      }
    }
  }, [])

  const handlePopout = () => openDesktop()

  return (
    <div style={{
      position: 'fixed', bottom: 74, right: 20, zIndex: 1100,
      animation: 'slideUp 0.3s ease-out',
    }}>
      <MiniPlayerInner onRestore={onRestore} onClose={onClose} onPopout={handlePopout} />
      <style>{`@keyframes slideUp{from{transform:translateY(20px);opacity:0}to{transform:translateY(0);opacity:1}}`}</style>
    </div>
  )
}

// ======================== Hook ========================
export function useAudioPiP() {
  const [isMini, setIsMini] = useState(false)
  const toggleMini = useCallback(() => setIsMini(m => !m), [])
  return { isMini, toggleMini }
}
