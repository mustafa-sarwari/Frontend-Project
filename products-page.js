// Products Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    loadAllProducts();
    initializeFilters();
});

function loadAllProducts(category = 'all') {
    const productsGrid = document.getElementById('allProductsGrid');
    
    if (!productsGrid) return;

    let products;
    if (category === 'all') {
        products = getAllProducts();
    } else {
        products = getProductsByCategory(category);
    }
    
    productsGrid.innerHTML = products.map((product, index) => `
        <div class="product-card" style="animation-delay: ${index * 0.05}s" id="product-${product.id}">
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

    // Re-observe for animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.product-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

function initializeFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter products
            const category = this.getAttribute('data-category');
            loadAllProducts(category);
        });
    });
}
