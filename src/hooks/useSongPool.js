import { useEffect, useState } from 'react'

// 从3个数据源聚合全部歌曲，去重后返回统一的歌曲池
export function useSongPool() {
  const [loading, setLoading] = useState(true)
  const [allSongs, setAllSongs] = useState([])
  const [hotSongs, setHotSongs] = useState([])
  const [newSongs, setNewSongs] = useState([])

  useEffect(() => {
    let cancelled = false
    setLoading(true)

    Promise.allSettled([
      fetch('/api/songs', { credentials: 'include' }),
      fetch('/api/hot-songs', { credentials: 'include' }),
      fetch('/api/new-songs', { credentials: 'include' }),
    ])
      .then(async ([songsRes, hotRes, newRes]) => {
        if (cancelled) return
        const rawHot = []
        const rawNew = []
        const all = []

        if (songsRes.status === 'fulfilled' && songsRes.value.ok) {
          const d = await songsRes.value.json()
          if (d.success && Array.isArray(d.songs)) all.push(...d.songs)
        }
        if (hotRes.status === 'fulfilled' && hotRes.value.ok) {
          const d = await hotRes.value.json()
          if (d.success && Array.isArray(d.songs)) {
            rawHot.push(...d.songs)
            all.push(...d.songs)
          }
        }
        if (newRes.status === 'fulfilled' && newRes.value.ok) {
          const d = await newRes.value.json()
          if (d.success && Array.isArray(d.songs)) {
            rawNew.push(...d.songs)
            all.push(...d.songs)
          }
        }

        // 去重
        const seen = new Set()
        const unique = all.filter((s) => {
          if (seen.has(s.newId)) return false
          seen.add(s.newId)
          return true
        })

        const hotSeen = new Set()
        const uniqueHot = rawHot.filter((s) => {
          if (hotSeen.has(s.newId)) return false
          hotSeen.add(s.newId)
          return true
        })

        const newSeen = new Set()
        const uniqueNew = rawNew.filter((s) => {
          if (newSeen.has(s.newId)) return false
          newSeen.add(s.newId)
          return true
        })

        if (!cancelled) {
          setAllSongs(unique)
          setHotSongs(uniqueHot)
          setNewSongs(uniqueNew)
          setLoading(false)
        }
      })
      .catch(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  return { loading, allSongs, hotSongs, newSongs }
}
