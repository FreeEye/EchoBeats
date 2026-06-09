import { Button } from 'antd'
import { Play } from 'lucide-react'
import AddToListenlist from './AddToListenlist'
import playSongs from '@/stores/playSongs'

export default function OperatingBarOfSongList({ songs }) {
  const handlePlaySongList = () => {
    if (songs && songs.length > 0) {
      playSongs(songs)
    }
  }

  return (
    <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <Button
        type="primary"
        icon={<Play size={15} />}
        onClick={handlePlaySongList}
      >
        播放全部
      </Button>
      <AddToListenlist data={songs} />
    </span>
  )
}
