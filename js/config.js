// ========== 配置数据 ==========
// 温馨话语 + 照片配对
// 每条文字配一张照片，按顺序一一对应
// 把照片放到 photos/ 文件夹，修改下面的 photo 字段即可

const bubblePairs = [
  { msg: "遇见你是我最美丽的意外 💕", photo: "photos/scenery-01.jpg" },
  { msg: "想把所有的温柔都给你",       photo: "photos/scenery-02.jpg" },
  { msg: "你一笑，我的世界就亮了",     photo: "photos/scenery-03.jpg" },
  { msg: "有你在，每天都是晴天 ☀️",   photo: "photos/scenery-04.jpg" },
  { msg: "你是我的星辰大海 ✨",        photo: "photos/scenery-05.jpg" },
  { msg: "目光所至，皆是你",           photo: "photos/scenery-06.jpg" },
  { msg: "想和你一起看遍四季",         photo: "photos/scenery-07.jpg" },
  { msg: "你是我最想留住的幸运",       photo: "photos/scenery-08.jpg" },
  { msg: "世界那么大，偏偏喜欢你",     photo: "photos/scenery-09.jpg" },
  { msg: "余生请多指教",               photo: "photos/scenery-10.jpg" },
  { msg: "你就是我的整个宇宙 🌌",     photo: "photos/scenery-11.jpg" },
  { msg: "有你的地方，就是家",         photo: "photos/scenery-12.jpg" },
  { msg: "春风十里，不如你",           photo: "photos/scenery-13.jpg" },
  { msg: "山河远阔，人间烟火，无一是你，无一不是你", photo: "photos/scenery-14.jpg" },
  { msg: "我愿意，用一生来说我爱你",   photo: "photos/scenery-15.jpg" },
  { msg: "你是我写过最美的诗",         photo: "photos/scenery-16.jpg" },
  { msg: "想和你慢慢变老",             photo: "photos/scenery-17.jpg" },
  { msg: "此生有你，足矣",             photo: "photos/scenery-18.jpg" },
  { msg: "你是最温暖的光",             photo: "photos/scenery-19.jpg" },
  { msg: "一想到你，嘴角就上扬",       photo: "photos/scenery-20.jpg" },
  { msg: "你呀你，是我最甜蜜的烦恼",   photo: "photos/scenery-21.jpg" },
  { msg: "风很温柔，花很香，你很特别 🌸", photo: "photos/scenery-22.jpg" },
  { msg: "永远为期，爱你为誓",         photo: "photos/scenery-23.jpg" },
  { msg: "你是我的偏爱和例外",         photo: "photos/scenery-24.jpg" },
  { msg: "入目无别人，四下皆是你",     photo: "photos/scenery-25.jpg" },
  { msg: "浪漫不止，温柔不息",         photo: "photos/scenery-26.jpg" },
  { msg: "你是我疲惫生活里的英雄梦想", photo: "photos/scenery-27.jpg" },
  { msg: "见过山海，最念是你",         photo: "photos/scenery-28.jpg" },
  { msg: "时光往复，爱你如初",         photo: "photos/scenery-29.jpg" },
  { msg: "希望我们都是彼此心事的守口如瓶", photo: "photos/scenery-30.jpg" },
  { msg: "心动，从你的名字开始",       photo: "photos/001.jpg" },
  { msg: "你是我藏在微风里的欢喜",     photo: "photos/002.jpg" },
  { msg: "万物皆甜，而你胜万物",       photo: "photos/003.jpg" },
  { msg: "陪你度过漫长岁月",           photo: "photos/004.jpg" },
  { msg: "你是人间四月天 🌿",         photo: "photos/scenery-01.jpg" },
  { msg: "见山是山，见海是海，见你是全世界 🌍", photo: "photos/scenery-02.jpg" },
  { msg: "你是落日弥漫的橘，天边透亮的星 ⭐", photo: "photos/scenery-03.jpg" },
  { msg: "你的名字，是我听过最短的情诗", photo: "photos/scenery-04.jpg" },
  { msg: "其实我喜欢你，比昨天多一点，比明天少一点", photo: "photos/scenery-05.jpg" },
  { msg: "我跨过山，涉过水，只为奔向你 🏃", photo: "photos/scenery-06.jpg" },
  { msg: "月亮不会奔你而来，但我会 🌙", photo: "photos/scenery-07.jpg" },
  { msg: "三生有幸，遇见你",           photo: "photos/scenery-08.jpg" },
  { msg: "你是这白开水一样淡的日子里，我偷偷加的一颗糖 🍬", photo: "photos/scenery-09.jpg" },
  { msg: "绕过山河错落，才发现你是人间烟火", photo: "photos/scenery-10.jpg" },
  { msg: "海底月是天上月，眼前人是心上人", photo: "photos/scenery-11.jpg" },
  { msg: "所有的温柔眷恋，都是对你",   photo: "photos/scenery-12.jpg" },
  { msg: "你与星河，皆可收藏",         photo: "photos/scenery-13.jpg" },
  { msg: "所爱隔山海，山海皆可平",     photo: "photos/scenery-14.jpg" },
  { msg: "山有木兮木有枝，心悦君兮君不知 💕", photo: "photos/scenery-15.jpg" },
  { msg: "近朱者赤，近你者甜 🍯",     photo: "photos/scenery-16.jpg" },
  { msg: "喜欢你，像风走了八千里，不问归期", photo: "photos/scenery-17.jpg" },
  { msg: "苦尽甘来，所以遇见了你",     photo: "photos/scenery-18.jpg" },
  { msg: "你是我的半截诗，不许别人改一个字", photo: "photos/scenery-19.jpg" },
  { msg: "星光不问赶路人，时光不负有心人 💫", photo: "photos/scenery-20.jpg" },
  { msg: "这世间最烈的酒，是你低头浅笑的温柔 🍷", photo: "photos/scenery-21.jpg" },
  { msg: "日子甜甜的，像清晨的柠檬水，像你 🍋", photo: "photos/scenery-22.jpg" },
  { msg: "浮世三千，吾爱有三：日月与卿", photo: "photos/scenery-23.jpg" },
  { msg: "初识只作乍见之欢，日后惊于久处不厌", photo: "photos/scenery-24.jpg" },
  { msg: "南风知我意，吹梦到西洲",     photo: "photos/scenery-25.jpg" },
  { msg: "白茶清欢无别事，我在等风也等你 🍃", photo: "photos/scenery-26.jpg" },
  { msg: "你眼里的星辰，是我见过最美的风景", photo: "photos/scenery-27.jpg" },
  { msg: "世间万物论沧桑，你在心上作中央", photo: "photos/scenery-28.jpg" },
  { msg: "愿你眼中有光，心中有爱，一生被温柔以待", photo: "photos/scenery-29.jpg" },
  { msg: "从今往后，你是我的朝朝暮暮", photo: "photos/scenery-30.jpg" },
  { msg: "你是夏日限定的美好，也是来日方长的温柔 ☀️", photo: "photos/001.jpg" },
  { msg: "宇宙山河浪漫，生活点滴温暖，都值得我奔向你", photo: "photos/002.jpg" },
  { msg: "你逆光而来，配得上这世间所有美好", photo: "photos/003.jpg" },
  { msg: "听说喜欢会传染，请你离我近一点 🦠", photo: "photos/004.jpg" },
  { msg: "我的眼里没有余光，全都是你", photo: "photos/scenery-01.jpg" },
  { msg: "承蒙时光不弃，有幸与你相遇", photo: "photos/scenery-02.jpg" },
  { msg: "今夕何夕，见此良人",         photo: "photos/scenery-03.jpg" },
  { msg: "你是我明目张胆的偏爱，众所周知的私心", photo: "photos/scenery-04.jpg" },
  { msg: "满目山河，落花风雨，一切都不如你", photo: "photos/scenery-05.jpg" },
  { msg: "我见众生皆草木，唯有见你是青山 🌿", photo: "photos/scenery-06.jpg" },
  { msg: "你是八千里云和月，是我穷极一生追寻的光", photo: "photos/scenery-07.jpg" },
  { msg: "愿有岁月可回首，且以深情共白头", photo: "photos/scenery-08.jpg" },
  { msg: "在所有人事已非的景色里，我最喜欢你", photo: "photos/scenery-09.jpg" },
  { msg: "你来人间一趟，你要看看太阳，和心爱的人走在街上 🌞", photo: "photos/scenery-10.jpg" },
  { msg: "斯人若彩虹，遇上方知有 🌈", photo: "photos/scenery-11.jpg" },
  { msg: "我携满天星辰以赠你，仍觉满天星辰不及你", photo: "photos/scenery-12.jpg" },
  { msg: "你是无意穿堂风，偏偏孤倨引山洪", photo: "photos/scenery-13.jpg" },
  { msg: "盈盈一水间，脉脉不得语",     photo: "photos/scenery-14.jpg" },
  { msg: "你站在桥上看风景，看风景的人在楼上看你", photo: "photos/scenery-15.jpg" },
  { msg: "月色与雪色之间，你是第三种绝色 ❄️", photo: "photos/scenery-16.jpg" },
  { msg: "为你，千千万万遍",           photo: "photos/scenery-17.jpg" },
  { msg: "世间美好与你环环相扣",       photo: "photos/scenery-18.jpg" },
  { msg: "你的过去我来不及参与，你的未来我奉陪到底", photo: "photos/scenery-19.jpg" },
  { msg: "情不知所起，一往而深",       photo: "photos/scenery-20.jpg" },
  { msg: "长路漫漫，与你同行，便是归途 🛤️", photo: "photos/scenery-21.jpg" },
  { msg: "这世界很暗，然后你来了，带着星星和月亮 🌙", photo: "photos/scenery-22.jpg" },
  { msg: "你是非常可爱的人，真应该遇到最好的人", photo: "photos/scenery-23.jpg" },
  { msg: "你来时冬至，但眉上风止，开口便是一个春天 🌺", photo: "photos/scenery-24.jpg" },
  { msg: "心之所向，素履以往；生如逆旅，一苇以航", photo: "photos/scenery-25.jpg" },
  { msg: "你就像黑夜，拥有寂静与群星", photo: "photos/scenery-26.jpg" },
  { msg: "我贪恋的人间烟火，不偏不倚，全都是你", photo: "photos/scenery-27.jpg" },
  { msg: "你既是狂澜，也是没人能扑灭的火花 🔥", photo: "photos/scenery-28.jpg" },
  { msg: "乍见心欢，小别思恋，久处仍怦然", photo: "photos/scenery-29.jpg" },
  { msg: "你嘴角上扬的弧度，是我此生见过最美的风景", photo: "photos/scenery-30.jpg" },
  { msg: "愿我如星君如月，夜夜流光相皎洁", photo: "photos/001.jpg" },
  { msg: "山河拱手，为君一笑",         photo: "photos/002.jpg" },
];

