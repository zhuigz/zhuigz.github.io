# REQ-001 — 技术方案

状态:planning · Architect 产出 · 2026-06-12 · 输入:`prd.md` / `docs/architecture.md` / `CLAUDE.md` + 12 个内容源结构扫描
rev.1:吸收 UX 设计审查 findings(UX-001~005)

---

## 方案概述

新建单文件 `opus.html`,把 12 个内容源精华编织成一条"光的长廊"叙事弧(序章 → 底色 → 来路 → 此身 → 信念 → 远方 → 系统 → 造物 → 同行 → 终章,共 10 章)。

技术核心是一套 **chapter-driven 场景引擎**:页面被划分为 11 个全宽 `<section class="chapter" data-chapter="N" data-temp="dawn|...">`,一个 `IntersectionObserver`(单实例、`rootMargin` 取屏幕中带)判定"当前章",把当前章号写到 `<body>` 的 `data-chapter` 属性 + 一组 `:root` CSS 自定义属性(`--scene-bg`、`--scene-glow`、`--scene-ink-tint`、`--light-hue`)。**所有场景级视觉变换(背景色温、光晕色相、光效气质)由 CSS 对这几个自定义属性做 `transition` 完成,JS 只改变量,不操作样式细节** —— 这把"5 处场景级变换"这一硬验收项收敛成纯 CSS 过渡,零逐帧 JS、零布局抖动,天然满足"仅 transform/opacity 级开销"。

叙事弧用色温编码:序章冷夜微光(deep night)→ 底色暖土黄 → 来路黎明渐暖 → 此身正午金 → 信念赤焰(ember 提亮)→ 远方靛紫深空 → 系统青银冷静 → 造物金橙工坊 → 同行紫金交汇 → 终章满金收束。每章光效气质(一点光 → 暖晕 → 霞光 → 强金 → 火焰 → 星空 → 仪表辉 → 流光 → 双色交汇 → 万丈光)通过**复用 index.html 既有的光层(orb/beam/canvas/god-ray)并用 CSS 变量重新着色 + 切换 `body[data-chapter]` 作用域**实现,不为每章新写一套 canvas。

设计语言完全继承 index.html:同一套 `:root` 暖金调色板(新增的只是 `--scene-*` 动态层,叠加在既有变量之上)、衬线中文标题 + 英文眉题、`.reveal` + `IntersectionObserver` 入场、preloader → `body.loaded` 开场机制。`opus.html` 是 index 设计系统的"长篇化",非另起炉灶。

体量预算:总 HTML ≤ 400KB,其中 CSS ≈ 70KB、JS ≈ 25KB、正文 HTML ≈ 220KB、缓冲 ≈ 85KB。内容策略是**精华提取**(每章 12–28KB),不照搬源页全文。

---

## 关键决策

### KD-1 · 场景引擎:`body[data-chapter]` + `:root` 自定义属性切换,不用 per-section 背景层叠加
- **决策**:单一 observer 判定当前章 → 写 `body.dataset.chapter` + 通过给每个 `.chapter` 预设 `--temp-*` 变量、由 CSS `body[data-chapter="5"] { --scene-bg: ...; }` 规则集中定义各章色板,`body` 背景与固定光层对这些变量做 `transition: 1.2s`。
- **备选 A**:每章一个 `position:fixed` 全屏背景层,滚动时交叉淡入淡出(类似很多滚动叙事站)。**否决**:11 个 fixed 层常驻合成、移动端内存压力大,且淡入淡出需要 JS 算滚动比例驱动 opacity(逐帧),与"仅 transform/opacity 且不掉帧"冲突更难控。
- **备选 B**:用 `scroll-timeline` / `@scroll` CSS 滚动驱动动画。**否决**:浏览器支持不足(Safari 未稳),违背"性能优先、宁可砍特效"与零 polyfill 约束。
- **选它的理由**:变量切换是 O(1) DOM 写入,过渡交给 GPU 合成的 CSS transition;场景数量增加不增加运行时成本;reduced-motion 下只需把 transition 时长归零即仍可读。

### KD-2 · 章号判定:单 observer + 屏幕中带 `rootMargin`,而非 scroll 事件算比例
- **决策**:`IntersectionObserver` 监听 11 个 `.chapter`,`rootMargin: '-45% 0px -45% 0px'`(只有穿过视口中线的 section 命中),命中即设为当前章。沿用 index.html 既有 `navObs` 模式(line 1905)的思路但收紧判定带。
- **备选**:`window.scroll` + `getBoundingClientRect` 每帧算当前章。**否决**:scroll handler 逐帧跑、易掉帧,正是 PRD 第 8 条要避免的。
- **理由**:observer 回调只在跨界时触发(低频),与 index 的 `.reveal` observer 同源心智模型;中带判定避免相邻章在边界反复抖动。

