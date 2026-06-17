// 网易云音乐 Meting API 封装
// API 文档: https://api.injahow.cn/meting/

const METING_API = 'https://api.injahow.cn/meting/'

/**
 * 搜索网易云音乐歌曲
 * @param {string} keyword 搜索关键词
 * @returns {Promise<Array>} 返回格式适配现有 SongList 的歌曲数组
 */
export async function searchNetease(keyword) {
  try {
    const params = new URLSearchParams({
      server: 'netease',
      type: 'song',
      pageSize: '20',
    })
    const url = `${METING_API}?${params.toString()}&keyword=${encodeURIComponent(keyword)}`
    const res = await fetch(url)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data = await res.json()
    if (!Array.isArray(data) || data.length === 0) return []

    return data.map((item) => ({
      newId: `ne_${item.id || item.songid}`,
      name: item.title || item.name || '',
      alias: '',
      artists: [
        { name: item.author || item.artist || '', id: 0 },
      ],
      album: { name: '', cover: '' },
      source: item.url || '',
      cover: item.pic || item.cover || '',
      provider: 'netease',
    }))
  } catch (_) {
    return []
  }
}

/**
 * 通过 Meting API 搜索歌曲并获取播放 URL（降级用）
 * @param {string} keyword 搜索关键词（歌曲名 + 艺人名）
 * @returns {Promise<string|null>} 播放 URL 或 null
 */
export async function getNeteaseSourceByKeyword(keyword) {
  try {
    const params = new URLSearchParams({
      server: 'netease',
      type: 'song',
      pageSize: '1',
    })
    const url = `${METING_API}?${params.toString()}&keyword=${encodeURIComponent(keyword)}`
    const res = await fetch(url)
    if (!res.ok) return null
    const data = await res.json()
    if (Array.isArray(data) && data.length > 0 && (data[0].url || data[0].songid)) {
      if (data[0].url) return data[0].url
      // 如果没返回 url，用 id 再获取一次
      const songId = data[0].id || data[0].songid
      const urlParams = new URLSearchParams({
        server: 'netease',
        type: 'url',
        id: String(songId),
      })
      const urlRes = await fetch(`${METING_API}?${urlParams.toString()}`)
      if (!urlRes.ok) return null
      const urlData = await urlRes.json()
      if (urlData.url) return urlData.url
    }
    return null
  } catch (_) {
    return null
  }
}
