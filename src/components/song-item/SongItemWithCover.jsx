import { useSongInPlayerStore } from '@/stores/useSongInPlayerStore'
import IconLikeSong from '../IconLikeSong'
import SongWithCover from '../SongWithCover'
import AddToPlaylist from './AddToPlaylist'
import BasicIconsInSongItem from './BasicIconsInSongItem'
import './song_item.css'

function SongItemWithCover({ song, highlight }) {
  const setSongInPlayer = useSongInPlayerStore((s) => s.setSongInPlayer)
  const newIdOfCurrentSong = useSongInPlayerStore((s) => s.songInPlayer?.newId)

  function onPlayBtnClick() {
    setSongInPlayer(song)
  }

  const isCurrentSong = newIdOfCurrentSong === song.newId

  return (
    <li
      className={`song-item ${isCurrentSong ? 'bg-[#595959]' : 'hover:bg-[#434343]'}`}
      onDoubleClick={() => {
        if (isCurrentSong) return
        onPlayBtnClick()
      }}
    >
      <div className="flex w-full items-center gap-2.5">
        <div className="w-[400px]">
          <SongWithCover song={song} highlight={highlight} />
        </div>
        <div className="hover-to-show flex items-center gap-1 flex-shrink-0">
          <BasicIconsInSongItem song={song} />
          <IconLikeSong song={song} />
          <AddToPlaylist song={song} />
        </div>
      </div>
    </li>
  )
}

export default SongItemWithCover