### KD-3 · 内容策略:精华提取重写 + 每章体量预算,不全文照搬
- **决策**:按下方"章节内容预算表"给每章定 KB 上限与必取要素;源页里的强金句/公式/时间线节点逐字保留,过程性长解说重写压缩。
- **备选**:把 12 页正文整体合并重排。**否决**:12 页正文合计 > 900KB,远超 400KB 上限,且阅读节奏崩坏(kickoff 已识别为风险)。
- **理由**:PRD 验收第 2 条要"可溯源"(强金句逐字留即可抽查溯源)、第 9 条要 ≤400KB,精华提取同时满足两者。

### KD-4 · 光效:复用 index 既有光层 + 变量重着色,不为每章造新 canvas
- **决策**:全局保留**一个** `lightCanvas`(金粉粒子,沿用 index line 2007 实现),其颜色数组改为读 `--light-hue` 或按章切色;orb/beam/god-ray 用 CSS 变量染色,随 `body[data-chapter]` 变气质。终章可叠一层"光线收束"纯 CSS 动画。
- **备选**:每章独立 canvas/独立粒子系统体现不同光效。**否决**:多 canvas 同时运行直接违背性能硬约束;体量也会膨胀。
- **理由**:一个粒子系统 + 变量着色已能表达"光的演变";canvas 在非序章/终章可按可见性 `stop()`(沿用 index 的 visibility/opacity 停机逻辑)省电。

### KD-5 · 全局导航:桌面固定侧栏 rail + 顶部细进度条;**移动端(≤768px)固定顶部"章名条"承接 rail 职责**
- **决策(桌面 >768px)**:右侧固定一列 11 个章节圆点 `.chapter-rail`,当前章高亮(由 `body[data-chapter]` CSS 驱动,无需 JS 逐个 toggle),点击 `scroll-behavior:smooth` 跳转到对应 `#chapter-N`;顶部复用 index 的 `.scroll-progress` 细条。
- **决策(移动端 ≤768px)— 锁定"顶部固定章名条"方案,非底部抽屉**:768px 隐藏侧栏 rail,改由一条 `position:fixed; top:0` 的薄章名条 `.chapter-bar`(常驻、贴在顶部进度条下方)接管验收第 5 条:
  - **"可见当前章"**:章名条左侧显示形如「Ⅴ · 远方」的当前章名,**通过 CSS `body[data-chapter="N"] .chapter-bar .bar-name::after{ content:"…" }` 切换**(11 组规则,与 rail 高亮同一套 `body[data-chapter]` 驱动机制,零额外 JS、零文本同步逻辑)。
  - **"可跳任意章"**:章名条右侧一个 `▾` 按钮,点击 `.chapter-bar` 加 `.open` 类展开为一张覆盖式章节清单(11 个锚点链接 `#ch0`–`#ch9`),点任一项经 `scroll-behavior:smooth` 跳转后由一行 JS 移除 `.open`。展开/收起是唯一新增的极小 JS(一个 click toggle),不引入抽屉手势/拖拽。
- **二选一理由(顶部章名条 vs 底部抽屉)**:① **常驻可见性**——顶部章名条平时即显示当前章名,满足"任意位置可见当前章"无需任何交互;底部抽屉收起态通常只剩一个把手,当前章名默认不可见,需多一次交互才满足验收第 5 条前半句,体验更弱。② **机制同源**——章名文本由 `body[data-chapter]` 的 CSS `content` 切换,与桌面 rail 高亮复用同一驱动,无需 JS 写文本、与场景引擎天然同步;底部抽屉同样能复用,但其展开动画/手势更易引入逐帧 JS,与性能硬约束相悖。③ **不挡正文**——顶部薄条(~40px)与既有 `.scroll-progress` 同侧叠放,视觉负担小;底部抽屉把手会与移动端阅读区底部冲突。④ **与桌面隐喻一致**——顶部进度条 + 顶部章名,纵向 rail 在桌面、顶部条在移动,两者都强调"线性走过长廊",心智统一。
- **备选(整体)**:复用 index 顶部横向 `.nav` 链接条。**否决**:10 章 + 中文标题塞顶栏在 768px 下溢出;且长叙事更适合纵向进度隐喻("走过长廊")。
- **理由**:rail 高亮与移动端章名切换均为纯 CSS(`body[data-chapter="N"] …{...}`),仅移动端展开 toggle 一处一行 JS;桌面与移动端各有明确产物,共同满足验收第 5 条"任意位置可见当前章 + 可跳任意章"。

### KD-6 · 单文件内部组织:CSS 分段注释规约 + JS 多 IIFE 模块规约
- **决策**:CSS 用 `/* ===== [00] TOKENS ===== */` … `[10] RESPONSIVE` … `[11] REDUCED-MOTION` 固定编号分区;JS 拆为独立 IIFE 模块(`preloader` / `sceneEngine` / `revealObserver` / `chapterRail` / `lightCanvas` / `countUp` / `timeline` / `copyWechat`),每个模块开头一行注释说明职责与依赖,文件末尾一个 `init()` 不做(各 IIFE 自启,沿用 index 风格)。
- **理由**:4000+ 行单文件可维护性靠"可 grep 的分区锚点 + 单一职责 IIFE";与 index.html 现有风格一致,Dev 心智零迁移。

