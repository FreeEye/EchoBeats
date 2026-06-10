// 通过 Bilibili 搜索采集真实 MV 数据
// 策略：先验证已知 BV（seed），再搜索新 MV，所有 BV 必须通过 Bilibili API 验证
import { writeFileSync, mkdirSync } from 'node:fs'

const OUT = 'src/data'
const BILIBILI_SEARCH = 'https://search.bilibili.com/all'
const BILIBILI_API = 'https://api.bilibili.com/x/web-interface/view'

const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'

// 已验证过的 BV 号（之前抓取时通过 Bilibili API 验证）
const SEED_BVS = [
  // 周杰伦 (已验证)
  { bvid: "BV1qD4y1U7fs", artist: "周杰伦", expectedTitle: "七里香" },
  { bvid: "BV1d4411N7zD", artist: "周杰伦", expectedTitle: "晴天" },
  { bvid: "BV1Ki4y1y7HC", artist: "周杰伦", expectedTitle: "稻香" },
  { bvid: "BV1Ek4y1r7Rg", artist: "周杰伦", expectedTitle: "夜曲" },
  { bvid: "BV1r7411p7R4", artist: "周杰伦", expectedTitle: "青花瓷" },
  { bvid: "BV1mL411E7Fb", artist: "周杰伦", expectedTitle: "告白气球" },
  { bvid: "BV1kt411A7mK", artist: "周杰伦", expectedTitle: "简单爱" },
  { bvid: "BV11p4y1b7ej", artist: "周杰伦", expectedTitle: "一路向北" },
  // 王菲 (已验证)
  { bvid: "BV1MS4y1j7of", artist: "王菲", expectedTitle: "匆匆那年" },
  { bvid: "BV1zV411v7UL", artist: "王菲", expectedTitle: "红豆" },
  { bvid: "BV1i5E4zYEPx", artist: "王菲", expectedTitle: "传奇" },
  { bvid: "BV12B4y1B7DL", artist: "王菲", expectedTitle: "如愿" },
  // 林俊杰 (已验证)
  { bvid: "BV1Sz411e7XX", artist: "林俊杰", expectedTitle: "江南" },
  // 张学友 (已验证)
  { bvid: "BV1Z7411871i", artist: "张学友", expectedTitle: "吻别" },
]

// 要搜索的新歌曲列表（尚未找到 MV 的）
const SONGS = [
  ["周杰伦", "七里香"], ["周杰伦", "晴天"], ["周杰伦", "稻香"], ["周杰伦", "夜曲"],
  ["周杰伦", "青花瓷"], ["周杰伦", "告白气球"], ["周杰伦", "简单爱"], ["周杰伦", "一路向北"],
  ["王菲", "匆匆那年"], ["王菲", "红豆"], ["王菲", "传奇"], ["王菲", "如愿"],
  ["林俊杰", "江南"], ["林俊杰", "修炼爱情"], ["林俊杰", "不为谁而作的歌"],
  ["林俊杰", "她说"], ["林俊杰", "可惜没如果"], ["林俊杰", "一千年以后"],
  ["陈奕迅", "十年"], ["陈奕迅", "浮夸"], ["陈奕迅", "富士山下"],
  ["陈奕迅", "好久不见"], ["陈奕迅", "爱情转移"],
  ["邓紫棋", "光年之外"], ["邓紫棋", "泡沫"], ["邓紫棋", "倒数"], ["邓紫棋", "喜欢你"],
  ["薛之谦", "演员"], ["薛之谦", "丑八怪"], ["薛之谦", "绅士"], ["薛之谦", "刚刚好"],
  ["许嵩", "有何不可"], ["许嵩", "素颜"], ["许嵩", "断桥残雪"],
  ["许嵩", "玫瑰花的葬礼"], ["许嵩", "清明雨上"],
  ["张杰", "这就是爱"], ["张杰", "天下"], ["张杰", "明天过后"],
  ["李荣浩", "年少有为"], ["李荣浩", "不将就"], ["李荣浩", "李白"],
  ["毛不易", "消愁"], ["毛不易", "像我这样的人"],
  ["周深", "大鱼"], ["周深", "起风了"],
  ["五月天", "突然好想你"], ["五月天", "知足"], ["五月天", "倔强"],
  ["刘德华", "忘情水"], ["刘德华", "冰雨"], ["刘德华", "爱你一万年"],
  ["凤凰传奇", "最炫民族风"], ["凤凰传奇", "荷塘月色"],
  ["张碧晨", "凉凉"], ["张碧晨", "年轮"],
  ["BEYOND", "海阔天空"], ["BEYOND", "真的爱你"], ["BEYOND", "光辉岁月"],
  ["胡彦斌", "红颜"], ["胡彦斌", "月光"],
  ["赵雷", "成都"], ["赵雷", "南方姑娘"],
  ["周传雄", "黄昏"], ["周传雄", "寂寞沙洲冷"],
  ["汪苏泷", "有点甜"], ["汪苏泷", "不分手的恋爱"],
  ["张学友", "吻别"], ["张学友", "她来听我的演唱会"],
  ["于文文", "体面"],
  ["程响", "可能"], ["程响", "四季予你"],
  ["告五人", "爱人错过"], ["告五人", "带你去找夜生活"],
  ["单依纯", "永不失联的爱"],
  ["华晨宇", "烟火里的尘埃"], ["华晨宇", "国王与乞丐"],
  ["Taylor Swift", "Love Story"], ["Taylor Swift", "Blank Space"],
  ["Alan Walker", "Faded"], ["Alan Walker", "Alone"],
  ["Westlife", "My Love"], ["Linkin Park", "Numb"], ["Owl City", "Fireflies"],
]

