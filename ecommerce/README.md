# TechStore - Modern E-Commerce Website

A fully responsive e-commerce website with advanced shopping cart functionality, built with vanilla HTML, CSS, and JavaScript.

## 🚀 Features

### Core E-Commerce Features
- **Product Catalog**: Display products with images, descriptions, and pricing
- **Shopping Cart**: Full cart functionality with quantity management
- **Product Filtering**: Filter products by category (All, Laptops, Phones, Accessories)
- **Search Functionality**: Real-time search across product names, descriptions, and categories
- **Wishlist**: Add/remove products to wishlist with heart icon toggle

### Shopping Cart Features
- **Add to Cart**: Add products with quantity management
- **Cart Sidebar**: Sliding cart panel with product details
- **Quantity Controls**: Increase/decrease product quantities
- **Remove Items**: Remove products from cart
- **Total Calculation**: Real-time total price calculation
- **Cart Persistence**: Cart data saved to localStorage
- **Checkout Process**: Simulated checkout with success notifications

### User Experience Features
- **Responsive Design**: Mobile-first design that works on all devices
- **Modern UI**: Clean, modern interface with smooth animations
- **Toast Notifications**: Success, error, and info notifications
- **Keyboard Shortcuts**: 
  - `Escape` to close cart/search
  - `Ctrl/Cmd + K` to open search
- **Smooth Animations**: Fade-in animations for product cards
- **Mobile Menu**: Hamburger menu for mobile navigation

### Technical Features
- **Vanilla JavaScript**: No frameworks, pure JavaScript
- **CSS Grid & Flexbox**: Modern layout techniques
- **CSS Custom Properties**: Consistent theming with CSS variables
- **Intersection Observer**: Performance-optimized animations
- **Local Storage**: Persistent cart data across sessions

## 📱 Responsive Design

The website is fully responsive and optimized for:
- **Desktop**: Full-featured experience with sidebar cart
- **Tablet**: Adapted layout with touch-friendly interactions
- **Mobile**: Mobile-first design with hamburger menu

## 🛠️ Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with Grid, Flexbox, and Custom Properties
- **JavaScript (ES6+)**: Modern JavaScript features
- **Font Awesome**: Icons
- **Google Fonts**: Inter font family

## 📁 Project Structure

```
ecommerce/
├── index.html          # Main HTML file
├── styles.css          # CSS styles
├── script.js           # JavaScript functionality
└── README.md           # Project documentation
```

## 🎯 Key Features Breakdown

### Product Management
- 8 sample products across 3 categories
- Product badges (New, Popular, Hot, etc.)
- Detailed product information
- Price formatting

### Shopping Cart System
- Add/remove products
- Quantity management
- Real-time total calculation
- Cart count badge
- Empty cart state

### Search & Filter
- Category-based filtering
- Real-time search
- Combined search and filter functionality
- No results handling

### User Interface
- Fixed header with navigation
- Hero section with call-to-action
- Product grid with hover effects
- About and contact sections
- Footer with social links

## 🚀 Getting Started

1. **Clone or download** the project files
2. **Open** `index.html` in a web browser
3. **Start shopping**! Add products to cart and test the functionality

## 🎨 Customization

### Adding Products
To add new products, edit the `products` array in `script.js`:

```javascript
const products = [
    {
        id: 9,
        name: "Your Product Name",
        category: "laptops", // or "phones", "accessories"
        price: 999.99,
        description: "Product description here.",
        image: "💻", // Emoji or image URL
        badge: "New" // Optional badge
    }
    // ... more products
];
```

### Styling
- Modify CSS custom properties in `:root` for theme colors
- Update product grid layout in `.products-grid`
- Customize animations and transitions

### Functionality
- Extend cart functionality in `script.js`
- Add new filter categories
- Implement real checkout process
- Add user authentication

## 🔧 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Feel free to contribute to this project by:
- Reporting bugs
- Suggesting new features
- Submitting pull requests
- Improving documentation

---

**Built with ❤️ using vanilla web technologies** 