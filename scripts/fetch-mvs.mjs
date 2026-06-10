// 通过 Bilibili 搜索采集真实 MV 数据
// 策略：先验证已知 BV（seed），再搜索新 MV，所有 BV 必须通过 Bilibili API 验证
import { writeFileSync, mkdirSync } from 'node:fs'

const OUT = 'src/data'
const BILIBILI_SEARCH = 'https://search.bilibili.com/all'
const BILIBILI_API = 'https://api.bilibili.com/x/web-interface/view'

const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'

// 已验证过的 BV 号（之前抓取时通过 Bilibili API 验证）
const SEED_BVS = [
  // 周杰伦
  { bvid: "BV1qD4y1U7fs", artist: "周杰伦", expectedTitle: "七里香" },
  { bvid: "BV1d4411N7zD", artist: "周杰伦", expectedTitle: "晴天" },
  { bvid: "BV1Ki4y1y7HC", artist: "周杰伦", expectedTitle: "稻香" },
  { bvid: "BV1Ek4y1r7Rg", artist: "周杰伦", expectedTitle: "夜曲" },
  { bvid: "BV1r7411p7R4", artist: "周杰伦", expectedTitle: "青花瓷" },
  { bvid: "BV1mL411E7Fb", artist: "周杰伦", expectedTitle: "告白气球" },
  { bvid: "BV1kt411A7mK", artist: "周杰伦", expectedTitle: "简单爱" },
  { bvid: "BV11p4y1b7ej", artist: "周杰伦", expectedTitle: "一路向北" },
  // 王菲
  { bvid: "BV1MS4y1j7of", artist: "王菲", expectedTitle: "匆匆那年" },
  { bvid: "BV1zV411v7UL", artist: "王菲", expectedTitle: "红豆" },
  { bvid: "BV1i5E4zYEPx", artist: "王菲", expectedTitle: "传奇" },
  { bvid: "BV12B4y1B7DL", artist: "王菲", expectedTitle: "如愿" },
  // 林俊杰
  { bvid: "BV1Sz411e7XX", artist: "林俊杰", expectedTitle: "江南" },
  // 张学友
  { bvid: "BV1Z7411871i", artist: "张学友", expectedTitle: "吻别" },
  // 邓丽君
  { bvid: "BV1sJ411W7qW", artist: "邓丽君", expectedTitle: "甜蜜蜜" },
  // BEYOND
  { bvid: "BV1bx411c7Jx", artist: "BEYOND", expectedTitle: "海阔天空" },
  { bvid: "BV1mW411k7B6", artist: "BEYOND", expectedTitle: "光辉岁月" },
  // Taylor Swift
  { bvid: "BV1jE421H7sT", artist: "Taylor Swift", expectedTitle: "Love Story" },
]

