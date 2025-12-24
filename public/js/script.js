/**
 * Bishopsmen Emporium - Jumia Style E-commerce
 * Premium Men's Fashion & Accessories
 */

// Configuration
const CONFIG = {
    CURRENCY: '₦',
    TAX_RATE: 0.075,
    SHIPPING_FEE: 1500,
    FREE_SHIPPING_THRESHOLD: 1000000,
    EXCHANGE_RATE: 1 // All prices are now in NGN
};

// State Management
class Store {
    constructor() {
        this.state = {
            currentPage: 'home',
            currentCategory: 'all',
            cart: JSON.parse(localStorage.getItem('bishopsmen_cart')) || [],
            products: JSON.parse(localStorage.getItem('bishopsmen_products')) || this.getDefaultProducts(),
            user: JSON.parse(localStorage.getItem('bishopsmen_user')) || null,
            searchQuery: '',
            filters: {
                category: [],
                brand: [],
                priceRange: [0, 500000],
                condition: []
            },
            sortBy: 'featured',
            currentSlide: 0
        };
    }

    getDefaultProducts() {
        return [
            {
                id: '1',
                name: 'Premium Wool Pant Trouser - Black',
                category: 'pants',
                brand: 'Hugo Boss',
                price: 189990,
                originalPrice: 329990,
                image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&auto=format&fit=crop',
                images: [
                    'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1604176354204-9268737828e4?w=400&auto=format&fit=crop'
                ],
                sizes: ['30', '32', '34', '36', '38'],
                condition: 'like-new',
                stock: 8,
                rating: 4.8,
                reviews: 24,
                description: 'Premium Italian wool pant trousers in classic black. A versatile staple for business and formal occasions.',
                features: ['100% Italian Wool', 'Flat Front', 'Slim Fit', 'Crease Resistant'],
                isFeatured: true,
                isFlashDeal: true,
                discount: 40,
                tags: ['pants', 'trousers', 'formal', 'business', 'premium']
            },
            {
                id: '2',
                name: 'Designer Dress Shirt - White',
                category: 'shirts',
                brand: 'Armani',
                price: 89990,
                originalPrice: 149990,
                image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&auto=format&fit=crop',
                images: [
                    'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&auto=format&fit=crop'
                ],
                sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
                condition: 'new',
                stock: 12,
                rating: 4.6,
                reviews: 18,
                description: 'Premium cotton dress shirt with French cuffs. Perfect for business casual wear.',
                features: ['100% Egyptian Cotton', 'French Cuffs', 'Spread Collar'],
                isFeatured: true,
                isFlashDeal: false,
                discount: 40,
                tags: ['shirt', 'formal', 'cotton']
            },
            {
                id: '3',
                name: 'Leather Oxford Shoes - Brown',
                category: 'shoes',
                brand: 'Gucci',
                price: 349990,
                originalPrice: 599990,
                image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&auto=format&fit=crop',
                images: [
                    'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&auto=format&fit=crop'
                ],
                sizes: ['9', '9.5', '10', '10.5', '11'],
                condition: 'excellent',
                stock: 5,
                rating: 4.9,
                reviews: 32,
                description: 'Handcrafted leather Oxford shoes in rich brown. Premium quality for the discerning gentleman.',
                features: ['Full Grain Leather', 'Goodyear Welted', 'Leather Sole'],
                isFeatured: true,
                isFlashDeal: true,
                discount: 42,
                tags: ['shoes', 'oxford', 'leather', 'formal']
            },
            {
                id: '4',
                name: 'Classic Polo Shirt - Navy',
                category: 'shirts',
                brand: 'Burberry',
                price: 129990,
                originalPrice: 199990,
                image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&auto=format&fit=crop',
                images: [
                    'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&auto=format&fit=crop'
                ],
                sizes: ['M', 'L', 'XL'],
                condition: 'excellent',
                stock: 2,
                rating: 4.7,
                reviews: 15,
                description: 'A timeless navy polo shirt from Burberry, crafted from premium piqué cotton.',
                features: ['100% Piqué Cotton', 'Embroidered Logo', 'Classic Fit'],
                isFeatured: true,
                isFlashDeal: false,
                discount: 35,
                tags: ['polo', 'shirt', 'casual', 'burberry']
            },
            {
                id: '5',
                name: 'Graphic Print T-Shirt - Grey',
                category: 'shirts',
                brand: 'Tom Ford',
                price: 79990,
                originalPrice: 129990,
                image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&auto=format&fit=crop',
                images: [
                    'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&auto=format&fit=crop'
                ],
                sizes: ['S', 'M', 'L'],
                condition: 'like-new',
                stock: 1,
                rating: 5.0,
                reviews: 8,
                description: 'A stylish and comfortable graphic print t-shirt for a casual yet sophisticated look.',
                features: ['Soft Jersey Cotton', 'Crew Neck', 'Modern Print'],
                isFeatured: true,
                isFlashDeal: true,
                discount: 38,
                tags: ['t-shirt', 'casual', 'graphic']
            },
            {
                id: '6',
                name: 'Suede Loafers - Tan',
                category: 'shoes',
                brand: 'Prada',
                price: 450000,
                originalPrice: 650000,
                image: 'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=400&auto=format&fit=crop',
                images: [
                    'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=400&auto=format&fit=crop'
                ],
                sizes: ['9', '10', '11'],
                condition: 'good',
                stock: 4,
                rating: 4.5,
                reviews: 12,
                description: 'Elegant tan suede loafers from Prada, perfect for smart-casual events.',
                features: ['Genuine Suede', 'Leather Lining', 'Rubber Sole'],
                isFeatured: false,
                isFlashDeal: false,
                discount: 30,
                tags: ['shoes', 'loafers', 'suede', 'prada']
            },
            {
                id: '7',
                name: 'Leather Belt - Black',
                category: 'accessories',
                brand: 'Hermès',
                price: 250000,
                originalPrice: 350000,
                image: 'https://images.unsplash.com/photo-1585951237318-9ea5e175b891?w=400&auto=format&fit=crop',
                images: [
                    'https://images.unsplash.com/photo-1585951237318-9ea5e175b891?w=400&auto=format&fit=crop'
                ],
                sizes: ['Standard'],
                condition: 'new',
                stock: 8,
                rating: 4.4,
                reviews: 21,
                description: 'A classic black leather belt from Hermès with a signature buckle.',
                features: ['Calfskin Leather', 'Polished Buckle', 'Made in France'],
                isFeatured: false,
                isFlashDeal: true,
                discount: 29,
                tags: ['belt', 'accessories', 'leather', 'hermes']
            },
            {
                id: '8',
                name: 'Pant Trousers',
                category: 'pants',
                brand: 'Gucci',
                price: 199990,
                originalPrice: 349990,
                image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&auto=format&fit=crop',
                images: [
                    'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&auto=format&fit=crop'
                ],
                sizes: ['30', '32', '34', '36'],
                condition: 'like-new',
                stock: 6,
                rating: 4.6,
                reviews: 14,
                description: 'Stylish wool pant trousers perfect for any formal or business setting.',
                features: ['100% Wool', 'Slim Fit', 'Modern Design'],
                isFeatured: true,
                isFlashDeal: false,
                discount: 43,
                tags: ['pants', 'trousers', 'wool', 'formal']
            }
        ];
    }

