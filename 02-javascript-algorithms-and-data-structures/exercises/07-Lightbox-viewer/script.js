console.log('Lightbox Viewer');

const galleryItem = document.querySelectorAll('.gallery-item');
const lightBox = document.querySelector('.lightbox');
const closeBtn = document.getElementById('close-btn');
const lightboxImage = document.getElementById('lightbox-image');

galleryItem.forEach((element) => {
  element.addEventListener('click', () => {
    lightBox.style.display = 'flex';
    lightboxImage.setAttribute(
      'src',
      element.getAttribute('src').replace('-thumbnail', ''),
    );
  });
});

closeBtn.addEventListener('click', () => (lightBox.style.display = 'none'));

lightBox.addEventListener('click', () => (lightBox.style.display = 'none'));
