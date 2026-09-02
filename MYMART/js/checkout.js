// js/checkout.js
// MYMART Checkout Page Controller

document.addEventListener('DOMContentLoaded', () => {
    const checkoutContainer = document.getElementById('checkout-page-container');
    const modalOverlay = document.getElementById('order-success-modal');

    if (!checkoutContainer) return;

    const cart = getCart();

    if (cart.length === 0) {
        checkoutContainer.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">🛒</div>
                <h3 class="empty-state-title">Your Cart is Empty</h3>
                <p class="empty-state-text">You cannot proceed to checkout without items in your cart.</p>
                <a href="products.html" class="btn btn-primary">Browse Products</a>
            </div>
        `;
        return;
    }

    // Auto-fill logged in user info if present
    const currentUser = getCurrentUser() || {};

    // Calculate totals
    let subtotal = 0;
    cart.forEach(item => {
        subtotal += (item.price * item.quantity);
    });
    const deliveryCharge = subtotal >= 500 ? 0 : 40;
    const finalTotal = subtotal + deliveryCharge;

    checkoutContainer.innerHTML = `
        <div class="checkout-layout">
            <div class="checkout-form-section">
                <form id="checkout-form">
                    <div class="form-card">
                        <h3 class="form-card-title">1. Shipping Address</h3>
                        <div class="form-grid">
                            <div class="form-group">
                                <label class="form-label">Full Name *</label>
                                <input type="text" id="cust-name" class="form-input" value="${currentUser.name || ''}" placeholder="Enter full name" required>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Mobile Number *</label>
                                <input type="tel" id="cust-mobile" class="form-input" value="${currentUser.mobile || ''}" placeholder="10-digit mobile number" pattern="[0-9]{10}" required>
                            </div>
                            <div class="form-group full-width">
                                <label class="form-label">Email Address *</label>
                                <input type="email" id="cust-email" class="form-input" value="${currentUser.email || ''}" placeholder="example@domain.com" required>
                            </div>
                            <div class="form-group full-width">
                                <label class="form-label">Street Address *</label>
                                <input type="text" id="cust-address" class="form-input" placeholder="House/Flat No., Street Name, Area" required>
                            </div>
                            <div class="form-group">
                                <label class="form-label">City *</label>
                                <input type="text" id="cust-city" class="form-input" placeholder="e.g. Mumbai, Delhi" required>
                            </div>
                            <div class="form-group">
                                <label class="form-label">State *</label>
                                <input type="text" id="cust-state" class="form-input" placeholder="e.g. Maharashtra" required>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Pincode *</label>
                                <input type="text" id="cust-pincode" class="form-input" placeholder="6-digit pincode" pattern="[0-9]{6}" required>
                            </div>
                        </div>
                    </div>

                    <div class="form-card">
                        <h3 class="form-card-title">2. Payment Method</h3>
                        <div class="payment-methods">
                            <label class="payment-option selected" id="opt-cod">
                                <input type="radio" name="payment-method" value="Cash on Delivery" checked>
                                <div>
                                    <strong>Cash on Delivery (COD)</strong>
                                    <p style="font-size:0.85rem; color:var(--text-muted);">Pay in cash when your order is delivered to your doorstep.</p>
                                </div>
                            </label>
                            
                            <label class="payment-option" id="opt-upi">
                                <input type="radio" name="payment-method" value="UPI">
                                <div>
                                    <strong>UPI (GPay / PhonePe / Paytm / BHIM)</strong>
                                    <p style="font-size:0.85rem; color:var(--text-muted);">Instant virtual payment via mobile app.</p>
                                </div>
                            </label>
                            
                            <label class="payment-option" id="opt-card">
                                <input type="radio" name="payment-method" value="Credit/Debit Card">
                                <div>
                                    <strong>Credit / Debit Card</strong>
                                    <p style="font-size:0.85rem; color:var(--text-muted);">Visa, MasterCard, RuPay accepted.</p>
                                </div>
                            </label>
                        </div>

                        <div id="payment-details-box" class="payment-details" style="display:none;">
                            <!-- Dynamic fields for UPI / Card -->
                        </div>
                    </div>

                    <button type="submit" class="btn btn-accent btn-block" style="padding:14px; font-size:1.1rem;">
                        🔒 Place Order (${formatPrice(finalTotal)})
                    </button>
                </form>
            </div>

            <div class="checkout-summary-section">
                <div class="summary-card">
                    <h3 class="summary-title">Order Items (${cart.length})</h3>
                    <div style="max-height: 250px; overflow-y: auto; margin-bottom: 15px;">
                        ${cart.map(item => `
                            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px; font-size:0.9rem;">
                                <div style="display:flex; align-items:center; gap:8px;">
                                    <img src="${item.image}" alt="${item.name}" style="width:36px; height:36px; object-fit:cover; border-radius:4px;">
                                    <span>${item.name} (x${item.quantity})</span>
                                </div>
                                <span>${formatPrice(item.price * item.quantity)}</span>
                            </div>
                        `).join('')}
                    </div>

                    <div class="summary-divider"></div>
                    <div class="summary-row">
                        <span>Subtotal</span>
                        <span>${formatPrice(subtotal)}</span>
                    </div>
                    <div class="summary-row">
                        <span>Delivery Fee</span>
                        <span>${deliveryCharge === 0 ? 'FREE' : formatPrice(deliveryCharge)}</span>
                    </div>
                    <div class="summary-divider"></div>
                    <div class="summary-total">
                        <span>Total Payable</span>
                        <span>${formatPrice(finalTotal)}</span>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Payment selection toggle
    const radioButtons = document.querySelectorAll('input[name="payment-method"]');
    const paymentBox = document.getElementById('payment-details-box');

    radioButtons.forEach(radio => {
        radio.addEventListener('change', (e) => {
            document.querySelectorAll('.payment-option').forEach(opt => opt.classList.remove('selected'));
            e.target.closest('.payment-option').classList.add('selected');

            if (e.target.value === 'UPI') {
                paymentBox.style.display = 'block';
                paymentBox.innerHTML = `
                    <div class="form-group" style="margin:0;">
                        <label class="form-label">Enter UPI ID</label>
                        <input type="text" placeholder="username@upi / username@okaxis" class="form-input" required>
                    </div>
                `;
            } else if (e.target.value === 'Credit/Debit Card') {
                paymentBox.style.display = 'block';
                paymentBox.innerHTML = `
                    <div class="form-grid">
                        <div class="form-group full-width">
                            <label class="form-label">Card Number</label>
                            <input type="text" placeholder="16-digit Card Number" class="form-input" maxlength="16" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Expiry Date</label>
                            <input type="text" placeholder="MM/YY" class="form-input" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">CVV</label>
                            <input type="password" placeholder="3 Digits" class="form-input" maxlength="3" required>
                        </div>
                    </div>
                `;
            } else {
                paymentBox.style.display = 'none';
                paymentBox.innerHTML = '';
            }
        });
    });

    // Handle Form Submit (Order Placement)
    const checkoutForm = document.getElementById('checkout-form');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('cust-name').value.trim();
            const mobile = document.getElementById('cust-mobile').value.trim();
            const email = document.getElementById('cust-email').value.trim();
            const address = document.getElementById('cust-address').value.trim();
            const city = document.getElementById('cust-city').value.trim();
            const state = document.getElementById('cust-state').value.trim();
            const pincode = document.getElementById('cust-pincode').value.trim();
            const selectedPayment = document.querySelector('input[name="payment-method"]:checked').value;

            // Generate Order ID
            const orderId = 'MM-' + Math.floor(100000 + Math.random() * 900000);
            const orderDate = new Date().toLocaleDateString('en-IN', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });

            const newOrder = {
                orderId: orderId,
                date: orderDate,
                customer: { name, mobile, email, address, city, state, pincode },
                paymentMethod: selectedPayment,
                items: [...cart],
                subtotal: subtotal,
                deliveryFee: deliveryCharge,
                total: finalTotal,
                status: 'Placed'
            };

            // Save order to LocalStorage
            try {
                const storedOrders = JSON.parse(localStorage.getItem(ORDERS_STORAGE_KEY) || '[]');
                storedOrders.unshift(newOrder);
                localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(storedOrders));
            } catch (err) {
                console.error("Failed saving order:", err);
            }

            // Clear Cart
            saveCart([]);

            // Open Success Modal
            if (modalOverlay) {
                document.getElementById('modal-order-id').textContent = orderId;
                document.getElementById('modal-cust-name').textContent = name;
                document.getElementById('modal-total-amount').textContent = formatPrice(finalTotal);
                modalOverlay.classList.add('active');
            } else {
                alert(`Order Placed Successfully! Your Order ID is ${orderId}`);
                window.location.href = 'orders.html';
            }
        });
    }
});
