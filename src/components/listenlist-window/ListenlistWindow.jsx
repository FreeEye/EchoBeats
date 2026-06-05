import { useRef, lazy, Suspense, useCallback } from 'react'
import { Button } from 'antd'
import { X } from 'lucide-react'
import Loading from '@/components/ui/loading'
import { useListenlistStore } from '@/stores/useListenlistStore'
import { useListenlistOpenStore } from '@/stores/useListenlistOpenStore'
import { useSongInPlayerStore } from '@/stores/useSongInPlayerStore'
const Listenlist = lazy(() => import('./Listenlist'))

function ListenlistWindow() {
  const listenlist = useListenlistStore((s) => s.listenlist)
  const clearListenlist = useListenlistStore((s) => s.clearListenlist)
  const newIdOfCurrentSong = useSongInPlayerStore((s) => s.songInPlayer?.newId)
  const setIsListenlistOpen = useListenlistOpenStore((s) => s.setIsListenlistOpen)
  const listWindowRef = useRef()

  const locateCurrentSong = useCallback(() => {
    const indexOfCurrentSong = listenlist.findIndex(
      (item) => item.newId === newIdOfCurrentSong,
    )
    if (indexOfCurrentSong > 4) {
      listWindowRef.current.scrollTop = (indexOfCurrentSong - 4) * 36
    }
  }, [listenlist, newIdOfCurrentSong])

  return (
    <div
      className="fixed w-80 right-[6vw] top-[90px] bg-[#1a1a1a] bottom-[68px] rounded-xl overflow-hidden z-[1050]"
      style={{
        border: '1px solid rgba(255,255,255,0.1)',
        boxShadow: '0 8px 40px rgba(0,0,0,0.5)',
      }}
    >
      <div
        className="flex items-center justify-between gap-2 px-4 py-3 w-full"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
      >
        <div className="flex items-center gap-2">
          <strong style={{ fontSize: 15 }}>聆听列表</strong>
          <span
            style={{
              fontSize: 12,
              color: '#8c8c8c',
              background: 'rgba(255,255,255,0.08)',
              padding: '1px 8px',
              borderRadius: 10,
            }}
          >
            {listenlist.filter((item) => item !== null).length}
          </span>
        </div>
        <div className="flex gap-2">
          <Button size="small" onClick={locateCurrentSong}>
            定位当前
          </Button>
          <Button size="small" onClick={clearListenlist}>
            清空
          </Button>
          <Button
            size="small"
            type="text"
            icon={<X size={14} />}
            onClick={() => setIsListenlistOpen(false)}
            style={{ color: '#8c8c8c' }}
          />
        </div>
      </div>
      <div
        className="h-[calc(100%-52px)] overflow-auto w-full"
        ref={listWindowRef}
      >
        <Suspense fallback={<Loading />}>
          <Listenlist
            songs={listenlist}
            newIdOfCurrentSong={newIdOfCurrentSong}
          />
        </Suspense>
      </div>
    </div>
  )
}

export default ListenlistWindow
