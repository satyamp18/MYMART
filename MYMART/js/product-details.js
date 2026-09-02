// js/product-details.js
// MYMART Product Details Page Controller

document.addEventListener('DOMContentLoaded', () => {
    const detailsContainer = document.getElementById('product-details-container');
    const relatedContainer = document.getElementById('related-products-container');

    if (!detailsContainer) return;

    // Get product ID from URL query string
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    const product = getProductById(productId);

    if (!product) {
        detailsContainer.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">⚠️</div>
                <h3 class="empty-state-title">Product Not Found</h3>
                <p class="empty-state-text">Sorry, the product you are looking for does not exist or has been removed.</p>
                <a href="products.html" class="btn btn-primary">Browse All Products</a>
            </div>
        `;
        if (relatedContainer) relatedContainer.style.display = 'none';
        return;
    }

    // Set page title
    document.title = `${product.name} - MYMART`;

    const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

    // Render Product Details Card
    detailsContainer.innerHTML = `
        <div class="product-detail-card">
            <div class="product-detail-image-container">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-detail-info">
                <span class="product-detail-category">${product.category}</span>
                <h1 class="product-detail-title">${product.name}</h1>
                <div class="product-detail-rating">
                    ${renderStarRating(product.rating)}
                    <span class="rating-count">(${product.reviewsCount} customer reviews)</span>
                </div>
                <div class="product-detail-price-box">
                    <span class="detail-price">${formatPrice(product.price)}</span>
                    <span class="detail-original-price">${formatPrice(product.originalPrice)}</span>
                    ${discount > 0 ? `<span class="detail-discount-badge">${discount}% OFF</span>` : ''}
                </div>
                <p class="product-detail-description">${product.description}</p>
                <div class="stock-status">
                    Status: <span class="${product.stock > 5 ? 'stock-in' : 'stock-low'}">
                        ${product.stock > 0 ? `In Stock (${product.stock} left)` : 'Out of Stock'}
                    </span>
                </div>
                
                <div class="quantity-control-group">
                    <span class="quantity-label">Quantity:</span>
                    <div class="quantity-selector">
                        <button class="qty-btn" id="qty-minus">-</button>
                        <input type="number" id="product-qty-input" class="qty-input" value="1" min="1" max="${product.stock}">
                        <button class="qty-btn" id="qty-plus">+</button>
                    </div>
                </div>

                <div class="detail-actions">
                    <button class="btn btn-outline" id="add-to-cart-detail-btn">🛒 Add to Cart</button>
                    <button class="btn btn-accent" id="buy-now-btn">⚡ Buy Now</button>
                </div>
            </div>
        </div>
    `;

    // Quantity selectors listeners
    const qtyInput = document.getElementById('product-qty-input');
    const qtyMinus = document.getElementById('qty-minus');
    const qtyPlus = document.getElementById('qty-plus');

    if (qtyMinus && qtyPlus && qtyInput) {
        qtyMinus.addEventListener('click', () => {
            let val = parseInt(qtyInput.value) || 1;
            if (val > 1) qtyInput.value = val - 1;
        });

        qtyPlus.addEventListener('click', () => {
            let val = parseInt(qtyInput.value) || 1;
            if (val < product.stock) qtyInput.value = val + 1;
        });
    }

    // Add to cart listener
    const addBtn = document.getElementById('add-to-cart-detail-btn');
    if (addBtn) {
        addBtn.addEventListener('click', () => {
            const qty = parseInt(qtyInput.value) || 1;
            addToCart(product.id, qty);
        });
    }

    // Buy Now listener
    const buyBtn = document.getElementById('buy-now-btn');
    if (buyBtn) {
        buyBtn.addEventListener('click', () => {
            const qty = parseInt(qtyInput.value) || 1;
            addToCart(product.id, qty);
            window.location.href = 'checkout.html';
        });
    }

    // Render Related Products
    if (relatedContainer) {
        const related = products
            .filter(p => p.category === product.category && p.id !== product.id)
            .slice(0, 4);

        if (related.length > 0) {
            relatedContainer.innerHTML = `
                <h3 class="section-title" style="margin-bottom: 20px;">Related Products</h3>
                <div class="product-grid">
                    ${related.map(p => {
                        const relDisc = Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100);
                        return `
                            <div class="product-card">
                                ${relDisc > 0 ? `<span class="product-badge">${relDisc}% OFF</span>` : ''}
                                <div class="product-image-container">
                                    <a href="product-details.html?id=${p.id}">
                                        <img src="${p.image}" alt="${p.name}">
                                    </a>
                                </div>
                                <div class="product-info">
                                    <span class="product-category">${p.category}</span>
                                    <h3 class="product-title">
                                        <a href="product-details.html?id=${p.id}">${p.name}</a>
                                    </h3>
                                    <div class="product-rating">
                                        ${renderStarRating(p.rating)}
                                    </div>
                                    <div class="product-price-row">
                                        <span class="product-price">${formatPrice(p.price)}</span>
                                        <span class="product-original-price">${formatPrice(p.originalPrice)}</span>
                                    </div>
                                    <div class="product-actions">
                                        <a href="product-details.html?id=${p.id}" class="btn btn-outline btn-sm">View</a>
                                    </div>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            `;
        } else {
            relatedContainer.style.display = 'none';
        }
    }
});
