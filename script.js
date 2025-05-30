// PRODUCTS ARRAY - mapping box titles to dummy product names
const products = Array.from(document.querySelectorAll(".box")).map(box => ({
    name: box.querySelector("h2").innerText,
    element: box
}));

// Search Functionality
const searchInput = document.querySelector(".search-input");
const searchIcon = document.querySelector(".search-icon");

searchIcon.addEventListener("click", () => {
    const query = searchInput.value.toLowerCase();
    products.forEach(product => {
        const matches = product.name.toLowerCase().includes(query);
        product.element.style.display = matches ? "block" : "none";
    });
});

// Add "Add to Cart" button dynamically
// Add "Add to Cart" button dynamically with styling
products.forEach(product => {
    const button = document.createElement("button");
    button.innerText = "Add to Cart";
    button.classList.add("add-to-cart-btn");
    button.addEventListener("click", () => {
        addToCart(product.name);
    });
    product.element.querySelector(".box-content").appendChild(button);
});


// Add to Cart with localStorage
function addToCart(productName) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(productName);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    alert(`${productName} added to cart`);
}

// Show item count in navbar
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const navCart = document.querySelector(".nav-cart");
    navCart.innerHTML = `<i class="fa-solid fa-cart-shopping"></i> Cart (${cart.length})`;
}

// Initial update on page load
updateCartCount();

const suggestionsContainer = document.querySelector(".search-suggestions");
const input = document.querySelector(".search-input");

// Get product names from your DOM
const productNames = Array.from(document.querySelectorAll(".box h2")).map(el => el.innerText);

// Debounce function
function debounce(func, delay) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
}

// Show suggestions
function showSuggestions() {
  const query = input.value.toLowerCase();
  if (!query) {
    suggestionsContainer.style.display = "none";
    return;
  }

  const matches = productNames.filter(name => name.toLowerCase().includes(query));

  if (matches.length === 0) {
    suggestionsContainer.style.display = "none";
    return;
  }

  suggestionsContainer.innerHTML = matches
    .map(name => `<div class="suggestion-item">${name}</div>`)
    .join("");

  suggestionsContainer.style.display = "block";

  // Click to select
  document.querySelectorAll(".suggestion-item").forEach(item => {
    item.addEventListener("click", () => {
      input.value = item.innerText;
      suggestionsContainer.style.display = "none";
    });
  });
}

// Attach input listener
input.addEventListener("input", debounce(showSuggestions, 300));

// Hide when clicked elsewhere
document.addEventListener("click", (e) => {
  if (!e.target.closest(".nav-search")) {
    suggestionsContainer.style.display = "none";
  }
});
