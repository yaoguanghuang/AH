document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.gallerysample').forEach(gallery => {
    const items = gallery.querySelectorAll('.galleryitem');
    const thumbs = gallery.querySelectorAll('.thumbnails .thumb');

    function showItem(index) {
      items.forEach(item => {
        item.style.display = 'none';
        item.style.border = 'none';
      });

      const currentItem = items[index];
      currentItem.style.display = 'block';

      const img = currentItem.querySelector('img');
      const imgHeight = img.getBoundingClientRect().height;
      if (imgHeight > 500) {
        currentItem.style.border = '3px solid black';
      }

      thumbs.forEach(t => t.classList.remove('active'));
      thumbs[index].classList.add('active');
    }

    showItem(0);

    thumbs.forEach((thumb, i) => {
      thumb.addEventListener('click', () => showItem(i));
    });
  });
});




