import SongItemWithCover from '@/components/song-item/SongItemWithCover'

function SongList({ songs, ranking = false }) {
  return (
    <ol>
      {songs.map((song, idx) => (
        <div key={song.newId} style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
          {ranking && (
            <span
              style={{
                minWidth: 32,
                textAlign: 'center',
                fontSize: 14,
                fontWeight: idx < 3 ? 700 : 400,
                color: idx === 0 ? '#FFD700' : idx === 1 ? '#C0C0C0' : idx === 2 ? '#CD7F32' : '#8c8c8c',
              }}
            >
              {idx + 1}
            </span>
          )}
          <div style={{ flex: 1, minWidth: 0 }}>
            <SongItemWithCover song={song} />
          </div>
        </div>
      ))}
    </ol>
  )
}

export default SongList
