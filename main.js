// Main JavaScript for AXIOM Website
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeModals();
    initializeSearch();
    loadProducts();
    initializeNewsletter();
    initializeScrollEffects();
});

// Navigation
function initializeNavigation() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const closeMenu = document.getElementById('closeMenu');
    const mobileMenu = document.getElementById('mobileMenu');
    const overlay = document.getElementById('overlay');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.add('active');
            overlay.classList.add('active');
            document.body.classList.add('no-scroll');
        });
    }

    if (closeMenu) {
        closeMenu.addEventListener('click', closeMobileMenu);
    }

    if (overlay) {
        overlay.addEventListener('click', () => {
            closeMobileMenu();
            closeCart();
            closeSearch();
        });
    }

    // Close mobile menu when clicking a link
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
}

function closeMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    const overlay = document.getElementById('overlay');
    
    if (mobileMenu) mobileMenu.classList.remove('active');
    if (overlay && !document.getElementById('cartSidebar').classList.contains('active') && 
        !document.getElementById('searchModal').classList.contains('active')) {
        overlay.classList.remove('active');
        document.body.classList.remove('no-scroll');
    }
}

// Cart
function initializeModals() {
    const cartBtn = document.getElementById('cartBtn');
    const closeCart = document.getElementById('closeCart');
    const checkoutBtn = document.getElementById('checkoutBtn');

    if (cartBtn) {
        cartBtn.addEventListener('click', openCart);
    }

    if (closeCart) {
        closeCart.addEventListener('click', closeCartFunc);
    }

    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            cart.checkout();
        });
    }
}

function openCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    const overlay = document.getElementById('overlay');
    
    if (cartSidebar) cartSidebar.classList.add('active');
    if (overlay) overlay.classList.add('active');
    document.body.classList.add('no-scroll');
}

function closeCartFunc() {
    closeCart();
}

function closeCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    const overlay = document.getElementById('overlay');
    
    if (cartSidebar) cartSidebar.classList.remove('active');
    if (overlay && !document.getElementById('mobileMenu').classList.contains('active') && 
        !document.getElementById('searchModal').classList.contains('active')) {
        overlay.classList.remove('active');
        document.body.classList.remove('no-scroll');
    }
}

// Search
function initializeSearch() {
    const searchBtn = document.getElementById('searchBtn');
    const closeSearch = document.getElementById('closeSearch');
    const searchInput = document.getElementById('searchInput');

    if (searchBtn) {
        searchBtn.addEventListener('click', openSearch);
    }

    if (closeSearch) {
        closeSearch.addEventListener('click', closeSearchFunc);
    }

    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
    }
}

function openSearch() {
    const searchModal = document.getElementById('searchModal');
    const searchInput = document.getElementById('searchInput');
    
    if (searchModal) searchModal.classList.add('active');
    if (searchInput) {
        setTimeout(() => searchInput.focus(), 100);
    }
}

function closeSearchFunc() {
    closeSearch();
}

function closeSearch() {
    const searchModal = document.getElementById('searchModal');
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    
    if (searchModal) searchModal.classList.remove('active');
    if (searchInput) searchInput.value = '';
    if (searchResults) searchResults.innerHTML = '';
}

function handleSearch(e) {
    const query = e.target.value.trim();
    const searchResults = document.getElementById('searchResults');
    
    if (!searchResults) return;

    if (query.length < 2) {
        searchResults.innerHTML = '';
        return;
    }

    const results = searchProducts(query);
    
    if (results.length === 0) {
        searchResults.innerHTML = '<p style="color: var(--color-text-muted); padding: 2rem;">No products found</p>';
        return;
    }

    searchResults.innerHTML = results.map(product => `
        <a href="products.html#product-${product.id}" class="search-result-item">
            <div style="font-size: 2rem; margin-right: 1rem;">${product.icon}</div>
            <div style="flex: 1;">
                <div style="font-weight: 500;">${product.name}</div>
                <div style="font-size: 0.85rem; color: var(--color-text-muted);">${product.category}</div>
            </div>
            <div style="font-size: 1.2rem; color: var(--color-accent);">$${product.price}</div>
        </a>
    `).join('');
}

// Load Products
function loadProducts() {
    const productsGrid = document.getElementById('productsGrid');
    
    if (!productsGrid) return;

    const products = getFeaturedProducts();
    
    productsGrid.innerHTML = products.map((product, index) => `
        <div class="product-card" style="animation-delay: ${index * 0.1}s">
            <div class="product-image">
                <div class="product-placeholder">${product.icon}</div>
            </div>
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-footer">
                    <span class="product-price">$${product.price.toLocaleString()}</span>
                    <button class="product-btn" onclick="addToCart(${product.id})">Add to Cart</button>
                </div>
            </div>
        </div>
    `).join('');
}

// Add to cart function (global)
function addToCart(productId) {
    const product = getProductById(productId);
    if (product) {
        cart.addItem(product);
    }
}

// Newsletter
function initializeNewsletter() {
    const newsletterForm = document.getElementById('newsletterForm');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    }
}

function handleNewsletterSubmit(e) {
    e.preventDefault();
    
    const emailInput = document.getElementById('emailInput');
    const message = document.getElementById('newsletterMessage');
    const button = e.target.querySelector('button');
    
    if (!emailInput || !message) return;

    const email = emailInput.value.trim();
    
    if (!email) return;

    // Simulate API call
    button.textContent = 'Subscribing...';
    button.disabled = true;

    setTimeout(() => {
        message.textContent = 'Thank you for subscribing! Check your email for confirmation.';
        message.style.color = 'var(--color-accent)';
        emailInput.value = '';
        button.textContent = 'Subscribe';
        button.disabled = false;

        // Clear message after 5 seconds
        setTimeout(() => {
            message.textContent = '';
        }, 5000);

        // Show toast
        cart.showNotification('Successfully subscribed to newsletter!');
    }, 1000);
}

// Scroll Effects
function initializeScrollEffects() {
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Add shadow to navbar on scroll
        if (currentScroll > 50) {
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.boxShadow = 'none';
        }

        lastScroll = currentScroll;
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements
    const animatedElements = document.querySelectorAll('.product-card, .feature-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        if (href === '#') return;

        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
            const offsetTop = target.offsetTop - 100;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // ESC key closes modals
    if (e.key === 'Escape') {
        closeSearch();
        closeCart();
        closeMobileMenu();
    }
    
    // Ctrl/Cmd + K opens search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        openSearch();
    }
});
