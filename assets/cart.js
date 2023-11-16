function openCartDrawer() {
  document.getElementById('sideCart').style.right = '0';
  document.querySelector('.sidenav-overlay').style.left = '0';
  document.querySelector('.sidenav-overlay').style.opacity = '1';
  document.body.style.overflow = 'hidden';
}

function closeCartDrawer() {
  document.getElementById('sideCart').style.right = '-100%';
  document.querySelector('.sidenav-overlay').style.left = '-100%';
  document.querySelector('.sidenav-overlay').style.opacity = '0';
  document.body.style.overflow = '';
}

async function updateCartDrawer(index = null) {
  if (index) {
    document
      .querySelectorAll('.cart-loader')
      [+index - 1].classList.remove('hidden');
  }

  const res = await fetch('/?section_id=cart-drawer');
  const text = await res.text();

  const html = document.createElement('div');
  html.innerHTML = text;

  const newBox = html.querySelector('#sideCart').innerHTML;
  const oldBox = document.querySelector('#sideCart');

  oldBox.innerHTML = newBox;

  addCartDrawerListeners();
}

async function updateCartAJAX(key, qty = 0) {
  const res = await fetch('/cart/update.js', {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ updates: { [key]: qty } })
  });
}

function addCartDrawerListeners() {
  // Update quantities
  document.querySelectorAll('.sidenav__item-counter button').forEach(button => {
    button.addEventListener('click', async e => {
      e.preventDefault();

      const closestButtonParent = button.closest('.sidenav__item');
      // Get line item key
      const key = closestButtonParent.getAttribute('data-line-item-key');

      // Get new quantity
      const quantity = closestButtonParent.querySelector(
        'input.sidenav__item-number'
      ).value;

      let newQuantity;

      switch (button.textContent.trim()) {
        case '+':
          newQuantity = +quantity + 1;
          break;
        case '-':
          newQuantity = +quantity - 1;
          break;
      }

      // AJAX update
      await updateCartAJAX(key, newQuantity);

      // Update cart
      const index = closestButtonParent.dataset.index;
      updateCartDrawer(index);
    });
  });

  // Delete item
  document.querySelectorAll('.sidenav__item-delete').forEach(item => {
    item.addEventListener('click', async e => {
      e.preventDefault();

      const itemClosestParent = item.closest('.sidenav__item');

      // Get line item key
      const key = itemClosestParent.getAttribute('data-line-item-key');

      // AJAX update
      await updateCartAJAX(key);

      // Update cart
      const index = itemClosestParent.dataset.index;
      updateCartDrawer(index);
    });
  });

  // Close cart drawer
  document
    .querySelector('.sidenav__header-close')
    .addEventListener('click', () => {
      closeCartDrawer();
    });

  document
    .querySelector('.sidenav-overlay .sidenav')
    .addEventListener('click', e => {
      e.stopPropagation();
    });

  document.querySelector('.sidenav-overlay').addEventListener('click', () => {
    closeCartDrawer();
  });
}

addCartDrawerListeners();

document.querySelectorAll('form[action="/cart/add"]').forEach(form => {
  form.addEventListener('submit', async e => {
    e.preventDefault();

    // Open cart drawer
    openCartDrawer();

    // Activate loader
    document.querySelector('.cart-header-loader').classList.remove('hidden');

    // Submit form with ajax
    await fetch('/cart/add', {
      method: 'post',
      body: new FormData(form)
    });

    // Update Cart
    await updateCartDrawer();
  });
});

// Open cart drawer
document.querySelector('.signup__cart').addEventListener('click', () => {
  openCartDrawer();
});