// ========== 系统参数 ==========
const CONFIG = {
  startDate: '2018-09-14',   // 相恋起始日 (2018-09-14)
  starCount: 100,            // 背景星星数量
  particleCount: 50,         // 爱心粒子数量
  bubbleMinDelay: 300,       // 气泡最小间隔(ms)
  bubbleMaxDelay: 900,       // 气泡最大间隔(ms)
  bubbleMinDuration: 14,     // 气泡最短动画时长(s)
  bubbleMaxDuration: 22,     // 气泡最长动画时长(s)
  initialBubbleCount: 5,     // 初始同时生成气泡数
  initialBubbleStagger: 200, // 初始气泡交错间隔(ms)
  maxBubblesOnScreen: 35,    // 同时存在的气泡上限
  carouselPhotoCount: 10,    // 3D 轮播照片数量（取前 N 张不重复照片）

  // -------- 照片闪回轮播（时间线区域） --------
  flashbackHoldMs: 4500,          // 每张照片停留时长(ms)
  flashbackEnterMs: 500,          // 照片进入动画时长(ms)，需与 CSS flashbackIn 动画一致
  flashbackLeaveMs: 350,          // 照片离开动画时长(ms)，需与 CSS flashbackOut 动画一致
  flashbackVignetteMs: 150,       // 暗角遮罩开关速度(ms)
  flashbackVisibleRatio: 0.25,    // 时间线可见比例阈值（25% 进入视口即触发）
};

