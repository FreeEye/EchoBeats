import { Button } from 'antd'
import { Play } from 'lucide-react'
import AddToListenlist from './AddToListenlist'
import { usePlayIndex, useListenlist } from '../../contexts/MusicContext'

export default function OperatingBarOfSongList({ songs }) {
  const { updatePlayIndex } = usePlayIndex()
  const { setNewListenlist } = useListenlist()

  const handlePlaySongList = () => {
    setNewListenlist(songs)
    updatePlayIndex(0)
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