---

## impact_scope

- **ux_surface: yes** — 新增一个完整的沉浸式叙事页面,是站点最大的视觉/交互新表面;但不改动任何既有页面 UX。
- **product_contract_change: no** — 不改任何既有页面契约;`index.html` 零改动(验收第 1 条),不新增站内链接(验收第 10 条),不动既有页面的内容承诺。新页是纯增量。
- **structural_change: yes** — 引入站点新形态"全站内容整合页",`docs/architecture.md` 第 22 行已预告此形态由本 tech-design 定义,落定后需回写架构基线(回写动作属 Conductor/PM,非本方案文件)。
- **scope_tradeoff: yes** — 主动取舍:内容用"精华提取"而非全文(KD-3)、光效"一套 canvas 复用"而非每章独立(KD-4)、场景用"变量切换"而非多 fixed 层(KD-1),三处都是"砍特效/砍体量保性能与可维护性",符合 PRD"性能优先于特效堆砌"。

---

## 章节内容预算表(精华提取地图 · 供 Dev 取材)

| 章 | 锚点 | 主源 | 必取精华(逐字保留项已标 ★) | 形态 | KB 预算 |
|---|---|---|---|---|---|
| 序章 追光者 | `#ch0` | index hero | 姓名/别名/使命/座右铭**重新演绎**(★"道阻且长,行则将至;行而不辍,未来可期")。不照搬 index hero 版式 | 全屏破暗开场 + 一点光 | ≤16 |
| 一 底色 | `#ch1` | life_undertone | 七色光谱"底色"中心隐喻;3 大理想(FIRE/复兴/共产主义·AI奇点);★"追光的人,终会光芒万丈";数字密码 525·我爱我 | 色谱条 / 标签云 | ≤24 |
| 二 来路 | `#ch2` | life | 四幕时间线节点:萌芽2007–19 / 群星闪耀209班·李青老师 / 月亮与星辰·人大梦·高考567 / 密度迸发·华农·公众号90万·汤圆。★"把目标定在月亮,最差也不过迷失在星辰之间" | 垂直时间线(光点串) | ≤28 |
| 三 此身 | `#ch3` | index about/metrics/practice | ENFJ-A/华农公管/团支书;9 宫数据墙(100W+/5000+/820H+/500+/10+/100天+/20+/7条+/30次+,count-up);7 件实践行 | 信息卡 + 数据墙 + 实践行 | ≤26 |
| 四 信念 | `#ch4` | index beliefs + 各页金句 | ★8 条信念逐字(世界不死理想不灭…追光的人终将光芒万丈);可吸收 prosper/growth 散落金句 | 编号宣言行 | ≤16 |
| 五 远方 | `#ch5` | ideal + fire | 三级目标(FIRE 300–1000万/2050复兴/∞奇点·共产主义);★FIRE 25×·4%·72;★"以时间为舟…长期主义为帆" | 三级阶梯 + FIRE 数字 | ≤28 |
| 六 系统 | `#ch6` | growth+system+prosper | ★繁荣公式"反向思维×高三状态×AI杠杆×长期主义=人生繁荣"(只放一次);成长机器五子系统(引擎/燃料/轮子/涡轮/方向盘);人生系统八模块作骨架 | 公式 + 五子系统卡 | ≤30 |
| 七 造物 | `#ch7` | idop+workflow+hkrr | IDOP 四阶段(输入·沉淀·输出·产品);HKRR 四变量(相乘)作质量门;LSA 工作流三格式 + 80/85/90 分层。★"IDOP 管流程,HKRR 管质量""AI 提供廉价变异,IDOP 提供复利进化" | 飞轮 + 四变量 + 质量梯 | ≤30 |
| 八 同行 | `#ch8` | know-ai | 中心论点"不是替代你,是放大你";★"用 AI 放大了你不可复制的那部分:判断/审美/经历/信任";★"我在前面等你…等你追上昨天的自己";7 级台阶 | 书信体 + 台阶 | ≤22 |
| 终章 成为 | `#ch9` | index become/connect | ★"我想成为一个既清醒又热烈的人…"全诗;收束整条弧;微信 czy18534901307 + 复制按钮 | 居中诗 + 联系卡 + 满金收束 | ≤16 |

注:索引页 `assets/gallery/` 既有图可在三/七章作视觉点缀,**必须保留 index 既有的 `onerror` 占位降级**(缺图不崩)。

### 禁止重复项清单(去重硬约束 · 可逐项勾验 · 替代"原则性陈述")

下列要素在全页**有且仅有一个权威出现章节**。Dev 提取时逐项对照,运行时验收(UX Evaluator 模式 B)按本清单逐条核查;凡在"唯一章节"以外的任何章再次成段陈述同义内容,即判去重失败。