// ========== 时间线事件（自定义你们的回忆，photo 用于照片闪回） ==========
const timelineEvents = [
  { date: '2018-09-14', title: '第一次相遇', emoji: '💫', photo: 'photos/scenery-01.jpg', desc: '命运让我们在茫茫人海中相遇，那天阳光正好，你的笑容照亮了我的世界。' },
  { date: '2018-10-01', title: '第一次约会', emoji: '🎬', photo: 'photos/scenery-05.jpg', desc: '一起看了电影，吃了晚餐，紧张又甜蜜。心跳加速的感觉至今难忘。' },
  { date: '2019-01-01', title: '第一次跨年', emoji: '🎆', photo: 'photos/scenery-10.jpg', desc: '一起倒数迎接新年，烟花绽放的那一刻，我知道你就是我想共度余生的人。' },
  { date: '2019-06-15', title: '第一次旅行', emoji: '🏖️', photo: 'photos/scenery-15.jpg', desc: '一起去了海边，海风很温柔，你也是。那是我们最美好的回忆之一。' },
  { date: '2020-02-14', title: '难忘的情人节', emoji: '💝', photo: 'photos/scenery-20.jpg', desc: '精心准备的惊喜让你红了眼眶，你的笑容就是我最好的礼物。' },
  { date: '2021-09-14', title: '三周年纪念', emoji: '🎂', photo: 'photos/scenery-25.jpg', desc: '三年了，每一天都像第一天一样甜蜜。感谢你一直在我身边。' },
  { date: '2023-01-22', title: '一起过春节', emoji: '🧧', photo: 'photos/scenery-28.jpg', desc: '家人围坐，灯火可亲。有你的年，才叫团圆。' },
  { date: '2024-09-14', title: '六周年快乐', emoji: '💗', photo: 'photos/001.jpg', desc: '六年时光如白驹过隙，你依然是我每天早上醒来最想见到的人。' },
];
