// Shopping Cart Management
class ShoppingCart {
    constructor() {
        this.items = this.loadCart();
        this.updateCartUI();
    }

    // Load cart from localStorage
    loadCart() {
        const savedCart = localStorage.getItem('axiom_cart');
        return savedCart ? JSON.parse(savedCart) : [];
    }

    // Save cart to localStorage
    saveCart() {
        localStorage.setItem('axiom_cart', JSON.stringify(this.items));
    }

    // Add item to cart
    addItem(product, quantity = 1) {
        const existingItem = this.items.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.items.push({
                id: product.id,
                name: product.name,
                price: product.price,
                icon: product.icon,
                quantity: quantity
            });
        }
        
        this.saveCart();
        this.updateCartUI();
        this.showNotification(`${product.name} added to cart!`);
    }

    // Remove item from cart
    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveCart();
        this.updateCartUI();
        this.showNotification('Item removed from cart');
    }

    // Update item quantity
    updateQuantity(productId, quantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            if (quantity <= 0) {
                this.removeItem(productId);
            } else {
                item.quantity = quantity;
                this.saveCart();
                this.updateCartUI();
            }
        }
    }

    // Get cart total
    getTotal() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    // Get cart item count
    getItemCount() {
        return this.items.reduce((count, item) => count + item.quantity, 0);
    }

    // Clear cart
    clearCart() {
        this.items = [];
        this.saveCart();
        this.updateCartUI();
    }

    // Update cart UI
    updateCartUI() {
        const cartCount = document.getElementById('cartCount');
        const cartItems = document.getElementById('cartItems');
        const cartTotal = document.getElementById('cartTotal');
        
        if (cartCount) {
            const count = this.getItemCount();
            cartCount.textContent = count;
            cartCount.style.display = count > 0 ? 'block' : 'none';
        }

        if (cartItems) {
            if (this.items.length === 0) {
                cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
            } else {
                cartItems.innerHTML = this.items.map(item => `
                    <div class="cart-item">
                        <div class="cart-item-image">
                            <div class="product-placeholder">${item.icon}</div>
                        </div>
                        <div class="cart-item-details">
                            <div class="cart-item-name">${item.name}</div>
                            <div class="cart-item-price">$${item.price}</div>
                            <div class="cart-item-controls">
                                <button class="quantity-btn" onclick="cart.updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                                <span class="cart-item-quantity">${item.quantity}</span>
                                <button class="quantity-btn" onclick="cart.updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                                <button class="remove-item" onclick="cart.removeItem(${item.id})">Remove</button>
                            </div>
                        </div>
                    </div>
                `).join('');
            }
        }

        if (cartTotal) {
            cartTotal.textContent = `$${this.getTotal().toLocaleString()}`;
        }
    }

    // Show notification
    showNotification(message) {
        const toast = document.getElementById('toast');
        if (toast) {
            toast.textContent = message;
            toast.classList.add('show');
            setTimeout(() => {
                toast.classList.remove('show');
            }, 3000);
        }
    }

    // Checkout
    checkout() {
        if (this.items.length === 0) {
            this.showNotification('Your cart is empty!');
            return;
        }
        
        // In a real application, this would redirect to a checkout page
        this.showNotification('Checkout functionality would be implemented here');
        console.log('Checkout items:', this.items);
        console.log('Total:', this.getTotal());
    }
}

// Initialize cart
const cart = new ShoppingCart();
