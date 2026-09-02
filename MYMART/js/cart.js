// js/cart.js
// MYMART Shopping Cart Controller

document.addEventListener('DOMContentLoaded', () => {
    const cartContainer = document.getElementById('cart-page-container');

    if (!cartContainer) return;

    function renderCartPage() {
        const cart = getCart();

        if (cart.length === 0) {
            cartContainer.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">🛒</div>
                    <h3 class="empty-state-title">Your Cart is Empty</h3>
                    <p class="empty-state-text">Looks like you haven't added any products to your cart yet.</p>
                    <a href="products.html" class="btn btn-primary">Start Shopping Now</a>
                </div>
            `;
            return;
        }

        // Calculate Pricing Math
        let subtotal = 0;
        let originalTotal = 0;

        cart.forEach(item => {
            subtotal += (item.price * item.quantity);
            originalTotal += ((item.originalPrice || item.price) * item.quantity);
        });

        const discountSavings = Math.max(0, originalTotal - subtotal);
        const deliveryCharge = subtotal >= 500 ? 0 : 40;
        const finalTotal = subtotal + deliveryCharge;

        cartContainer.innerHTML = `
            <div class="cart-layout">
                <div class="cart-items-card">
                    <div class="cart-card-header">
                        <h3>Shopping Cart (${cart.reduce((acc, i) => acc + i.quantity, 0)} Items)</h3>
                        <button class="btn btn-danger btn-sm" id="clear-cart-btn">Clear Cart</button>
                    </div>
                    <table class="cart-table">
                        <thead>
                            <tr>
                                <th>Product Details</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Subtotal</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${cart.map(item => `
                                <tr>
                                    <td>
                                        <div class="cart-product-info">
                                            <img src="${item.image}" alt="${item.name}" class="cart-product-img">
                                            <div>
                                                <h4 class="cart-product-title">${item.name}</h4>
                                                <span class="cart-product-category">${item.category || ''}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>${formatPrice(item.price)}</td>
                                    <td>
                                        <div class="quantity-selector">
                                            <button class="qty-btn cart-qty-minus" data-id="${item.id}">-</button>
                                            <input type="text" class="qty-input" value="${item.quantity}" readonly>
                                            <button class="qty-btn cart-qty-plus" data-id="${item.id}">+</button>
                                        </div>
                                    </td>
                                    <td><strong>${formatPrice(item.price * item.quantity)}</strong></td>
                                    <td>
                                        <button class="remove-btn cart-remove-item" data-id="${item.id}" title="Remove Item">🗑️</button>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>

                <div class="summary-card">
                    <h3 class="summary-title">Order Summary</h3>
                    <div class="summary-row">
                        <span>Subtotal</span>
                        <span>${formatPrice(subtotal)}</span>
                    </div>
                    ${discountSavings > 0 ? `
                        <div class="summary-row discount">
                            <span>Discount Savings</span>
                            <span>-${formatPrice(discountSavings)}</span>
                        </div>
                    ` : ''}
                    <div class="summary-row">
                        <span>Delivery Fee</span>
                        <span>${deliveryCharge === 0 ? '<strong style="color:var(--success-color);">FREE</strong>' : formatPrice(deliveryCharge)}</span>
                    </div>
                    <div class="summary-divider"></div>
                    <div class="summary-total">
                        <span>Total Amount</span>
                        <span>${formatPrice(finalTotal)}</span>
                    </div>
                    <div class="cart-actions">
                        <a href="checkout.html" class="btn btn-accent btn-block">Proceed to Checkout ➔</a>
                        <a href="products.html" class="btn btn-outline btn-block">Continue Shopping</a>
                    </div>
                </div>
            </div>
        `;

        // Event listeners for quantity updates
        cartContainer.querySelectorAll('.cart-qty-minus').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = parseInt(btn.getAttribute('data-id'));
                updateItemQuantity(id, -1);
            });
        });

        cartContainer.querySelectorAll('.cart-qty-plus').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = parseInt(btn.getAttribute('data-id'));
                updateItemQuantity(id, 1);
            });
        });

        // Event listener for remove item
        cartContainer.querySelectorAll('.cart-remove-item').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = parseInt(btn.getAttribute('data-id'));
                removeItemFromCart(id);
            });
        });

        // Clear cart listener
        const clearBtn = document.getElementById('clear-cart-btn');
        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                if (confirm("Are you sure you want to clear your cart?")) {
                    saveCart([]);
                    renderCartPage();
                    showToast("Cart cleared!", "error");
                }
            });
        }
    }

    function updateItemQuantity(productId, change) {
        let cart = getCart();
        const index = cart.findIndex(item => item.id === productId);
        if (index > -1) {
            cart[index].quantity += change;
            if (cart[index].quantity <= 0) {
                cart.splice(index, 1);
            }
            saveCart(cart);
            renderCartPage();
        }
    }

    function removeItemFromCart(productId) {
        let cart = getCart();
        cart = cart.filter(item => item.id !== productId);
        saveCart(cart);
        renderCartPage();
        showToast("Item removed from cart!");
    }

    // Initial render
    renderCartPage();
});
