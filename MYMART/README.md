# MYMART - Beginner Frontend E-Commerce Website

> **Tagline:** *"Everything You Need, All in One Place"*

MYMART is a clean, modern, and responsive Indian e-commerce web application designed as a college frontend project. Built strictly using **HTML5, CSS3, Vanilla JavaScript (ES6), and Browser LocalStorage**, this application simulates real-world shopping experiences—including catalog browsing, searching, filtering, cart management, checkout forms, user authentication, and order history tracking—without requiring any backend server or database.

---

## 🌟 Key Features

### 1. 🏠 Home Page (`index.html`)
- **Header & Navigation Bar:** Features the MYMART logo, search bar, dynamic cart counter badge, navigation links, and login/profile user status.
- **Hero Section:** Eye-catching banner with tagline *"Shop smart. Shop simple. Shop with MYMART."* and quick CTA buttons.
- **Popular Categories:** Interactive grid linking directly to filtered product categories (`Electronics`, `Fashion`, `Grocery`, `Home & Kitchen`, `Beauty`, `Sports`).
- **Featured Products & Best Deals:** Dynamic product cards with ratings, prices in Indian Rupees (`₹`), original prices, and discount badges (`% OFF`).
- **Why Choose MYMART:** Service highlights showcasing Fast Delivery, 100% Genuine items, Easy 7-day Returns, and COD/UPI support.

### 2. 🛍️ Products Catalog (`products.html`)
- **Real-Time Search:** Instant client-side search across product names, categories, and descriptions.
- **Category Filter:** Filter by 6 major product categories with interactive category pills.
- **Sorting Options:** Sort products by Price (Low to High, High to Low) and Rating (Highest Rated).
- **Dynamic Cards:** 18+ realistic Indian products complete with star ratings, review counts, stock status, discount badges, and Add to Cart action.
- **Empty State Handling:** Friendly feedback when search or filters return zero matches.

### 3. 🔎 Product Details (`product-details.html`)
- Dynamic URL parameter parser (`product-details.html?id=X`).
- Large product image preview, price breakdown in Rupees (`₹`), discount badge, stock availability, and full product description.
- Quantity selector (`+` / `-`).
- **Buy Now Button:** Immediately adds item to cart and redirects directly to Checkout.
- **Related Products Section:** Automatically displays other products from the same category.

### 4. 🛒 Shopping Cart (`cart.html`)
- Complete shopping cart table displaying product image thumbnail, title, price, quantity controls, and item subtotal.
- **Price Calculation Breakdown:**
  - Subtotal (Sum of items)
  - Discount savings calculated dynamically
  - Delivery Fee (₹40 or **FREE** on orders ₹500 and above)
  - Final Total Amount in Rupees (`₹`)
- LocalStorage persistence sync (`mymart_cart`).
- Remove item button and Clear Cart functionality.

### 5. 💳 Checkout Simulation (`checkout.html`)
- Shipping address form with validation (Full Name, Mobile Number, Email, Address, City, State, 6-digit Pincode).
- Payment method selector:
  - **Cash on Delivery (COD)**
  - **UPI** (GPay, PhonePe, Paytm, BHIM with UPI ID input)
  - **Credit / Debit Card** (Card number, Expiry, CVV)
- **Order Generation:** Generates a unique Order ID (`MM-XXXXXX`), clears cart, saves order details to `LocalStorage`, and displays an interactive Order Success Modal.

### 6. 🔐 User Authentication (`login.html` & `register.html`)
- Client-side form validation (Email format, matching passwords, 10-digit mobile number).
- Stores user accounts in `LocalStorage` (`mymart_users`) and active login session (`mymart_currentUser`).

### 7. 👤 User Account & Profile (`profile.html`)
- Displays active user details (Full Name, Email, Mobile).
- Navigation to order history and account logout button.

### 8. 📦 Order History (`orders.html`)
- Persistent history of past demo orders stored in `LocalStorage` (`mymart_orders`).
- Displays Order ID, date, delivery address, purchased items list, payment method, total amount, and status badges (`Placed`, `Processing`, `Delivered`).

---

## 🛠️ Technology Stack

