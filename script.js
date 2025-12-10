// Exchange rate: 1 USD = 1500 NGN (approximate)
const EXCHANGE_RATE = 1500;

// Format Nigerian Naira currency
function formatNaira(amount) {
    return new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
}

// Convert USD to NGN
function usdToNgn(usdAmount) {
    return Math.round(usdAmount * EXCHANGE_RATE);
}

// Product Data (prices in USD, will be converted to NGN)
const products = [
    {
        id: '1',
        name: 'Cotton Polo Shirt',
        category: 'polos',
        price: 49.99,
        image: 'https://images.unsplash.com/photo-1618799613432-92b276e96a7d?w=600',
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        condition: 'Excellent',
        brand: 'Ralph Lauren'
    },
    {
        id: '2',
        name: 'Oxford Dress Shirt',
        category: 'shirts',
        price: 49.99,
        image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600',
        sizes: ['M', 'L', 'XL'],
        condition: 'Like New',
        brand: 'Brooks Brothers'
    },
    {
        id: '3',
        name: 'Khaki Shorts',
        category: 'shorts',
        price: 39.99,
        image: 'https://images.unsplash.com/photo-1517949645590-b03de20d69a6?w=600',
        sizes: ['28', '30', '32', '34', '36'],
        condition: 'Excellent',
        brand: 'Tommy Hilfiger'
    },
    {
        id: '4',
        name: 'Leather Dress Shoes',
        category: 'shoes',
        price: 89.99,
        image: 'https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=600',
        sizes: ['9', '9.5', '10', '10.5', '11'],
        condition: 'Very Good',
        brand: 'Allen Edmonds'
    },
    {
        id: '5',
        name: 'Cashmere Sweater',
        category: 'sweaters',
        price: 79.99,
        image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600',
        sizes: ['M', 'L', 'XL'],
        condition: 'Excellent',
        brand: 'Ralph Lauren'
    },
    {
        id: '6',
        name: 'Wool Trousers',
        category: 'pants',
        price: 69.99,
        image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600',
        sizes: ['32', '34', '36', '38'],
        condition: 'Like New',
        brand: 'J.Crew'
    },
    {
        id: '7',
        name: 'Silk Tie Collection',
        category: 'accessories',
        price: 29.99,
        image: 'https://images.unsplash.com/photo-1589756823695-278bc8f28e1b?w=600',
        sizes: ['One Size'],
        condition: 'Excellent',
        brand: 'Hermès'
    },
    {
        id: '8',
        name: 'Leather Belt',
        category: 'accessories',
        price: 39.99,
        image: 'https://images.unsplash.com/photo-1624222247344-550fb60583bb?w=600',
        sizes: ['32', '34', '36', '38'],
        condition: 'Very Good',
        brand: 'Coach'
    },
    {
        id: '9',
        name: 'Denim Jacket',
        category: 'jackets',
        price: 89.99,
        image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600',
        sizes: ['S', 'M', 'L', 'XL'],
        condition: 'Very Good',
        brand: 'Levi\'s'
    },
    {
        id: '10',
        name: 'Running Shoes',
        category: 'shoes',
        price: 129.99,
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600',
        sizes: ['8', '9', '10', '11', '12'],
        condition: 'Like New',
        brand: 'Nike'
    }
];

// State Management
let currentPage = 'home';
let currentCategory = 'all';
let cart = [];
let selectedProduct = null;
let selectedSize = '';
let isSearchOpen = false;

// Theme (light/dark) functions
function applyTheme(theme) {
    const html = document.documentElement;
    if (theme === 'dark') {
        html.classList.add('dark');
        html.classList.remove('light');
    } else {
        html.classList.remove('dark');
        html.classList.add('light');
    }
    localStorage.setItem('theme', theme);
    updateThemeIcon();
}

function toggleTheme() {
    const currentTheme = localStorage.getItem('theme') || 
                       (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
}

function updateThemeIcon() {
    const btn = document.getElementById('themeToggle');
    if (!btn) return;
    
    const isDark = document.documentElement.classList.contains('dark');
    
    // Clear existing content
    btn.innerHTML = '';
    
    if (isDark) {
        // Moon icon for dark mode (switch to light)
        btn.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
        `;
        btn.setAttribute('title', 'Switch to light mode');
        btn.setAttribute('aria-label', 'Switch to light mode');
    } else {
        // Sun icon for light mode (switch to dark)
        btn.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
        `;
        btn.setAttribute('title', 'Switch to dark mode');
        btn.setAttribute('aria-label', 'Switch to dark mode');
    }
}

function initTheme() {
    const stored = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (stored) {
        applyTheme(stored);
    } else if (prefersDark) {
        applyTheme('dark');
    } else {
        applyTheme('light');
    }
    
    // Listen for system theme changes
    if (window.matchMedia) {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        mediaQuery.addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                applyTheme(e.matches ? 'dark' : 'light');
            }
        });
    }
}

