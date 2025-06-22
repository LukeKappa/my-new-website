/**
 * E-Commerce Website JavaScript
 * Features: Shopping cart, product filtering, search, responsive navigation
 */

// Product data
const products = [
    {
        id: 1,
        name: "MacBook Pro 16\"",
        category: "laptops",
        price: 2499.99,
        description: "Powerful laptop with M2 Pro chip, perfect for professionals and creatives.",
        image: "💻",
        badge: "New"
    },
    {
        id: 2,
        name: "iPhone 15 Pro",
        category: "phones",
        price: 999.99,
        description: "Latest iPhone with titanium design and advanced camera system.",
        image: "📱",
        badge: "Popular"
    },
    {
        id: 3,
        name: "Samsung Galaxy S24",
        category: "phones",
        price: 899.99,
        description: "Android flagship with AI features and stunning display.",
        image: "📱",
        badge: "Hot"
    },
    {
        id: 4,
        name: "Dell XPS 13",
        category: "laptops",
        price: 1299.99,
        description: "Ultra-thin laptop with InfinityEdge display and premium build.",
        image: "💻",
        badge: "Best Seller"
    },
    {
        id: 5,
        name: "AirPods Pro",
        category: "accessories",
        price: 249.99,
        description: "Wireless earbuds with active noise cancellation and spatial audio.",
        image: "🎧",
        badge: "Trending"
    },
    {
        id: 6,
        name: "iPad Air",
        category: "accessories",
        price: 599.99,
        description: "Versatile tablet perfect for work, creativity, and entertainment.",
        image: "📱",
        badge: "Popular"
    },
    {
        id: 7,
        name: "Sony WH-1000XM5",
        category: "accessories",
        price: 399.99,
        description: "Premium wireless headphones with industry-leading noise cancellation.",
        image: "🎧",
        badge: "Premium"
    },
    {
        id: 8,
        name: "ASUS ROG Strix",
        category: "laptops",
        price: 1899.99,
        description: "Gaming laptop with RTX 4070 and high refresh rate display.",
        image: "💻",
        badge: "Gaming"
    }
];

// Shopping cart state
let cart = [];
let currentFilter = 'all';
let searchQuery = '';

// DOM elements
const productsGrid = document.getElementById('productsGrid');
const cartSidebar = document.getElementById('cartSidebar');
const cartOverlay = document.getElementById('cartOverlay');
const cartItems = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const cartTotal = document.getElementById('cartTotal');
const cartBtn = document.getElementById('cartBtn');
const cartClose = document.getElementById('cartClose');
const checkoutBtn = document.getElementById('checkoutBtn');
const searchBar = document.getElementById('searchBar');
const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.querySelector('.nav-menu');
const filterButtons = document.querySelectorAll('.filter-btn');
const toastContainer = document.getElementById('toastContainer');

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing app...');
    initializeApp();
    testNavigation(); // Add test function
});

function initializeApp() {
    console.log('Initializing app...');
    loadProducts();
    setupEventListeners();
    updateCartDisplay();
}

function testNavigation() {
    console.log('Testing navigation...');
    const navLinks = document.querySelectorAll('.nav-link');
    console.log('Navigation links found:', navLinks.length);
    
    navLinks.forEach((link, index) => {
        console.log(`Link ${index + 1}:`, {
            text: link.textContent,
            href: link.getAttribute('href'),
            visible: link.offsetParent !== null,
            clickable: link.style.pointerEvents !== 'none'
        });
        
        // Test if element is actually clickable
        const rect = link.getBoundingClientRect();
        console.log(`Link ${index + 1} position:`, {
            top: rect.top,
            left: rect.left,
            width: rect.width,
            height: rect.height
        });
    });
}

function setupEventListeners() {
    console.log('Setting up event listeners...');
    
    // Cart functionality
    if (cartBtn) cartBtn.addEventListener('click', toggleCart);
    if (cartClose) cartClose.addEventListener('click', toggleCart);
    if (cartOverlay) cartOverlay.addEventListener('click', toggleCart);
    if (checkoutBtn) checkoutBtn.addEventListener('click', handleCheckout);

    // Search functionality
    if (searchBtn) searchBtn.addEventListener('click', toggleSearch);
    const searchCloseBtn = document.getElementById('searchCloseBtn');
    if (searchCloseBtn) searchCloseBtn.addEventListener('click', toggleSearch);

    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleSearch();
                toggleSearch();
            }
        });
    }

    // Mobile menu
    if (menuToggle) menuToggle.addEventListener('click', toggleMobileMenu);

    // Product filters
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            setActiveFilter(filter);
        });
    });

    // Navigation links - Simplified and debugged
    console.log('Setting up navigation links...');
    const navLinks = document.querySelectorAll('.nav-link');
    console.log('Found nav links:', navLinks.length);
    
    navLinks.forEach((link, index) => {
        console.log(`Setting up nav link ${index + 1}:`, link.textContent);
        link.addEventListener('click', function(e) {
            console.log('Nav link clicked:', this.textContent);
            e.preventDefault();
            e.stopPropagation();
            
            const targetId = this.getAttribute('href');
            console.log('Target ID:', targetId);
            
            const targetElement = document.querySelector(targetId);
            console.log('Target element found:', !!targetElement);
            
            if (targetElement) {
                const headerOffset = 40;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                console.log('Scrolling to position:', offsetPosition);
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Update active nav link
                navLinks.forEach(navLink => {
                    navLink.classList.remove('active');
                });
                this.classList.add('active');
                
                // Close mobile menu if open
                if (window.innerWidth <= 768) {
                    toggleMobileMenu();
                }
            } else {
                console.error('Target element not found for:', targetId);
            }
        });
    });

    // Footer links
    const footerLinks = document.querySelectorAll('.footer-section a[href^="#"]');
    footerLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 40;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Hero CTA button
    const ctaBtn = document.querySelector('.cta-btn');
    if (ctaBtn) {
        ctaBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = ctaBtn.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 40;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }

    // Update active nav link on scroll
    window.addEventListener('scroll', updateActiveNavLink);
    
    console.log('Event listeners setup complete');
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