| # | 要素 | 唯一出现章节 | 权威形态 / 字数上限 | 其余章节的允许动作 |
|---|---|---|---|---|
| D1 | **繁荣公式**「反向思维 × 高三状态 × AI 杠杆 × 长期主义 = 人生繁荣」 | 仅 `#ch6` 第一屏 | 完整公式逐字一次 | 其它章一律不得复述公式整体;最多以单个词(如"长期主义")作引用,不展开 |
| D2 | **AI 杠杆** | 仅 `#ch6`(哲学层一句引用) | ≤1 句,定位为繁荣公式的一个乘子 | `#ch7`(造物)只谈 IDOP/HKRR/AI 的"廉价变异·复利进化",`#ch8`(同行)只谈"放大而非替代"——二者均**不得**再下"AI 是杠杆"的定义性论断 |
| D3 | **长期主义** | 仅 `#ch6`(哲学层一句引用) | ≤1 句 | `#ch5`(远方)可保留 ★"以时间为舟…长期主义为帆"金句(诗化金句,非定义陈述,不算重复);其余章不得再展开"为什么要长期主义" |
| D4 | **IDOP↔HKRR 关系**「IDOP 管流程,HKRR 管质量」 | 仅 `#ch7` | ★金句逐字一次 + 一句关系说明 | 其余章不得重述二者分工 |
| D5 | **成长机器五子系统**(引擎/燃料/轮子/涡轮/方向盘) | 仅 `#ch6` | 每项**详解 ≤3 句** | 不在其它章复列五子系统;不与人生系统八模块互相解释对方 |
| D6 | **人生系统八模块** | 仅 `#ch6`(作结构骨架,列名为主) | 列名 + 极简注解,不逐模块长解说 | 不在其它章重列 |
| D7 | **FIRE 数字**(25× / 4% / 72;300–1000 万) | 仅 `#ch5` | 静态强调字一次(25/4/72 为定值,不 count-up) | 其余章不重复 FIRE 公式数字 |
| D8 | **"追光的人,终会/终将光芒万丈"** | 序章/`#ch1`/`#ch4` 信念中**择一**逐字落点(建议归 `#ch4` 信念条) | 逐字一次 | 其余两处不得重复同句(避免金句通胀) |

> 验收勾验法:对 D1–D8 逐行在成稿中全文检索关键词,确认命中章节集合 = 上表"唯一出现章节"。任一要素命中多于一个权威落点即为不合格,需回到对应章删重。

---

## Phase / Task 拆解

原则:产物是单个 `opus.html`,**每个 Phase 结束页面都能独立打开、自洽可读**。Task 粒度 = 单区块或单 JS 模块的独立变更集。

### Phase 1 · 骨架 + 设计系统 + 场景引擎 + 序章(Phase 结束:一个能打开、有完整光层和序章、可滚但只有 1 章的页面)

- **T1.1 文件骨架与 `<head>`**:建 `opus.html`,`lang="zh-CN"`、`<title>`/`<meta description>`、字体 link(复制 index 第 8–10 行那串)、空 `<style>`/`<script>` 容器、CSS 分区注释骨架([00]–[11])。
  - *注意事项*:字体 link 是唯一允许的外链(architecture 硬约束);务必把 `display=swap` 保留,避免首屏空白。不要引入 index 没有的字体家族,以免体量上涨。
- **T1.2 移植 `:root` token + 新增 `--scene-*` 动态层**:逐字复制 index 第 14–48 行 `:root`(变量名一字不改,architecture 第 9 行硬约束),追加 `--scene-bg/--scene-glow/--scene-ink-tint/--light-hue` 及其 `transition`。
  - *注意事项*:`--scene-*` 默认值要等于序章色板,避免首帧闪色。`transition` 只加在 `body` 背景与固定光层上,**不要给 `:root` 整体加 transition**(会让无关属性也过渡,产生意外动画)。
- **T1.3 全局贴层移植**:preloader、`.grain`、`.scroll-progress`、`.bg-glow`(orb×3)、`lightCanvas`、`.cursor-glow` 从 index 复制并接入 `--scene-*` 着色。
  - *注意事项*:index 的 orb/beam 用了硬编码 rgba(如第 123 行),移植后要改为引用 `--scene-glow` 才能随章变色;`.grain` 的 base64 SVG 体积约 0.5KB,可保留。`lightCanvas` 的 `colors` 数组(index 第 2024 行)后续 T?? 要改成按章着色,本 task 先原样移植。
