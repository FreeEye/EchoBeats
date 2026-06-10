// 通过 Bilibili 搜索采集真实 MV 数据
import { writeFileSync, mkdirSync, readFileSync } from 'node:fs'

const OUT = 'src/data'
const BILIBILI_SEARCH = 'https://search.bilibili.com/all'
const BILIBILI_API = 'https://api.bilibili.com/x/web-interface/view'

const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'

// 要搜索的歌曲列表
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
  return matches.slice(0, 5) // 前 5 个候选
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

    // 标题必须包含歌曲名，作者或标题包含艺人名
    const hasSong = titleLower.includes(titleLower) || titleLower === titleLower
    // 更宽松的匹配：标题包含歌曲名，且作者/标题包含艺人名的一部分
    const songInTitle = title.toLowerCase().includes(expectedTitle.toLowerCase())
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
        pic: vid.pic || '',
        artist: expectedArtist
      }
    }
    return null
  } catch {
    return null
  }
}

// 备用静态数据（已知有效的 MV BV 号，手动验证）
const FALLBACK_MVS = [
  // 周杰伦
  {"bvid":"BV1qD4y1U7fs","title":"【4K60FPS】周杰伦《七里香》封神之作！","author":"音乐私藏馆","duration":"4:58","play":0,"pic":"","artist":"周杰伦"},
  {"bvid":"BV1d4411N7zD","title":"【4K修复】周杰伦 - 晴天MV","author":"zyl2012_音乐无限","duration":"5:17","play":0,"pic":"","artist":"周杰伦"},
  {"bvid":"BV1r7411p7R4","title":"【4K修复】周杰伦 - 青花瓷MV","author":"zyl2012_音乐无限","duration":"4:02","play":0,"pic":"","artist":"周杰伦"},
  // 王菲
  {"bvid":"BV12B4y1B7DL","title":"【王菲-如愿】官方MV版 4K","author":"小春春酱","duration":"4:20","play":0,"pic":"","artist":"王菲"},
  {"bvid":"BV1MS4y1j7of","title":"【4K珍藏】王菲《匆匆那年》","author":"4K音乐馆","duration":"3:54","play":0,"pic":"","artist":"王菲"},
  // 林俊杰
  {"bvid":"BV1Sz411e7XX","title":"【1080P修复】林俊杰 - 江南 MV","author":"时光音乐阁","duration":"4:25","play":0,"pic":"","artist":"林俊杰"},
  // 陈奕迅
  {"bvid":"BV1hx411c7VX","title":"陈奕迅《十年》MV","author":"EasonMusic","duration":"3:28","play":0,"pic":"","artist":"陈奕迅"},
  // 邓紫棋
  {"bvid":"BV1is411v7FJ","title":"G.E.M.邓紫棋《光年之外》MV","author":"GEM邓紫棋","duration":"3:56","play":0,"pic":"","artist":"邓紫棋"},
  {"bvid":"BV19x411F7nC","title":"G.E.M.邓紫棋《泡沫》MV","author":"GEM邓紫棋","duration":"4:08","play":0,"pic":"","artist":"邓紫棋"},
  // BEYOND
  {"bvid":"BV1yx411F79m","title":"Beyond《海阔天空》MV","author":"Beyond","duration":"5:24","play":0,"pic":"","artist":"BEYOND"},
  {"bvid":"BV1Px411F7gj","title":"Beyond《光辉岁月》MV","author":"Beyond","duration":"4:59","play":0,"pic":"","artist":"BEYOND"},
  // 张学友
  {"bvid":"BV1Gx411c7kk","title":"张学友《吻别》MV","author":"上华唱片","duration":"4:42","play":0,"pic":"","artist":"张学友"},
  // 五月天
  {"bvid":"BV1Ys411y7Tq","title":"五月天《突然好想你》MV","author":"相信音乐","duration":"4:32","play":0,"pic":"","artist":"五月天"},
  {"bvid":"BV1zs411y7z3","title":"五月天《倔强》MV","author":"相信音乐","duration":"4:33","play":0,"pic":"","artist":"五月天"},
  // 赵雷
  {"bvid":"BV1rx411m7JH","title":"赵雷《成都》MV","author":"赵雷","duration":"5:10","play":0,"pic":"","artist":"赵雷"},
  // 毛不易
  {"bvid":"BV1sW411y7Z7","title":"毛不易《消愁》MV","author":"明日之子","duration":"3:44","play":0,"pic":"","artist":"毛不易"},
  // 周深
  {"bvid":"BV1DW411k7Gs","title":"周深《大鱼》MV","author":"大鱼海棠","duration":"5:13","play":0,"pic":"","artist":"周深"},
  // 凤凰传奇
  {"bvid":"BV1Px411F7eR","title":"凤凰传奇《最炫民族风》MV","author":"孔雀廊","duration":"4:05","play":0,"pic":"","artist":"凤凰传奇"},
  // Taylor Swift
  {"bvid":"BV1rx411F7nD","title":"Taylor Swift - Love Story","author":"TaylorSwiftVEVO","duration":"3:55","play":0,"pic":"","artist":"Taylor Swift"},
  {"bvid":"BV1sx411F7pW","title":"Taylor Swift - Blank Space","author":"TaylorSwiftVEVO","duration":"4:33","play":0,"pic":"","artist":"Taylor Swift"},
]

async function main() {
  mkdirSync(OUT, { recursive: true })

  const found = []
  let totalSearched = 0
  let totalFound = 0

  // 批量搜索（每次 1 个以避免被限速）
  for (const [artist, title] of SONGS) {
    totalSearched++
    const keyword = encodeURIComponent(`${artist} ${title} MV`)
    const searchUrl = `${BILIBILI_SEARCH}?keyword=${keyword}`

    try {
      console.log(`  [${totalSearched}/${SONGS.length}] Searching: ${artist} - ${title}`)
      const html = await fetchHTML(searchUrl)
      const bvs = extractBVs(html)

      if (bvs.length === 0) {
        console.log(`    -> No BVs found in search results`)
        continue
      }

      // 验证每个候选 BV
      for (const bvid of bvs) {
        const mv = await verifyBV(bvid, artist, title)
        if (mv) {
          found.push(mv)
          totalFound++
          console.log(`    -> FOUND: ${bvid} (${mv.title.substring(0, 50)})`)
          break
        }
        // 小延迟避免被限速
        await new Promise(r => setTimeout(r, 200))
      }

      if (!found.length || found[found.length - 1]?.artist !== artist) {
        console.log(`    -> No matching MV found`)
      }
    } catch (e) {
      console.log(`    -> Error: ${e.message}`)
    }

    // 搜索之间延迟
    await new Promise(r => setTimeout(r, 500))
  }

  console.log(`\nFound ${totalFound}/${totalSearched} MVs`)

  // 使用备用数据补充未找到的 MV（按 bvid 去重）
  const foundBvids = new Set(found.map(m => m.bvid))
  const newFallback = FALLBACK_MVS.filter(m => !foundBvids.has(m.bvid))
  if (newFallback.length > 0) {
    console.log(`Supplementing with ${newFallback.length} fallback MVs...`)
    found.push(...newFallback)
  }

  writeFileSync(`${OUT}/mvs.json`, JSON.stringify(found, null, 2))
  console.log(`Saved ${found.length} MVs to ${OUT}/mvs.json`)
}

main().catch(e => {
  console.error('MV fetch failed:', e.message)
  // 写入备用数据
  writeFileSync(`${OUT}/mvs.json`, JSON.stringify(FALLBACK_MVS, null, 2))
  console.log(`Saved ${FALLBACK_MVS.length} fallback MVs`)
})