    saveCart() {
        localStorage.setItem('bishopsmen_cart', JSON.stringify(this.state.cart));
    }

    saveProducts() {
        localStorage.setItem('bishopsmen_products', JSON.stringify(this.state.products));
    }

    getCartTotal() {
        return this.state.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    getCartCount() {
        return this.state.cart.reduce((count, item) => count + item.quantity, 0);
    }

    formatPrice(price) {
        return new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: 'NGN',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(price);
    }

    usdToNgn(usdAmount) {
        return Math.round(usdAmount * CONFIG.EXCHANGE_RATE);
    }

    getFilteredProducts() {
        let filtered = [...this.state.products];

        // Apply category filter
        if (this.state.filters.category.length > 0) {
            filtered = filtered.filter(product => 
                this.state.filters.category.includes(product.category)
            );
        }

        // Apply brand filter
        if (this.state.filters.brand.length > 0) {
            filtered = filtered.filter(product => 
                this.state.filters.brand.includes(product.brand.toLowerCase().replace(/\s+/g, '-'))
            );
        }

        // Apply price range filter
        const [minPrice, maxPrice] = this.state.filters.priceRange;
        filtered = filtered.filter(product => {
            const price = product.price;
            return price >= minPrice && price <= maxPrice;
        });

        // Apply condition filter
        if (this.state.filters.condition.length > 0) {
            filtered = filtered.filter(product => 
                this.state.filters.condition.includes(product.condition)
            );
        }

        // Apply search query
        if (this.state.searchQuery) {
            const query = this.state.searchQuery.toLowerCase();
            filtered = filtered.filter(product => 
                product.name.toLowerCase().includes(query) ||
                product.brand.toLowerCase().includes(query) ||
                product.description.toLowerCase().includes(query) ||
                product.tags.some(tag => tag.toLowerCase().includes(query))
            );
        }

        // Apply sorting
        switch (this.state.sortBy) {
            case 'price-low':
                filtered.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                filtered.sort((a, b) => b.price - a.price);
                break;
            case 'newest':
                // Assuming newer products have higher IDs
                filtered.sort((a, b) => b.id - a.id);
                break;
            case 'rating':
                filtered.sort((a, b) => b.rating - a.rating);
                break;
            case 'featured':
            default:
                filtered.sort((a, b) => {
                    // Featured products first, then by rating
                    if (a.isFeatured && !b.isFeatured) return -1;
                    if (!a.isFeatured && b.isFeatured) return 1;
                    return b.rating - a.rating;
                });
                break;
        }

        return filtered;
    }

    getFlashDeals() {
        return this.state.products.filter(product => product.isFlashDeal);
    }

    getFeaturedProducts() {
        return this.state.products.filter(product => product.isFeatured);
    }
}

// Main Application
class BishopsmenApp {
    constructor() {
        this.store = new Store();
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupSlider();
        this.updateCartCount();
        this.loadHomePage();
        this.setupDealTimer();
    }

