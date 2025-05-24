document.addEventListener('DOMContentLoaded', () => {
    // Sample laptop product data
    // IMPORTANT: Make sure the 'image' paths match your actual image files in the 'images' folder.
    const products = [
        {
            id: 1,
            name: 'Dell XPS 15',
            description: 'Powerful laptop for creators and professionals, stunning display.',
            price: 1899.99,
            image: 'images/laptop1.jpg.jpg' // Placeholder, replace with your image
        },
        {
            id: 2,
            name: 'MacBook Air M2',
            description: 'Ultra-thin and light, incredible performance with Apple M2 chip.',
            price: 1199.00,
            image: 'images/laptop2jpg.jpg' // Placeholder, replace with your image
        },
        {
            id: 3,
            name: 'HP Spectre x360',
            description: 'Versatile 2-in-1 convertible laptop, premium design and features.',
            price: 1599.50,
            image: 'images/laptop3.jpg.jpg' // Placeholder, replace with your image
        },
        {
            id: 4,
            name: 'Lenovo ThinkPad X1 Carbon',
            description: 'Business-class laptop with legendary durability and keyboard.',
            price: 1750.00,
            image: 'images/laptop4.jpg.jpg' // Placeholder, replace with your image
        },
        {
            id: 5,
            name: 'Asus ROG Zephyrus G14',
            description: 'Compact gaming laptop with powerful AMD Ryzen processor and RTX graphics.',
            price: 1499.00,
            image: 'images/laptop5.jpg.jpg' // Placeholder, replace with your image
        },
        {
            id: 6,
            name: 'Microsoft Surface Laptop 5',
            description: 'Sleek design, touchscreen display, and great for everyday productivity.',
            price: 1099.00,
            image: 'images/laptop6.jpg.jpg' // Placeholder, replace with your image
        }
    ];

    let cart = []; // Array to store items in the cart

    const productGrid = document.getElementById('product-grid');
    const cartItemsList = document.getElementById('cart-items');
    const cartTotalSpan = document.getElementById('cart-total');
    const cartCountSpan = document.getElementById('cart-count');
    const emptyCartMessage = document.querySelector('.empty-cart-message');

    // Load cart from local storage on page load
    loadCartFromLocalStorage();

    // Function to display products
    function displayProducts() {
        productGrid.innerHTML = ''; // Clear existing products
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <span class="price">$${product.price.toFixed(2)}</span>
                <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
            `;
            productGrid.appendChild(productCard);
        });

        // Add event listeners to "Add to Cart" buttons
        document.querySelectorAll('.add-to-cart-btn').forEach(button => {
            button.addEventListener('click', (event) => {
                const productId = parseInt(event.target.dataset.id);
                addToCart(productId);
            });
        });
    }

    // Function to add item to cart
    function addToCart(productId) {
        const productToAdd = products.find(p => p.id === productId);
        if (productToAdd) {
            const existingItem = cart.find(item => item.id === productId);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({ ...productToAdd, quantity: 1 });
            }
            saveCartToLocalStorage();
            updateCartDisplay();
            alert(`${productToAdd.name} added to cart!`);
        }
    }

    // Function to update the cart display
    function updateCartDisplay() {
        cartItemsList.innerHTML = ''; // Clear current cart items
        if (cart.length === 0) {
            emptyCartMessage.style.display = 'block'; // Show empty message
        } else {
            emptyCartMessage.style.display = 'none'; // Hide empty message
            cart.forEach(item => {
                const listItem = document.createElement('li');
                listItem.innerHTML = `
                    <span>${item.name} (x${item.quantity})</span>
                    <span>$${(item.price * item.quantity).toFixed(2)}</span>
                `;
                cartItemsList.appendChild(listItem);
            });
        }
        updateCartTotal();
        updateCartCount();
    }

    // Function to calculate and update cart total
    function updateCartTotal() {
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotalSpan.textContent = `$${total.toFixed(2)}`;
    }

    // Function to update cart icon count
    function updateCartCount() {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCountSpan.textContent = totalItems;
    }

    // Save cart to Local Storage
    function saveCartToLocalStorage() {
        localStorage.setItem('emmaTecCart', JSON.stringify(cart));
    }

    // Load cart from Local Storage
    function loadCartFromLocalStorage() {
        const storedCart = localStorage.getItem('emmaTecCart');
        if (storedCart) {
            cart = JSON.parse(storedCart);
        }
        updateCartDisplay(); // Display the loaded cart
    }

    // Initialize the website
    displayProducts();
});