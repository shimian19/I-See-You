// ========== 表白网站主逻辑（IIFE 模块隔离） ==========
(function () {
  'use strict';

  // ---- 工具函数 ----
  function debounce(fn, delay) {
    let timer;
    return function () {
      clearTimeout(timer);
      var self = this, args = arguments;
      timer = setTimeout(function () { fn.apply(self, args); }, delay);
    };
  }

  // ========== 话语分类（基于关键词自动匹配） ==========
  function getCategory(msg) {
    var m = msg;
    if (/甜|糖|笑|喜|欢|甜|爱|温柔|暖|光|美|星|花|春|晴|彩虹|浪漫|心动|美好|环|可爱|火|太阳|风|月|星辰|宠/.test(m)) return 'sweet';
    if (/念|想|等|归|梦|期|山|海|秋|冬|暮|朝|路|远|长|跨|涉|来|去|飞|走|漂|过|问|待|久|慢慢|余生|岁月|时光|流|白头|白/.test(m)) return 'miss';
    if (/永远|一生|此生|誓|承|诺|守|护|陪|伴|永|恒|愿|许|终|执|予|定|注定|命|缘|份|前世|今生|轮回|三生|不渝|天荒|地老/.test(m)) return 'promise';
    return 'playful';
  }

  // ========== Canvas 爱心粒子系统 ==========
  var canvas = document.getElementById('heartsCanvas');
  var ctx = canvas.getContext('2d');
  var particles = [];
  var animationId;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', debounce(resizeCanvas, 150));
  resizeCanvas();

  // ---- 烟花粒子（迷你烟花系统） ----
  var fireworkParticles = [];
  var FW_COLORS = ['#ff6b9d', '#ff9a76', '#ffd56b', '#67e8b0', '#8ec5fc', '#c4b5fd', '#f472b6', '#fb923c'];

  function FireworkParticle(x, y) {
    var angle = Math.random() * Math.PI * 2;
    var speed = Math.random() * 6 + 2;
    this.x = x;
    this.y = y;
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;
    this.size = Math.random() * 3 + 1;
    this.color = FW_COLORS[Math.floor(Math.random() * FW_COLORS.length)];
    this.life = 1;
    this.decay = Math.random() * 0.02 + 0.015;
    this.gravity = 0.04;
  }

  FireworkParticle.prototype.update = function () {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += this.gravity;
    this.vx *= 0.99;
    this.life -= this.decay;
  };

  FireworkParticle.prototype.draw = function (ctx) {
    if (this.life <= 0) return;
    ctx.save();
    ctx.globalAlpha = this.life;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  };

  function triggerMiniFirework(x, y) {
    var count = Math.floor(Math.random() * 20) + 35;  // 35-55 个粒子
    for (var i = 0; i < count; i++) {
      fireworkParticles.push(new FireworkParticle(x, y));
    }
  }

  // ---- 爱心粒子 ----
  var HeartParticle = (function () {
    function HeartParticle() {
      this.reset();
    }
    HeartParticle.prototype.reset = function () {
      this.x = Math.random() * canvas.width;
      this.y = canvas.height + 30;
      this.size = Math.random() * 14 + 4;
      this.speedY = -Math.random() * 0.4 - 0.15;
      this.speedX = (Math.random() - 0.5) * 0.3;
      this.opacity = Math.random() * 0.35 + 0.08;
      this.wobble = Math.random() * Math.PI * 2;
      this.wobbleSpeed = Math.random() * 0.008 + 0.003;
    };
    HeartParticle.prototype.update = function () {
      this.y += this.speedY;
      this.x += this.speedX + Math.sin(this.wobble) * 0.3;
      this.wobble += this.wobbleSpeed;
      if (this.y < -30 || this.x < -30 || this.x > canvas.width + 30) {
        this.reset();
      }
    };
    HeartParticle.prototype.draw = function (ctx) {
      ctx.save();
      ctx.globalAlpha = this.opacity;
      ctx.fillStyle = '#ffb3c6';
      ctx.font = this.size + 'px serif';
      ctx.fillText('♥', this.x, this.y);
      ctx.restore();
    };
    return HeartParticle;
  })();

  function initParticles() {
    for (var i = 0; i < CONFIG.particleCount; i++) {
      var p = new HeartParticle();
      p.y = Math.random() * canvas.height;
      particles.push(p);
    }
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 爱心粒子
    for (var i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw(ctx);
    }

    // 烟花粒子
    for (var j = fireworkParticles.length - 1; j >= 0; j--) {
      fireworkParticles[j].update();
      fireworkParticles[j].draw(ctx);
      if (fireworkParticles[j].life <= 0) {
        fireworkParticles.splice(j, 1);
      }
    }

    animationId = requestAnimationFrame(animateParticles);
  }

  initParticles();
  animateParticles();

  // ========== 动态星空背景 ==========
  function initStars() {
    var container = document.getElementById('starsLayer');
    var count = CONFIG.starCount || 100;
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < count; i++) {
      var dot = document.createElement('div');
      dot.className = 'star-dot';

      var size = Math.random() * 2.5 + 0.8;
      var x = Math.random() * 100;
      var y = Math.random() * 100;
      var duration = Math.random() * 3 + 2;
      var delay = Math.random() * 5;

      dot.style.cssText = [
        'width: ' + size + 'px',
        'height: ' + size + 'px',
        'left: ' + x + '%',
        'top: ' + y + '%',
        '--twinkle-duration: ' + duration + 's',
        '--twinkle-delay: ' + delay + 's',
      ].join(';');

      fragment.appendChild(dot);
    }

    container.appendChild(fragment);
  }

  // ========== 光标光晕跟随（桌面端） ==========
  function initCursorGlow() {
    var glow = document.getElementById('cursorGlow');
    var mouseX = -500, mouseY = -500;
    var currentX = -500, currentY = -500;

    document.addEventListener('mousemove', function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!glow.classList.contains('visible')) {
        glow.classList.add('visible');
      }
    });

    document.addEventListener('mouseleave', function () {
      glow.classList.remove('visible');
    });

    (function follow() {
      currentX += (mouseX - currentX) * 0.08;
      currentY += (mouseY - currentY) * 0.08;
      glow.style.transform = 'translate(' + currentX + 'px, ' + currentY + 'px)';
      requestAnimationFrame(follow);
    })();
  }

  // ========== 相恋天数计数器 ==========
  function updateDayCounter() {
    var el = document.getElementById('dayCounter');
    if (!el) return;

    var start = new Date(CONFIG.startDate);
    if (isNaN(start.getTime())) { el.textContent = ''; return; }

    var now = new Date();
    var startDay = new Date(start.getFullYear(), start.getMonth(), start.getDate());
    var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    var diff = Math.floor((today - startDay) / 86400000);

    if (diff < 0) { el.textContent = '还未开始...'; return; }
    el.textContent = '我们在一起的第 ' + diff + ' 天';
  }

  function initCounterToggle() {
    var toggle = document.getElementById('counterToggle');
    var counter = document.getElementById('dayCounter');
    if (!toggle || !counter) return;

    var saved = localStorage.getItem('love_counter_hidden');
    var isHidden = saved === 'true';

    function applyState() {
      if (isHidden) {
        counter.classList.add('hidden');
        toggle.textContent = '👁️‍🗨️';
        toggle.classList.add('toggled-off');
      } else {
        counter.classList.remove('hidden');
        toggle.textContent = '👁️';
        toggle.classList.remove('toggled-off');
      }
    }

    applyState();

    toggle.addEventListener('click', function (e) {
      e.stopPropagation();
      isHidden = !isHidden;
      localStorage.setItem('love_counter_hidden', isHidden);
      applyState();
    });
  }

  // ========== 打字机效果 ==========
  function typeWriter(el, text, speed, onDone) {
    var i = 0;
    el.textContent = '';

    // 创建光标
    var cursor = document.createElement('span');
    cursor.className = 'typing-cursor';
    el.parentNode.appendChild(cursor);

    function tick() {
      if (i < text.length) {
        el.textContent += text.charAt(i);
        i++;
        // 标点符号稍作停顿
        var nextSpeed = /[，。！？、；：。！？]/.test(text.charAt(i - 1)) ? speed * 3 : speed;
        setTimeout(tick, nextSpeed);
      } else {
        // 打字完成后光标停留 2 秒再移除
        setTimeout(function () {
          if (cursor.parentNode) cursor.remove();
        }, 2000);
        if (onDone) onDone();
      }
    }

    tick();
  }

  function initTypewriter() {
    var sub = document.querySelector('.card p.sub');
    if (!sub) return;

    // 保存原始 HTML（处理 <br>）
    var rawText = sub.innerHTML.replace(/<br\s*\/?>/g, '\n');
    sub.innerHTML = '';
    sub.textContent = '';

    // 延迟一点启动，让页面先渲染
    setTimeout(function () {
      typeWriter(sub, rawText, 60);
    }, 800);
  }

  // ========== 气泡系统 ==========
  var bubbleContainer = document.getElementById('bubbleContainer');
  var bubbleId = 0;

  // 全局照片弹窗
  var photoPopup = document.createElement('div');
  photoPopup.className = 'photo-popup';
  photoPopup.innerHTML = '<img src="" alt="">';
  document.body.appendChild(photoPopup);
  var photoPopupImg = photoPopup.querySelector('img');

  var activeBubble = null;
  var activeMsgs = new Set();

  /** 生成照片加载失败时的 SVG 占位图 */
  function placeholderSVG() {
    return 'data:image/svg+xml,' + encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 180 180">' +
      '<defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">' +
      '<stop offset="0%" style="stop-color:#ff6b9d"/>' +
      '<stop offset="100%" style="stop-color:#c44dff"/>' +
      '</linearGradient></defs>' +
      '<rect width="180" height="180" rx="18" fill="url(#g)"/>' +
      '<text x="90" y="80" text-anchor="middle" font-size="44">📷</text>' +
      '<text x="90" y="118" text-anchor="middle" font-size="14" fill="white" font-family="sans-serif">放入照片</text>' +
      '<text x="90" y="140" text-anchor="middle" font-size="12" fill="rgba(255,255,255,0.7)" font-family="sans-serif">photos/ 文件夹</text>' +
      '</svg>'
    );
  }

  function showPhotoPopup(bubbleEl, photoSrc) {
    if (!photoSrc) return;
    photoPopupImg.src = photoSrc;
    photoPopupImg.onerror = function () { photoPopupImg.src = placeholderSVG(); };
    var rect = bubbleEl.getBoundingClientRect();
    photoPopup.style.left = (rect.left + rect.width / 2) + 'px';
    photoPopup.style.top = (rect.top - 8) + 'px';
    photoPopup.classList.add('show');
  }

  function hidePhotoPopup() {
    photoPopup.classList.remove('show');
    photoPopupImg.onerror = null;
  }

  // 保存提示浮层
  var saveHint = document.createElement('div');
  saveHint.className = 'save-hint';
  saveHint.textContent = '长按保存照片 💾';
  document.body.appendChild(saveHint);
  var saveHintTimer = null;

  function showSaveHint(el) {
    var rect = el.getBoundingClientRect();
    saveHint.style.left = (rect.left + rect.width / 2) + 'px';
    saveHint.style.top = (rect.top - 10) + 'px';
    saveHint.classList.add('show');
    clearTimeout(saveHintTimer);
    saveHintTimer = setTimeout(function () { saveHint.classList.remove('show'); }, 1500);
  }

  /** 移除最旧的气泡（DOM 上限控制） */
  function evictOldestBubble() {
    var bubbles = bubbleContainer.querySelectorAll('.bubble');
    if (bubbles.length >= CONFIG.maxBubblesOnScreen) {
      var oldest = bubbles[0];
      var msgEl = oldest.querySelector('.bubble-text');
      if (msgEl && msgEl.textContent) { activeMsgs.delete(msgEl.textContent); }
      if (activeBubble === oldest) { activeBubble = null; hidePhotoPopup(); }
      oldest.remove();
    }
  }

  function createBubble() {
    evictOldestBubble();

    var available = bubblePairs.filter(function (p) { return !activeMsgs.has(p.msg); });
    if (available.length === 0) return;

    var el = document.createElement('div');
    el.className = 'bubble';

    var pair = available[Math.floor(Math.random() * available.length)];
    activeMsgs.add(pair.msg);

    // 分类配色
    var cat = getCategory(pair.msg);
    el.classList.add('cat-' + cat);

    el.innerHTML = '<span class="bubble-text">' + pair.msg + '</span>';

    el.style.visibility = 'hidden';
    el.style.animation = 'none';
    bubbleContainer.appendChild(el);
    var bw = el.offsetWidth;
    var sw = window.innerWidth;
    var maxLeftPx = Math.max(0, sw - bw - 10);
    var leftPx = maxLeftPx > 0 ? Math.random() * maxLeftPx : 0;
    el.style.left = leftPx + 'px';
    el.style.visibility = '';

    var duration = Math.random() * (CONFIG.bubbleMaxDuration - CONFIG.bubbleMinDuration) + CONFIG.bubbleMinDuration;
    var drift = (Math.random() - 0.5) * Math.min(bw * 0.3, 40);
    var size = Math.random() * 0.3 + 0.8;

    el.style.animation = '';
    el.style.animationDuration = duration + 's';
    el.style.setProperty('--drift', drift + 'px');
    el.style.transform = 'scale(' + size + ')';

    var bid = 'bubble-' + (bubbleId++);
    el.id = bid;

    // mouse 交互
    el.addEventListener('mouseenter', function () {
      el.classList.add('paused');
      activeBubble = el;
      showPhotoPopup(el, pair.photo);
    });

    el.addEventListener('mouseleave', function () {
      el.classList.remove('paused');
      activeBubble = null;
      hidePhotoPopup();
    });

    // 右键保存
    el.addEventListener('contextmenu', function (e) {
      e.preventDefault();
      showSaveHint(el);
      // 桌面端尝试触发下载
      if (pair.photo) {
        var a = document.createElement('a');
        a.href = pair.photo;
        a.download = pair.photo.split('/').pop();
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
    });

    // 触摸交互 + 长按检测
    var touchStartTime = 0;
    var longPressFired = false;

    el.addEventListener('touchstart', function (e) {
      touchStartTime = Date.now();
      longPressFired = false;

      // 设置 800ms 长按检测
      var touchTarget = el;
      var touchPair = pair;
      setTimeout(function () {
        if (Date.now() - touchStartTime >= 750 && activeBubble === touchTarget && !longPressFired) {
          longPressFired = true;
          showSaveHint(touchTarget);
          // 尝试打开照片（移动端会触发浏览器原生保存/分享）
          if (touchPair.photo) {
            window.open(touchPair.photo, '_blank');
          }
        }
      }, 800);

      e.preventDefault();
      if (activeBubble === el) {
        el.classList.remove('paused');
        activeBubble = null;
        hidePhotoPopup();
      } else {
        if (activeBubble) { activeBubble.classList.remove('paused'); }
        el.classList.add('paused');
        activeBubble = el;
        showPhotoPopup(el, pair.photo);
      }
    });

    el.addEventListener('touchend', function () {
      touchStartTime = 0;
    });

    el.addEventListener('animationend', function () {
      if (activeBubble === el) { activeBubble = null; hidePhotoPopup(); }
      activeMsgs.delete(pair.msg);
      var target = document.getElementById(bid);
      if (target) target.remove();
    });
  }

  function scheduleBubble() {
    createBubble();
    var delay = Math.random() * (CONFIG.bubbleMaxDelay - CONFIG.bubbleMinDelay) + CONFIG.bubbleMinDelay;
    setTimeout(scheduleBubble, delay);
  }

  scheduleBubble();

  for (var i = 0; i < CONFIG.initialBubbleCount; i++) {
    setTimeout(function () { createBubble(); }, i * CONFIG.initialBubbleStagger);
  }

  // ========== 点击爱心特效 + 涟漪 ==========
  document.addEventListener('click', function (e) {
    // 点击爱心
    var heart = document.createElement('div');
    heart.className = 'click-heart';
    heart.textContent = ['💗', '💖', '💕', '💝', '❤️'][Math.floor(Math.random() * 5)];
    heart.style.left = e.clientX + 'px';
    heart.style.top = e.clientY + 'px';
    document.body.appendChild(heart);
    heart.addEventListener('animationend', function () { heart.remove(); });

    // 涟漪（仅移动端或触屏设备上更明显，桌面端也保留）
    var ripple = document.createElement('div');
    ripple.className = 'ripple';
    ripple.style.left = e.clientX + 'px';
    ripple.style.top = e.clientY + 'px';
    document.body.appendChild(ripple);
    ripple.addEventListener('animationend', function () { ripple.remove(); });
  });

  // ========== 卡片双击迷你烟花 ==========
  var mainCard = document.getElementById('mainCard');
  if (mainCard) {
    mainCard.addEventListener('dblclick', function (e) {
      // 仅在点击卡片空白区域（非标题/副标题文字）时触发烟花
      var target = e.target;
      if (target.tagName === 'H1' || target.tagName === 'P' || target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        return;
      }
      triggerMiniFirework(e.clientX, e.clientY);
    });
  }

  // ========== 卡片标题/副标题可编辑 ==========
  var cardTitle = document.querySelector('.card h1');
  var cardSub = document.querySelector('.card p.sub');

  if (cardTitle) {
    cardTitle.addEventListener('dblclick', function () {
      var input = document.createElement('input');
      input.value = cardTitle.textContent;
      input.style.cssText = [
        'font-size: 42px', 'text-align: center', 'background: transparent',
        'border: none', 'border-bottom: 2px solid rgba(255,255,255,0.5)',
        'color: #fff', 'outline: none', 'width: 100%',
        'letter-spacing: 4px', 'font-family: inherit',
        'text-shadow: 0 0 30px rgba(255,150,200,0.6)',
      ].join(';');
      cardTitle.replaceWith(input);
      input.focus();
      input.select();
      function commit() {
        cardTitle.textContent = input.value || '我喜欢你';
        input.replaceWith(cardTitle);
      }
      input.addEventListener('blur', commit);
      input.addEventListener('keydown', function (e) { if (e.key === 'Enter') commit(); });
    });
  }

  if (cardSub) {
    cardSub.addEventListener('dblclick', function () {
      var textarea = document.createElement('textarea');
      textarea.value = cardSub.innerHTML.replace(/<br>/g, '\n');
      textarea.style.cssText = [
        'font-size: 18px', 'text-align: center', 'background: rgba(255,255,255,0.1)',
        'border: 1px solid rgba(255,255,255,0.3)', 'border-radius: 12px',
        'color: #fff', 'outline: none', 'width: 100%', 'min-height: 60px',
        'letter-spacing: 2px', 'font-family: inherit', 'padding: 8px',
        'resize: none', 'line-height: 1.6',
      ].join(';');
      cardSub.replaceWith(textarea);
      textarea.focus();
      textarea.select();
      function commit() {
        cardSub.innerHTML = (textarea.value || '从遇见你的那天起<br>我的世界就开满了花').replace(/\n/g, '<br>');
        textarea.replaceWith(cardSub);
      }
      textarea.addEventListener('blur', commit);
      textarea.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); commit(); }
      });
    });
  }

  // ========== 3D 照片轮播 ==========
  function initPhotoCarousel() {
    var stage = document.getElementById('carouselStage');
    if (!stage) return;

    // 从 bubblePairs 中收集不重复的照片
    var seen = {};
    var photos = [];
    for (var i = 0; i < bubblePairs.length && photos.length < (CONFIG.carouselPhotoCount || 10); i++) {
      var p = bubblePairs[i].photo;
      if (p && !seen[p]) { seen[p] = true; photos.push(p); }
    }

    if (photos.length === 0) {
      document.querySelector('.carousel-wrapper').style.display = 'none';
      return;
    }

    var count = photos.length;
    var radius = window.innerWidth <= 600 ? 100 : 160;   // 3D 旋转半径，移动端更小
    var angleStep = 360 / count;
    var currentAngle = 0;
    var isDragging = false, dragStartX = 0, dragStartAngle = 0;

    // 创建照片元素
    for (var j = 0; j < count; j++) {
      var item = document.createElement('div');
      item.className = 'carousel-item';
      var img = document.createElement('img');
      img.src = photos[j];
      img.alt = '';
      img.onerror = function () { this.style.display = 'none'; };
      item.appendChild(img);

      var angle = angleStep * j;
      item.style.transform = 'rotateY(' + angle + 'deg) translateZ(' + radius + 'px)';
      stage.appendChild(item);
    }

    // 自动旋转
    function autoRotate() {
      if (!isDragging) {
        currentAngle += 0.4;
        stage.style.transform = 'rotateY(' + currentAngle + 'deg)';
      }
      requestAnimationFrame(autoRotate);
    }
    autoRotate();

    // 拖拽旋转
    stage.addEventListener('mousedown', function (e) {
      isDragging = true;
      dragStartX = e.clientX;
      dragStartAngle = currentAngle;
      e.preventDefault();
    });

    document.addEventListener('mousemove', function (e) {
      if (!isDragging) return;
      var dx = e.clientX - dragStartX;
      currentAngle = dragStartAngle + dx * 0.5;
      stage.style.transform = 'rotateY(' + currentAngle + 'deg)';
    });

    document.addEventListener('mouseup', function () {
      isDragging = false;
    });

    // 触摸拖拽
    stage.addEventListener('touchstart', function (e) {
      isDragging = true;
      dragStartX = e.touches[0].clientX;
      dragStartAngle = currentAngle;
    });

    document.addEventListener('touchmove', function (e) {
      if (!isDragging) return;
      var dx = e.touches[0].clientX - dragStartX;
      currentAngle = dragStartAngle + dx * 0.5;
      stage.style.transform = 'rotateY(' + currentAngle + 'deg)';
    });

    document.addEventListener('touchend', function () {
      isDragging = false;
    });
  }

  // ========== 时间线 ==========
  function initTimeline() {
    var list = document.getElementById('timelineList');
    var timeline = document.getElementById('timeline');
    if (!list || !timeline || !timelineEvents || timelineEvents.length === 0) {
      if (timeline) timeline.style.display = 'none';
      return;
    }

    // 添加副标题
    var subtitle = document.createElement('p');
    subtitle.className = 'timeline-subtitle';
    subtitle.textContent = '每一刻都想与你分享';
    var title = timeline.querySelector('.timeline-title');
    if (title) title.after(subtitle);

    // 渲染事件卡片
    timelineEvents.forEach(function (ev, idx) {
      var el = document.createElement('div');
      el.className = 'timeline-event';
      el.setAttribute('data-tl-index', idx);
      el.innerHTML =
        (ev.emoji ? '<span class="event-emoji">' + ev.emoji + '</span>' : '') +
        '<div class="event-date">' + ev.date + '</div>' +
        '<div class="event-title">' + ev.title + '</div>' +
        '<div class="event-desc">' + ev.desc + '</div>';
      list.appendChild(el);
    });

    // 结尾横幅
    var footer = document.createElement('div');
    footer.className = 'timeline-footer';
    var now = new Date();
    var start = new Date(CONFIG.startDate);
    var yearsText = '';
    if (!isNaN(start.getTime())) {
      var yrs = Math.floor((now - start) / (365.25 * 86400000));
      if (yrs > 0) yearsText = '<div class="footer-sub">已经一起走过 ' + yrs + ' 年</div>';
    }
    footer.innerHTML =
      '<div class="footer-hearts">💗 💕 💗</div>' +
      '<div class="footer-text">故事未完待续...</div>' +
      yearsText;
    list.after(footer);

    // 照片闪回层
    initFlashbackLayer(timeline);

    // IntersectionObserver 滚动触发淡入
    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15 });

      document.querySelectorAll('.timeline-event').forEach(function (el) {
        observer.observe(el);
      });
    } else {
      document.querySelectorAll('.timeline-event').forEach(function (el) {
        el.classList.add('visible');
      });
    }

    // 时间线区域漂浮装饰粒子
    initTimelineParticles(timeline);
  }

  /** 照片自动闪回：定时轮播回忆照片，每次一张淡入→停留→淡出 */
  /** 照片闪回：滚动驱动快速交叉溶解，照片与时间线事件同步 */
  /** 照片自动闪回：进入时间线快速开启，离开瞬间关闭 */
  function initFlashbackLayer(timeline) {
    var photos = [];
    timelineEvents.forEach(function (ev, i) {
      if (ev.photo) photos.push({ index: i, src: ev.photo });
    });
    if (photos.length === 0) return;

    var layer = document.createElement("div");
    layer.className = "flashback-layer";
    document.body.appendChild(layer);

    // 暗角 —— 快速开关
    var vignette = document.createElement("div");
    vignette.className = "flashback-vignette";
    vignette.style.opacity = "0";
    document.body.appendChild(vignette);

    // 双槽位
    var slotA = document.createElement("img");
    var slotB = document.createElement("img");
    slotA.className = "flashback-photo";
    slotB.className = "flashback-photo";
    layer.appendChild(slotA);
    layer.appendChild(slotB);

    var activeSlot = null;
    var activeIdx = -1;
    var cycleTimer = null;
    var transitionTimer = null;
    var showing = false;

    // 从 CONFIG 读取参数
    var holdMs = CONFIG.flashbackHoldMs || 4500;
    var enterMs = CONFIG.flashbackEnterMs || 500;
    var leaveMs = CONFIG.flashbackLeaveMs || 350;
    var vignetteMs = CONFIG.flashbackVignetteMs || 150;
    var visRatio = CONFIG.flashbackVisibleRatio || 0.25;

    // 将动画时长注入 CSS 变量，保证 CSS 动画与 JS 定时器同步
    layer.style.setProperty('--fb-enter-dur', enterMs + 'ms');
    layer.style.setProperty('--fb-leave-dur', leaveMs + 'ms');
    layer.style.setProperty('--fb-hold-dur', holdMs + 'ms');

    // 暗角速度
    vignette.style.transition = 'opacity ' + (vignetteMs / 1000) + 's ease';

    function isTimelineVisible() {
      var rect = timeline.getBoundingClientRect();
      var vh = window.innerHeight;
      var visTop = Math.max(0, rect.top);
      var visBot = Math.min(vh, rect.bottom);
      return Math.max(0, visBot - visTop) > vh * visRatio;
    }

    // 瞬间关闭（直接消失，清除所有残留状态）
    function hideNow() {
      clearTimeout(cycleTimer);
      clearTimeout(transitionTimer);
      [slotA, slotB].forEach(function (s) {
        s.classList.remove("hold", "enter", "leave");
        s.style.opacity = "0";
        s.src = "";  // 清空图片源，避免切换时闪旧图
      });
      activeSlot = null;
      activeIdx = -1;
      showing = false;
      vignette.style.opacity = "0";
    }

    // 开启轮播
    function showNow() {
      if (showing) return;
      showing = true;
      vignette.style.opacity = "1";
      cycleNext();
    }

    function pickNext() {
      if (photos.length === 1) return 0;
      var idx;
      do { idx = Math.floor(Math.random() * photos.length); }
      while (idx === activeIdx && photos.length > 1);
      return idx;
    }

    function cycleNext() {
      if (!showing) return;

      var nextIdx = pickNext();
      var incomingSlot = activeSlot === "A" ? slotB : slotA;

      // 旧槽位离开
      if (activeSlot) {
        var oldEl = activeSlot === "A" ? slotA : slotB;
        oldEl.classList.remove("hold");
        oldEl.classList.add("leave");
      }

      // ★ 新槽位：清掉之前 hideNow 留下的 inline opacity，让 CSS 动画接管
      incomingSlot.classList.remove("hold", "enter", "leave");
      incomingSlot.style.opacity = "";
      incomingSlot.style.display = "";
      incomingSlot.src = photos[nextIdx].src;
      incomingSlot.onerror = function () { this.style.display = "none"; };

      void incomingSlot.offsetWidth;
      incomingSlot.classList.add("enter");

      clearTimeout(transitionTimer);
      transitionTimer = setTimeout(function () {
        if (!showing) return;
        incomingSlot.classList.remove("enter");
        incomingSlot.classList.add("hold");
      }, enterMs);

      activeSlot = activeSlot === "A" ? "B" : "A";
      activeIdx = nextIdx;

      cycleTimer = setTimeout(cycleNext, holdMs);
    }

    // 滚动检测：进入时间线→开启，离开→关闭
    var scrollTicking = false;
    window.addEventListener("scroll", function () {
      if (!scrollTicking) {
        scrollTicking = true;
        requestAnimationFrame(function () {
          if (isTimelineVisible()) {
            if (!showing) showNow();
          } else {
            if (showing) hideNow();
          }
          scrollTicking = false;
        });
      }
    }, { passive: true });

    // 初始检测
    setTimeout(function () {
      if (isTimelineVisible()) showNow();
    }, 500);
  }
  function initTimelineParticles(section) {
    var emojis = ['💖', '✨', '💕', '🌟', '💗', '🩷', '💫', '🌷'];
    var activeCount = 0;
    var maxActive = 6;

    function spawn() {
      if (activeCount >= maxActive) return;
      var rect = section.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;

      var p = document.createElement('span');
      p.className = 'timeline-particle';
      p.textContent = emojis[Math.floor(Math.random() * emojis.length)];

      var startX = rect.left + Math.random() * rect.width;
      var startY = rect.bottom - 20 - Math.random() * rect.height * 0.6;
      p.style.left = startX + 'px';
      p.style.top = startY + 'px';

      var driftX = (Math.random() - 0.5) * 120;
      var driftY = -(Math.random() * 180 + 60);
      var rotate = (Math.random() - 0.5) * 360;
      var dur = Math.random() * 4 + 5;
      var size = Math.random() * 10 + 14;
      p.style.fontSize = size + 'px';
      p.style.setProperty('--tdx', driftX + 'px');
      p.style.setProperty('--tdy', driftY + 'px');
      p.style.setProperty('--tr', rotate + 'deg');
      p.style.animationDuration = dur + 's';

      document.body.appendChild(p);
      activeCount++;

      p.addEventListener('animationend', function () {
        p.remove();
        activeCount--;
      });
    }

    setInterval(spawn, 1200);
    for (var i = 0; i < 3; i++) {
      setTimeout(spawn, i * 400);
    }
  }

  // ========== 滚动指示器 + 卡片淡出 ==========
  function initScrollHint() {
    var hint = document.getElementById('scrollHint');
    var timeline = document.getElementById('timeline');
    if (!hint || !timeline) return;

    // 卡片淡出相关元素
    var mainCard = document.getElementById('mainCard');
    var bubbleContainer = document.getElementById('bubbleContainer');
    var escapeBtn = document.getElementById('escapeBtn');

    function onScroll() {
      var scrolled = window.scrollY || window.pageYOffset;
      var vh = window.innerHeight;

      // 指示器显隐
      if (scrolled > 100) {
        hint.classList.add('hidden');
      } else {
        hint.classList.remove('hidden');
      }

      // 卡片/气泡随滚动淡出（超过半屏后开始）
      var fadeStart = vh * 0.3;
      var fadeEnd = vh * 0.9;
      var opacity;
      if (scrolled <= fadeStart) {
        opacity = 1;
      } else if (scrolled >= fadeEnd) {
        opacity = 0;
      } else {
        opacity = 1 - (scrolled - fadeStart) / (fadeEnd - fadeStart);
      }

      if (mainCard) mainCard.style.opacity = opacity;
      if (bubbleContainer) bubbleContainer.style.opacity = opacity;
      if (escapeBtn) escapeBtn.style.opacity = opacity;
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    // 初始检查
    onScroll();

    // 点击指示器滚动到时间线
    hint.style.pointerEvents = 'auto';
    hint.style.cursor = 'pointer';
    hint.addEventListener('click', function () {
      timeline.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // ========== 逃跑按钮 ==========
  function initEscapeBtn() {
    var btn = document.getElementById('escapeBtn');
    if (!btn) return;

    var clickCount = 0;
    var messages = ['抓不到我 😜', '你手速不行哦', '就差一点！', '再来再来~', '嘿嘿，偏不让你点', '好吧你赢了...嘿嘿骗你的'];

    btn.addEventListener('mouseenter', function () {
      var maxW = window.innerWidth - btn.offsetWidth - 20;
      var maxH = window.innerHeight - btn.offsetHeight - 20;
      var newX = Math.random() * maxW;
      var newY = Math.random() * maxH;

      btn.style.position = 'fixed';
      btn.style.left = newX + 'px';
      btn.style.top = newY + 'px';
      btn.style.bottom = 'auto';
      btn.style.transform = 'none';
    });

    btn.addEventListener('click', function () {
      clickCount++;
      btn.textContent = messages[Math.min(clickCount - 1, messages.length - 1)];
      if (clickCount >= 6) {
        btn.style.background = 'rgba(255,150,200,0.4)';
        btn.style.borderColor = 'rgba(255,150,200,0.7)';
        setTimeout(function () {
          btn.textContent = '我也爱你 ❤️';
          btn.style.pointerEvents = 'none';
        }, 1000);
      }
    });
  }

  // ========== 分享卡片生成 ==========
  function initShareBtn() {
    var btn = document.getElementById('shareBtn');
    if (!btn) return;

    // 创建预览层
    var preview = document.createElement('div');
    preview.className = 'share-preview';
    var closeBtn = document.createElement('span');
    closeBtn.className = 'close-btn';
    closeBtn.textContent = '✕';
    var saveTip = document.createElement('div');
    saveTip.className = 'save-tip';
    saveTip.textContent = '长按或右键保存图片 📲';
    preview.appendChild(closeBtn);
    preview.appendChild(saveTip);
    document.body.appendChild(preview);

    closeBtn.addEventListener('click', function () { preview.classList.remove('show'); });
    preview.addEventListener('click', function (e) { if (e.target === preview) preview.classList.remove('show'); });

    btn.addEventListener('click', function () {
      // 移除旧 canvas
      var oldCanvas = preview.querySelector('canvas');
      if (oldCanvas) oldCanvas.remove();

      var shareCanvas = document.createElement('canvas');
      shareCanvas.width = 750;
      shareCanvas.height = 1000;
      var sctx = shareCanvas.getContext('2d');

      // 背景渐变
      var grad = sctx.createLinearGradient(0, 0, 750, 1000);
      grad.addColorStop(0, '#1a0024');
      grad.addColorStop(0.3, '#3d0b37');
      grad.addColorStop(0.6, '#6b1d4c');
      grad.addColorStop(1, '#a8325a');
      sctx.fillStyle = grad;
      sctx.fillRect(0, 0, 750, 1000);

      // 绘制小星星
      sctx.fillStyle = '#fff';
      for (var i = 0; i < 60; i++) {
        var sx = Math.random() * 750;
        var sy = Math.random() * 1000;
        var sr = Math.random() * 2 + 0.5;
        sctx.globalAlpha = Math.random() * 0.6 + 0.2;
        sctx.beginPath();
        sctx.arc(sx, sy, sr, 0, Math.PI * 2);
        sctx.fill();
      }
      sctx.globalAlpha = 1;

      // 半透明卡片背景
      sctx.fillStyle = 'rgba(255,255,255,0.06)';
      sctx.strokeStyle = 'rgba(255,255,255,0.2)';
      sctx.lineWidth = 2;
      roundRect(sctx, 60, 80, 630, 840, 30);

      // 爱心图标
      sctx.font = '80px serif';
      sctx.textAlign = 'center';
      sctx.fillText('💗', 375, 170);

      // 标题
      sctx.fillStyle = '#fff';
      sctx.font = 'bold 56px "Microsoft YaHei", "PingFang SC", sans-serif';
      sctx.shadowColor = 'rgba(255,150,200,0.6)';
      sctx.shadowBlur = 30;
      sctx.fillText('四季与你', 375, 250);
      sctx.shadowBlur = 0;

      // 分隔线
      sctx.strokeStyle = 'rgba(255,255,255,0.3)';
      sctx.lineWidth = 1.5;
      sctx.beginPath();
      sctx.moveTo(340, 280);
      sctx.lineTo(410, 280);
      sctx.stroke();

      // 副标题
      sctx.fillStyle = 'rgba(255,255,255,0.75)';
      sctx.font = '26px "Microsoft YaHei", "PingFang SC", sans-serif';
      sctx.fillText('从遇见你的那天起', 375, 340);
      sctx.fillText('我的世界就开满了花', 375, 385);

      // 天数
      var start = new Date(CONFIG.startDate);
      if (!isNaN(start.getTime())) {
        var sDay = new Date(start.getFullYear(), start.getMonth(), start.getDate());
        var tDay = new Date();
        tDay = new Date(tDay.getFullYear(), tDay.getMonth(), tDay.getDate());
        var dayDiff = Math.floor((tDay - sDay) / 86400000);
        if (dayDiff > 0) {
          sctx.fillStyle = 'rgba(255,255,255,0.55)';
          sctx.font = '22px "Microsoft YaHei", "PingFang SC", sans-serif';
          sctx.fillText('我们在一起的第 ' + dayDiff + ' 天', 375, 440);
        }
      }

      // 底部装饰爱心
      sctx.fillStyle = 'rgba(255,150,200,0.3)';
      for (var h = 0; h < 12; h++) {
        var hx = 100 + h * 50;
        sctx.font = '20px serif';
        sctx.fillText('♥', hx, 800);
      }

      // 底部文字
      sctx.fillStyle = 'rgba(255,255,255,0.4)';
      sctx.font = '18px "Microsoft YaHei", "PingFang SC", sans-serif';
      sctx.fillText('— 四季更替，爱你如一 —', 375, 850);

      preview.insertBefore(shareCanvas, closeBtn);
      preview.classList.add('show');
    });

    function roundRect(ctx, x, y, w, h, r) {
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.lineTo(x + w - r, y);
      ctx.quadraticCurveTo(x + w, y, x + w, y + r);
      ctx.lineTo(x + w, y + h - r);
      ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
      ctx.lineTo(x + r, y + h);
      ctx.quadraticCurveTo(x, y + h, x, y + h - r);
      ctx.lineTo(x, y + r);
      ctx.quadraticCurveTo(x, y, x + r, y);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }
  }

  // ========== 初始化 ==========
  initStars();
  initCursorGlow();
  updateDayCounter();
  initCounterToggle();
  initTypewriter();
  initPhotoCarousel();
  initTimeline();
  initScrollHint();
  initEscapeBtn();
  initShareBtn();

  // 每 60 秒刷新天数
  setInterval(updateDayCounter, 60000);

})();
