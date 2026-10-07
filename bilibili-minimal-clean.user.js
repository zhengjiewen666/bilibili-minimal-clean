// ==UserScript==
// @name         B站极简净化 - 纯净专注终极版
// @namespace    https://github.com/zhengjiewen666/bilibili-minimal-clean
// @version      18.0
// @description  保留搜索历史；清空搜索框默认推荐词；隐藏热搜榜；隐藏首页所有推荐视频与轮播图；隐藏首页频道分类导航栏；隐藏个人空间投稿页右侧栏；精准拔除搜索页及视频播放页右侧广告、课堂卡片；彻底隐藏首页顶部大背景/横幅联动推广；顶栏左侧强行只留“首页”，右侧精准拔除“动态”（保留头像及常用功能）
// @author       removing400 / zhengjiewen666
// @match        *://www.bilibili.com/*
// @match        *://space.bilibili.com/*
// @match        *://search.bilibili.com/*
// @run-at       document-start
// @grant        GM_addStyle
// @license      MIT
// ==/UserScript==

(function () {
  'use strict';

  // 1. 页面类型判定
  const isHomePage = () => {
    const path = window.location.pathname;
    return window.location.hostname === 'www.bilibili.com' && (path === '/' || path === '/index.html');
  };

  const isSpacePage = () => {
    return window.location.hostname === 'space.bilibili.com';
  };

  const isSearchPage = () => {
    return window.location.hostname === 'search.bilibili.com';
  };

  const isVideoPage = () => {
    return window.location.pathname.startsWith('/video/');
  };

  // 给首页打上标记，实现精准 CSS 作用域隔离，绝不误伤搜索页与播放页卡片
  const markPageType = () => {
    if (isHomePage()) {
      document.documentElement.setAttribute('data-bili-clean-page', 'home');
    } else if (isSearchPage()) {
      document.documentElement.setAttribute('data-bili-clean-page', 'search');
    } else if (isSpacePage()) {
      document.documentElement.setAttribute('data-bili-clean-page', 'space');
    } else if (isVideoPage()) {
      document.documentElement.setAttribute('data-bili-clean-page', 'video');
    }
  };

  markPageType();

  // 2. 全局高优先级 CSS 注入（零闪烁体验）
  const css = `
    /* ==========================================================================
       1. 搜索框与下拉推荐：干掉热搜榜，保留搜索历史，无视默认推荐占位词
       ========================================================================== */
    .search-panel .trending,
    .search-panel .hot-search,
    .trending-wrap,
    div[class*="trending"],
    div[class*="hot-search"] {
        display: none !important;
    }

    /* 搜索栏在纯白底色下的对比度与圆角优化 */
    .bili-header .nav-search-content,
    .bili-header form[id*="nav-searchform"] {
        background-color: #f1f2f3 !important;
        border: 1px solid #e3e5e7 !important;
        border-radius: 8px !important;
    }

    /* ==========================================================================
       2. 首页布局净化：隐藏中间频道分类导航栏
       ========================================================================== */
    .bili-header__channel,
    div[class*="header__channel"],
    .channel-icons,
    .channel-links,
    .channel-entry-more {
        display: none !important;
    }

    /* ==========================================================================
       3. 首页推荐视频信息流、大轮播图及瀑布流彻底清除（严格首页作用域）
       ========================================================================== */
    html[data-bili-clean-page="home"] main.bili-layout,
    html[data-bili-clean-page="home"] #i_ce_home,
    html[data-bili-clean-page="home"] .bili-feed-layout,
    html[data-bili-clean-page="home"] .bili-feed-gallery,
    html[data-bili-clean-page="home"] .recommended-container,
    html[data-bili-clean-page="home"] .recommended-swipe,
    html[data-bili-clean-page="home"] .feed-card,
    html[data-bili-clean-page="home"] .feed-roll-btn,
    html[data-bili-clean-page="home"] .bili-video-card,
    html[data-bili-clean-page="home"] div[class*="feed-layout"],
    html[data-bili-clean-page="home"] div[class*="feed-gallery"],
    html[data-bili-clean-page="home"] div[class*="recommended"] {
        display: none !important;
        visibility: hidden !important;
        height: 0 !important;
        overflow: hidden !important;
    }

    /* ==========================================================================
       4. 首页顶栏纯白极简重置：移除 Banner，适配文字颜色
       ========================================================================== */
    .bili-header__banner,
    .animated-banner,
    .banner-link,
    #banner_link,
    .taper-line,
    div[class*="header__banner"],
    div[class*="animated-banner"] {
        display: none !important;
    }

    /* 顶栏保持标准紧凑高度与纯白卡片阴影 */
    .bili-header {
        min-height: 64px !important;
    }
    .bili-header__bar {
        position: relative !important;
        background: #ffffff !important;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.06) !important;
    }

    /* 文字与 SVG 图标转为深色雅致灰黑，投稿按钮保持原样 */
    .bili-header__bar .entry-title,
    .bili-header__bar .right-entry-text,
    .bili-header__bar .right-entry-icon,
    .bili-header__bar [class*="entry"] span:not(.header-upload-entry *),
    .bili-header__bar [class*="entry"] a:not(.header-upload-entry) {
        color: #18191c !important;
        fill: #18191c !important;
        text-shadow: none !important;
    }
    .bili-header__bar svg {
        fill: #18191c !important;
        color: #18191c !important;
    }

    /* 保持粉色“投稿”按钮的醒目视觉 */
    .bili-header__bar .header-upload-entry,
    .bili-header__bar .header-upload-entry span,
    .bili-header__bar [class*="upload-btn"] {
        color: #ffffff !important;
    }

    /* ==========================================================================
       5. 搜索页：精准拔除商业广告与推广课堂（严格保护普通视频）
       ========================================================================== */
    .bili-video-card:has(.bili-video-card__info--ad),
    .bili-video-card:has(a[href*="cm.bilibili.com"]),
    div[class*="video-list"] > div:has(a[href*="cm.bilibili.com"]),
    .bili-video-card:has(a[href*="cheese.bilibili.com"]),
    .bili-video-card:has(a[href*="/cheese/"]),
    div[class*="video-list"] > div:has(a[href*="cheese.bilibili.com"]),
    div[class*="video-list"] > div:has(a[href*="/cheese/"]) {
        display: none !important;
    }

    /* ==========================================================================
       6. 视频播放页：精准隐藏右侧推广与广告卡片
       ========================================================================== */
    #slide_ad,
    #bannerAd,
    .ad-floor-exp,
    .ad-report,
    div[id*="ad_"],
    div[class*="video-card-ad-info"],
    .right-container .ad-wrap,
    .right-container-inner .ad-wrap,
    .pop-live-small-mode:has(a[href*="cm.bilibili.com"]),
    #right-bottom-banner {
        display: none !important;
    }

    /* ==========================================================================
       7. 个人空间 / 投稿页：去除右侧栏干扰，左侧宽度自适应拉满
       ========================================================================== */
    .col-2,
    .space-right-top,
    .i-m-r-box,
    .section-right,
    .space-body .right,
    div[class*="right-action"],
    div[class*="search-result-right"],
    div[class*="contribution-right"] {
        display: none !important;
    }

    .col-1,
    .space-body .left {
        width: 100% !important;
    }
  `;

  if (typeof GM_addStyle !== 'undefined') {
    GM_addStyle(css);
  } else {
    const style = document.createElement('style');
    style.textContent = css;
    (document.head || document.documentElement).appendChild(style);
  }

  // 3. 顶栏元素精准控制（白名单机制）
  const processHeader = (root) => {
    if (!root) return;

    // === A. 左侧区域：仅保留“首页”，其余全部隐藏 ===
    const leftItems = root.querySelectorAll('.left-entry > *, [class*="left-entry"] > *');
    leftItems.forEach(item => {
      const text = item.textContent ? item.textContent.replace(/\s+/g, '') : '';
      const href = item.querySelector('a')?.href || '';

      const isHome =
        text === '首页' ||
        text.includes('首页') ||
        href.endsWith('bilibili.com/') ||
        href.endsWith('bilibili.com/index.html');

      if (isHome) {
        item.style.setProperty('display', 'inline-flex', 'important');
      } else {
        item.style.setProperty('display', 'none', 'important');
      }
    });

    // === B. 右侧区域：精准去除“动态”，保留头像、消息、收藏、历史、创作中心、投稿 ===
    const rightItems = root.querySelectorAll('.right-entry > *, .right-entry-item, .right-entry__item, .v-popover-wrap');
    rightItems.forEach(item => {
      // 头像区域绝对保留
      if (item.querySelector('.header-avatar-wrap, img, .avatar-icon, [class*="avatar"]')) {
        return;
      }

      const text = item.textContent ? item.textContent.replace(/\s+/g, '') : '';
      const href = item.querySelector('a')?.href || '';

      // 仅精准移除“动态”
      if (text.includes('动态') || href.includes('t.bilibili.com')) {
        item.style.setProperty('display', 'none', 'important');
      }
    });
  };

  // 4. 清理输入框推荐词（placeholder）
  const cleanPlaceholder = (root = document) => {
    const inputs = root.querySelectorAll('.nav-search-input, input[type="text"], input[type="search"]');
    inputs.forEach(input => {
      if (input.placeholder && input.placeholder !== '') {
        input.placeholder = '';
      }
      input.setAttribute('placeholder', '');
    });
  };

  // 5. 搜索页精准去广告与课堂（JS 巡逻兜底）
  const cleanSearchAdAndCheese = () => {
    if (!isSearchPage()) return;

    document.querySelectorAll('.bili-video-card, div[class*="video-list-item"]').forEach(card => {
      // 商业广告标识
      const hasAdLink = card.querySelector('a[href*="cm.bilibili.com"]');
      const hasAdBadge = Array.from(card.querySelectorAll('span, div')).some(
        el => el.textContent.trim() === '广告' && el.children.length === 0
      );

      // 课堂卡片标识（只过滤专门的付费课堂链接与独立角标，绝不误伤标题含“课堂”的正常视频）
      const hasCheeseLink = card.querySelector('a[href*="cheese.bilibili.com"], a[href*="/cheese/"]');
      const hasCheeseBadge = Array.from(card.querySelectorAll('span, div')).some(
        el => el.textContent.trim() === '课堂' &&
              el.children.length === 0 &&
              !el.classList.contains('bili-video-card__info--tit') &&
              !el.closest('h3')
      );

      if (hasAdLink || hasAdBadge || hasCheeseLink || hasCheeseBadge) {
        card.style.setProperty('display', 'none', 'important');
      }
    });
  };

  // 6. 播放页右侧栏去广告
  const cleanVideoAd = () => {
    if (!isVideoPage()) return;

    const rightContainer = document.querySelector('.right-container, .right-container-inner');
    if (rightContainer) {
      rightContainer.querySelectorAll('#slide_ad, #bannerAd, .ad-floor-exp, .ad-report, div[id*="ad_"]').forEach(el => {
        el.style.setProperty('display', 'none', 'important');
      });

      rightContainer.querySelectorAll('div').forEach(container => {
        const adBadges = Array.from(container.querySelectorAll('span, div')).filter(el => el.textContent.trim() === '广告');
        if (adBadges.length > 0 && container.querySelector('img') && !container.classList.contains('right-container')) {
          const adBox = adBadges[0].closest('#slide_ad, #bannerAd, .ad-floor-exp, [class*="ad"]') || adBadges[0].parentElement?.parentElement;
          if (adBox && !adBox.contains(rightContainer)) {
            adBox.style.setProperty('display', 'none', 'important');
          }
        }
      });
    }
  };

  // 7. 全局巡检核心调度
  const cleanEverything = () => {
    markPageType();

    // A. 清空搜索框 placeholder
    cleanPlaceholder(document);

    // B. 处理普通顶栏与 Shadow DOM 顶栏
    processHeader(document);
    const biliHeader = document.querySelector('bili-header') || document.querySelector('bili-search-bar');
    if (biliHeader && biliHeader.shadowRoot) {
      cleanPlaceholder(biliHeader.shadowRoot);
      processHeader(biliHeader.shadowRoot);
    }

    // C. 页面特定规则执行
    if (isSearchPage()) {
      cleanSearchAdAndCheese();
    } else if (isVideoPage()) {
      cleanVideoAd();
    }
  };

  // 8. 高性能监听：DOMContentLoaded + MutationObserver + 适度定时保底
  document.addEventListener('DOMContentLoaded', () => {
    cleanEverything();

    // 利用 MutationObserver 在 DOM 节点动态插入时精准捕获
    let scheduled = false;
    const observer = new MutationObserver(() => {
      if (!scheduled) {
        scheduled = true;
        requestAnimationFrame(() => {
          cleanEverything();
          scheduled = false;
        });
      }
    });

    observer.observe(document.body || document.documentElement, {
      childList: true,
      subtree: true,
    });
  });

  // 页面刚加载时立即执行一次
  cleanEverything();

  // 辅以适度低开销的定时巡查（应对 SPA 无刷新路由切换与异步懒加载）
  setInterval(cleanEverything, 400);
})();
