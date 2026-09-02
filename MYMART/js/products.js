// js/products.js
// MYMART Product Data Repository - Exclusive Fashion & Beauty Catalog

const products = [
    // --- FASHION CATEGORY ---
    {
        id: 1,
        name: "Men's Slim Fit Cotton Casual Shirt",
        category: "Fashion",
        subcategory: "Men's Fashion",
        price: 799,
        originalPrice: 1299,
        rating: 4.5,
        reviewsCount: 184,
        stock: 25,
        image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&auto=format&fit=crop&q=80",
        description: "100% premium breathable cotton slim fit casual shirt suitable for office wear and weekend outings."
    },
    {
        id: 2,
        name: "Women's Elegant Leather Handbag",
        category: "Fashion",
        subcategory: "Women's Fashion",
        price: 1299,
        originalPrice: 1999,
        rating: 4.7,
        reviewsCount: 210,
        stock: 12,
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&auto=format&fit=crop&q=80",
        description: "Elegant PU leather handbag featuring multiple zippered compartments, sturdy shoulder straps, and gold-tone hardware."
    },
    {
        id: 3,
        name: "Unisex Lightweight Sports Running Shoes",
        category: "Fashion",
        subcategory: "Footwear",
        price: 1599,
        originalPrice: 2499,
        rating: 4.6,
        reviewsCount: 290,
        stock: 18,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=80",
        description: "Flexible mesh sports running shoes with cushioned EVA sole for enhanced comfort during daily workouts."
    },
    {
        id: 4,
        name: "Stylish Waterproof Backpack 30L",
        category: "Fashion",
        subcategory: "Accessories",
        price: 899,
        originalPrice: 1499,
        rating: 4.4,
        reviewsCount: 175,
        stock: 30,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&auto=format&fit=crop&q=80",
        description: "Durable polyester backpack with padded 15.6-inch laptop sleeve and ergonomic shoulder straps."
    },
    {
        id: 5,
        name: "Men's Classic Denim Jacket",
        category: "Fashion",
        subcategory: "Men's Fashion",
        price: 1899,
        originalPrice: 2999,
        rating: 4.6,
        reviewsCount: 142,
        stock: 15,
        image: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=500&auto=format&fit=crop&q=80",
        description: "Rugged denim jacket featuring chest flap pockets, button closure, and timeless casual style."
    },
    {
        id: 6,
        name: "Women's Floral Print Summer Dress",
        category: "Fashion",
        subcategory: "Women's Fashion",
        price: 1199,
        originalPrice: 1799,
        rating: 4.5,
        reviewsCount: 165,
        stock: 20,
        image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500&auto=format&fit=crop&q=80",
        description: "Lightweight rayon A-line summer dress with vibrant floral print and comfortable waist fit."
    },
    {
        id: 7,
        name: "Classic UV Polarized Sunglasses",
        category: "Fashion",
        subcategory: "Accessories",
        price: 599,
        originalPrice: 999,
        rating: 4.3,
        reviewsCount: 120,
        stock: 40,
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&auto=format&fit=crop&q=80",
        description: "UV400 protection polarized sunglasses with sleek metal frame and anti-glare lens."
    },
    {
        id: 8,
        name: "Men's Leather Casual Belt",
        category: "Fashion",
        subcategory: "Accessories",
        price: 499,
        originalPrice: 799,
        rating: 4.4,
        reviewsCount: 98,
        stock: 35,
        image: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=500&auto=format&fit=crop&q=80",
        description: "100% genuine leather dress belt with sturdy alloy buckle and polished finish."
    },
    {
        id: 9,
        name: "Women's Casual White Sneakers",
        category: "Fashion",
        subcategory: "Footwear",
        price: 1399,
        originalPrice: 2199,
        rating: 4.7,
        reviewsCount: 230,
        stock: 14,
        image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&auto=format&fit=crop&q=80",
        description: "Trendy low-top white sneakers featuring soft memory foam insole for all-day comfort."
    },

    // --- BEAUTY CATEGORY ---
    {
        id: 10,
        name: "Gentle Aloe Vera & Neem Face Wash (150ml)",
        category: "Beauty",
        subcategory: "Skincare",
        price: 249,
        originalPrice: 349,
        rating: 4.6,
        reviewsCount: 310,
        stock: 45,
        image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500&auto=format&fit=crop&q=80",
        description: "Dermatologist-tested daily face wash infused with organic aloe vera and neem extracts for clear skin."
    },
    {
        id: 11,
        name: "Hydrating Shea Butter Body Moisturizer (200ml)",
        category: "Beauty",
        subcategory: "Skincare",
        price: 399,
        originalPrice: 599,
        rating: 4.7,
        reviewsCount: 215,
        stock: 30,
        image: "https://images.unsplash.com/photo-1608248597261-833258657b45?w=500&auto=format&fit=crop&q=80",
        description: "Rich non-greasy body lotion with shea butter and vitamin E providing 48-hour deep nourishment."
    },
    {
        id: 12,
        name: "Matte Finish Waterproof Lipstick Set (3 Shades)",
        category: "Beauty",
        subcategory: "Cosmetics",
        price: 699,
        originalPrice: 1099,
        rating: 4.5,
        reviewsCount: 180,
        stock: 22,
        image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=500&auto=format&fit=crop&q=80",
        description: "Long-lasting smudge-proof matte lipstick combo kit enriched with vitamin E for silky smooth lips."
    },
    {
        id: 13,
        name: "Nourishing Herbal Hair Oil (200ml)",
        category: "Beauty",
        subcategory: "Haircare",
        price: 299,
        originalPrice: 449,
        rating: 4.8,
        reviewsCount: 340,
        stock: 50,
        image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=500&auto=format&fit=crop&q=80",
        description: "Traditional Ayurvedic hair oil formulated with bhringraj, amla, and coconut oil to strengthen roots."
    },
    {
        id: 14,
        name: "Vitamin C Brightening Face Serum (30ml)",
        category: "Beauty",
        subcategory: "Skincare",
        price: 549,
        originalPrice: 899,
        rating: 4.6,
        reviewsCount: 260,
        stock: 25,
        image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&auto=format&fit=crop&q=80",
        description: "High-potency 20% Vitamin C serum with hyaluronic acid to reduce dark spots and boost natural glow."
    },
    {
        id: 15,
        name: "Luxury Eau De Parfum for Men & Women (100ml)",
        category: "Beauty",
        subcategory: "Fragrance",
        price: 999,
        originalPrice: 1599,
        rating: 4.7,
        reviewsCount: 195,
        stock: 16,
        image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=500&auto=format&fit=crop&q=80",
        description: "Long-lasting premium perfume crafted with notes of amber, sandalwood, and fresh citrus citrus notes."
    },
    {
        id: 16,
        name: "Pro Makeup Brush Set (10 Pcs)",
        category: "Beauty",
        subcategory: "Cosmetics",
        price: 499,
        originalPrice: 799,
        rating: 4.4,
        reviewsCount: 140,
        stock: 28,
        image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500&auto=format&fit=crop&q=80",
        description: "Ultra-soft synthetic hair makeup brushes for smooth application of foundation, powder, and eyeshadow."
    }
];

// Helper functions for products data
function getProductById(id) {
    return products.find(p => p.id === parseInt(id));
}

function getProductsByCategory(category) {
    if (!category || category === "All") return products;
    return products.filter(p => p.category.toLowerCase() === category.toLowerCase());
}
