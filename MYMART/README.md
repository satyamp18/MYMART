# MYMART - Modern Frontend E-Commerce Application

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript_ES6-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

> **Tagline:** *"Everything You Need, All in One Place"*

**MYMART** is an Indian e-commerce web application featuring curated collections in **Fashion** and **Beauty**. Developed strictly with **Semantic HTML5, Modern CSS3, and Vanilla JavaScript (ES6)** along with **Browser LocalStorage API** for state management, it simulates an authentic end-to-end shopping experience without requiring any backend server or database.

---

## 🌟 Key Application Pages & Features

### 1. 🏠 Home Page (`index.html`)
- **Top Announcement Bar:** Highlights delivery offers and Cash on Delivery terms.
- **Header & Navigation:** Brand logo, dynamic cart badge counter, direct category shortcuts, and real-time user auth status.
- **Hero Showcase:** High-converting banner with quick call-to-actions ("Shop Now", "Explore Fashion").
- **Featured Categories:** Direct links to *Fashion*, *Beauty*, *Skincare*, and *Footwear*.
- **Trending Products Grid:** Top 8 products loaded dynamically with prices in Rupees (`₹`), discount tags, and 1-click cart addition.
- **Trust Elements:** Fast Delivery, 100% Genuine, 7-Day Returns, and COD/UPI support.

### 2. 🛍️ Products Catalog (`products.html`)
- **Real-Time Client-Side Search:** Instant keyword lookup across names, categories, subcategories, and descriptions.
- **Interactive Category Pills:** Filter seamlessly by `All`, `Fashion`, and `Beauty`.
- **Sorting Options:** Sort products by Price (Low to High, High to Low) and Rating (Highest Rated).
- **Interactive Product Cards:** 16+ fashion and beauty items with ratings, review counts, stock levels, and discount badges.
- **Empty State Handling:** Helpful UI feedback when searches match 0 items, with a 1-click reset button.

### 3. 🔎 Product Details (`product-details.html`)
- Dynamic URL parameter parser (`product-details.html?id=X`).
- High-resolution image preview, price breakdown in Indian Rupees (`₹`), discount badge, stock availability, and detailed descriptions.
- Quantity selector (`+` / `-`) bounded by available inventory.
- **Buy Now Button:** Immediately adds the item and redirects directly to Checkout.
- **Related Products:** Contextual recommendations from the same product category.

### 4. 🛒 Shopping Cart (`cart.html`)
- Full itemized cart table with thumbnail images, titles, unit prices, quantity controls, and line-item subtotals.
- **Pricing Math Breakdown:**
  - Subtotal calculation
  - Total discount savings
  - Delivery Fee (₹40 or **FREE** on orders ₹500 and above)
  - Final Grand Total
- LocalStorage state persistence (`mymart_cart`).
- Remove individual items and Clear Cart action.

### 5. 💳 Checkout Simulation (`checkout.html`)
- Shipping address form with validation (Full Name, 10-digit Mobile, Email, Street Address, City, State, 6-digit Pincode).
- Payment method switcher:
  - **Cash on Delivery (COD)**
  - **UPI** (Google Pay, PhonePe, Paytm, BHIM with UPI ID input)
  - **Credit / Debit Cards** (Card number, Expiry, CVV)
- **Order Placement:** Generates unique Order ID (`MM-XXXXXX`), clears cart, stores order record in `LocalStorage`, and displays an interactive Order Success Modal.

### 6. 🔐 Authentication (`login.html` & `register.html`)
- Client-side form validation (Email format, matching passwords, 10-digit mobile number).
- Stores accounts in `LocalStorage` (`mymart_users`) and manages active session (`mymart_currentUser`).
- Navbar automatically reflects logged-in user profile.

### 7. 👤 User Dashboard (`profile.html`)
- Displays active user details (Full Name, Email, Mobile, Registration Date).
- Direct access to order history and 1-click logout button.

