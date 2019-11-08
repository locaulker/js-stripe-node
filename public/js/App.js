
if(document.readyState == 'loading') {
  document.addEventListener('DOMContentLoader', ready)
} else {
  ready()
}

function ready() {
  const removeCartItemButtons = document.getElementsByClassName('btn-danger');
  for (let i = 0; i < removeCartItemButtons.length; i++) {
    const button = removeCartItemButtons[i];
    button.addEventListener('click', removeCartItem);
  }

  const quantityInputs = document.getElementsByClassName('cart-quantity-input');
  for (let i = 0; i < quantityInputs.length; i++) {
    const input = quantityInputs[i];
    input.addEventListener('change', quantityChanged)
  }

  const addToCartButtons = document.getElementsByClassName('shop-item-button');
  for (let i = 0; i < addToCartButtons.length; i++) {
    const button = addToCartButtons[i];
    button.addEventListener('click', addToCartClicked);
  }

  document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked);
}


// Purchase Button
function purchaseClicked() {
  alert('Thank You for Your Purchase');
  const cartItems = document.getElementsByClassName('cart-items')[0];
  while (cartItems.hasChildNodes()) {
    cartItems.removeChild(cartItems.firstChild);
  }
  updateCartTotal();
}


// Remove Cart Item and Update Cart Total
function removeCartItem(e) {
  const buttonClicked = e.target;
  buttonClicked.parentElement.parentElement.remove();
  updateCartTotal();
}


// Input Box Quantity Changed & Update Cart Total
function quantityChanged(e) {
  const input = e.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  } else {
    updateCartTotal();
  }
}


// Add To Cart
function addToCartClicked(e) {
  const button = e.target;
  const shopItem = button.parentElement.parentElement;
  const title = shopItem.getElementsByClassName('shop-item-title')[0].innerText;
  const price = shopItem.getElementsByClassName('shop-item-price')[0].innerText;
  const imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src;
  console.log(title, price, imageSrc);

  addItemToCart(title, price, imageSrc);
  updateCartTotal();
}


// Add Items To Cart
function addItemToCart(title, price, imageSrc) {
  const cartRow = document.createElement('div');
  cartRow.classList.add('cart-row');

  const cartItems = document.getElementsByClassName('cart-items')[0];
  const cartItemNames = cartItems.getElementsByClassName('cart-item-title');

  for (let i = 0; i < cartItemNames.length; i++) {
    if (cartItemNames[i].innerText == title) {
      alert('Oops! This Item is Already in your Cart');
      return;
    }
  }

  const cartRowContents = `
    <div class="cart-item cart-column">
      <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
      <span class="cart-item-title">${title}</span>
    </div>
    <span class="cart-price cart-column">${price}</span>
    <div class="cart-quantity cart-column">
      <input class="cart-quantity-input" type="number" value="1">
      <button class="btn btn-danger" type="button">REMOVE</button>
    </div>
  `
  cartRow.innerHTML = cartRowContents;
  cartItems.append(cartRow);
  cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem);
  cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged);
}


// Update Cart Total
updateCartTotal = () => {
  const cartItemContainer = document.getElementsByClassName('cart-items')[0];
  const cartRows = cartItemContainer.getElementsByClassName('cart-row');

  let total = 0;

  for (let i = 0; i < cartRows.length; i++) {
    const cartRow = cartRows[i];
    const priceElement = cartRow.getElementsByClassName('cart-price')[0];
    const quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0];

    const price = parseFloat(priceElement.innerText.replace('$', ''));
    const quantity = quantityElement.value;

    total += (price * quantity);
  }

  total = Math.round(total * 100) / 100;
  document.getElementsByClassName('cart-total-price')[0].innerText = ('$' + total);
  console.log(total);
}
