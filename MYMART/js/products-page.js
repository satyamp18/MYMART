// js/products-page.js
// MYMART Products Page Controller (Fashion & Beauty Specialization)

document.addEventListener('DOMContentLoaded', () => {
    const productsContainer = document.getElementById('products-grid-container');
    const categoryPillsContainer = document.getElementById('category-pills-container');
    const sortSelect = document.getElementById('sort-products-select');
    const resultsCountElement = document.getElementById('results-count-text');

    if (!productsContainer) return;

    // Parse URL parameters for category & search
    const urlParams = new URLSearchParams(window.location.search);
    let selectedCategory = urlParams.get('category') || 'All';
    let searchQuery = urlParams.get('search') || '';
    let currentSort = 'default';

    const categories = ['All', 'Fashion', 'Beauty'];

    // Render Category Filter Pills
    function renderCategoryPills() {
        if (!categoryPillsContainer) return;
        categoryPillsContainer.innerHTML = categories.map(cat => `
            <button class="pill-btn ${cat.toLowerCase() === selectedCategory.toLowerCase() ? 'active' : ''}" 
                    data-category="${cat}">
                ${cat}
            </button>
        `).join('');

        // Add event listeners to category pills
        categoryPillsContainer.querySelectorAll('.pill-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                selectedCategory = btn.getAttribute('data-category');
                renderCategoryPills();
                filterAndRenderProducts();
            });
        });
    }

    // Filter and Sort Products
    function filterAndRenderProducts() {
        let filtered = [...products];

        // 1. Filter by Category
        if (selectedCategory && selectedCategory !== 'All') {
            filtered = filtered.filter(p => p.category.toLowerCase() === selectedCategory.toLowerCase());
        }

        // 2. Filter by Search Query
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(p => 
                p.name.toLowerCase().includes(query) || 
                p.category.toLowerCase().includes(query) ||
                (p.subcategory && p.subcategory.toLowerCase().includes(query)) ||
                p.description.toLowerCase().includes(query)
            );
        }

        // 3. Apply Sorting
        if (currentSort === 'price-low') {
            filtered.sort((a, b) => a.price - b.price);
        } else if (currentSort === 'price-high') {
            filtered.sort((a, b) => b.price - a.price);
        } else if (currentSort === 'rating') {
            filtered.sort((a, b) => b.rating - a.rating);
        }

        // Update count text
        if (resultsCountElement) {
            if (searchQuery) {
                resultsCountElement.textContent = `Showing ${filtered.length} results for "${searchQuery}"`;
            } else {
                resultsCountElement.textContent = `Showing ${filtered.length} products`;
            }
        }

        // Render products or empty state
        if (filtered.length === 0) {
            productsContainer.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">🔍</div>
                    <h3 class="empty-state-title">No products found</h3>
                    <p class="empty-state-text">We couldn't find any products matching your current filters or search term.</p>
                    <button class="btn btn-primary" id="reset-filters-btn">Clear All Filters</button>
                </div>
            `;
            const resetBtn = document.getElementById('reset-filters-btn');
            if (resetBtn) {
                resetBtn.addEventListener('click', () => {
                    selectedCategory = 'All';
                    searchQuery = '';
                    currentSort = 'default';
                    if (sortSelect) sortSelect.value = 'default';
                    renderCategoryPills();
                    filterAndRenderProducts();
                });
            }
        } else {
            productsContainer.innerHTML = filtered.map(p => {
                const discount = Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100);
                return `
                    <div class="product-card">
                        ${discount > 0 ? `<span class="product-badge">${discount}% OFF</span>` : ''}
                        <div class="product-image-container">
                            <a href="product-details.html?id=${p.id}">
                                <img src="${p.image}" alt="${p.name}" loading="lazy">
                            </a>
                        </div>
                        <div class="product-info">
                            <span class="product-category">${p.category} ${p.subcategory ? `• ${p.subcategory}` : ''}</span>
                            <h3 class="product-title">
                                <a href="product-details.html?id=${p.id}">${p.name}</a>
                            </h3>
                            <div class="product-rating">
                                ${renderStarRating(p.rating)}
                                <span class="rating-count">(${p.reviewsCount})</span>
                            </div>
                            <div class="product-price-row">
                                <span class="product-price">${formatPrice(p.price)}</span>
                                <span class="product-original-price">${formatPrice(p.originalPrice)}</span>
                            </div>
                            <div class="product-actions">
                                <a href="product-details.html?id=${p.id}" class="btn btn-outline btn-sm">Details</a>
                                <button class="btn btn-accent btn-sm add-to-cart-btn" data-id="${p.id}">
                                    🛒 Add
                                </button>
                            </div>
                        </div>
                    </div>
                `;
            }).join('');

            // Attach event listeners to Add to Cart buttons
            productsContainer.querySelectorAll('.add-to-cart-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    const id = btn.getAttribute('data-id');
                    addToCart(id, 1);
                });
            });
        }
    }

    // Sort select listener
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            currentSort = e.target.value;
            filterAndRenderProducts();
        });
    }

    // Initialize
    renderCategoryPills();
    filterAndRenderProducts();
});