- **T1.4 场景引擎 IIFE(`sceneEngine`)**:单 observer,`rootMargin:'-45% 0px -45% 0px'`,命中即写 `body.dataset.chapter`;各章色板用 CSS `body[data-chapter="N"]{ --scene-bg:…; --light-hue:…; }` 集中定义(11 组)。
  - *章高保障(应对短章双命中,UX-002)*:**所有 `.chapter` 统一 `min-height:100svh`,并在其前一行写 `min-height:100vh` 作兜底**(`svh` 在旧 Safari/旧 Android WebView 不支持,CSS 同属性后写覆盖前写,支持 `svh` 的浏览器取 `svh`、不支持的回落到 `vh`,无需 `@supports`)。短章(序章/信念/终章,正文 ≤16KB)靠此保证至少占满一屏纵深,使其必然"穿过视口中线"而不会与相邻章同处中带,从源头压低双命中概率。用 `min-height` 而非 `height`,横屏矮屏内容超过一屏时仍可正常撑高、不裁切(与 T5.3 一致)。
  - *章号判定去抖(UX-002)*:observer 回调里**不直接写 `body.dataset.chapter`**,而是:① 在回调中维护一个"当前所有 `isIntersecting` 的 `.chapter`"集合,选其中 `intersectionRatio` 最大者作为候选章号 `next`;② 用 **`ratio 最大者 + 150ms 去抖**提交**——把 `next` 暂存,清除上一个 `setTimeout`,150ms 后若 `next` 与已写入的 `body.dataset.chapter` 不同才真正写入(尾沿去抖 trailing debounce)。这样"同帧两个 entry 均 `isIntersecting`"或"边界处短时间内连续翻动"只会触发**一次** `dataset.chapter` 写入、一次 `transition: 1.2s`,杜绝背景在 1.2s 内连跳两个色温值的闪烁。150ms 远小于人眼对章节切换的预期延迟、又足以吞掉边界同帧抖动。
  - *其余注意事项*:observer 回调可能同时有多个 entry,候选必须取 `isIntersecting` 且 `intersectionRatio` 最大者(上面去抖逻辑已含此选择)。`data-chapter` 初值在 HTML 上写死为 `0`,防止 JS 未跑时无背景。**reduced-motion 下把 `--scene-*` 的 transition 时长在 CSS `@media` 里归零,切换仍发生但瞬时**,保证信息不丢(去抖逻辑保留,只是过渡瞬时)。
- **T1.5 序章 `#ch0` 区块**:破暗开场(可复用 preloader 一点光语汇放大),姓名 per-glyph 渐显、别名、使命、★座右铭;**重新演绎,不复制 index hero 的 DOM**。
  - *注意事项*:hero 入场动画依赖 `body.loaded`(index 第 1806 行机制),必须保留 preloader IIFE 才能触发;per-glyph 用 `.glyph` 渐显时,`animation-delay` 逐字递增不要超过 ~0.8s 总时长,否则开场拖沓。序章 `data-temp` 设为最冷,作为色温弧起点。

### Phase 2 · 前段叙事(一·底色 / 二·来路 / 三·此身)(Phase 结束:序章+前三章可读,色温从冷夜→暖土→黎明→正午金已能看出场景演变 ≥3 处)

- **T2.1 章壳模板 + reveal 移植**:定 `.chapter` 通用骨架(章号眉题 `.section-label` + `.section-title` + `.divider`),移植 index `.reveal/.reveal-stagger` CSS(第 456–471 行)与 `revealObserver` IIFE(第 1887–1900 行,含 count-up 触发)。
  - *注意事项*:`revealObserver` 必须 `unobserve` 已触发元素(index 第 1896 行),长页 reveal 元素会很多,不解绑会持续回调。count-up 逻辑(`animateCount`)依赖 `data-num`/`data-suffix`,三章数据墙要照搬这套属性名。
- **T2.2 一·底色 `#ch1`**:七色光谱中心隐喻 + 3 大理想 + ★金句 + 525 数字密码。色温暖土黄。
  - *七色谱实现锁定(UX-005)*:**七色光谱用单个 `conic-gradient`(单元素方案)实现,禁止用 7 个独立色块 `div`**。即一个 `.spectrum` 元素,`background: conic-gradient(from 0deg, …七个色标…)`(或表达"底色弧"语义时用 `linear-gradient`,同样单元素),色相在一条渐变里连续过渡,既给出"红橙黄绿青蓝紫"的可区分七色观感,又**不需要为缺失的红/橙单独声明硬编码变量**。理由:① 渐变是单一 CSS 声明,色值集中可控、不散落成 7 个调色板例外;② 连续色相比 7 个硬色块更贴合"光谱"语义;③ 单元素 DOM 更省体量(盯住 ≤24KB)。
  - *渐变色标取色约束*:渐变内部各角度色标**优先引用调色板内变量**——暖端用 `--ember`(红橙)→ `--gold`/`--gold-light`(黄金)→ 冷端用 `--accent-sage`(绿)→ `--accent-teal`(青)→ `--accent-violet`(蓝紫)串成一圈;确需补的中间过渡色应通过对上述变量做 `color-mix(in srgb, var(--a), var(--b))` 插值得到,**不写调色板外的裸 hex/rgb 硬编码色块**。这样"红"与"橙"由 `--ember`→`--gold` 区间承担,无需新增独立变量。
  - *其余注意事项*:reduced-motion 下光谱**静止呈现**即可(渐变本身无需 animation;若加旋转/流动效果须进 `@media reduce` 关闭)。体量盯住 ≤24KB,光谱别堆太多装饰 DOM。