// 要搜索的新歌曲列表（200+ 条目，覆盖 80+ 艺人）
const SONGS = [
  // === 周杰伦 ===
  ["周杰伦", "七里香"], ["周杰伦", "晴天"], ["周杰伦", "稻香"], ["周杰伦", "夜曲"],
  ["周杰伦", "青花瓷"], ["周杰伦", "告白气球"], ["周杰伦", "简单爱"], ["周杰伦", "一路向北"],
  ["周杰伦", "听妈妈的话"], ["周杰伦", "东风破"],
  // === 王菲 ===
  ["王菲", "匆匆那年"], ["王菲", "红豆"], ["王菲", "传奇"], ["王菲", "如愿"],
  // === 林俊杰 ===
  ["林俊杰", "江南"], ["林俊杰", "修炼爱情"], ["林俊杰", "不为谁而作的歌"],
  ["林俊杰", "她说"], ["林俊杰", "可惜没如果"], ["林俊杰", "一千年以后"],
  // === 陈奕迅 ===
  ["陈奕迅", "十年"], ["陈奕迅", "浮夸"], ["陈奕迅", "富士山下"],
  ["陈奕迅", "好久不见"], ["陈奕迅", "爱情转移"],
  // === 邓紫棋 ===
  ["邓紫棋", "光年之外"], ["邓紫棋", "泡沫"], ["邓紫棋", "倒数"], ["邓紫棋", "喜欢你"],
  // === 薛之谦 ===
  ["薛之谦", "演员"], ["薛之谦", "丑八怪"], ["薛之谦", "绅士"], ["薛之谦", "刚刚好"],
  // === 许嵩 ===
  ["许嵩", "有何不可"], ["许嵩", "素颜"], ["许嵩", "断桥残雪"],
  ["许嵩", "玫瑰花的葬礼"], ["许嵩", "清明雨上"],
  // === 张杰 ===
  ["张杰", "这就是爱"], ["张杰", "天下"], ["张杰", "明天过后"],
  // === 李荣浩 ===
  ["李荣浩", "年少有为"], ["李荣浩", "不将就"], ["李荣浩", "李白"], ["李荣浩", "麻雀"],
  // === 毛不易 ===
  ["毛不易", "消愁"], ["毛不易", "像我这样的人"],
  // === 周深 ===
  ["周深", "大鱼"], ["周深", "起风了"],
  // === 五月天 ===
  ["五月天", "突然好想你"], ["五月天", "知足"], ["五月天", "倔强"], ["五月天", "温柔"],
  // === 刘德华 ===
  ["刘德华", "忘情水"], ["刘德华", "冰雨"], ["刘德华", "爱你一万年"], ["刘德华", "17岁"],
  // === 凤凰传奇 ===
  ["凤凰传奇", "最炫民族风"], ["凤凰传奇", "荷塘月色"],
  // === 张碧晨 ===
  ["张碧晨", "凉凉"], ["张碧晨", "年轮"],
  // === BEYOND ===
  ["BEYOND", "海阔天空"], ["BEYOND", "真的爱你"], ["BEYOND", "光辉岁月"],
  // === 胡彦斌 ===
  ["胡彦斌", "红颜"], ["胡彦斌", "月光"],
  // === 赵雷 ===
  ["赵雷", "成都"], ["赵雷", "南方姑娘"],
  // === 周传雄 ===
  ["周传雄", "黄昏"], ["周传雄", "寂寞沙洲冷"],
  // === 汪苏泷 ===
  ["汪苏泷", "有点甜"], ["汪苏泷", "不分手的恋爱"],
  // === 张学友 ===
  ["张学友", "吻别"], ["张学友", "她来听我的演唱会"], ["张学友", "一千个伤心的理由"],
  // === 于文文 ===
  ["于文文", "体面"],
  // === 程响 ===
  ["程响", "可能"], ["程响", "四季予你"],
  // === 告五人 ===
  ["告五人", "爱人错过"], ["告五人", "带你去找夜生活"],
  // === 单依纯 ===
  ["单依纯", "永不失联的爱"],
  // === 华晨宇 ===
  ["华晨宇", "烟火里的尘埃"], ["华晨宇", "国王与乞丐"],
  // === 邓丽君 ===
  ["邓丽君", "甜蜜蜜"], ["邓丽君", "月亮代表我的心"], ["邓丽君", "我只在乎你"],
  // === 孙燕姿 ===
  ["孙燕姿", "遇见"], ["孙燕姿", "我怀念的"], ["孙燕姿", "开始懂了"], ["孙燕姿", "天黑黑"],
  // === 蔡依林 ===
  ["蔡依林", "日不落"], ["蔡依林", "倒带"], ["蔡依林", "舞娘"],
  // === 王力宏 ===
  ["王力宏", "唯一"], ["王力宏", "需要人陪"], ["王力宏", "Forever Love"],
  // === 梁静茹 ===
  ["梁静茹", "勇气"], ["梁静茹", "分手快乐"], ["梁静茹", "暖暖"],
  // === S.H.E ===
  ["S.H.E", "Super Star"], ["S.H.E", "恋人未满"], ["S.H.E", "中国话"],
  // === 张信哲 ===
  ["张信哲", "爱如潮水"], ["张信哲", "过火"], ["张信哲", "信仰"],
  // === 田馥甄 ===
  ["田馥甄", "小幸运"], ["田馥甄", "你就不要想起我"],
  // === 李健 ===
  ["李健", "贝加尔湖畔"], ["李健", "传奇"],
  // === 朴树 ===
  ["朴树", "平凡之路"], ["朴树", "那些花儿"],
  // === 王心凌 ===
  ["王心凌", "爱你"], ["王心凌", "第一次爱的人"], ["王心凌", "当你"],
  // === 张韶涵 ===
  ["张韶涵", "隐形的翅膀"], ["张韶涵", "欧若拉"], ["张韶涵", "亲爱的这不是爱情"],
  // === 莫文蔚 ===
  ["莫文蔚", "忽然之间"], ["莫文蔚", "阴天"], ["莫文蔚", "盛夏的果实"],
  // === 萧亚轩 ===
  ["萧亚轩", "最熟悉的陌生人"], ["萧亚轩", "爱的主打歌"],
  // === 杨丞琳 ===
  ["杨丞琳", "雨爱"], ["杨丞琳", "暧昧"],
  // === 周华健 ===
  ["周华健", "朋友"], ["周华健", "花心"],
  // === 任贤齐 ===
  ["任贤齐", "心太软"], ["任贤齐", "对面的女孩看过来"],
  // === 光良 ===
  ["光良", "童话"], ["光良", "第一次"],
  // === 伍佰 ===
  ["伍佰", "挪威的森林"], ["伍佰", "你是我的花朵"],
  // === 陶喆 ===
  ["陶喆", "爱很简单"], ["陶喆", "就是爱你"],
  // === 张惠妹 ===
  ["张惠妹", "记得"], ["张惠妹", "听海"],
  // === 那英 ===
  ["那英", "默"], ["那英", "征服"],
  // === 韩红 ===
  ["韩红", "天路"], ["韩红", "天亮了"],
  // === 汪峰 ===
  ["汪峰", "春天里"], ["汪峰", "怒放的生命"],
  // === 许巍 ===
  ["许巍", "蓝莲花"], ["许巍", "曾经的你"],
  // === 谭咏麟 ===
  ["谭咏麟", "一生中最爱"], ["谭咏麟", "朋友"],
  // === 张国荣 ===
  ["张国荣", "Monica"], ["张国荣", "风继续吹"],
  // === 罗大佑 ===
  ["罗大佑", "童年"], ["罗大佑", "光阴的故事"],
  // === 李宗盛 ===
  ["李宗盛", "山丘"], ["李宗盛", "给自己的歌"],
  // === 刘若英 ===
  ["刘若英", "后来"], ["刘若英", "为爱痴狂"],
  // === 苏打绿 ===
  ["苏打绿", "小情歌"], ["苏打绿", "我好想你"],
  // === 郑钧 ===
  ["郑钧", "灰姑娘"], ["郑钧", "回到拉萨"],
  // === 刀郎 ===
  ["刀郎", "2002年的第一场雪"], ["刀郎", "罗刹海市"],
  // === 叶丽仪 ===
  ["叶丽仪", "上海滩"],
  // === International ===
  ["Taylor Swift", "Love Story"], ["Taylor Swift", "Blank Space"], ["Taylor Swift", "Shake It Off"],
  ["Alan Walker", "Faded"], ["Alan Walker", "Alone"],
  ["Westlife", "My Love"],
  ["Linkin Park", "Numb"], ["Linkin Park", "In The End"],
  ["Owl City", "Fireflies"],
  ["Coldplay", "Yellow"], ["Coldplay", "Viva La Vida"], ["Coldplay", "Fix You"],
  ["Maroon 5", "Sugar"], ["Maroon 5", "Payphone"],
  ["Ed Sheeran", "Shape of You"], ["Ed Sheeran", "Perfect"],
  ["Imagine Dragons", "Believer"], ["Imagine Dragons", "Radioactive"],
  ["Bruno Mars", "Just The Way You Are"], ["Bruno Mars", "Uptown Funk"],
  ["Adele", "Someone Like You"], ["Adele", "Rolling in the Deep"],
  ["Rihanna", "Diamonds"], ["Eminem", "Love The Way You Lie"],
  ["Lady Gaga", "Bad Romance"], ["Katy Perry", "Roar"],
  ["Justin Bieber", "Baby"], ["The Weeknd", "Blinding Lights"],
  ["Dua Lipa", "Levitating"], ["Billie Eilish", "Bad Guy"],
  ["Ariana Grande", "7 Rings"], ["Michael Jackson", "Billie Jean"],
  ["Queen", "Bohemian Rhapsody"], ["The Beatles", "Yesterday"],
  ["Eagles", "Hotel California"],
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

  // 第 3 步：搜索 MV 合集（经典歌曲合集、MV合集等）
  const COLLECTION_QUERIES = [
    "MV合集 经典歌曲",
    "经典歌曲合集 MV",
    "华语经典MV合集",
    "英文经典MV合集",
  ]
  console.log(`\nStep 3: Searching for MV collections...`)
  let collectionFound = 0

  for (const query of COLLECTION_QUERIES) {
    try {
      const searchUrl = `${BILIBILI_SEARCH}?keyword=${encodeURIComponent(query)}`
      console.log(`  Searching: ${query}`)
      const html = await fetchHTML(searchUrl)
      const bvs = extractBVs(html).filter(bv => !foundBvids.has(bv))

      for (const bvid of bvs.slice(0, 3)) {
        await new Promise(r => setTimeout(r, 200))
        try {
          const data = await fetchJSON(`${BILIBILI_API}?bvid=${bvid}`)
          if (data.code !== 0) continue
          const vid = data.data
          const mins = Math.floor(vid.duration / 60)
          const secs = vid.duration % 60
          // 合集类视频通常时长较长（>3分钟），接受宽松匹配
          if (vid.duration > 180) {
            found.push({
              bvid,
              title: vid.title,
              author: vid.owner?.name || '',
              duration: `${mins}:${secs.toString().padStart(2, '0')}`,
              play: vid.stat?.view || 0,
              pic: (vid.pic || '').replace(/^http:/, 'https:'),
              artist: '合集'
            })
            foundBvids.add(bvid)
            collectionFound++
            console.log(`    -> FOUND: ${bvid} (${vid.title.substring(0, 60)})`)
          }
        } catch (_) { /* skip */ }
      }
    } catch (e) {
      console.log(`    -> Error: ${e.message}`)
    }
    await new Promise(r => setTimeout(r, 500))
  }
  console.log(`  Collection MVs found: ${collectionFound}`)
  console.log(`  Total MVs: ${found.length}`)

  writeFileSync(`${OUT}/mvs.json`, JSON.stringify(found, null, 2))
  console.log(`\nSaved ${found.length} MVs to ${OUT}/mvs.json`)
}

main().catch(e => {
  console.error('MV fetch failed:', e.message)
  process.exit(1)
})