// Search Functionality
function toggleSearch() {
    const searchContainer = document.getElementById('searchContainer');
    const searchInput = document.getElementById('searchInput');
    
    isSearchOpen = !isSearchOpen;
    
    if (isSearchOpen) {
        searchContainer.classList.add('active');
        searchInput.focus();
        document.addEventListener('keydown', handleEscapeKey);
        document.addEventListener('click', handleOutsideClick);
    } else {
        searchContainer.classList.remove('active');
        document.getElementById('searchResults').classList.remove('active');
        searchInput.value = '';
        document.removeEventListener('keydown', handleEscapeKey);
        document.removeEventListener('click', handleOutsideClick);
    }
}

function handleEscapeKey(e) {
    if (e.key === 'Escape') {
        toggleSearch();
    }
}

function handleOutsideClick(e) {
    const searchContainer = document.getElementById('searchContainer');
    const searchBar = document.getElementById('searchBar');
    const searchResults = document.getElementById('searchResults');
    
    if (!searchContainer.contains(e.target) && 
        !e.target.closest('.icon-btn[title="Search"]')) {
        toggleSearch();
    }
}

function performSearch(query) {
    const searchResults = document.getElementById('searchResults');
    
    if (!query.trim()) {
        searchResults.classList.remove('active');
        searchResults.innerHTML = '';
        return;
    }
    
    const searchTerm = query.toLowerCase().trim();
    
    // Search in product name, brand, category, and condition
    const results = products.filter(product => {
        const searchableText = `
            ${product.name.toLowerCase()}
            ${product.brand.toLowerCase()}
            ${product.category.toLowerCase()}
            ${product.condition.toLowerCase()}
        `;
        return searchableText.includes(searchTerm);
    });
    
    searchResults.innerHTML = '';
    
    if (results.length === 0) {
        searchResults.innerHTML = `
            <div class="no-results">
                No products found for "${query}"
            </div>
        `;
    } else {
        results.forEach(product => {
            const resultItem = document.createElement('div');
            resultItem.className = 'search-result-item';
            resultItem.innerHTML = `
                <div class="search-result-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="search-result-info">
                    <div class="search-result-name">${product.name}</div>
                    <div class="search-result-details">
                        <span class="search-result-brand">${product.brand}</span>
                        <span class="search-result-category">${product.category}</span>
                        <span class="search-result-price">${formatNaira(usdToNgn(product.price))}</span>
                    </div>
                </div>
            `;
            
            resultItem.addEventListener('click', () => {
                // Navigate to shop page
                navigateTo('shop');
                // Filter to the product's category
                filterCategory(product.category);
                // Open the product modal
                setTimeout(() => openProductModal(product.id), 100);
                // Close search
                toggleSearch();
            });
            
            searchResults.appendChild(resultItem);
        });
    }
    
    searchResults.classList.add('active');
}

// Debounce search function to prevent too many searches
let searchTimeout;
function handleSearchInput() {
    const searchInput = document.getElementById('searchInput');
    clearTimeout(searchTimeout);
    
    searchTimeout = setTimeout(() => {
        performSearch(searchInput.value);
    }, 300);
}

// Auth functions
function toggleAuthMode() {
    const login = document.getElementById('loginForm');
    const register = document.getElementById('registerForm');
    const title = document.getElementById('authTitle');
    const btn = document.getElementById('authToggleBtn');
    const switchText = document.getElementById('authSwitchText');
    
    if (!login || !register || !title || !btn) return;
    
    if (login.style.display === 'none') {
        login.style.display = '';
        register.style.display = 'none';
        title.textContent = 'Login';
        btn.textContent = 'Register';
        switchText.textContent = "Don't have an account?";
    } else {
        login.style.display = 'none';
        register.style.display = '';
        title.textContent = 'Create Account';
        btn.textContent = 'Back to Login';
        switchText.textContent = 'Already have an account?';
    }
}

function handleLogin(e) {
    e.preventDefault();
    authenticateUser();
}

function handleRegister(e) {
    e.preventDefault();
    authenticateUser();
}

