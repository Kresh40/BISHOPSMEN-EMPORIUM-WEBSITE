const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'bishopsmen_dev_secret';

app.use(cors());
app.use(bodyParser.json());

const PRODUCTS_FILE = path.join(__dirname, 'products.json');

function readProducts() {
    try {
        const raw = fs.readFileSync(PRODUCTS_FILE, 'utf8');
        return JSON.parse(raw);
    } catch (e) {
        return [];
    }
}

function writeProducts(products) {
    fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2), 'utf8');
}

// Serve static frontend from project root
app.use(express.static(path.join(__dirname)));

// Simple hard-coded admin credential for demo (DO NOT use in production)
const DEMO_ADMIN = { email: 'admin@bishopsmen.com', password: 'AdminPass123' };

// Auth route
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Missing credentials' });

    if (email === DEMO_ADMIN.email && password === DEMO_ADMIN.password) {
        const payload = { email, role: 'admin' };
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '8h' });
        return res.json({ token, user: { email, role: 'admin', name: 'Admin User' } });
    }

    return res.status(401).json({ error: 'Invalid credentials' });
});

// Middleware to protect routes
function authenticate(req, res, next) {
    const auth = req.headers['authorization'];
    if (!auth) return res.status(401).json({ error: 'Missing Authorization header' });
    const parts = auth.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') return res.status(401).json({ error: 'Invalid Authorization header' });
    const token = parts[1];
    try {
        const payload = jwt.verify(token, JWT_SECRET);
        req.user = payload;
        next();
    } catch (e) {
        return res.status(401).json({ error: 'Invalid token' });
    }
}

// Products API
app.get('/api/products', (req, res) => {
    const products = readProducts();
    res.json(products);
});

app.post('/api/products', authenticate, (req, res) => {
    if (req.user.role !== 'admin') return res.status(403).json({ error: 'Admins only' });
    const products = readProducts();
    const product = req.body;
    product.id = String(Date.now());
    products.push(product);
    writeProducts(products);
    res.json(product);
});

app.put('/api/products/:id', authenticate, (req, res) => {
    if (req.user.role !== 'admin') return res.status(403).json({ error: 'Admins only' });
    const products = readProducts();
    const idx = products.findIndex(p => p.id === req.params.id);
    if (idx === -1) return res.status(404).json({ error: 'Product not found' });
    products[idx] = Object.assign({}, products[idx], req.body, { id: products[idx].id });
    writeProducts(products);
    res.json(products[idx]);
});

app.delete('/api/products/:id', authenticate, (req, res) => {
    if (req.user.role !== 'admin') return res.status(403).json({ error: 'Admins only' });
    let products = readProducts();
    const idx = products.findIndex(p => p.id === req.params.id);
    if (idx === -1) return res.status(404).json({ error: 'Product not found' });
    const removed = products.splice(idx, 1)[0];
    writeProducts(products);
    res.json({ removed });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
