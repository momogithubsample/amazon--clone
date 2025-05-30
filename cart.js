const cartItemsContainer = document.getElementById("cart-items");
const cartSummary = document.getElementById("cart-summary");

// Dummy prices (could be dynamic in a real app)
const dummyPrices = {
  "clothes": 999,
  "Health & Personal Care": 499,
  "Furniture": 1499,
  "Electronics": 1999,
  "Beauty Picks": 799,
  "Pet Care": 299,
  "New Arrival in Toys": 599,
  "Discover Fashion Trends": 899
};

function renderCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cartItemsContainer.innerHTML = "";

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
    cartSummary.innerHTML = "";
    return;
  }

  let total = 0;
  cart.forEach((item, index) => {
    const price = dummyPrices[item] || 1000;
    total += price;

    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `
      <h3>${item}</h3>
      <p>₹${price}</p>
      <button class="remove-btn" onclick="removeItem(${index})">Remove</button>
    `;
    cartItemsContainer.appendChild(div);
  });

  cartSummary.innerHTML = `<strong>Total (${cart.length} items): ₹${total}</strong>`;
}

function removeItem(index) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

// Load cart on page load
renderCart();