function authenticateUser() {
    localStorage.setItem('authenticated', 'true');
    
    const navBar = document.querySelector('.nav-bar');
    const footer = document.querySelector('.site-footer');
    
    if (navBar) navBar.classList.add('authenticated');
    if (footer) footer.classList.add('authenticated');
    
    navigateTo('shop');
}

function logout() {
    localStorage.removeItem('authenticated');
    
    const navBar = document.querySelector('.nav-bar');
    const footer = document.querySelector('.site-footer');
    
    if (navBar) navBar.classList.remove('authenticated');
    if (footer) footer.classList.remove('authenticated');
    
    navigateTo('home');
}

// Navigation
function navigateTo(page) {
    // Admin-only protection: redirect non-admins away
    if (page === 'admin-dashboard' && !isAdmin()) {
        alert('Access denied: Admins only');
        page = 'home';
    }

    // Require authentication for user dashboard
    if (page === 'user-dashboard' && localStorage.getItem('authenticated') !== 'true') {
        alert('Please login to view your dashboard');
        page = 'home';
    }

    currentPage = page;

    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    const target = document.getElementById(page);
    if (target) target.classList.add('active');
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.dataset.page === page) {
            link.classList.add('active');
        }
    });

    if (page === 'shop') {
        renderProducts();
    } else if (page === 'admin-dashboard') {
        loadAdminDashboard();
    } else if (page === 'user-dashboard') {
        loadUserDashboard();
    }
}

// Category Filter
function filterCategory(category) {
    currentCategory = category;
    
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.category === category) {
            btn.classList.add('active');
        }
    });
    
    renderProducts();
}

