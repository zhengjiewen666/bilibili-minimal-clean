# B站极简净化 (Bilibili Minimal Clean)

<p align="center">
  <img src="https://img.shields.io/badge/Version-18.0-blue.svg?style=flat-square" alt="Version">
  <img src="https://img.shields.io/badge/License-MIT-green.svg?style=flat-square" alt="License">
  <img src="https://img.shields.io/badge/Platform-Tampermonkey%20%7C%20ScriptCat%20%7C%20Violentmonkey-orange.svg?style=flat-square" alt="Platform">
  <img src="https://img.shields.io/badge/Focus-Zero%20Distraction-red.svg?style=flat-square" alt="Focus">
</p>

> **告别算法投喂与无休止的信息流，还原纯粹、专注、高效的哔哩哔哩学习与搜索体验。**

---

## 📖 项目简介

在日常查阅资料、学习技术或寻找特定教程时，B 站首页铺天盖地的热门推荐、算法瀑布流与诱导性热搜榜常常打断专注思路，让人不自觉陷入“无意识刷视频”的陷阱。

**B站极简净化** 是一款专为**极简主义者、学生与科研/开发者**量身定制的油猴用户脚本。它在彻底屏蔽首页推荐信息流与广告的同时，保留了高频刚需的核心功能（如个人搜索历史、收藏夹、历史记录、消息通知及个人头像）。

---

## 📸 效果展示

### 1. 首页效果 —— 纯白极简看板
* 彻底隐藏顶部花哨大 Banner 及联动活动图，还原清新纯白顶栏。
* 中间仅保留核心搜索框，点击后**仅保留个人“搜索历史”**，彻底拔除热搜榜与输入框推荐词。
* 顶栏左侧仅保留“首页”，右侧精准移除“动态”，完整保留头像、消息、收藏、历史、创作中心及投稿按钮。
* 隐藏首页视频瀑布流与频道导航，告别无休止推荐。

![首页效果图](./screenshots/home_clean.png)

---

### 2. 搜索页效果 —— 精准拔除广告与课堂
* 搜索结果列表保持完整结构，分类标签与筛选排序正常运作。
* 精准识别并拦截带有商业广告标签（`cm.bilibili.com`）与付费课程（`cheese.bilibili.com`）的推广卡片。
* **智能白名单机制**：绝不粗暴按标题文字误杀（例如优质 UP 主标题中含有“课堂”字样的普通教学视频将完整保留，不影响正常学习检索）。

![搜索页效果图](./screenshots/search_clean.png)

---

## ✨ 核心特性

| 功能模块 | 原版体验 | 净化后体验 |
| :--- | :--- | :--- |
| **首页信息流** | 轮播大图、无限瀑布流、各类热点推荐 | 彻底清空，纯白极简空白，防止无意识刷视频 |
| **顶部大 Banner** | 各类游戏、动画宣传大图或动图背景 | 彻底隐藏，重置为雅致紧凑的纯白卡片式顶栏 |
| **搜索框交互** | 默认塞满诱导性热搜词，下拉框强推热搜榜 | 清空默认 placeholder，隐藏热搜榜，**完整保留个人真实搜索历史** |
| **顶栏导航** | 入口臃肿复杂，常驻动态红点诱导点击 | 左侧仅保留“首页”；右侧精准剔除“动态”，保留头像、消息、收藏、历史、创作中心、投稿 |
| **搜索结果** | 夹杂付费课程营销卡片与商业推广广告 | 精准拔除广告卡与付费课堂，智能保留标题含“课堂”的普通教学视频 |
| **视频播放页** | 右侧栏常驻各种推广活动横幅与游戏卡片 | 精准隐藏右侧广告位，无杂质观看 |
| **个人空间/投稿页** | 包含各种右侧推荐与活动入口 | 屏蔽右侧冗余栏，左侧核心主体内容宽度自适应 100% |

---

## 🚀 安装与使用

### 前置条件
确保你的浏览器已安装主流的用户脚本管理器扩展（任选其一即可）：
* [Tampermonkey (篡改猴)](https://www.tampermonkey.net/)（推荐）
* [ScriptCat (脚本猫)](https://scriptcat.org/)
* [Violentmonkey (暴力猴)](https://violentmonkey.github.io/)

### 安装步骤

#### 方式一：一键在线安装（推荐）
点击下方链接，脚本管理器将自动弹出安装确认界面，点击“安装”或“更新”即可：

👉 [点击安装最新版本 (bilibili-minimal-clean.user.js)](https://raw.githubusercontent.com/zhengjiewen666/bilibili-minimal-clean/master/bilibili-minimal-clean.user.js)

*(如果网络访问 GitHub 较慢，可通过镜像源安装)*：
👉 [国内加速安装链接](https://ghproxy.net/https://raw.githubusercontent.com/zhengjiewen666/bilibili-minimal-clean/master/bilibili-minimal-clean.user.js)

#### 方式二：手动导入
1. 打开浏览器脚本管理器，点击“添加新脚本”；
2. 打开本项目中的 [`bilibili-minimal-clean.user.js`](./bilibili-minimal-clean.user.js) 并复制代码；
3. 将内容完整覆盖粘贴到编辑器中，按 `Ctrl + S` 保存；
4. 刷新 Bilibili 页面即可生效。

---

## 🛠️ 技术亮点

1. **CSS 先行注入 (Zero-Flicker)**：
   脚本通过 `@run-at document-start` 在 DOM 尚未解析完成时即注入样式规则，配合页面作用域属性标记，避免页面加载瞬间出现元素闪现（FOUC）。
2. **严格作用域隔离**：
   通过动态给 `html` 注入 `data-bili-clean-page="home"` 属性，使首页专属隐藏选择器严格限定在首页，绝不影响搜索页、个人收藏夹、历史记录或播放页的正常视频卡片。
3. **Shadow DOM 深度兼容**：
   针对 B 站新版 Web Components（如 `<bili-header>` / `<bili-search-bar>`）内部的 Shadow Root 进行了穿透处理，确保占位词与顶栏在任意新版更新下稳定生效。
4. **MutationObserver 响应式巡检**：
   采用 `MutationObserver` 结合 `requestAnimationFrame` 节流调度，取代传统的暴力高频定时器，在保证异步懒加载元素秒级净化的同时大幅降低 CPU 与电池开销。

---

## 📝 更新日志

### v18.0 (终极融合版)
* 🔀 **特性融合**：整合历史版本与极致净化版全部核心功能；
* 🛡️ **智能防误杀**：重构搜索页课堂与广告过滤算法，严格保护标题含“课堂”字样的普通教学视频；
* 🎨 **顶栏细节美化**：优化纯白顶栏的字体色深、边框与搜索框阴影，保留清爽投稿粉色高光；
* ⚡ **性能飞跃**：引入事件节流调度与作用域样式隔离，杜绝卡顿与首屏闪烁；
* 🌐 **完全开源**：规范代码架构与开源说明，支持一键安装与自由定制。

---

## 📄 开源许可证

本项目基于 [MIT License](./LICENSE) 协议开源。欢迎提交 Issue 或 Pull Request！
