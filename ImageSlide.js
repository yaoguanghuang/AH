document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.gallerysample').forEach(gallery => {
    const items = Array.from(gallery.querySelectorAll('.galleryitem'));
    const thumbsContainer = gallery.querySelector('.thumbnails');
    let thumbs = Array.from(gallery.querySelectorAll('.thumbnails .thumb'));

    const DESIRED_VISIBLE = 5; // 视觉上你希望同时看到多少个缩略图（默认 5）

    function getGapPx(container) {
      // 尝试读取 CSS gap（现代浏览器），否则回退到 5
      const cs = window.getComputedStyle(container);
      const gapVal = cs.getPropertyValue('gap') || cs.getPropertyValue('column-gap') || cs.getPropertyValue('grid-column-gap');
      const gapNum = parseFloat(gapVal);
      return Number.isFinite(gapNum) ? gapNum : 5;
    }

    function showItem(index) {
      // ---------- 大图显示逻辑 ----------
      items.forEach(item => {
        item.style.display = 'none';
        item.style.border = 'none';
      });
      const currentItem = items[index];
      if (currentItem) {
        currentItem.style.display = 'block';
        const img = currentItem.querySelector('img');
        if (img) {
          const imgHeight = img.getBoundingClientRect().height;
          if (imgHeight > 500) currentItem.style.border = '3px solid black';
        }
      }

      // ---------- 缩略图 active 样式 ----------
      thumbs.forEach(t => t.classList.remove('active'));
      if (thumbs[index]) thumbs[index].classList.add('active');

      // ---------- 平移逻辑 ----------
      // 动态刷新 thumbs（防止 DOM 变化）
      thumbs = Array.from(thumbsContainer.querySelectorAll('.thumb'));
      const totalThumbs = thumbs.length;
      if (totalThumbs <= 0) return;

      // 实际每个缩略图的宽度（包含 content width），以及 gap
      const thumbRect = thumbs[0].getBoundingClientRect();
      const thumbWidth = Math.round(thumbRect.width);
      const gapPx = getGapPx(thumbsContainer);

      // 可见数量（如果容器宽度决定可见数量，也可改为固定 DESIRED_VISIBLE）
      const containerWidth = thumbsContainer.getBoundingClientRect().width;
      const visibleCount = Math.min(DESIRED_VISIBLE, Math.max(1, Math.floor((containerWidth + gapPx) / (thumbWidth + gapPx))));

      // 计算允许的最大左移（负值），防止空白
      const maxNegativeOffset = -Math.max(0, (totalThumbs - visibleCount) * (thumbWidth + gapPx));

      // 目标偏移：让 index 处于“第二位”（即索引 1 的位置）
      // 当 index = 0 -> offset = 0（不移动）
      let targetOffset = 0;
      if (index > 0) {
        targetOffset = -(index - 1) * (thumbWidth + gapPx);
      }

      // clamp 在 [maxNegativeOffset, 0]
      if (targetOffset < maxNegativeOffset) targetOffset = maxNegativeOffset;
      if (targetOffset > 0) targetOffset = 0;

      // 应用平移（平滑由 CSS transition 控制）
      thumbsContainer.style.transform = `translateX(${targetOffset}px)`;
    }

    // 初始显示第0张
    showItem(0);

    // 绑定事件（注意使用事件委托可以更稳，但这里逐个绑定也行）
    thumbs.forEach((thumb, i) => {
      thumb.addEventListener('click', () => {
        // 当点击某个缩略图时，我们需要找出该缩略图在当前 DOM 顺序中的 index
        thumbs = Array.from(thumbsContainer.querySelectorAll('.thumb'));
        const liveIndex = thumbs.indexOf(thumb);
        if (liveIndex >= 0) showItem(liveIndex);
      });
    });

    // 可选：在窗口 resize 时重新调整一次（防止响应式导致测量错误）
    window.addEventListener('resize', () => {
      // 重新计算并保持当前 active 的位置
      thumbs = Array.from(thumbsContainer.querySelectorAll('.thumb'));
      const activeIndex = thumbs.findIndex(t => t.classList.contains('active'));
      showItem(activeIndex >= 0 ? activeIndex : 0);
    });
  });
});









