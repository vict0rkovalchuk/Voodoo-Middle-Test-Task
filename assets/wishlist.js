// Get wishlists from LocalStorage; Set default wishlists to localstorage
function returnCardHTML({
  productId,
  productImage,
  productImageAlt,
  productUrl,
  productTitle,
  productPrice,
  productCondition,
  addToCartVariantID
}) {
  return `
  <div class="card" data-product-id="${productId}">
        <div class="card__frame p-3 rounded border-[1px] border-solid border-black h-[300px] relative flex justify-center">
          <div class="card__frame-badge inline p-2 rounded bg-black text-[#FCF7E6] text-xs font-normal uppercase absolute -left-[-12px] z-10 leading-3">
            used
          </div>
          <div class="card__frame-heart text-[#FCF7E6] absolute right-[12px] z-10 cursor-pointer">
          <svg
          width="22"
          height="20"
          viewBox="0 0 22 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            id="Vector"
            d="M19.9243 10.7319L19.9373 10.7459L10.7453 19.9379L1.55333 10.7459L1.56633 10.7319C0.498895 9.48744 -0.0588283 7.88557 0.00491939 6.24727C0.0686671 4.60898 0.749176 3.05529 1.91008 1.89755C3.07099 0.739802 4.62653 0.0635331 6.26499 0.00425378C7.90345 -0.0550255 9.50379 0.507064 10.7453 1.57789C11.9869 0.507064 13.5872 -0.0550255 15.2257 0.00425378C16.8641 0.0635331 18.4197 0.739802 19.5806 1.89755C20.7415 3.05529 21.422 4.60898 21.4857 6.24727C21.5495 7.88557 20.9918 9.48744 19.9243 10.7319Z"
            fill="#2D3436" />
        </svg>
    </div>
          <img
            class="h-full object-cover rounded hover:scale-105 transition-all duration-[0.35s] cursor-pointer"
            src="${productImage}"
            alt="${productImageAlt}">
        </div>
        <div class="card__descr mt-3 flex justify-between text-sm leading-normal">
          <div class="card__descr-info font-bold">
            <a href="${productUrl}" class="card__descr-name">${productTitle}</a>
            <div class="card__descr-price" data-price="100.00">${productPrice}</div>
          </div>
          <div class="card__descr-text flex flex-col items-end">
            <div class="card__descr-condition font-medium">Condition</div>
            <div class="card__descr-fact font-normal">${productCondition}</div>
          </div>
        </div>
        <div class="card__btn mt-3">
          <form method="post" action="/cart/add">
            <input
              type="hidden"
              name="id"
              value="${addToCartVariantID}">
            <input
              min="1"
              type="hidden"
              id="quantity"
              name="quantity"
              value="1">
            <button type="submit" class="card__button p-4 rounded bg-black text-white text-sm font-bold leading-normal w-full hover:scale-105 transition-all duration-[0.35s]">
              Add to cart
            </button>
          </form>
        </div>
      </div>
  `;
}

function returnCardsHTML(HTMLText) {
  return `
  <div class="wishlist__cards grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
    ${HTMLText}
  </div>
  `;
}

function insertTabNameToTabTrigger({ id, name }) {
  document.querySelector('.wishlist_tabs #tabs .create_tab').insertAdjacentHTML(
    'beforebegin',
    `<li class="items_tab items_tab-trigger py-[9px] text-[#767676] text-sm font-bold cursor-pointer" data-id="${id}">
  ${name}
  </li>`
  );
}

function insertInitialContentToTabContent({ id, name }) {
  document
    .querySelector('.wishlist_tabs #tab-contents .create_tab_content')
    .insertAdjacentHTML(
      'beforebegin',
      `<div class="tab_content hidden" data-id="${id}">
        No items in <span style="color: green; font-style: italic;" class="font-bold">${name}</span> wishlist yet
      </div>`
    );
}

function updatePopupNames() {
  document.querySelectorAll('.cards .card__frame-popup').forEach(item => {
    item.querySelector('.wishlist-lists-names').innerHTML = '';

    JSON.parse(localStorage.getItem('wishlists')).forEach(elem => {
      item.querySelector('.wishlist-lists-names').innerHTML += `
        <li class="uppercase text-xs font-medium leading-normal cursor-pointer" data-id="${elem.id}">${elem.name}</li>`;
    });
  });
}