async function fetchHTML(url) {
  const res = await fetch(url, {
    headers: {
      'User-Agent': UA,
      'Referer': 'https://www.bilibili.com',
      'Accept': 'text/html,application/xhtml+xml',
      'Accept-Language': 'zh-CN,zh;q=0.9',
    }
  })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.text()
}

async function fetchJSON(url) {
  const res = await fetch(url, {
    headers: {
      'User-Agent': UA,
      'Referer': 'https://www.bilibili.com',
      'Accept': 'application/json',
    }
  })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}

function extractBVs(html) {
  const bvRegex = /BV[a-zA-Z0-9]{10}/g
  const matches = [...new Set(html.match(bvRegex) || [])]
  return matches.slice(0, 5)
}

async function verifyBV(bvid, expectedArtist, expectedTitle) {
  try {
    const data = await fetchJSON(`${BILIBILI_API}?bvid=${bvid}`)
    if (data.code !== 0) return null

    const vid = data.data
    const title = vid.title || ''
    const owner = vid.owner?.name || ''
    const artistLower = expectedArtist.toLowerCase()
    const titleLower = expectedTitle.toLowerCase()

    // 标题包含歌曲名，且作者/标题包含艺人名
    const songInTitle = title.toLowerCase().includes(titleLower)
    const artistInContext = (owner + title).toLowerCase().includes(artistLower) ||
      artistLower.split('').filter(c => (owner + title).toLowerCase().includes(c)).length >= artistLower.length * 0.5

    if (songInTitle && artistInContext) {
      const mins = Math.floor(vid.duration / 60)
      const secs = vid.duration % 60
      return {
        bvid,
        title: vid.title,
        author: owner,
        duration: `${mins}:${secs.toString().padStart(2, '0')}`,
        play: vid.stat?.view || 0,
        pic: (vid.pic || '').replace(/^http:/, 'https:'),
        artist: expectedArtist
      }
    }
    return null
  } catch {
    return null
  }
}

async function main() {
  mkdirSync(OUT, { recursive: true })

  const found = []
  const foundBvids = new Set()

  // 第 1 步：先验证所有已知 seed BV（获取最新数据包括封面图）
  console.log('Step 1: Verifying seed BVs...')
  for (const seed of SEED_BVS) {
    try {
      const mv = await verifyBV(seed.bvid, seed.artist, seed.expectedTitle)
      if (mv) {
        found.push(mv)
        foundBvids.add(mv.bvid)
        console.log(`  OK: ${seed.bvid} | ${seed.artist} - ${seed.expectedTitle}`)
      } else {
        console.log(`  STALE: ${seed.bvid} | ${seed.artist} - ${seed.expectedTitle} (no longer valid)`)
      }
      await new Promise(r => setTimeout(r, 300))
    } catch (e) {
      console.log(`  ERR: ${seed.bvid} - ${e.message}`)
    }
  }
  console.log(`  Seed verified: ${found.length}/${SEED_BVS.length}`)

  // 第 2 步：搜索新 MV（跳过已有 seed 的艺人+歌曲组合）
  const existingPairs = new Set(SEED_BVS.map(s => `${s.artist}:${s.expectedTitle}`))
  const toSearch = SONGS.filter(([a, t]) => !existingPairs.has(`${a}:${t}`))

  console.log(`\nStep 2: Searching for ${toSearch.length} new MVs...`)
  let totalFound = 0

  for (let i = 0; i < toSearch.length; i++) {
    const [artist, title] = toSearch[i]
    const keyword = encodeURIComponent(`${artist} ${title} MV`)
    const searchUrl = `${BILIBILI_SEARCH}?keyword=${keyword}`

    try {
      console.log(`  [${i + 1}/${toSearch.length}] Searching: ${artist} - ${title}`)
      const html = await fetchHTML(searchUrl)
      const bvs = extractBVs(html).filter(bv => !foundBvids.has(bv))

      if (bvs.length === 0) {
        console.log(`    -> No BVs in search results`)
        continue
      }

      for (const bvid of bvs) {
        const mv = await verifyBV(bvid, artist, title)
        if (mv) {
          found.push(mv)
          foundBvids.add(mv.bvid)
          totalFound++
          console.log(`    -> FOUND: ${bvid} (${mv.title.substring(0, 60)})`)
          break
        }
        await new Promise(r => setTimeout(r, 200))
      }
    } catch (e) {
      console.log(`    -> Error: ${e.message}`)
    }

    await new Promise(r => setTimeout(r, 500))
  }

  console.log(`\n  New MVs found: ${totalFound}`)
  console.log(`  Total MVs (seed + new): ${found.length}`)

  writeFileSync(`${OUT}/mvs.json`, JSON.stringify(found, null, 2))
  console.log(`\nSaved ${found.length} MVs to ${OUT}/mvs.json`)
}

main().catch(e => {
  console.error('MV fetch failed:', e.message)
  process.exit(1)
})