- **HTML5:** Semantic layout tags (`<nav>`, `<header>`, `<main>`, `<section>`, `<footer>`).
- **CSS3:** Custom properties (CSS Variables), Flexbox, CSS Grid layouts, transition animations, and responsive media queries. No external frameworks (No Bootstrap, No Tailwind).
- **Vanilla JavaScript (ES6):** DOM manipulation, event listeners, URL parameter parsing, custom arrays/objects handling, modular scripts.
- **Browser LocalStorage API:** Client-side state persistence for cart items, user accounts, active sessions, and order history.
- **Currency:** Indian Rupee symbol (`₹`) formatted using `toLocaleString('en-IN')`.

---

## 📁 Project Folder Structure

```
MYMART/
│
├── index.html            # Home page (Hero, Categories, Featured, Services)
├── products.html         # Product catalog page (Search, Filter, Sort)
├── product-details.html  # Dynamic product detailed view
├── cart.html             # Shopping cart page with quantity & summary math
├── checkout.html         # Checkout form & order placement modal
├── login.html            # Login authentication page
├── register.html         # User registration page
├── profile.html          # User account dashboard
├── orders.html           # Previous orders history
│
├── css/
│   ├── style.css         # Global design tokens, navbar, footer, buttons, cards
│   ├── products.css      # Filter bar & product detail styles
│   ├── cart.css          # Cart table, checkout form & auth styles
│   └── responsive.css    # Responsive breakpoints (Desktop, Tablet, Mobile)
│
├── js/
│   ├── products.js       # Product data array (18 realistic items)
│   ├── main.js           # Core utilities, cart count, navbar auth, toast alerts
│   ├── products-page.js  # Catalog filtering, search, and sorting logic
│   ├── product-details.js# Dynamic product loader & related products
│   ├── cart.js           # Shopping cart interactions & price calculations
│   ├── checkout.js       # Form validation, order creation & modal handler
│   ├── auth.js           # Registration, login & profile management
│   └── orders.js         # Order history renderer from LocalStorage
│
├── images/               # Image assets directory
└── README.md             # Project documentation
```

---

## 🚀 How to Run the Project Locally

### Option 1: Direct File Opening (No Installation Required)
1. Double-click or open `index.html` in any modern web browser (Google Chrome, Microsoft Edge, Mozilla Firefox, Safari).

### Option 2: Live Server (Recommended for VS Code)
1. Open the `MYMART` folder in VS Code.
2. Install the **Live Server** extension (by Ritwick Dey).
3. Right-click on `index.html` and select **"Open with Live Server"**.
4. Access the site in your browser at `http://127.0.0.1:5500`.

---

## 📸 Screenshots Placeholder

> *Add screenshots here for your viva presentation slides or documentation report:*
> - `[Screenshot of Home Page Banner & Categories]`
> - `[Screenshot of Products Grid with Filters]`
> - `[Screenshot of Product Details Page]`
> - `[Screenshot of Cart Page with Order Summary]`
> - `[Screenshot of Checkout Form & Order Success Modal]`
> - `[Screenshot of Order History Page]`

---

## 🎓 College Viva Q&A Tips

1. **How is state saved without a database?**
   - We use HTML5 Web Storage API (`window.localStorage`). Data is stored as JSON strings using `localStorage.setItem()` and retrieved via `JSON.parse(localStorage.getItem())`.

2. **How does the Product Details page know which product to display?**
   - JavaScript extracts the URL parameter using `new URLSearchParams(window.location.search).get('id')` and finds the matching object from `products.js`.

3. **How does the cart badge count update across pages?**
   - On page load (`DOMContentLoaded`), `main.js` runs `updateCartCount()`, which reads the current `mymart_cart` array from `LocalStorage` and updates all `.cart-count-badge` DOM elements.

4. **Is the payment gateway real?**
   - No, it is a client-side simulation. Selecting COD, UPI, or Card triggers JavaScript form validation, generates a random Order ID, updates `LocalStorage`, and clears the active cart.

---

## 🔮 Future Improvements

- Add wishlist functionality using LocalStorage.
- Integrate backend API (Node.js/Express) and database (MongoDB/MySQL) for real payment gateways (Razorpay/Stripe).
- Add product review submission form.
- Implement user password reset functionality.