// Render Products with Naira prices
async function renderProducts() {
    const grid = document.getElementById('productsGrid');
    grid.innerHTML = '<div class="loading">Loading products...</div>';
    try {
        const res = await fetch('/api/products');
        const allProducts = await res.json();
        const filteredProducts = currentCategory === 'all' ? allProducts : allProducts.filter(p => p.category === currentCategory);

        grid.innerHTML = filteredProducts.map(product => {
            const nairaPrice = usdToNgn(product.price);
            return `
                <div class="product-card" onclick="openProductModal('${product.id}')">
                    <div class="product-image">
                        <img src="${product.image}" alt="${product.name}">
                    </div>
                    <div class="product-info">
                        <div class="product-brand">${product.brand}</div>
                        <div class="product-name">${product.name}</div>
                        <div class="product-footer">
                            <span class="product-price">${formatNaira(nairaPrice)}</span>
                            <span class="product-condition">${product.condition}</span>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    } catch (err) {
        grid.innerHTML = '<div class="error">Failed to load products</div>';
        console.error(err);
    }
}

// Product Modal functions
async function openProductModal(productId) {
    try {
        const res = await fetch('/api/products');
        const allProducts = await res.json();
        selectedProduct = allProducts.find(p => p.id === productId);
        if (!selectedProduct) return;

        selectedSize = selectedProduct.sizes[0];
        const nairaPrice = usdToNgn(selectedProduct.price);

        document.getElementById('modalImage').src = selectedProduct.image;
        document.getElementById('modalBrand').textContent = selectedProduct.brand;
        document.getElementById('modalName').textContent = selectedProduct.name;
        document.getElementById('modalPrice').textContent = formatNaira(nairaPrice);
        document.getElementById('modalCondition').textContent = selectedProduct.condition;

        const sizeOptions = document.getElementById('sizeOptions');
        sizeOptions.innerHTML = selectedProduct.sizes.map(size => `
            <button class="size-btn ${size === selectedSize ? 'active' : ''}" onclick="selectSize('${size}')">
                ${size}
            </button>
        `).join('');

        document.getElementById('productModal').classList.add('active');
    } catch (err) {
        console.error('Failed to open product modal', err);
    }
}

function closeProductModal() {
    document.getElementById('productModal').classList.remove('active');
    selectedProduct = null;
    selectedSize = '';
}

function selectSize(size) {
    selectedSize = size;
    document.querySelectorAll('.size-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent.trim() === size) {
            btn.classList.add('active');
        }
    });
}

function addToCartFromModal() {
    if (!selectedProduct || !selectedSize) return;
    
    const existingItem = cart.find(item => 
        item.id === selectedProduct.id && item.size === selectedSize
    );
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            id: selectedProduct.id,
            name: selectedProduct.name,
            price: usdToNgn(selectedProduct.price), // Store price in NGN
            size: selectedSize,
            image: selectedProduct.image,
            quantity: 1
        });
    }
    
    updateCart();
    closeProductModal();
}

// Cart Management functions
function toggleCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    cartSidebar.classList.toggle('active');
}

function updateCart() {
    const cartBadge = document.getElementById('cartBadge');
    const cartItems = document.getElementById('cartItems');
    const cartFooter = document.getElementById('cartFooter');
    
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartBadge.textContent = totalItems;
    
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <svg width="64" height="64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                <p>Your cart is empty</p>
            </div>
        `;
        cartFooter.style.display = 'none';
    } else {
        cartItems.innerHTML = cart.map((item, index) => {
            const itemTotal = item.price * item.quantity;
            return `
                <div class="cart-item">
                    <div class="cart-item-image">
                        <img src="${item.image}" alt="${item.name}">
                    </div>
                    <div class="cart-item-details">
                        <div class="cart-item-name">${item.name}</div>
                        <div class="cart-item-size">Size: ${item.size}</div>
                        <div class="cart-item-controls">
                            <button class="qty-btn" onclick="updateQuantity(${index}, -1)">
                                <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                            </button>
                            <span class="qty-display">${item.quantity}</span>
                            <button class="qty-btn" onclick="updateQuantity(${index}, 1)">
                                <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                            </button>
                            <button class="remove-btn" onclick="removeFromCart(${index})">Remove</button>
                        </div>
                    </div>
                    <div class="cart-item-price">${formatNaira(itemTotal)}</div>
                </div>
            `;
        }).join('');
        
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const tax = Math.round(subtotal * 0.075); // 7.5% VAT in Nigeria
        const total = subtotal + tax;
        
        document.getElementById('subtotal').textContent = formatNaira(subtotal);
        document.getElementById('tax').textContent = formatNaira(tax);
        document.getElementById('total').textContent = formatNaira(total);
        
        cartFooter.style.display = 'block';
    }
}

function updateQuantity(index, change) {
    cart[index].quantity += change;
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }
    updateCart();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

// Form Submissions
function submitConsignForm(e) {
    e.preventDefault();
    
    const form = document.getElementById('consignForm');
    const success = document.getElementById('consignSuccess');
    
    form.style.display = 'none';
    success.style.display = 'block';
    
    setTimeout(() => {
        form.reset();
        form.style.display = 'block';
        success.style.display = 'none';
    }, 3000);
}

function submitContactForm(e) {
    e.preventDefault();
    
    const form = document.getElementById('contactForm');
    const success = document.getElementById('contactSuccess');
    
    form.style.display = 'none';
    success.style.display = 'block';
    
    setTimeout(() => {
        form.reset();
        form.style.display = 'block';
        success.style.display = 'none';
    }, 3000);
}

// ===== DASHBOARD FUNCTIONS =====

// Check if user is admin (for demo, check localStorage)
function isAdmin() {
    return localStorage.getItem('isAdmin') === 'true';
}

// Show/hide admin dashboard based on role
function updateAdminDashboardVisibility() {
    const adminLink = document.querySelector('.admin-only');
    const adminLoginBtn = document.getElementById('adminLoginBtn');
    if (adminLink) {
        adminLink.style.display = isAdmin() ? 'block' : 'none';
    }
    if (adminLoginBtn) {
        adminLoginBtn.style.display = isAdmin() ? 'none' : 'inline-block';
    }
}

// Load admin dashboard data (fetch from server)
async function loadAdminDashboard() {
    try {
        const res = await fetch('/api/products');
        const productsFromApi = await res.json();

        // Stats
        const totalOrders = 42; // placeholder
        const totalRevenue = productsFromApi.reduce((s, p) => s + usdToNgn(p.price), 0);
        const activeUsers = 156; // placeholder
        const totalProducts = productsFromApi.length;

        document.getElementById('totalOrders').textContent = totalOrders;
        document.getElementById('totalRevenue').textContent = formatNaira(totalRevenue);
        document.getElementById('activeUsers').textContent = activeUsers;
        document.getElementById('totalProducts').textContent = totalProducts;

        // Recent orders (static sample for demo)
        const ordersTableBody = document.getElementById('ordersTableBody');
        const sampleOrders = [
            { id: 'ORD-001', customer: 'John Doe', amount: 89999, status: 'Completed', date: '2024-12-08' },
            { id: 'ORD-002', customer: 'Jane Smith', amount: 125000, status: 'Pending', date: '2024-12-09' },
            { id: 'ORD-003', customer: 'Mike Johnson', amount: 74999, status: 'Completed', date: '2024-12-09' }
        ];

        if (sampleOrders.length > 0) {
            ordersTableBody.innerHTML = sampleOrders.map(order => `
                <tr>
                    <td>${order.id}</td>
                    <td>${order.customer}</td>
                    <td>${formatNaira(order.amount)}</td>
                    <td><span style="padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.875rem; ${order.status === 'Completed' ? 'background: rgba(76, 175, 80, 0.1); color: #4CAF50;' : 'background: rgba(255, 152, 0, 0.1); color: #FF9800;'}">${order.status}</span></td>
                    <td>${order.date}</td>
                </tr>
            `).join('');
        }

        // Show/hide Add Product button for admins
        const addBtn = document.getElementById('addProductBtn');
        if (addBtn) addBtn.style.display = isAdmin() ? 'inline-block' : 'none';

        // Product list
        const adminProductList = document.getElementById('adminProductList');
        adminProductList.innerHTML = productsFromApi.map(product => `
            <div class="admin-product-item">
                <div class="admin-product-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="admin-product-info">
                    <div class="admin-product-name">${product.name}</div>
                    <div class="admin-product-details">${product.brand} • ${product.category} • ${formatNaira(usdToNgn(product.price))}</div>
                </div>
                <div class="admin-product-actions">
                    <button class="btn btn-secondary" style="padding: 0.5rem 1rem; font-size: 0.875rem;" onclick="editProduct('${product.id}')">Edit</button>
                    <button class="btn btn-secondary" style="padding: 0.5rem 1rem; font-size: 0.875rem;" onclick="deleteProduct('${product.id}')">Delete</button>
                </div>
            </div>
        `).join('');
    } catch (err) {
        console.error('Failed to load admin dashboard', err);
    }
}

// ===== Admin product management actions (client-side demo only) =====
// Admin product management using server API
async function deleteProduct(productId) {
    if (!isAdmin()) { alert('Admin only'); return; }
    if (!confirm('Delete this product?')) return;
    const token = localStorage.getItem('authToken');
    const res = await fetch(`/api/products/${productId}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` } });
    if (res.ok) {
        await loadAdminDashboard();
        await renderProducts();
    } else {
        const err = await res.json();
        alert(err.error || 'Failed to delete');
    }
}

