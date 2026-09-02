// js/main.js
// Core Utility & Global Navigation Handler for MYMART

// LocalStorage Keys
const CART_STORAGE_KEY = 'mymart_cart';
const USER_STORAGE_KEY = 'mymart_users';
const CURRENT_USER_KEY = 'mymart_currentUser';
const ORDERS_STORAGE_KEY = 'mymart_orders';

// Utility: Format Currency to INR (₹)
function formatPrice(amount) {
    const num = Number(amount) || 0;
    return `₹${num.toLocaleString('en-IN')}`;
}

// Utility: Get Cart from LocalStorage
function getCart() {
    try {
        const storedCart = localStorage.getItem(CART_STORAGE_KEY);
        return storedCart ? JSON.parse(storedCart) : [];
    } catch (e) {
        console.error("Error reading cart from LocalStorage:", e);
        return [];
    }
}

// Utility: Save Cart to LocalStorage
function saveCart(cart) {
    try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
        updateCartCount();
    } catch (e) {
        console.error("Error saving cart to LocalStorage:", e);
    }
}

// Global: Add Product to Cart
function addToCart(productId, quantity = 1) {
    const pId = parseInt(productId);
    const product = typeof getProductById === 'function' ? getProductById(pId) : null;
    
    if (!product) {
        showToast("Product not found!", "error");
        return;
    }

    let cart = getCart();
    const existingIndex = cart.findIndex(item => item.id === pId);

    if (existingIndex > -1) {
        cart[existingIndex].quantity += parseInt(quantity);
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            originalPrice: product.originalPrice,
            image: product.image,
            category: product.category,
            quantity: parseInt(quantity)
        });
    }

    saveCart(cart);
    showToast(`Added "${product.name}" to cart!`);
}

// Global: Update Cart Item Count in Navbar
function updateCartCount() {
    const cart = getCart();
    const totalCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    
    const countBadges = document.querySelectorAll('.cart-count-badge');
    countBadges.forEach(badge => {
        badge.textContent = totalCount;
        if (totalCount > 0) {
            badge.style.display = 'inline-flex';
        } else {
            badge.style.display = 'inline-flex';
            badge.textContent = '0';
        }
    });
}

// Utility: Get Active Logged In User
function getCurrentUser() {
    try {
        const user = localStorage.getItem(CURRENT_USER_KEY);
        return user ? JSON.parse(user) : null;
    } catch (e) {
        return null;
    }
}

// Global: Update Auth Link in Navbar
function updateNavbarAuth() {
    const user = getCurrentUser();
    const authContainer = document.getElementById('navbar-auth-link');
    
    if (!authContainer) return;

    if (user) {
        authContainer.innerHTML = `
            <div class="user-dropdown">
                <a href="profile.html" class="nav-link user-profile-link">
                    <span class="user-icon">👤</span> ${user.name.split(' ')[0]}
                </a>
            </div>
        `;
    } else {
        authContainer.innerHTML = `
            <a href="login.html" class="nav-link btn-login">Login</a>
        `;
    }
}

// Global: Toast Notification Popup
function showToast(message, type = "success") {
    let toastContainer = document.getElementById('toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'toast-container';
        toastContainer.className = 'toast-container';
        document.body.appendChild(toastContainer);
    }

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <span class="toast-icon">${type === 'success' ? '✓' : 'ℹ'}</span>
        <span class="toast-message">${message}</span>
    `;

    toastContainer.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('show');
    }, 10);

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            if (toastContainer.contains(toast)) {
                toastContainer.removeChild(toast);
            }
        }, 300);
    }, 3000);
}

// Global Search Bar Handler (Header)
function setupHeaderSearch() {
    const searchForm = document.getElementById('header-search-form');
    const searchInput = document.getElementById('header-search-input');

    if (searchForm && searchInput) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const query = searchInput.value.trim();
            if (query) {
                window.location.href = `products.html?search=${encodeURIComponent(query)}`;
            }
        });
    }
}

// Setup Mobile Menu Toggle
function setupMobileNavbar() {
    const toggleBtn = document.getElementById('mobile-menu-toggle');
    const navLinks = document.getElementById('nav-links-menu');

    if (toggleBtn && navLinks) {
        toggleBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }
}

// Generate Star Rating HTML
function renderStarRating(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    let starsHtml = '';

    for (let i = 0; i < fullStars; i++) {
        starsHtml += '★';
    }
    if (hasHalfStar) {
        starsHtml += '½';
    }
    const emptyCount = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyCount; i++) {
        starsHtml += '☆';
    }

    return `<span class="star-rating">${starsHtml}</span> <span class="rating-number">${rating}</span>`;
}

// DOM Ready initialization
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    updateNavbarAuth();
    setupHeaderSearch();
    setupMobileNavbar();
});
