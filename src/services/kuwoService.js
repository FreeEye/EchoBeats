// 酷我音乐 Meting API 封装
const METING_API = 'https://api.injahow.cn/meting/'

/**
 * 搜索酷我音乐歌曲
 */
export async function searchKuwo(keyword) {
  try {
    const params = new URLSearchParams({
      server: 'kuwo',
      type: 'song',
      pageSize: '20',
    })
    const url = `${METING_API}?${params.toString()}&keyword=${encodeURIComponent(keyword)}`
    const res = await fetch(url)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data = await res.json()
    if (!Array.isArray(data) || data.length === 0) return []

    return data.map((item) => ({
      newId: `kw_${item.id || item.songid}`,
      name: item.title || item.name || '',
      alias: '',
      artists: [{ name: item.author || item.artist || '', id: 0 }],
      album: { name: '', cover: '' },
      source: item.url || '',
      cover: item.pic || item.cover || '',
      provider: 'kuwo',
    }))
  } catch (_) {
    return []
  }
}
