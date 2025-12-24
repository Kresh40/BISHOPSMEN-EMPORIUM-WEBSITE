const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Data storage
const DATA_DIR = path.join(__dirname, 'data');
const PRODUCTS_FILE = path.join(DATA_DIR, 'products.json');
const USERS_FILE = path.join(DATA_DIR, 'users.json');
const ORDERS_FILE = path.join(DATA_DIR, 'orders.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Helper functions
function readData(file) {
    try {
        const data = fs.readFileSync(file, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

function writeData(file, data) {
    fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

// Initialize sample data
function initializeSampleData() {
    if (!fs.existsSync(PRODUCTS_FILE)) {
        const sampleProducts = [
            {
                id: '1',
                name: 'Classic Navy Suit',
                category: 'suits',
                price: 299.99,
                originalPrice: 499.99,
                image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600',
                sizes: ['38R', '40R', '42R', '44R'],
                condition: 'Excellent',
                brand: 'Hugo Boss',
                description: 'Classic navy suit in excellent condition.',
                details: ['100% Wool', 'Double-breasted', 'Two-button closure'],
                stock: 3,
                featured: true,
                createdAt: '2024-01-15'
            }
        ];
        writeData(PRODUCTS_FILE, sampleProducts);
    }
}

// API Routes

// Products
app.get('/api/products', (req, res) => {
    const products = readData(PRODUCTS_FILE);
    res.json(products);
});

app.get('/api/products/:id', (req, res) => {
    const products = readData(PRODUCTS_FILE);
    const product = products.find(p => p.id === req.params.id);
    
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ error: 'Product not found' });
    }
});

app.post('/api/products', (req, res) => {
    const products = readData(PRODUCTS_FILE);
    const newProduct = {
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        ...req.body
    };
    
    products.push(newProduct);
    writeData(PRODUCTS_FILE, products);
    res.status(201).json(newProduct);
});

app.put('/api/products/:id', (req, res) => {
    let products = readData(PRODUCTS_FILE);
    const index = products.findIndex(p => p.id === req.params.id);
    
    if (index === -1) {
        return res.status(404).json({ error: 'Product not found' });
    }
    
    products[index] = { ...products[index], ...req.body };
    writeData(PRODUCTS_FILE, products);
    res.json(products[index]);
});

app.delete('/api/products/:id', (req, res) => {
    let products = readData(PRODUCTS_FILE);
    const filteredProducts = products.filter(p => p.id !== req.params.id);
    
    if (filteredProducts.length === products.length) {
        return res.status(404).json({ error: 'Product not found' });
    }
    
    writeData(PRODUCTS_FILE, filteredProducts);
    res.json({ message: 'Product deleted successfully' });
});

// Users
app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;
    const users = readData(USERS_FILE);
    
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        // Remove password from response
        const { password, ...userWithoutPassword } = user;
        res.json(userWithoutPassword);
    } else {
        res.status(401).json({ error: 'Invalid credentials' });
    }
});

app.post('/api/auth/register', (req, res) => {
    const { name, email, password } = req.body;
    const users = readData(USERS_FILE);
    
    // Check if user exists
    if (users.find(u => u.email === email)) {
        return res.status(400).json({ error: 'User already exists' });
    }
    
    const newUser = {
        id: Date.now().toString(),
        name,
        email,
        password,
        role: 'user',
        createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    writeData(USERS_FILE, users);
    
    // Remove password from response
    const { password: _, ...userWithoutPassword } = newUser;
    res.status(201).json(userWithoutPassword);
});

// Orders
app.post('/api/orders', (req, res) => {
    const orders = readData(ORDERS_FILE);
    const newOrder = {
        id: 'ORD' + Date.now(),
        ...req.body,
        createdAt: new Date().toISOString(),
        status: 'pending'
    };
    
    orders.push(newOrder);
    writeData(ORDERS_FILE, orders);
    res.status(201).json(newOrder);
});

app.get('/api/orders/:userId', (req, res) => {
    const orders = readData(ORDERS_FILE);
    const userOrders = orders.filter(order => 
        order.userId === req.params.userId
    );
    
    res.json(userOrders);
});

// Serve static files
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    initializeSampleData();
});