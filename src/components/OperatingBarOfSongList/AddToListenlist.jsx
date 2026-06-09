import { notification, Button } from 'antd'
import { Plus } from 'lucide-react'
import { useListenlistStore } from '@/stores/useListenlistStore'

notification.config({
  placement: 'bottomRight',
  bottom: 50,
  duration: 2,
})

export default function AddToListenlist({ data }) {
  const addListToListenlist = useListenlistStore((s) => s.addListToListenlist)
  const addSongToListenlist = useListenlistStore((s) => s.addSongToListenlist)

  function handleClick() {
    if (Array.isArray(data)) {
      addListToListenlist(data)
    } else {
      addSongToListenlist(data)
    }
    notification.open({
      message: '已添加到聆听列表',
    })
  }

  return (
    <Button icon={<Plus size={16} />} onClick={handleClick}>
      添加到聆听列表
    </Button>
  )
}