### 8. 📦 Order History (`orders.html`)
- Persistent history of past orders stored in `LocalStorage` (`mymart_orders`).
- Displays Order ID, date, delivery address, purchased item thumbnails, payment method, total amount, and status badges (`Placed`, `Processing`, `Delivered`).

---

## 🛠️ Technology Stack

- **HTML5:** Semantic layout tags (`<nav>`, `<header>`, `<main>`, `<section>`, `<footer>`, `<form>`).
- **CSS3:** Custom Properties (CSS Variables), Flexbox, CSS Grid layouts, smooth hover transitions, and responsive media queries.
- **Vanilla JavaScript (ES6+):** Arrow functions, template literals, array methods (`map`, `filter`, `reduce`), URL parameter parsing, DOM manipulation.
- **Browser LocalStorage API:** State persistence across page reloads and browser sessions.
- **Currency Formatting:** Indian Rupee symbol (`₹`) formatted using `toLocaleString('en-IN')`.

---

## 📁 Source Code Structure

```
MYMART/
├── index.html            # Storefront homepage (Hero, Categories, Featured)
├── products.html         # Product catalog page (Search, Filter, Sort)
├── product-details.html  # Dynamic product view with related suggestions
├── cart.html             # Shopping cart page with quantity & summary math
├── checkout.html         # Checkout form & order placement modal
├── login.html            # Login authentication page
├── register.html         # User registration page
├── profile.html          # User account dashboard
├── orders.html           # Previous orders history
├── favicon.svg           # Brand vector favicon
│
├── css/
│   ├── style.css         # Global tokens, navbar, footer, buttons, utilities
│   ├── products.css      # Catalog filters, product cards, details page
│   ├── cart.css          # Cart table, summary card, checkout form, auth forms
│   └── responsive.css    # Responsive media query breakpoints
│
└── js/
    ├── products.js       # Product catalog repository (Fashion & Beauty items)
    ├── main.js           # Shared utilities, cart sync, navbar auth, toast alerts
    ├── products-page.js  # Catalog filtering, search, and sorting logic
    ├── product-details.js# Dynamic product loader & related recommendations
    ├── cart.js           # Shopping cart interactions & price calculations
    ├── checkout.js       # Form validation, order creation & modal handler
    ├── auth.js           # Registration, login & profile management
    └── orders.js         # Order history renderer from LocalStorage
```

---

## 🚀 How to Run Locally

### Option 1: Direct File Opening
Double-click `index.html` to open it directly in any modern web browser.

### Option 2: Live Server (Recommended)
1. Open the project in VS Code.
2. Right-click on `index.html` and choose **"Open with Live Server"**.
3. Visit `http://127.0.0.1:5500`.

---

## 🎓 Technical Viva & Interview Q&A

1. **How is state persisted without a database?**
   - The application utilizes the browser's `window.localStorage` API. Complex state (like cart items, user accounts, and order records) is serialized to JSON via `JSON.stringify()` on save, and deserialized via `JSON.parse()` on load.

2. **How does the Product Details page identify which product to render?**
   - It reads URL query parameters using the standard `URLSearchParams` API (`new URLSearchParams(window.location.search).get('id')`) and retrieves the matching item from `products.js`.

3. **How does the cart badge stay in sync across different HTML pages?**
   - On the `DOMContentLoaded` event on every page, `main.js` executes `updateCartCount()`. This reads `mymart_cart` from LocalStorage, computes total quantity using `reduce()`, and updates `.cart-count-badge` DOM elements.

4. **Is payment processing authentic?**
   - No, it is a realistic client-side simulation. Selecting COD, UPI, or Card triggers client-side format validation, generates an authentic Order ID (`MM-XXXXXX`), commits the order to `mymart_orders` in LocalStorage, empties the cart, and presents a confirmation modal.

---

## 📄 License
This project is open-source and released under the [MIT License](file:///LICENSE).
