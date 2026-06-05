import { useEffect, useState } from 'react'
import { getHotSongs, getNewSongs, getSongPool } from '@/services/dataService'

export function useSongPool() {
  const [loading, setLoading] = useState(true)
  const [allSongs, setAllSongs] = useState([])
  const [hotSongs, setHotSongs] = useState([])
  const [newSongs, setNewSongs] = useState([])

  useEffect(() => {
    let cancelled = false
    setLoading(true)

    Promise.allSettled([
      getHotSongs(),
      getNewSongs(),
      getSongPool(),
    ]).then(([hot, news, pool]) => {
      if (cancelled) return
      if (hot.status === 'fulfilled') setHotSongs(hot.value)
      if (news.status === 'fulfilled') setNewSongs(news.value)
      if (pool.status === 'fulfilled') setAllSongs(pool.value)
      setLoading(false)
    })

    return () => { cancelled = true }
  }, [])

  return { loading, allSongs, hotSongs, newSongs }
}