function loadProducts() {
    const filteredProducts = getFilteredProducts();
    
    if (filteredProducts.length === 0) {
        productsGrid.innerHTML = `
            <div class="no-products">
                <h3>No products found</h3>
                <p>Try adjusting your search or filter criteria.</p>
            </div>
        `;
        return;
    }

    productsGrid.innerHTML = filteredProducts.map(product => `
        <div class="product-card" data-category="${product.category}">
            <div class="product-image">
                <span style="font-size: 6rem;">${product.image}</span>
                ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ''}
            </div>
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <h3 class="product-title">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <div class="product-actions">
                    <button class="add-to-cart" onclick="addToCart(${product.id})">
                        <i class="fas fa-shopping-cart"></i>
                        Add to Cart
                    </button>
                    <button class="wishlist-btn" onclick="toggleWishlist(${product.id})">
                        <i class="far fa-heart"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function getFilteredProducts() {
    let filtered = products;

    // Apply category filter
    if (currentFilter !== 'all') {
        filtered = filtered.filter(product => product.category === currentFilter);
    }

    // Apply search filter
    if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        filtered = filtered.filter(product => 
            product.name.toLowerCase().includes(query) ||
            product.description.toLowerCase().includes(query) ||
            product.category.toLowerCase().includes(query)
        );
    }

    return filtered;
}

function setActiveFilter(filter) {
    currentFilter = filter;
    
    // Update active button
    filterButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-filter') === filter) {
            btn.classList.add('active');
        }
    });

    loadProducts();
}

function handleSearch() {
    searchQuery = searchInput.value.trim();
    loadProducts();
}

function toggleSearch() {
    const header = document.querySelector('.header');
    header.classList.toggle('search-active');

    if (header.classList.contains('search-active')) {
        // Scroll to products section
        const productsSection = document.getElementById('products');
        if (productsSection) {
            const headerOffset = 40; // Use current header height
            const elementPosition = productsSection.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }

        setTimeout(() => searchInput.focus(), 400); // Delay focus to allow for scroll
    } else {
        searchInput.value = '';
        handleSearch();
    }
}

function toggleMobileMenu() {
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
}

function toggleCart() {
    cartSidebar.classList.toggle('active');
    cartOverlay.classList.toggle('active');
    document.body.style.overflow = cartSidebar.classList.contains('active') ? 'hidden' : '';
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    updateCartDisplay();
    showToast('Product added to cart!', 'success');
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartDisplay();
    showToast('Product removed from cart!', 'info');
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;

    item.quantity += change;
    
    if (item.quantity <= 0) {
        removeFromCart(productId);
    } else {
        updateCartDisplay();
    }
}

function updateCartDisplay() {
    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;

    // Update cart items
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart" style="font-size: 4rem; color: var(--text-muted); margin-bottom: 1rem;"></i>
                <p>Your cart is empty</p>
                <p style="color: var(--text-muted); font-size: 1.4rem;">Add some products to get started!</p>
            </div>
        `;
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-img">
                    <span style="font-size: 2.4rem;">${item.image}</span>
                </div>
                <div class="cart-item-details">
                    <h4 class="cart-item-title">${item.name}</h4>
                    <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                    <div class="cart-item-controls">
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                        <span class="quantity-display">${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                        <button class="remove-item" onclick="removeFromCart(${item.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Update total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = `$${total.toFixed(2)}`;

    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
}

function handleCheckout() {
    if (cart.length === 0) {
        showToast('Your cart is empty!', 'error');
        return;
    }

    showToast('Proceeding to checkout...', 'info');
    
    // Simulate checkout process
    setTimeout(() => {
        showToast('Order placed successfully!', 'success');
        cart = [];
        updateCartDisplay();
        toggleCart();
    }, 2000);
}

function toggleWishlist(productId) {
    const button = event.target.closest('.wishlist-btn');
    const icon = button.querySelector('i');
    
    if (icon.classList.contains('far')) {
        icon.classList.remove('far');
        icon.classList.add('fas');
        button.style.color = 'var(--danger-color)';
        showToast('Added to wishlist!', 'success');
    } else {
        icon.classList.remove('fas');
        icon.classList.add('far');
        button.style.color = 'var(--text-light)';
        showToast('Removed from wishlist!', 'info');
    }
}

function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icons = {
        success: 'fas fa-check-circle',
        error: 'fas fa-exclamation-circle',
        info: 'fas fa-info-circle'
    };

    toast.innerHTML = `
        <i class="toast-icon ${icons[type]}"></i>
        <span class="toast-message">${message}</span>
        <button class="toast-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;

    toastContainer.appendChild(toast);

    // Show toast
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);

    // Auto remove after 5 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            if (toast.parentElement) {
                toast.remove();
            }
        }, 300);
    }, 5000);
}

// Load cart from localStorage on page load
window.addEventListener('load', () => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartDisplay();
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Escape key to close cart
    if (e.key === 'Escape') {
        if (cartSidebar.classList.contains('active')) {
            toggleCart();
        }
        if (document.querySelector('.header').classList.contains('search-active')) {
            toggleSearch();
        }
    }
    
    // Ctrl/Cmd + K to open search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        toggleSearch();
    }
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

// Observe product cards for animation
document.addEventListener('DOMContentLoaded', () => {
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}); 