const wishlistList = localStorage.getItem('wishlists');
if (wishlistList) {
  // Update popups with actual wishlists name
  updatePopupNames();

  JSON.parse(localStorage.getItem('wishlists')).forEach(item => {
    insertTabNameToTabTrigger(item);

    if (item.tabContentInfo.length > 0) {
      let productList = '';
      item.tabContentInfo.forEach(item => {
        productList += returnCardHTML(item);
      });
      document
        .querySelector('.wishlist_tabs #tab-contents .create_tab_content')
        .insertAdjacentHTML(
          'beforebegin',
          `<div class="tab_content hidden" data-id="${item.id}">
          ${returnCardsHTML(productList)}
      </div>`
        );
    } else {
      insertInitialContentToTabContent(item);
    }
  });
} else {
  localStorage.setItem(
    'wishlists',
    JSON.stringify([{ name: 'Default List', id: 1, tabContentInfo: [] }])
  );

  JSON.parse(localStorage.getItem('wishlists')).forEach(item => {
    insertTabNameToTabTrigger(item);
    insertInitialContentToTabContent(item);
  });
  // Update popups with actual wishlists name
  updatePopupNames();
}

function updateCardHeart() {
  const localStorageWishlistsInfo = JSON.parse(
    localStorage.getItem('wishlists')
  );

  let arr = [];

  localStorageWishlistsInfo.forEach(item => {
    const tabContentInfo = item.tabContentInfo;
    tabContentInfo.forEach(elem => arr.push(elem.productId));
  });

  const cardsDisplayed = document.querySelectorAll('main .card');

  cardsDisplayed.forEach(card => {
    const cardHeart = card.querySelector('.card__frame-heart');
    if (arr.includes(cardHeart.dataset.id)) {
      cardHeart.innerHTML = `
    <svg
    id="remove-card"
    width="22"
    height="20"
    viewBox="0 0 22 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      id="Vector"
      d="M19.9243 10.7319L19.9373 10.7459L10.7453 19.9379L1.55333 10.7459L1.56633 10.7319C0.498895 9.48744 -0.0588283 7.88557 0.00491939 6.24727C0.0686671 4.60898 0.749176 3.05529 1.91008 1.89755C3.07099 0.739802 4.62653 0.0635331 6.26499 0.00425378C7.90345 -0.0550255 9.50379 0.507064 10.7453 1.57789C11.9869 0.507064 13.5872 -0.0550255 15.2257 0.00425378C16.8641 0.0635331 18.4197 0.739802 19.5806 1.89755C20.7415 3.05529 21.422 4.60898 21.4857 6.24727C21.5495 7.88557 20.9918 9.48744 19.9243 10.7319Z"
      fill="#2D3436" />
    </svg>
    `;
    }
  });
}

updateCardHeart();

// Set to Local Storage new wishlist
document
  .querySelector('.wishlist_tabs #tab-contents .create_tab_content form')
  .addEventListener('submit', e => {
    e.preventDefault();
    let oldLocalStorageState = JSON.parse(localStorage.getItem('wishlists'));
    let newElement = [
      {
        name: e.target.querySelector('input.create_tab_content-input').value,
        id: 'id' + Math.random().toString(16).slice(2),
        tabContentInfo: []
      }
    ];
    e.target.querySelector('input.create_tab_content-input').value = '';
    let newLocalStorageState = [...oldLocalStorageState, ...newElement];
    localStorage.setItem('wishlists', JSON.stringify(newLocalStorageState));

    newElement.forEach(item => {
      insertTabNameToTabTrigger(item);
      insertInitialContentToTabContent(item);

      if (localStorage.getItem('queueItem')) {
        const tabsContent = document.querySelectorAll(
          '.wishlist_tabs #tab-contents .tab_content'
        );
        tabsContent.forEach(item => item.classList.add('hidden'));

        const lastTabtrigger = document.querySelectorAll(
          '.wishlist_tabs #tabs .items_tab-trigger'
        )[
          document.querySelectorAll('.wishlist_tabs #tabs .items_tab-trigger')
            .length - 1
        ];

        lastTabtrigger.style.borderBottom = '2px solid black';
        lastTabtrigger.style.color = 'black';

        let containerForQueueElement =
          document.querySelectorAll('.tab_content')[
            document.querySelectorAll('.tab_content').length - 2
          ];
        containerForQueueElement.classList.remove('hidden');

        containerForQueueElement.innerHTML = `
          ${returnCardsHTML(
            returnCardHTML(JSON.parse(localStorage.getItem('queueItem')))
          )}
          `;

        localStorage.removeItem('queueItem');
      }
    });

    updatePopupNames();
  });

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