- **T2.3 二·来路 `#ch2` 时间线**:四幕节点垂直时间线 + ★"把目标定在月亮…"。`timeline` IIFE(若用滚动点亮)或纯 `.reveal` 逐点入场。色温黎明渐暖。
  - *注意事项*:时间线节点入场只用 `.reveal`(opacity/translateY),**不要用 scroll 比例驱动连线绘制的逐帧动画**;若要"光点沿线下行"效果,用 CSS `@keyframes` + `transform`,不用 JS 算滚动。节点多(4 幕可拆 ~10 子节点),注意 reveal-stagger 的 nth-child 延迟超过 11 个会走 `n+12` 兜底(index 第 471 行),长时间线要分组包裹避免末节点延迟过久。
- **T2.4 三·此身 `#ch3`**:info-card(ENFJ-A/华农/团支书)+ 9 宫数据墙(count-up)+ 7 实践行。色温正午金。移植 index `.info-card/.metric-cell/.practice-row/.tilt` 相关 CSS 与 `tilt` IIFE。
  - *注意事项*:`.tilt` IIFE(index 第 1836 行)在 `hover:none` 直接 return,移动端不生效是预期;count-up 的 9 个 `data-num` 值要与 index 数据墙一致(100/5000/820/500/10/100/20/7/30 及各 suffix)以保可溯源。数据墙是本章体量大头,9 cell × 描述,盯住 ≤26KB。

### Phase 3 · 中段叙事(四·信念 / 五·远方 / 六·系统)(Phase 结束:七章可读,赤焰→靛紫→青银的强对比场景变换到位,场景级变换累计 ≥5 处达成验收第 4 条)

- **T3.1 四·信念 `#ch4`**:★8 条信念逐字编号宣言行 + 可吸收金句。色温赤焰(ember 提亮,光效最"热")。移植 index `.manifesto-row`。
  - *注意事项*:8 条信念是 PRD 第 2 条可溯源抽查点,**必须逐字**(含 emoji 🌳✨);ember 提亮通过临时调高 `--scene-glow` 里 ember 占比实现,别新写一套火焰 canvas(KD-4)。
- **T3.2 五·远方 `#ch5`**:三级目标阶梯(300–1000万/2050/∞)+ ★FIRE 25×·4%·72 + ★"以时间为舟…"。色温靛紫深空(光效转"星空")。
  - *注意事项*:FIRE 三个数字可复用 count-up,但 25/4/72 是定值不是"涨到"的量,语义上更适合静态强调字而非 count-up,避免误导。三级阶梯版式在 880/768 要能纵向堆叠。
- **T3.3 六·系统 `#ch6`**:★繁荣公式(只出现一次)+ 成长机器五子系统卡 + 人生系统八模块骨架。色温青银冷静(光效"仪表辉")。
  - *注意事项*:三源(growth/system/prosper)**最大去重风险**——本章须严格对照上文「禁止重复项清单」D1–D6 逐条落实:繁荣公式仅 `#ch6` 第一屏一次(D1)、AI 杠杆/长期主义各仅一句哲学层引用(D2/D3)、五子系统每项详解 ≤3 句(D5)、八模块以列名为主不长解说(D6)。AI 杠杆/长期主义不再按"三段分层"展开,统一收敛为哲学层单句引用,避免同义重复。这是全页 KB 预算最紧的一章(≤30),五子系统卡用紧凑卡片不要长段解说。

### Phase 4 · 后段叙事 + 收束(七·造物 / 八·同行 / 终章·成为)(Phase 结束:10 章全齐,叙事弧完整可一气呵成读完)

- **T4.1 七·造物 `#ch7`**:IDOP 四阶段飞轮 + HKRR 四变量质量门 + LSA 三格式/分层。色温金橙工坊(光效"流光")。
  - *注意事项*:idop/workflow/hkrr 是三个最大源文件(96–111KB),提取时极易超 KB;只取四阶段定义/四变量定义/分层数字 + 两条★金句,**workflow 的 18 步短视频流程整段舍弃**(过程性细节,非叙事必需)。飞轮动画用 CSS `@keyframes` 旋转(transform),不用 JS。
- **T4.2 八·同行 `#ch8`**:书信体"放大而非替代" + ★两条金句 + 7 级台阶。色温紫金交汇(双色光效交汇,呼应"同行")。
  - *注意事项*:book-letter 体的长段落要控制行宽(`max-width` ~62ch)保证可读;7 级台阶在移动端纵向堆叠。双色交汇用 `--scene-glow` 同时混 violet+gold,这是验收第 4 条"版式/光效整体演变"的一处亮点,别省。
- **T4.3 终章·成为 `#ch9`**:★"我想成为…"全诗居中 + 联系卡(微信 czy18534901307 + 复制按钮)+ 满金收束。移植 index `copyWechat` IIFE(第 1915 行)。色温满金(光线收束 CSS 动画)。
  - *注意事项*:`copyWechat` 依赖固定 id(`copyBtn`/`wechatId`),移植时 id 不能与本页其他元素冲突;诗逐字保留;"满金收束"可叠一层纯 CSS 径向光,**收束动画也要进 reduced-motion 降级**(静止仍是满金底)。

