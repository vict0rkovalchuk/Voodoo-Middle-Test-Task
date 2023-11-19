// Get wishlists from LocalStorage; Set default wishlists to localstorage
const wishlistList = localStorage.getItem('wishlists');
if (wishlistList) {
  console.log('Is');
  console.log(JSON.parse(localStorage.getItem('wishlists')));

  JSON.parse(localStorage.getItem('wishlists')).forEach(item => {
    document
      .querySelector('.wishlist_tabs #tabs .create_tab')
      .insertAdjacentHTML(
        'beforebegin',
        `<li class="items_tab text-[#767676] text-sm font-bold cursor-pointer" data-id="${item.id}">
    ${item.name}
    </li>`
      );

    document
      .querySelector('.wishlist_tabs #tab-contents .create_tab_content')
      .insertAdjacentHTML(
        'beforebegin',
        `<div class="tab_content" data-id="${item.id}">
        ${item.id} Content
      </div>`
      );
  });
} else {
  localStorage.setItem(
    'wishlists',
    JSON.stringify([{ name: 'Default List 2', id: 3, tabContentInfo: [] }])
  );
  console.log('added');
  console.log(JSON.parse(localStorage.getItem('wishlists')));

  JSON.parse(localStorage.getItem('wishlists')).forEach(item => {
    document
      .querySelector('.wishlist_tabs #tabs .create_tab')
      .insertAdjacentHTML(
        'beforebegin',
        `<li class="items_tab text-[#767676] text-sm font-bold cursor-pointer" data-id="${item.id}">
    ${item.name}
    </li>`
      );

    document
      .querySelector('.wishlist_tabs #tab-contents .create_tab_content')
      .insertAdjacentHTML(
        'beforebegin',
        `<div class="tab_content" data-id="${item.id}">
        ${item.id} Content
      </div>`
      );
  });
}

// Open popup with wishlist modal lists
document
  .querySelectorAll('.cards .card__frame-heart')
  .forEach((item, index) => {
    item.addEventListener('click', () => {
      if (
        document
          .querySelectorAll('.cards .card__frame-popup')
          [index].classList.contains('hidden')
      ) {
        document.querySelectorAll('.cards .card__frame-popup').forEach(item => {
          item.classList.add('hidden');
        });

        document
          .querySelectorAll('.cards .card__frame-popup')
          [index].classList.remove('hidden');
      } else {
        document
          .querySelectorAll('.cards .card__frame-popup')
          [index].classList.add('hidden');
      }
    });
  });

// Open / Close wishlist modal
function openWishlistModal() {
  const viewPortWidth = window.innerWidth;

  document.body.style.overflow = 'hidden';

  if (viewPortWidth >= 1280) {
    document.getElementById('wishlist').style.right = '120px';
    document.getElementById('wishlist').style.left = '120px';
    document.querySelector('.wishlist-overlay').style.left = '0';
    document.querySelector('.wishlist-overlay').style.opacity = '1';

    return;
  }

  if (viewPortWidth >= 1024 && viewPortWidth <= 1279) {
    document.getElementById('wishlist').style.right = '70px';
    document.getElementById('wishlist').style.left = '70px';
    document.querySelector('.wishlist-overlay').style.left = '0';
    document.querySelector('.wishlist-overlay').style.opacity = '1';

    return;
  }

  if (viewPortWidth >= 768 && viewPortWidth <= 1023) {
    document.getElementById('wishlist').style.right = '50px';
    document.getElementById('wishlist').style.left = '50px';
    document.querySelector('.wishlist-overlay').style.left = '0';
    document.querySelector('.wishlist-overlay').style.opacity = '1';

    return;
  }

  if (viewPortWidth >= 640 && viewPortWidth <= 767) {
    document.getElementById('wishlist').style.right = '0';
    document.getElementById('wishlist').style.left = '0';
    document.querySelector('.wishlist-overlay').style.left = '0';
    document.querySelector('.wishlist-overlay').style.opacity = '1';

    return;
  }

  if (viewPortWidth <= 639) {
    document.getElementById('wishlist').style.right = '0';
    document.getElementById('wishlist').style.left = '0';
    document.querySelector('.wishlist-overlay').style.left = '0';
    document.querySelector('.wishlist-overlay').style.opacity = '1';

    return;
  }
}

function closeWishlistModal() {
  document.getElementById('wishlist').style.right = '-100%';
  document.getElementById('wishlist').style.left = 'unset';
  document.querySelector('.wishlist-overlay').style.left = '-100%';
  document.querySelector('.wishlist-overlay').style.opacity = '0';
  document.body.style.overflow = '';
}

document.querySelectorAll('.cards .card__frame-popup').forEach(item => {
  item.addEventListener('click', e => {
    if (e.target.nodeName == 'LI') {
      document.querySelectorAll('.cards .card__frame-popup').forEach(item => {
        item.classList.add('hidden');
      });
      openWishlistModal();
    }
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