// Open wishlists modal on clicked list / Add item to the list
document.querySelectorAll('.wishlist-lists').forEach(item => {
  item.addEventListener('click', e => {
    if (e.target.nodeName == 'LI') {
      const tabID = e.target.dataset.id;

      // Show current tab
      const tabsTriggers = document.querySelectorAll(
        '.wishlist_tabs #tabs .items_tab-trigger'
      );
      tabsTriggers.forEach(item => {
        if (item.dataset.id == tabID) {
          item.style.borderBottom = '2px solid black';
          item.style.color = 'black';
        } else {
          item.style.borderBottom = 'none';
          item.style.color = '#767676';
        }
      });

      const tabsContent = document.querySelectorAll(
        '.wishlist_tabs #tab-contents .tab_content'
      );
      tabsContent.forEach(item => {
        if (item.dataset.id == tabID) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });

      // Add to Local Storage and render to the wishlist
      const productCard = e.target.closest('.card');

      const productId = productCard.getAttribute('data-product-id');
      const productImage = productCard.querySelector('img').getAttribute('src');
      const productImageAlt = productCard
        .querySelector('img')
        .getAttribute('alt');
      const productPrice =
        productCard.querySelector('.card__descr-price').textContent;
      const addToCartVariantID = productCard
        .querySelector('form input[name="id"]')
        .getAttribute('value');
      const productCondition =
        productCard.querySelector('.card__descr-fact').textContent;
      const productTitle = productCard.querySelector(
        '.card__descr-info a'
      ).textContent;
      const productUrl = productCard
        .querySelector('.card__descr-info a')
        .getAttribute('href');

      let productObjectInfo = {
        productId,
        productImage,
        productImageAlt,
        productPrice,
        addToCartVariantID,
        productCondition,
        productTitle,
        productUrl
      };

      let oldLocalStorageState = JSON.parse(localStorage.getItem('wishlists'));

      let newLocalStorageState = oldLocalStorageState.map(item => {
        if (item.id == tabID) {
          return {
            ...item,
            tabContentInfo: [...item.tabContentInfo, productObjectInfo]
          };
        }
        return item;
      });
      localStorage.setItem('wishlists', JSON.stringify(newLocalStorageState));

      if (tabID != '0') {
        updateCardHeart();
        if (
          document.querySelector(
            `.wishlist_tabs #tab-contents .tab_content[data-id="${tabID}"] .wishlist__cards`
          )
        ) {
          document.querySelector(
            `.wishlist_tabs #tab-contents .tab_content[data-id="${tabID}"] .wishlist__cards`
          ).innerHTML += returnCardHTML(productObjectInfo);
        } else {
          document.querySelector(
            `.wishlist_tabs #tab-contents .tab_content[data-id="${tabID}"]`
          ).innerHTML = `${returnCardsHTML(returnCardHTML(productObjectInfo))}`;
        }
      } else {
        localStorage.setItem('queueItem', JSON.stringify(productObjectInfo));
      }
    }
  });
});

// Open / Close wishlist modal
function openWishlistModal() {
  if (
    !document.querySelector('.create_tab_content').classList.contains('hidden')
  ) {
    document.querySelector('.wishlist_button').classList.add('hidden');
    document.querySelector('.wishlist_divider-bottom').classList.add('hidden');
  } else {
    document.querySelector('.wishlist_button').classList.remove('hidden');
    document
      .querySelector('.wishlist_divider-bottom')
      .classList.remove('hidden');
  }

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

document.querySelector('.signup_wishlist').addEventListener('click', () => {
  openWishlistModal();
});

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

// Delete wishlist
document.querySelector('#wishlist').addEventListener('click', e => {
  if (e.target.closest('.wishlist_button')) {
    const tabId = e.target.getAttribute('data-tab-id');
    const oldLocalStorageState = JSON.parse(localStorage.getItem('wishlists'));
    const newLocalStorageState = oldLocalStorageState.filter(
      item => item.id != tabId
    );
    localStorage.setItem('wishlists', JSON.stringify(newLocalStorageState));
    updatePopupNames();
    document.querySelector(`.items_tab[data-id="${tabId}"]`).remove();
    document.querySelector(`.tab_content[data-id="${tabId}"]`).remove();
    document
      .querySelector(`.tab_content[data-id="0"]`)
      .classList.remove('hidden');
  }
});
