document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.gallerysample').forEach(gallery => {
    const items = Array.from(gallery.querySelectorAll('.galleryitem'));
    const thumbsContainer = gallery.querySelector('.thumbnails');
    let thumbs = Array.from(gallery.querySelectorAll('.thumbnails .thumb'));

    const DESIRED_VISIBLE = 5; 

    function getGapPx(container) {
      const cs = window.getComputedStyle(container);
      const gapVal = cs.getPropertyValue('gap') || cs.getPropertyValue('column-gap') || cs.getPropertyValue('grid-column-gap');
      const gapNum = parseFloat(gapVal);
      return Number.isFinite(gapNum) ? gapNum : 5;
    }

    function showItem(index) {
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

      thumbs.forEach(t => t.classList.remove('active'));
      if (thumbs[index]) thumbs[index].classList.add('active');

      thumbs = Array.from(thumbsContainer.querySelectorAll('.thumb'));
      const totalThumbs = thumbs.length;
      if (totalThumbs <= 0) return;

      const thumbRect = thumbs[0].getBoundingClientRect();
      const thumbWidth = Math.round(thumbRect.width);
      const gapPx = getGapPx(thumbsContainer);

      const containerWidth = thumbsContainer.getBoundingClientRect().width;
      const visibleCount = Math.min(DESIRED_VISIBLE, Math.max(1, Math.floor((containerWidth + gapPx) / (thumbWidth + gapPx))));
      const maxNegativeOffset = -Math.max(0, (totalThumbs - visibleCount) * (thumbWidth + gapPx));

      let targetOffset = 0;
      if (index > 0) {
        targetOffset = -(index - 1) * (thumbWidth + gapPx);
      }

      if (targetOffset < maxNegativeOffset) targetOffset = maxNegativeOffset;
      if (targetOffset > 0) targetOffset = 0;

      thumbsContainer.style.transform = `translateX(${targetOffset}px)`;
    }
    showItem(0);
    thumbs.forEach((thumb, i) => {
      thumb.addEventListener('click', () => {
        thumbs = Array.from(thumbsContainer.querySelectorAll('.thumb'));
        const liveIndex = thumbs.indexOf(thumb);
        if (liveIndex >= 0) showItem(liveIndex);
      });
    });

    window.addEventListener('resize', () => {
      thumbs = Array.from(thumbsContainer.querySelectorAll('.thumb'));
      const activeIndex = thumbs.findIndex(t => t.classList.contains('active'));
      showItem(activeIndex >= 0 ? activeIndex : 0);
    });
  });
});