    setupEventListeners() {
        // Search functionality
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.store.state.searchQuery = e.target.value;
                this.showSearchSuggestions(e.target.value);
            });
        }

        // Search button
        const searchBtn = document.querySelector('.search-btn');
        if (searchBtn) {
            searchBtn.addEventListener('click', () => this.performSearch());
        }

        // Enter key in search
        if (searchInput) {
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.performSearch();
                }
            });
        }

        // Category buttons
        document.querySelectorAll('.category-card').forEach(card => {
            card.addEventListener('click', (e) => {
                e.preventDefault();
                const category = card.querySelector('.category-name').textContent.toLowerCase();
                this.filterCategory(category);
            });
        });

        // Tab buttons
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const category = btn.dataset.category;
                this.loadFeaturedProducts(category);
                
                // Update active tab
                document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });

        // Add to cart buttons
        document.addEventListener('click', (e) => {
            if (e.target.closest('.add-to-cart-btn')) {
                const productId = e.target.closest('.add-to-cart-btn').dataset.productId;
                this.addToCart(productId);
            }
        });

        // Quick view buttons
        document.addEventListener('click', (e) => {
            if (e.target.closest('.quick-view-btn')) {
                const productId = e.target.closest('.quick-view-btn').dataset.productId;
                this.showQuickView(productId);
            }
        });

        // Wishlist buttons
        document.addEventListener('click', (e) => {
            if (e.target.closest('.product-wishlist')) {
                const productId = e.target.closest('.product-card').dataset.productId;
                this.toggleWishlist(productId);
            }
        });

        // Sort select
        const sortSelect = document.querySelector('.sort-select');
        if (sortSelect) {
            sortSelect.addEventListener('change', (e) => {
                this.store.state.sortBy = e.target.value;
                this.loadShopProducts();
            });
        }

        // Filter checkboxes
        document.querySelectorAll('.filter-item input').forEach(input => {
            input.addEventListener('change', () => {
                this.updateFilters();
            });
        });

        // Apply filters button
        const applyFiltersBtn = document.querySelector('.apply-filters-btn');
        if (applyFiltersBtn) {
            applyFiltersBtn.addEventListener('click', () => {
                this.loadShopProducts();
            });
        }

        // Clear filters button
        const clearFiltersBtn = document.querySelector('.clear-filters-btn');
        if (clearFiltersBtn) {
            clearFiltersBtn.addEventListener('click', () => {
                this.clearFilters();
            });
        }

        // Pagination buttons
        document.addEventListener('click', (e) => {
            if (e.target.closest('.pagination-btn')) {
                const btn = e.target.closest('.pagination-btn');
                if (!btn.classList.contains('active') && !btn.disabled) {
                    this.handlePagination(btn);
                }
            }
        });

        // Close cart sidebar when clicking overlay
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('cart-overlay')) {
                this.toggleCart();
            }
        });
    }

    setupSlider() {
        const slides = document.querySelectorAll('.slide');
        const dots = document.querySelectorAll('.dot');
        const prevBtn = document.querySelector('.slider-prev');
        const nextBtn = document.querySelector('.slider-next');

        if (!slides.length) return;

        let currentSlide = 0;
        const totalSlides = slides.length;

        const showSlide = (index) => {
            slides.forEach((slide, i) => {
                slide.classList.toggle('active', i === index);
            });
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
            currentSlide = index;
            this.store.state.currentSlide = index;
        };

        const nextSlide = () => {
            showSlide((currentSlide + 1) % totalSlides);
        };

        const prevSlide = () => {
            showSlide((currentSlide - 1 + totalSlides) % totalSlides);
        };

        if (prevBtn) {
            prevBtn.addEventListener('click', prevSlide);
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', nextSlide);
        }

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => showSlide(index));
        });

        // Auto slide every 5 seconds
        setInterval(nextSlide, 5000);
    }

    setupDealTimer() {
        const timerElement = document.getElementById('dealTimer');
        if (!timerElement) return;

        const updateTimer = () => {
            const now = new Date();
            const endOfDay = new Date();
            endOfDay.setHours(23, 59, 59, 999);
            
            const diff = endOfDay - now;
            
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);
            
            timerElement.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        };

        updateTimer();
        setInterval(updateTimer, 1000);
    }

    // Navigation
    navigateTo(page) {
        this.store.state.currentPage = page;
        
        // Hide all pages
        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
        
        // Show target page
        const target = document.getElementById(page);
        if (target) {
            target.classList.add('active');
            window.scrollTo(0, 0);
            
            // Load page content
            switch (page) {
                case 'home':
                    this.loadHomePage();
                    break;
                case 'shop':
                    this.loadShopPage();
                    break;
                case 'cart':
                    this.loadCartPage();
                    break;
            }
        }
    }

    filterCategory(category) {
        this.store.state.currentCategory = category;
        this.navigateTo('shop');
        
        // Set category filter
        this.store.state.filters.category = [category];
        this.updateFilterUI();
        this.loadShopProducts();
    }

    // Home Page
    loadHomePage() {
        this.loadFlashDeals();
        this.loadFeaturedProducts('new');
    }

    loadFlashDeals() {
        const dealsGrid = document.querySelector('.deals-grid');
        if (!dealsGrid) return;

        const flashDeals = this.store.getFlashDeals();
        
        dealsGrid.innerHTML = flashDeals.map(product => `
            <div class="product-card" data-product-id="${product.id}">
                <div class="product-badge">${product.discount}% OFF</div>
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}" loading="lazy">
                    <button class="product-wishlist" title="Add to Wishlist">
                        <i class="far fa-heart"></i>
                    </button>
                </div>
                <div class="product-info">
                    <div class="product-category">${product.category}</div>
                    <div class="product-name">${product.name}</div>
                    <div class="product-rating">
                        <div class="rating-stars">
                            ${this.generateStarRating(product.rating)}
                        </div>
                        <span class="rating-count">(${product.reviews})</span>
                    </div>
                    <div class="product-price">
                        <span class="current-price">${this.store.formatPrice(product.price)}</span>
                        <span class="original-price">${this.store.formatPrice(product.originalPrice)}</span>
                        <span class="discount">-${product.discount}%</span>
                    </div>
                    <div class="product-actions">
                        <button class="add-to-cart-btn" data-product-id="${product.id}">
                            <i class="fas fa-cart-plus"></i>
                            Add to Cart
                        </button>
                        <button class="quick-view-btn" data-product-id="${product.id}" title="Quick View">
                            <i class="fas fa-eye"></i>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    loadFeaturedProducts(category = 'new') {
        const productsGrid = document.getElementById('featuredProducts');
        if (!productsGrid) return;

        let featuredProducts = this.store.getFeaturedProducts();
        
        // Filter by category if needed
        if (category === 'trending') {
            // Sort by reviews (most reviewed = trending)
            featuredProducts.sort((a, b) => b.reviews - a.reviews);
        } else if (category === 'best') {
            // Sort by rating (highest rated = best sellers)
            featuredProducts.sort((a, b) => b.rating - a.rating);
        }
        // 'new' category shows featured products as-is

        productsGrid.innerHTML = featuredProducts.map(product => `
            <div class="product-card" data-product-id="${product.id}">
                ${product.discount ? `<div class="product-badge">${product.discount}% OFF</div>` : ''}
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}" loading="lazy">
                    <button class="product-wishlist" title="Add to Wishlist">
                        <i class="far fa-heart"></i>
                    </button>
                </div>
                <div class="product-info">
                    <div class="product-category">${product.category}</div>
                    <div class="product-name">${product.name}</div>
                    <div class="product-rating">
                        <div class="rating-stars">
                            ${this.generateStarRating(product.rating)}
                        </div>
                        <span class="rating-count">(${product.reviews})</span>
                    </div>
                    <div class="product-price">
                        <span class="current-price">${this.store.formatPrice(product.price)}</span>
                        ${product.originalPrice ? `
                            <span class="original-price">${this.store.formatPrice(product.originalPrice)}</span>
                        ` : ''}
                    </div>
                    <div class="product-actions">
                        <button class="add-to-cart-btn" data-product-id="${product.id}">
                            <i class="fas fa-cart-plus"></i>
                            Add to Cart
                        </button>
                        <button class="quick-view-btn" data-product-id="${product.id}" title="Quick View">
                            <i class="fas fa-eye"></i>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Shop Page
    loadShopPage() {
        this.loadShopProducts();
    }

    loadShopProducts() {
        const productsGrid = document.getElementById('shopProducts');
        if (!productsGrid) return;

        const filteredProducts = this.store.getFilteredProducts();
        
        // Update results count
        const resultsCount = document.querySelector('.results-count');
        if (resultsCount) {
            resultsCount.textContent = `Showing 1-${Math.min(24, filteredProducts.length)} of ${filteredProducts.length} products`;
        }

        productsGrid.innerHTML = filteredProducts.slice(0, 24).map(product => `
            <div class="product-card" data-product-id="${product.id}">
                ${product.discount ? `<div class="product-badge">${product.discount}% OFF</div>` : ''}
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}" loading="lazy">
                    <button class="product-wishlist" title="Add to Wishlist">
                        <i class="far fa-heart"></i>
                    </button>
                </div>
                <div class="product-info">
                    <div class="product-category">${product.category}</div>
                    <div class="product-name">${product.name}</div>
                    <div class="product-rating">
                        <div class="rating-stars">
                            ${this.generateStarRating(product.rating)}
                        </div>
                        <span class="rating-count">(${product.reviews})</span>
                    </div>
                    <div class="product-price">
                        <span class="current-price">${this.store.formatPrice(product.price)}</span>
                        ${product.originalPrice ? `
                            <span class="original-price">${this.store.formatPrice(product.originalPrice)}</span>
                            ${product.discount ? `<span class="discount">-${product.discount}%</span>` : ''}
                        ` : ''}
                    </div>
                    <div class="product-actions">
                        <button class="add-to-cart-btn" data-product-id="${product.id}">
                            <i class="fas fa-cart-plus"></i>
                            Add to Cart
                        </button>
                        <button class="quick-view-btn" data-product-id="${product.id}" title="Quick View">
                            <i class="fas fa-eye"></i>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    updateFilterUI() {
        // Update category checkboxes
        document.querySelectorAll('.filter-item input[name="category"]').forEach(input => {
            input.checked = this.store.state.filters.category.includes(input.value);
        });

        // Update brand checkboxes
        document.querySelectorAll('.filter-item input[name="brand"]').forEach(input => {
            input.checked = this.store.state.filters.brand.includes(input.value);
        });

        // Update condition checkboxes
        document.querySelectorAll('.filter-item input[name="condition"]').forEach(input => {
            input.checked = this.store.state.filters.condition.includes(input.value);
        });

        // Update price range
        const [minPrice, maxPrice] = this.store.state.filters.priceRange;
        document.querySelector('.range-min').value = minPrice;
        document.querySelector('.range-max').value = maxPrice;
        document.querySelector('.range-min-value').textContent = this.store.formatPrice(minPrice / CONFIG.EXCHANGE_RATE);
        document.querySelector('.range-max-value').textContent = this.store.formatPrice(maxPrice / CONFIG.EXCHANGE_RATE);
    }

    updateFilters() {
        // Get category filters
        const categoryFilters = [];
        document.querySelectorAll('.filter-item input[name="category"]:checked').forEach(input => {
            categoryFilters.push(input.value);
        });
        this.store.state.filters.category = categoryFilters;

        // Get brand filters
        const brandFilters = [];
        document.querySelectorAll('.filter-item input[name="brand"]:checked').forEach(input => {
            brandFilters.push(input.value);
        });
        this.store.state.filters.brand = brandFilters;

        // Get condition filters
        const conditionFilters = [];
        document.querySelectorAll('.filter-item input[name="condition"]:checked').forEach(input => {
            conditionFilters.push(input.value);
        });
        this.store.state.filters.condition = conditionFilters;

        // Get price range
        const minPrice = parseInt(document.querySelector('.range-min').value);
        const maxPrice = parseInt(document.querySelector('.range-max').value);
        this.store.state.filters.priceRange = [minPrice, maxPrice];
    }

    clearFilters() {
        // Reset all filters
        this.store.state.filters = {
            category: [],
            brand: [],
            priceRange: [0, 500000],
            condition: []
        };

        // Reset UI
        document.querySelectorAll('.filter-item input').forEach(input => {
            input.checked = false;
        });
        
        document.querySelector('.range-min').value = 0;
        document.querySelector('.range-max').value = 500000;
        document.querySelector('.range-min-value').textContent = this.store.formatPrice(0);
        document.querySelector('.range-max-value').textContent = this.store.formatPrice(500000 / CONFIG.EXCHANGE_RATE);

        // Reload products
        this.loadShopProducts();
    }

    // Cart Functionality
    toggleCart() {
        const cartSidebar = document.querySelector('.cart-sidebar');
        cartSidebar.classList.toggle('active');
        
        if (cartSidebar.classList.contains('active')) {
            this.loadCartSidebar();
        }
    }

    addToCart(productId) {
        const product = this.store.state.products.find(p => p.id === productId);
        if (!product) return;

        const existingItem = this.store.state.cart.find(item => item.id === productId);

        if (existingItem) {
            if (existingItem.quantity < product.stock) {
                existingItem.quantity++;
            } else {
                this.showNotification(`Only ${product.stock} items available in stock`, 'warning');
                return;
            }
        } else {
            if (product.stock > 0) {
                this.store.state.cart.push({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    quantity: 1,
                    maxStock: product.stock
                });
            } else {
                this.showNotification('Product out of stock', 'warning');
                return;
            }
        }

        this.store.saveCart();
        this.updateCartCount();
        this.showNotification('Added to cart!', 'success');
        
        // Update cart sidebar if open
        if (document.querySelector('.cart-sidebar.active')) {
            this.loadCartSidebar();
        }
    }

    updateCartCount() {
        const cartCount = document.getElementById('cartCount');
        const sidebarCartCount = document.getElementById('sidebarCartCount');
        const count = this.store.getCartCount();

        if (cartCount) cartCount.textContent = count;
        if (sidebarCartCount) sidebarCartCount.textContent = `${count} ${count === 1 ? 'item' : 'items'}`;
    }

    loadCartSidebar() {
        const cartItems = document.getElementById('cartSidebarItems');
        const sidebarTotal = document.getElementById('sidebarTotal');

        if (!cartItems || !sidebarTotal) return;

        if (this.store.state.cart.length === 0) {
            cartItems.innerHTML = `
                <div class="empty-cart">
                    <i class="fas fa-shopping-cart fa-3x" style="color: #ccc; margin-bottom: 16px;"></i>
                    <p>Your cart is empty</p>
                    <a href="#" class="btn btn-primary" onclick="app.navigateTo('shop')">Start Shopping</a>
                </div>
            `;
            sidebarTotal.textContent = this.store.formatPrice(0);
            return;
        }

        cartItems.innerHTML = this.store.state.cart.map(item => `
            <div class="cart-sidebar-item">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}" loading="lazy">
                </div>
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">${this.store.formatPrice(item.price)}</div>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn minus" data-product-id="${item.id}">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="quantity-btn plus" data-product-id="${item.id}">+</button>
                        <button class="remove-btn" data-product-id="${item.id}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');

        // Add event listeners for quantity buttons
        cartItems.querySelectorAll('.quantity-btn.minus').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.updateCartQuantity(btn.dataset.productId, -1);
            });
        });

        cartItems.querySelectorAll('.quantity-btn.plus').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.updateCartQuantity(btn.dataset.productId, 1);
            });
        });

        cartItems.querySelectorAll('.remove-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.removeFromCart(btn.dataset.productId);
            });
        });

        const total = this.store.getCartTotal();
        sidebarTotal.textContent = this.store.formatPrice(total);
    }

    updateCartQuantity(productId, change) {
        const item = this.store.state.cart.find(item => item.id === productId);
        if (!item) return;

        const product = this.store.state.products.find(p => p.id === productId);
        const newQuantity = item.quantity + change;

        if (newQuantity < 1) {
            this.removeFromCart(productId);
            return;
        }

        if (newQuantity > item.maxStock) {
            this.showNotification(`Only ${item.maxStock} items available in stock`, 'warning');
            return;
        }

        item.quantity = newQuantity;
        this.store.saveCart();
        this.updateCartCount();
        this.loadCartSidebar();
    }

    removeFromCart(productId) {
        const index = this.store.state.cart.findIndex(item => item.id === productId);
        if (index !== -1) {
            this.store.state.cart.splice(index, 1);
            this.store.saveCart();
            this.updateCartCount();
            this.loadCartSidebar();
            this.showNotification('Item removed from cart', 'info');
        }
    }

    loadCartPage() {
        // Similar to loadCartSidebar but for full cart page
        // Implement cart page functionality
    }

    // Search Functionality
    showSearchSuggestions(query) {
        const suggestionsContainer = document.getElementById('searchSuggestions');
        if (!suggestionsContainer) return;

        if (!query.trim()) {
            suggestionsContainer.classList.remove('active');
            suggestionsContainer.innerHTML = '';
            return;
        }

        const matchingProducts = this.store.state.products.filter(product => 
            product.name.toLowerCase().includes(query.toLowerCase()) ||
            product.brand.toLowerCase().includes(query.toLowerCase()) ||
            product.category.toLowerCase().includes(query.toLowerCase())
        ).slice(0, 5);

        if (matchingProducts.length === 0) {
            suggestionsContainer.innerHTML = '<div class="no-suggestions">No products found</div>';
        } else {
            suggestionsContainer.innerHTML = matchingProducts.map(product => `
                <a href="#" class="suggestion-item" data-product-id="${product.id}">
                    <img src="${product.image}" alt="${product.name}">
                    <div class="suggestion-info">
                        <div class="suggestion-name">${product.name}</div>
                        <div class="suggestion-price">${this.store.formatPrice(product.price)}</div>
                    </div>
                </a>
            `).join('');

            // Add click event listeners
            suggestionsContainer.querySelectorAll('.suggestion-item').forEach(item => {
                item.addEventListener('click', (e) => {
                    e.preventDefault();
                    const productId = item.dataset.productId;
                    this.showProductDetail(productId);
                });
            });
        }

        suggestionsContainer.classList.add('active');
    }

    performSearch() {
        const searchInput = document.getElementById('searchInput');
        if (!searchInput) return;

        this.store.state.searchQuery = searchInput.value.trim();
        this.navigateTo('shop');
        
        // Hide suggestions
        const suggestionsContainer = document.getElementById('searchSuggestions');
        if (suggestionsContainer) {
            suggestionsContainer.classList.remove('active');
        }
    }

    // Product Detail
    showProductDetail(productId) {
        this.navigateTo('product-detail');
        // Implement product detail page
    }

    showQuickView(productId) {
        const product = this.store.state.products.find(p => p.id === productId);
        if (!product) return;

        const modal = document.querySelector('.quick-view-modal');
        const modalContent = modal.querySelector('.modal-content');

        modalContent.innerHTML = `
            <div class="quick-view-content">
                <button class="modal-close" onclick="app.closeQuickView()">
                    <i class="fas fa-times"></i>
                </button>
                <div class="quick-view-grid">
                    <div class="quick-view-images">
                        <div class="main-image">
                            <img src="${product.image}" alt="${product.name}">
                        </div>
                    </div>
                    <div class="quick-view-details">
                        <h2 class="product-title">${product.name}</h2>
                        <div class="product-rating">
                            <div class="rating-stars">
                                ${this.generateStarRating(product.rating)}
                            </div>
                            <span class="rating-count">${product.rating} (${product.reviews} reviews)</span>
                        </div>
                        <div class="product-price">
                            <span class="current-price">${this.store.formatPrice(product.price)}</span>
                            ${product.originalPrice ? `
                                <span class="original-price">${this.store.formatPrice(product.originalPrice)}</span>
                                <span class="discount">-${product.discount}%</span>
                            ` : ''}
                        </div>
                        <div class="product-description">
                            <p>${product.description}</p>
                        </div>
                        <div class="product-features">
                            <h4>Features:</h4>
                            <ul>
                                ${product.features.map(feature => `<li>${feature}</li>`).join('')}
                            </ul>
                        </div>
                        <div class="product-actions">
                            <div class="quantity-selector">
                                <button class="qty-btn minus">-</button>
                                <input type="number" class="qty-input" value="1" min="1" max="${product.stock}">
                                <button class="qty-btn plus">+</button>
                            </div>
                            <button class="btn btn-primary add-to-cart-full" data-product-id="${product.id}">
                                <i class="fas fa-cart-plus"></i>
                                Add to Cart
                            </button>
                            <button class="btn btn-secondary buy-now" data-product-id="${product.id}">
                                <i class="fas fa-bolt"></i>
                                Buy Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        modal.classList.add('active');

        // Add event listeners for quick view
        const addToCartBtn = modal.querySelector('.add-to-cart-full');
        if (addToCartBtn) {
            addToCartBtn.addEventListener('click', () => {
                this.addToCart(productId);
                this.closeQuickView();
            });
        }

        const buyNowBtn = modal.querySelector('.buy-now');
        if (buyNowBtn) {
            buyNowBtn.addEventListener('click', () => {
                this.addToCart(productId);
                this.closeQuickView();
                this.navigateTo('cart');
            });
        }

        // Quantity selector
        const qtyInput = modal.querySelector('.qty-input');
        const minusBtn = modal.querySelector('.qty-btn.minus');
        const plusBtn = modal.querySelector('.qty-btn.plus');

        if (minusBtn) {
            minusBtn.addEventListener('click', () => {
                const currentValue = parseInt(qtyInput.value);
                if (currentValue > 1) {
                    qtyInput.value = currentValue - 1;
                }
            });
        }

        if (plusBtn) {
            plusBtn.addEventListener('click', () => {
                const currentValue = parseInt(qtyInput.value);
                if (currentValue < product.stock) {
                    qtyInput.value = currentValue + 1;
                }
            });
        }
    }

    closeQuickView() {
        const modal = document.querySelector('.quick-view-modal');
        modal.classList.remove('active');
    }

    // Wishlist
    toggleWishlist(productId) {
        // Implement wishlist functionality
        this.showNotification('Added to wishlist', 'success');
    }

    // Pagination
    handlePagination(button) {
        // Implement pagination
    }

    // Helper Functions
    generateStarRating(rating) {
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

        let stars = '';
        for (let i = 0; i < fullStars; i++) {
            stars += '<i class="fas fa-star"></i>';
        }
        if (halfStar) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        }
        for (let i = 0; i < emptyStars; i++) {
            stars += '<i class="far fa-star"></i>';
        }
        return stars;
    }

    showNotification(message, type = 'info') {
        // Remove existing notification
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Create notification
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;

        document.body.appendChild(notification);

        // Auto remove after 3 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateY(-10px)';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    checkout() {
        if (this.store.state.cart.length === 0) {
            this.showNotification('Your cart is empty', 'warning');
            return;
        }

        this.showNotification('Proceeding to checkout...', 'success');
        // Implement checkout process
    }
}

// Initialize the application
let app;

document.addEventListener('DOMContentLoaded', () => {
    app = new BishopsmenApp();
    
    // Make app available globally for onclick handlers
    window.app = app;
    
    // Global functions for onclick handlers
    window.navigateTo = (page) => app.navigateTo(page);
    window.filterCategory = (category) => app.filterCategory(category);
    window.toggleCart = () => app.toggleCart();
    window.closeQuickView = () => app.closeQuickView();
    window.checkout = () => app.checkout();
});