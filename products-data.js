// Product Database
const productsData = [
    {
        id: 1,
        name: "Harmonic X1",
        category: "Audio",
        price: 899,
        description: "Premium wireless headphones with adaptive noise cancellation and 40-hour battery life.",
        icon: "◆",
        features: ["Active Noise Cancellation", "40-Hour Battery", "Hi-Res Audio", "Comfort Fit"],
        inStock: true
    },
    {
        id: 2,
        name: "Pulse Elite",
        category: "Wearables",
        price: 1299,
        description: "Intelligent fitness companion with health monitoring and seamless connectivity.",
        icon: "◇",
        features: ["Health Monitoring", "GPS Tracking", "Waterproof", "7-Day Battery"],
        inStock: true
    },
    {
        id: 3,
        name: "Zenith Pro",
        category: "Computing",
        price: 2499,
        description: "Ultra-portable powerhouse with revolutionary cooling and crystal-clear display.",
        icon: "◈",
        features: ["4K Display", "Advanced Cooling", "16GB RAM", "1TB SSD"],
        inStock: true
    },
    {
        id: 4,
        name: "Quantum Case",
        category: "Accessories",
        price: 199,
        description: "Precision-engineered protection with magnetic mounting and wireless charging.",
        icon: "◉",
        features: ["Magnetic Mount", "Wireless Charging", "Drop Protection", "Premium Materials"],
        inStock: true
    },
    {
        id: 5,
        name: "Lumina Hub",
        category: "Smart Home",
        price: 699,
        description: "Central command for your connected home with voice and gesture control.",
        icon: "◊",
        features: ["Voice Control", "Gesture Control", "Smart Integration", "Energy Efficient"],
        inStock: true
    },
    {
        id: 6,
        name: "Nova Pro",
        category: "Mobile",
        price: 1799,
        description: "Revolutionary smartphone with edge-to-edge display and cinematic camera system.",
        icon: "◐",
        features: ["5G Connectivity", "Triple Camera", "All-Day Battery", "Premium Display"],
        inStock: true
    },
    {
        id: 7,
        name: "Aether Speaker",
        category: "Audio",
        price: 599,
        description: "Immersive 360-degree sound with intelligent room adaptation technology.",
        icon: "◑",
        features: ["360° Sound", "Room Adaptation", "Multi-Room Audio", "Touch Controls"],
        inStock: true
    },
    {
        id: 8,
        name: "Velocity Watch",
        category: "Wearables",
        price: 899,
        description: "Precision timepiece with smart capabilities and timeless design.",
        icon: "◒",
        features: ["Automatic Movement", "Smart Notifications", "Water Resistant", "Premium Build"],
        inStock: true
    },
    {
        id: 9,
        name: "Nexus Tablet",
        category: "Computing",
        price: 1499,
        description: "Creative powerhouse with pressure-sensitive display and all-day battery.",
        icon: "◓",
        features: ["Pressure Sensitive", "12.9\" Display", "Apple Pencil Support", "M2 Chip"],
        inStock: true
    },
    {
        id: 10,
        name: "Aurora Earbuds",
        category: "Audio",
        price: 349,
        description: "True wireless freedom with adaptive EQ and transparency mode.",
        icon: "◔",
        features: ["Adaptive EQ", "Transparency Mode", "30-Hour Battery", "Spatial Audio"],
        inStock: true
    },
    {
        id: 11,
        name: "Prism Camera",
        category: "Photography",
        price: 3299,
        description: "Professional-grade mirrorless camera with cutting-edge sensor technology.",
        icon: "◕",
        features: ["Full Frame Sensor", "8K Video", "In-Body Stabilization", "Weather Sealed"],
        inStock: true
    },
    {
        id: 12,
        name: "Helix Charger",
        category: "Accessories",
        price: 129,
        description: "Multi-device wireless charging station with intelligent power distribution.",
        icon: "◖",
        features: ["3-Device Charging", "Fast Charging", "LED Indicator", "Compact Design"],
        inStock: true
    }
];

// Get featured products (first 6)
function getFeaturedProducts() {
    return productsData.slice(0, 6);
}

// Get all products
function getAllProducts() {
    return productsData;
}

// Get product by ID
function getProductById(id) {
    return productsData.find(product => product.id === parseInt(id));
}

// Search products
function searchProducts(query) {
    const lowerQuery = query.toLowerCase();
    return productsData.filter(product => 
        product.name.toLowerCase().includes(lowerQuery) ||
        product.category.toLowerCase().includes(lowerQuery) ||
        product.description.toLowerCase().includes(lowerQuery)
    );
}

// Filter products by category
function getProductsByCategory(category) {
    return productsData.filter(product => 
        product.category.toLowerCase() === category.toLowerCase()
    );
}

// Get unique categories
function getCategories() {
    return [...new Set(productsData.map(product => product.category))];
}
