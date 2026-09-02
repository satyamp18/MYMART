// js/orders.js
// MYMART Order History Controller

document.addEventListener('DOMContentLoaded', () => {
    const ordersContainer = document.getElementById('orders-page-container');

    if (!ordersContainer) return;

    const orders = JSON.parse(localStorage.getItem(ORDERS_STORAGE_KEY) || '[]');

    if (orders.length === 0) {
        ordersContainer.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">📦</div>
                <h3 class="empty-state-title">No Orders Placed Yet</h3>
                <p class="empty-state-text">You haven't placed any orders with MYMART yet. Explore our products and order today!</p>
                <a href="products.html" class="btn btn-primary">Start Shopping</a>
            </div>
        `;
        return;
    }

    ordersContainer.innerHTML = orders.map(order => `
        <div class="order-card">
            <div class="order-header">
                <div>
                    <span class="order-id">Order #${order.orderId}</span>
                    <span style="font-size:0.85rem; color:var(--text-muted); margin-left:10px;">Placed on ${order.date}</span>
                </div>
                <div style="display:flex; align-items:center; gap:15px;">
                    <span class="order-status status-${(order.status || 'Placed').toLowerCase()}">${order.status || 'Placed'}</span>
                    <strong>${formatPrice(order.total)}</strong>
                </div>
            </div>

            <div class="order-body">
                <div style="margin-bottom:12px; font-size:0.85rem; color:var(--text-muted);">
                    <strong>Payment Method:</strong> ${order.paymentMethod} | 
                    <strong>Deliver To:</strong> ${order.customer.name}, ${order.customer.city} (${order.customer.pincode})
                </div>

                <div style="margin-top:10px;">
                    ${order.items.map(item => `
                        <div class="order-item-row">
                            <div style="display:flex; align-items:center; gap:12px;">
                                <img src="${item.image}" alt="${item.name}" style="width:45px; height:45px; object-fit:cover; border-radius:4px;">
                                <div>
                                    <div style="font-weight:600; font-size:0.9rem;">${item.name}</div>
                                    <div style="font-size:0.8rem; color:var(--text-muted);">Qty: ${item.quantity} x ${formatPrice(item.price)}</div>
                                </div>
                            </div>
                            <div style="font-weight:600; font-size:0.9rem;">${formatPrice(item.price * item.quantity)}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `).join('');
});