### Phase 5 · 全局打磨(Phase 结束:三档断点完整、reduced-motion 全可读、体量 ≤400KB、rail 可用)

- **T5.1 章节导航 rail + 顶部章名条 + 进度条(桌面与移动两套产物一并落地)**:右侧 `.chapter-rail` 11 点(当前章 CSS 高亮 by `body[data-chapter]`)+ 点击平滑跳转;接通顶部 `.scroll-progress`(复用 index 第 1857–1867 行 scroll handler)。**同 task 内一并产出 KD-5 锁定的移动端 `.chapter-bar`**:在页面顶部贴一条 `position:fixed; top:0` 的 `.chapter-bar`,内含左侧 `.bar-name`(当前章名)+ 右侧 `▾` 展开按钮 + 覆盖式 `#ch0`–`#ch9` 锚点清单;桌面(>768px)`.chapter-bar` 默认 `display:none`,其显隐切换由 T5.3 在 768px 断点接管。
  - *注意事项*:rail 高亮与章名条章名**全程 CSS 驱动**——rail 用 `body[data-chapter="N"] .rail-dot[data-go="N"]` 高亮、章名用 `body[data-chapter="N"] .chapter-bar .bar-name::after{content:"…"}`(11 组规则),二者同源,**均不为每章写 JS toggle**;跳转用锚点 + `html{scroll-behavior:smooth}`(index 第 50 行已有),无需 JS 平滑。`.chapter-bar` 的展开/收起是 `chapterRail` IIFE 内唯一新增 JS(`▾` click 给 `.chapter-bar` 加/去 `.open` 类,点锚点后移除 `.open`),桌面移动共用此一处。`scroll-progress` handler 是全页唯一 scroll 监听,务必 `{passive:true}`。
- **T5.2 lightCanvas 按章着色 + 分级停机策略(UX-004)**:把 canvas `colors` 数组改为随 `body[data-chapter]` / `--light-hue` 取色;运行密度按章分三级,**不对中间章做完全停机**。
  - *运行密度三级(UX-004 锁定 · 保住终章高潮)*:canvas 始终保持运行的事件循环,仅按当前 `body.dataset.chapter` 调节**目标粒子数**:
    - **高密度档**——序章 `#ch0` **或**终章 `#ch9` 可见时:满密度运行(桌面 ~80、移动 ≤30),用于序章"破暗一点光"与终章"万丈光收束"两处光效高潮。
    - **低密度档**——中间章(`#ch1`–`#ch8`)可见时:**低密度运行而非全停**(桌面 ≤24、移动 ≤12),保留"光母题贯穿"的微弱粒子底,避免熄灭。
    - **完全停机档(`stop()`)**——仅当页面整体不可见(`document.visibilityState === 'hidden'`,即切到后台标签页/最小化)时才停 `requestAnimationFrame` 省电;**任何叙事章节都不触发 `stop()`**。
  - *终章必然点亮(UX-004 核心)*:因为中间章只是降密度、循环从不停,**用户从六章/七章直接点 rail 跳到终章 `#ch9` 时,场景引擎一改 `body.dataset.chapter` 即把目标粒子数拉回高密度档**,canvas 在数帧内补满金粒子,"满金收束"光效必然呈现,杜绝"从中部跳章到终章时光效缺席"。密度切换用平滑增减(每帧逼近目标值)而非瞬时增删,避免跳章时粒子数突变的视觉跳点。
  - *注意事项*:index 的 canvas opacity 绑定"首屏滚动比例"(第 2129 行)**必须废弃**——长页直接移植会导致滚过首屏后粒子永久消失(R4);改为上面的"按当前章号取密度档"判定,opacity 恒为可见态、由密度而非 opacity 表达强弱。`particleCount()` 在长页要更保守(各档上限见上,移动端整体更低)。reduced-motion 下 canvas 整体 return(index 第 2010 行已有),此时光母题靠 T5.4 的静态径向光晕承载,不依赖粒子。
