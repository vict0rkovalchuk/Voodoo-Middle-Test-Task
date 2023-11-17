function openWishlistModal() {
  document.getElementById('wishlist').style.right = '120px';
  document.getElementById('wishlist').style.left = '120px';
  document.querySelector('.wishlist-overlay').style.left = '0';
  document.querySelector('.wishlist-overlay').style.opacity = '1';
  document.body.style.overflow = 'hidden';
}

function closeWishlistModal() {
  document.getElementById('wishlist').style.right = '-100%';
  document.getElementById('wishlist').style.left = 'unset';
  document.querySelector('.wishlist-overlay').style.left = '-100%';
  document.querySelector('.wishlist-overlay').style.opacity = '0';
  document.body.style.overflow = '';
}

document.querySelectorAll('.card__frame-heart').forEach(item => {
  item.addEventListener('click', () => {
    openWishlistModal();
  });
});

document
  .querySelector('.wishlist_header-close')
  .addEventListener('click', () => {
    closeWishlistModal();
  });

document.querySelector('.wishlist-overlay').addEventListener('click', () => {
  closeWishlistModal();
});

document.querySelector('.wishlist').addEventListener('click', e => {
  e.stopPropagation();
});
