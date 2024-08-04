const Products = [
  {id: 1, productName: "Product1" , price: 100 },
  {id: 2, productName: "Product2" , price: 200 },
  {id: 3, productName: "Product3" , price: 300 },
]

const cart = [];

function renderProducts(){
  let productList = document.getElementById("product-list");
  productList.innerHTML = "";
  Products.forEach(product => {
      const productDiv = document.createElement("div");
      productDiv.classList.add('product');
      productDiv.innerHTML= `
      <span>${product.productName}</span>
      <span>$${product.price}</span>
      <div>
          <button onclick="addToCart(${product.id})">+</button>
          <span id="product-quantity-${product.id}">0</span>
          <button onclick="removeFromCart(${product.id})" disabled>-</button>
      </div>
      `
      productList.appendChild(productDiv);
  });
}

function renderCart(){
  const cartList = document.getElementById("cart-list");
  const totalPriceDiv = document.getElementById("total-price");
  cartList.innerHTML='';
  if(cart.length === 0){
      cartList.innerHTML = '<p>No Product added to the cart</p>';
      totalPriceDiv.innerHTML = '';
      return;
  }

  let totalPrice = 0;
  cart.forEach(item =>{
      const cartItemDiv = document.createElement('div');
      cartItemDiv.classList.add('cart-item');
      cartItemDiv.innerHTML=`
          <span>${item.productName}</span>
          <span>$${item.price} x ${item.quantity}</span>
      `
      cartList.appendChild(cartItemDiv);
      totalPrice += item.price * item.quantity;
  });
  totalPriceDiv.innerHTML = `<h3>Total Price: $${totalPrice}</h3>`;
}

function addToCart(productId) {
  const product = Products.find(p => p.id === productId);
  const cartItem = cart.find(item => item.id === productId);
  
  if (cartItem) {
    cartItem.quantity++;
  } else {
    cart.push({...product, quantity: 1});
  }

  document.getElementById(`product-quantity-${productId}`).textContent = cartItem ? cartItem.quantity : 1;
  document.querySelector(`button[onclick="removeFromCart(${productId})"]`).disabled = false;
  renderCart();
}

function removeFromCart(productId) {
  const cartItemIndex = cart.findIndex(item => item.id === productId);
  
  if (cartItemIndex > -1) {
    const cartItem = cart[cartItemIndex];
    cartItem.quantity--;
    if (cartItem.quantity === 0) {
      cart.splice(cartItemIndex, 1);
      document.querySelector(`button[onclick="removeFromCart(${productId})"]`).disabled = true;
    }
  }

  document.getElementById(`product-quantity-${productId}`).textContent = cartItemIndex > -1 ? cart[cartItemIndex]?.quantity || 0 : 0;
  renderCart();
}


window.onload = () =>{    
  renderProducts();
  renderCart();
};