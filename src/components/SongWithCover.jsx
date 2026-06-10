import LinkSearchArtist from './LinkSearchArtist'
import { generateSongCover } from '@/utils/generateSongCover'
import { useLyricsStore } from '@/stores/useLyricsStore'

function SongWithCover({ song }) {
  const openLyrics = useLyricsStore((s) => s.open)

  const backgroundStyle = song.cover
    ? {
        backgroundImage: `url(${song.cover})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }
    : { backgroundColor: generateSongCover(song.newId) }

  const handleOpenLyrics = () => {
    if (song?.newId) openLyrics(song)
  }

  return (
    <div className="flex items-center gap-2.5 min-w-0">
      <div
        className="w-[42px] h-[42px] rounded-lg flex-shrink-0"
        style={{
          ...backgroundStyle,
          boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
          cursor: 'pointer',
        }}
        onClick={handleOpenLyrics}
        title="查看歌词"
      />
      <div className="flex-1 min-w-0">
        <div
          className="truncate"
          style={{ fontSize: 14, fontWeight: 500, lineHeight: 1.3, cursor: 'pointer' }}
          onClick={handleOpenLyrics}
          title="查看歌词"
        >
          {song.name}
          {song.alias && (
            <span
              style={{
                fontSize: 12,
                fontStyle: 'italic',
                marginLeft: 6,
                color: '#8c8c8c',
              }}
            >
              {song.alias}
            </span>
          )}
        </div>
        <div
          className="flex gap-1.5 items-center"
          style={{ fontSize: 12, lineHeight: 1.3, marginTop: 1 }}
        >
          {song.artists?.map((artist, idx) => (
            <span key={artist.id || idx}>
              <LinkSearchArtist artistName={artist.name} />
              {idx < song.artists.length - 1 && (
                <span style={{ color: '#595959', margin: '0 2px' }}>,</span>
              )}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SongWithCover
