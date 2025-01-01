const cartItemsContainer = document.getElementById('cart-items');
const totalPriceElement = document.getElementById('total-price');
const productButtons = document.querySelectorAll('.add-to-cart');

let cart = [];
function updateCart() {
  cartItemsContainer.innerHTML = '';
  cart.forEach(item => {
    const cartItemElement = document.createElement('div');
    cartItemElement.classList.add('cart-item');

    cartItemElement.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <span>${item.name}</span>
      <span>Quantity: ${item.quantity}</span>
      <span>Price: $${(item.price * item.quantity).toFixed(2)}</span>
      <button class="remove-btn" data-name="${item.name}">Remove</button>
      <button class="increase-btn" data-name="${item.name}">+</button>
      <button class="decrease-btn" data-name="${item.name}">-</button>
    `;
    const removeButton = cartItemElement.querySelector('.remove-btn');
    const increaseButton = cartItemElement.querySelector('.increase-btn');
    const decreaseButton = cartItemElement.querySelector('.decrease-btn');

    removeButton.addEventListener('click', () => removeFromCart(item.name));
    increaseButton.addEventListener('click', () => updateQuantity(item.name, 1));
    decreaseButton.addEventListener('click', () => updateQuantity(item.name, -1));

    cartItemsContainer.appendChild(cartItemElement);
  });

  const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  totalPriceElement.textContent = totalPrice.toFixed(2);
}

function addToCart(product) {
  const existingItem = cart.find(item => item.name === product.name);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  updateCart();
}
function removeFromCart(productName) {
  cart = cart.filter(item => item.name !== productName);
  updateCart();
}
function updateQuantity(productName, change) {
  const product = cart.find(item => item.name === productName);
  if (product) {
    product.quantity += change;

    if (product.quantity < 1) product.quantity = 1;

    updateCart();
  }
}

productButtons.forEach(button => {
  button.addEventListener('click', () => {
    const productElement = button.parentElement;
    const productName = productElement.dataset.name;
    const productPrice = parseFloat(productElement.dataset.price);
    const productImage = productElement.querySelector('img').src;

    const product = {
      name: productName,
      price: productPrice,
      image: productImage
    };

    addToCart(product);
  });
});