async function editProduct(productId) {
    if (!isAdmin()) { alert('Admin only'); return; }
    const name = prompt('Product name (leave blank to keep)');
    const price = prompt('Price in USD (leave blank to keep)');
    const category = prompt('Category (leave blank to keep)');
    const token = localStorage.getItem('authToken');
    const payload = {};
    if (name) payload.name = name.trim();
    if (price && !isNaN(parseFloat(price))) payload.price = parseFloat(price);
    if (category) payload.category = category.trim();
    if (Object.keys(payload).length === 0) return;
    const res = await fetch(`/api/products/${productId}`, { method: 'PUT', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }, body: JSON.stringify(payload) });
    if (res.ok) {
        await loadAdminDashboard();
        await renderProducts();
    } else {
        const err = await res.json();
        alert(err.error || 'Failed to edit');
    }
}

async function addProduct() {
    if (!isAdmin()) { alert('Admin only'); return; }
    const name = prompt('Product name');
    if (!name) return;
    const price = prompt('Price in USD');
    if (!price || isNaN(parseFloat(price))) { alert('Invalid price'); return; }
    const category = prompt('Category (e.g., polos, shorts, shirts)') || 'uncategorized';
    const brand = prompt('Brand') || 'Unknown';
    const image = prompt('Image URL') || 'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=600';
    const sizesInput = prompt('Sizes (comma separated) e.g. S,M,L') || '';
    const sizes = sizesInput.split(',').map(s => s.trim()).filter(Boolean);
    const token = localStorage.getItem('authToken');
    const payload = { name: name.trim(), price: parseFloat(price), category: category.trim(), brand, image, sizes: sizes.length ? sizes : ['One Size'], condition: 'Like New' };
    const res = await fetch('/api/products', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }, body: JSON.stringify(payload) });
    if (res.ok) {
        await loadAdminDashboard();
        await renderProducts();
    } else {
        const err = await res.json();
        alert(err.error || 'Failed to add product');
    }
}

