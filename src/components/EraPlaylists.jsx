import { useSongPool } from '@/hooks/useSongPool'
import { useListenlistStore } from '@/stores/useListenlistStore'
import { useSongInPlayerStore } from '@/stores/useSongInPlayerStore'
import { eraPlaylists } from '@/data/eraPlaylists'
import { PlayCircle } from 'lucide-react'

function matchSongs(playlist, allSongs) {
  const matched = []
  const poolNames = new Map()
  const poolArtists = new Map()

  for (const s of allSongs) {
    const name = (s.name || '').toLowerCase()
    // Index by name for fast lookup
    if (!poolNames.has(name)) poolNames.set(name, [])
    poolNames.get(name).push(s)
    // Also index by artist+name combo
    const artists = (s.artists || []).map(a => (a.name || '').toLowerCase())
    for (const a of artists) {
      const key = `${a}|${name}`
      if (!poolArtists.has(key)) poolArtists.set(key, [])
      poolArtists.get(key).push(s)
    }
  }

  const seen = new Set()
  for (const [artistName, titleName] of playlist.songs) {
    const artLower = artistName.toLowerCase()
    const titleLower = titleName.toLowerCase()

    // Try exact artist+title match first
    const exactKey = `${artLower}|${titleLower}`
    if (poolArtists.has(exactKey)) {
      for (const s of poolArtists.get(exactKey)) {
        if (!seen.has(s.newId)) {
          seen.add(s.newId)
          matched.push(s)
          break
        }
      }
      continue
    }

    // Try title match with partial artist match
    if (poolNames.has(titleLower)) {
      for (const s of poolNames.get(titleLower)) {
        if (seen.has(s.newId)) continue
        const songArtists = (s.artists || []).map(a => (a.name || '').toLowerCase()).join(' ')
        if (songArtists.includes(artLower) || artLower.split(' ').some(p => songArtists.includes(p))) {
          seen.add(s.newId)
          matched.push(s)
          break
        }
      }
      if (seen.has(matched[matched.length - 1]?.newId)) continue
    }

    // Fuzzy: try matching title keyword
    for (const s of allSongs) {
      if (seen.has(s.newId)) continue
      const name = (s.name || '').toLowerCase()
      const songArtists = (s.artists || []).map(a => (a.name || '').toLowerCase()).join(' ')
      if (name.includes(titleLower) || titleLower.includes(name)) {
        if (songArtists.includes(artLower) || artLower.includes(songArtists) ||
            artLower.split(' ').some(p => songArtists.includes(p))) {
          seen.add(s.newId)
          matched.push(s)
          break
        }
      }
    }
  }
  return matched
}

export default function EraPlaylists() {
  const { loading, allSongs } = useSongPool()
  const addListToListenlist = useListenlistStore((s) => s.addListToListenlist)
  const setSongInPlayer = useSongInPlayerStore((s) => s.setSongInPlayer)

  if (loading || allSongs.length === 0) return null

  const playlistsWithMatches = eraPlaylists.map((pl) => ({
    ...pl,
    matched: matchSongs(pl, allSongs),
  })).filter((pl) => pl.matched.length > 0)

  if (playlistsWithMatches.length === 0) return null

  const handlePlay = (playlist) => {
    if (playlist.matched.length > 0) {
      addListToListenlist(playlist.matched)
      setSongInPlayer(playlist.matched[0])
    }
  }

  return (
    <div className="white-card" style={{ marginTop: 12 }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '0 0 12px',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          marginBottom: 12,
        }}
      >
        <span style={{ fontSize: 18 }}>🎬</span>
        <span style={{ fontSize: 16, fontWeight: 600, color: '#f0f0f0' }}>
          时代 & 场景合集
        </span>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: 12,
        }}
      >
        {playlistsWithMatches.map((playlist) => (
          <div
            key={playlist.id}
            style={{
              background: 'rgba(255, 255, 255, 0.03)',
              borderRadius: 12,
              padding: 16,
              cursor: 'pointer',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)'
              e.currentTarget.style.borderColor = 'rgba(255, 165, 0, 0.3)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)'
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.06)'
            }}
            onClick={() => handlePlay(playlist)}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontSize: 28 }}>{playlist.icon}</span>
              <PlayCircle
                size={22}
                color="#FFA500"
                style={{ opacity: 0.8, cursor: 'pointer' }}
              />
            </div>
            <div style={{ fontSize: 14, fontWeight: 600, color: '#e0e0e0', marginBottom: 4 }}>
              {playlist.name}
            </div>
            <div style={{ fontSize: 12, color: '#8c8c8c', marginBottom: 8 }}>
              {playlist.description}
            </div>
            <div style={{
              fontSize: 11,
              color: '#FFA500',
              background: 'rgba(255, 165, 0, 0.08)',
              padding: '3px 8px',
              borderRadius: 8,
              display: 'inline-block',
            }}>
              {playlist.matched.length}/{playlist.songs.length} 首可播放
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
