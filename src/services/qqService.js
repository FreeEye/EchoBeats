// QQ音乐 Meting API 封装
const METING_API = 'https://api.injahow.cn/meting/'

/**
 * 搜索 QQ 音乐歌曲
 */
export async function searchQQMusic(keyword) {
  try {
    const params = new URLSearchParams({
      server: 'tencent',
      type: 'song',
      pageSize: '20',
    })
    const url = `${METING_API}?${params.toString()}&keyword=${encodeURIComponent(keyword)}`
    const res = await fetch(url)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data = await res.json()
    if (!Array.isArray(data) || data.length === 0) return []

    return data.map((item) => ({
      newId: `qq_${item.id || item.songid}`,
      name: item.title || item.name || '',
      alias: '',
      artists: [{ name: item.author || item.artist || '', id: 0 }],
      album: { name: '', cover: '' },
      source: item.url || '',
      cover: item.pic || item.cover || '',
      provider: 'qq',
    }))
  } catch (_) {
    return []
  }
}