// Load user dashboard data
function loadUserDashboard() {
    // Sample user data
    const userName = localStorage.getItem('userName') || 'John Doe';
    const userEmail = localStorage.getItem('userEmail') || 'john@example.com';
    
    document.getElementById('userFullName').textContent = userName;
    document.getElementById('userEmail').textContent = userEmail;
    document.getElementById('userMemberSince').textContent = 'December 2024';
    
    // User stats
    const userOrderCount = 3;
    const userTotalSpent = 289998; // NGN
    
    document.getElementById('userOrderCount').textContent = userOrderCount;
    document.getElementById('userTotalSpent').textContent = formatNaira(userTotalSpent);
    document.getElementById('userFavorites').textContent = '5';
    
    // Sample user orders
    const userOrders = document.getElementById('userOrders');
    const sampleUserOrders = [
        {
            id: 'ORD-001',
            date: '2024-12-08',
            status: 'completed',
            items: [
                { name: 'Oxford Dress Shirt', price: 74999, image: products[1].image }
            ],
            total: 89999
        },
        {
            id: 'ORD-002',
            date: '2024-12-05',
            status: 'completed',
            items: [
                { name: 'Leather Dress Shoes', price: 134999, image: products[3].image }
            ],
            total: 144998
        }
    ];
    
    if (sampleUserOrders.length > 0) {
        userOrders.innerHTML = sampleUserOrders.map(order => `
            <div class="order-card">
                <div class="order-header">
                    <div class="order-id">Order #${order.id}</div>
                    <div class="order-status ${order.status}">${order.status === 'completed' ? 'Completed' : 'Pending'}</div>
                </div>
                <div class="order-items">
                    ${order.items.map(item => `
                        <div class="order-item">
                            <div class="order-item-image">
                                <img src="${item.image}" alt="${item.name}">
                            </div>
                            <div class="order-item-info">
                                <div class="order-item-name">${item.name}</div>
                                <div class="order-item-price">${formatNaira(item.price)}</div>
                            </div>
                        </div>
                    `).join('')}
                </div>
                <div class="order-total">
                    <div class="order-total-label">Total</div>
                    <div class="order-total-value">${formatNaira(order.total)}</div>
                </div>
            </div>
        `).join('');
    }
}

// Toggle edit profile
function toggleEditProfile() {
    alert('Edit Profile functionality would open a modal form');
}

// Open admin login (prompts for credentials and requests token)
async function openAdminLogin() {
    // Prompt for password only — email is not required for demo admin access
    const password = prompt('Enter admin password');
    if (!password) return;

    try {
        const res = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password })
        });
        if (!res.ok) {
            const err = await res.json();
            alert(err.error || 'Login failed');
            return;
        }
        const data = await res.json();
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('authenticated', 'true');
        localStorage.setItem('isAdmin', data.user && data.user.role === 'admin' ? 'true' : 'false');
        localStorage.setItem('userName', data.user.name || 'Admin');
        // userEmail may not be provided by the server; keep existing or fallback
        localStorage.setItem('userEmail', data.user && data.user.email ? data.user.email : (localStorage.getItem('userEmail') || 'admin@bishopsmen.com'));
        updateAdminDashboardVisibility();
        navigateTo('admin-dashboard');
    } catch (err) {
        console.error('Admin login failed', err);
        alert('Login failed');
    }
}

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    // Set footer year
    document.getElementById('footerYear').textContent = new Date().getFullYear();
    
    // Initialize cart
    updateCart();
    
    // Initialize theme
    initTheme();
    
    // Bind theme toggle button
    const themeBtn = document.getElementById('themeToggle');
    if (themeBtn) {
        themeBtn.addEventListener('click', toggleTheme);
        updateThemeIcon(); // Initial icon update
    }
    
    // Bind search input
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', handleSearchInput);
    }
    
    // Check authentication
    if (localStorage.getItem('authenticated') === 'true') {
        const navBar = document.querySelector('.nav-bar');
        const footer = document.querySelector('.site-footer');
        
        if (navBar) navBar.classList.add('authenticated');
        if (footer) footer.classList.add('authenticated');
        
        navigateTo('shop');
    } else {
        navigateTo('home');
    }
    
    // Bind auth toggle button
    const authToggle = document.getElementById('authToggleBtn');
    if (authToggle) {
        authToggle.addEventListener('click', (e) => {
            e.preventDefault();
            toggleAuthMode();
        });
    }
    
    // Bind login and register forms
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }
    
    // Bind admin login button
    const adminLoginBtn = document.getElementById('adminLoginBtn');
    if (adminLoginBtn) adminLoginBtn.addEventListener('click', (e) => { e.preventDefault(); openAdminLogin(); });
    
    // Update admin visibility on page load
    updateAdminDashboardVisibility();
});