- **T5.3 三档断点 + 移动端导航交接(UX-001)**:`@media (max-width:1024px / 880px / 768px)` 逐章检查:数据墙 2 列、阶梯/五子系统/台阶纵向堆叠、时间线收窄、768px 关 cursor-glow。**768px 处把桌面 `.chapter-rail` `display:none`,同时把 KD-5 锁定的顶部固定章名条 `.chapter-bar` 由 `display:none`(>768px 时隐藏)切为 `display:flex`** —— 二者是同一断点处的互斥交接,任一断点都恰有一种导航在场,杜绝"两者皆无"的缺口。
  - *验收第 5 条移动端实现路径(UX-001 锁定 · 顶部章名条,非底部抽屉)*:
    - **"任意位置可见当前章"**:`.chapter-bar` `position:fixed; top:0`(贴在顶部 `.scroll-progress` 之下),左侧 `.bar-name` 常驻显示当前章名,文本由 `body[data-chapter="N"] .chapter-bar .bar-name::after{content:"Ⅴ · 远方"}`(11 组规则)纯 CSS 切换 —— 与桌面 rail 高亮、场景引擎同源驱动,无需 JS 写文本、与背景色温天然同步,滚动到任一章无需任何交互即见当前章名。
    - **"可跳任意章"**:`.chapter-bar` 右侧 `▾` 按钮,点击给 `.chapter-bar` 加 `.open` 类,展开为覆盖式 11 锚点清单(`#ch0`–`#ch9`),点任一项经 `html{scroll-behavior:smooth}` 跳转后由一行 JS(`chapterRail` IIFE 内的 click toggle,移动端复用)移除 `.open`。这是移动端唯一新增的极小 JS,不引入抽屉手势/拖拽,与性能硬约束一致。
  - *注意事项*:对照 index 既有断点行为(第 1128/1136/1152 行)保持一致;顶部进度条 `.scroll-progress` 三档全程保留,与 `.chapter-bar` 同侧叠放(条高 ~40px 不挡正文)。每章 `min-height` 在矮屏(横屏手机)用 `min-height` 而非 `height`(与 T1.4 的 `100svh`+`100vh` 兜底一致),内容超一屏时正常撑高不裁切。
- **T5.4 reduced-motion 全量降级 + 体量审计**:补 `@media (prefers-reduced-motion: reduce)` 覆盖所有新 keyframes/transition(场景 transition 归零、canvas 已 return、飞轮/光束停);用 `wc -c opus.html` 确认 ≤400KB。
  - *注意事项*:验收第 7 条要"无依赖动画才能呈现的信息"——逐字检查每章:有没有内容只在 `:hover`/动画末态可见(如 practice-row 的 `data-ghost` 悬停文本不能承载关键信息)。体量若逼近上限,优先压缩重复的内联 style、合并相似 CSS 规则,不要删内容金句。

---

## 风险与陷阱

- **R1 · 体量超 400KB(高)**:七章源文件最大(idop/workflow/hkrr 三源 ~310KB)。缓解:严格执行预算表 KB 上限;workflow 18 步流程整段舍弃;CSS 用编号分区便于查重合并;Phase 5 末做 `wc -c` 硬审计,逼近时压缩内联 style 而非删金句。
- **R2 · 场景 transition 与 reduced-motion 冲突(中)**:若把 transition 写死在 `body`,reduced-motion 下背景会"动"。缓解:transition 时长用 CSS 变量 `--scene-tr`,`@media reduce` 里置 0,切换仍发生但瞬时(KD-1/T1.4 已设计)。
- **R3 · 章号判定在边界抖动 / 短章双命中(中,UX-002)**:相邻章交界处两个 section 同时部分可见,章号来回跳→背景在 1.2s 内连跳两色温闪烁;短章(序/信念/终)更易与相邻章同处中带。缓解:`rootMargin` 中带判定(只命中穿过中线者)+ 取 `intersectionRatio` 最大者 + **150ms 尾沿去抖**(同帧/短时连命中只提交一次写入)+ **所有 `.chapter` `min-height:100svh`(`100vh` 兜底)** 保证短章占满纵深(T1.4 已锁定)。
- **R4 · lightCanvas 长页 opacity 逻辑失效 / 终章光效缺席(中,UX-004)**:index 的 canvas opacity 绑首屏滚动,直接移植会导致滚过首屏后粒子永久消失;若改为中间章全停,则从中部跳终章时"满金收束"光效缺席。缓解:T5.2 锁定**三级密度**(序/终高密度、中间章低密度不全停、仅页面 hidden 时 `stop()`),废弃首屏 opacity 判定,跳到终章即拉回高密度,终章光效必然点亮。
- **R5 · 内容去重不彻底(中,UX-003)**:六章三源、七章三源,繁荣公式/AI 杠杆/长期主义/IDOP-HKRR 关系易重复陈述。缓解:预算表后的**「禁止重复项清单」D1–D8**(可逐项勾验的硬约束,替代原则性陈述)+ T3.3/T4.1 逐条落实;运行时验收按 D1–D8 全文检索核查。
- **R6 · 移动端导航可见性(低,UX-001)**:768px 隐藏 rail 后违反验收第 5 条。缓解:KD-5/T5.1/T5.3 锁定 **768px 处 `.chapter-rail`→`.chapter-bar` 互斥交接**——顶部固定章名条常驻显示当前章名(`body[data-chapter]` CSS 切 `content`)+ `▾` 展开跳任意章,任一断点恰有一种导航在场。
- **R7 · index hero 入场依赖 `body.loaded`(低)**:序章若漏移植 preloader IIFE,per-glyph 动画不触发。缓解:T1.5 注意事项已锁定依赖。
- **R8 · 性能回归不可逐帧验证**:零构建无自动化性能测。缓解:方案已把所有运行时动画收敛到 CSS transform/opacity + CSS transition + 单 observer(无逐帧 scroll 驱动样式),从架构上规避掉帧;唯一 scroll handler 仅更新进度条宽度且 `passive`。
