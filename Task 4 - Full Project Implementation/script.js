let cart = [];
    
    const products = [
        {
            id: 1,
            title: "Handmade Clay Pottery Set",
            category: "handicraft",
            description: "Beautiful collection of clay pots crafted using traditional Indian techniques.",
            price: 2499,
            originalPrice: 2999,
            rating: 5,
            image: "https://thumbs.dreamstime.com/b/captivating-display-showcases-beautiful-assortment-handcrafted-clay-pottery-each-piece-testament-to-artisan-s-skill-350569207.jpg",
            discount: "15% OFF"
        },
        {
            id: 2,
            title: "Stylish Shirts",
            category: "textile",
            description: "Luxurious Shirts with intricate work from Varanasi.",
            price: 5299,
            originalPrice: 5999,
            rating: 5,
            image: "https://pic.elinkmall.com/ZW/ZW061/ZW061Q.jpg",
            discount: "10% OFF"
        },
        {
            id: 3,
            title: "Assam Tea Collection",
            category: "food",
            description: "Premium organic tea leaves from the gardens of Assam, India.",
            price: 899,
            originalPrice: 1099,
            rating: 4,
            image: "https://th.bing.com/th/id/OIP.Uiv6pil1ZyjzSyH51aNNhgHaEo?rs=1&pid=ImgDetMain&cb=idpwebp2&o=7&rm=3",
            discount: "20% OFF"
        },
        {
            id: 4,
            title: "Silver Filigree Jewelry",
            category: "jewelry",
            description: "Handcrafted silver jewelry with traditional filigree designs.",
            price: 3499,
            originalPrice: null,
            rating: 4,
            image: "https://th.bing.com/th/id/OIP.viKZ2bNahHOV-e48DyG0tgHaE8?rs=1&pid=ImgDetMain&cb=idpwebp2&o=7&rm=3",
            discount: null
        },
        {
            id: 5,
            title: "Kashmiri Pashmina Shawl",
            category: "textile",
            description: "Authentic pashmina wool shawl handwoven in Kashmir.",
            price: 6999,
            originalPrice: 7999,
            rating: 5,
            image: "https://th.bing.com/th/id/OIP.lcMQhQoUjXjdbK6P3TMZ1QHaE8?rs=1&pid=ImgDetMain&cb=idpwebp2&o=7&rm=3",
            discount: "15% OFF"
        },
        {
            id: 6,
            title: "Stylish Shoes",
            category: "handicraft",
            description: "Awesome Brand Stylish Shoes.",
            price: 2299,
            originalPrice: null,
            rating: 4,
            image: "https://geraldblack.com/cdn/shop/products/luxury-fashion-casual-breathable-flat-canvas-basic-shoes-for-men-geraldblack-com-11202758738000.jpg?v=1670460717",
            discount: null
        },
        {
            id: 7,
            title: "Spice Box Collection",
            category: "food",
            description: "Assorted premium Indian spices in traditional containers.",
            price: 1299,
            originalPrice: 1499,
            rating: 4,
            image: "https://th.bing.com/th/id/OIP.8j70P78gbt3b4VE7Z_3Z2AHaHa?rs=1&pid=ImgDetMain&cb=idpwebp2&o=7&rm=3",
            discount: "15% OFF"
        },
        {
            id: 8,
            title: "Blue Pottery Vase",
            category: "handicraft",
            description: "Traditional Jaipur blue pottery with intricate designs.",
            price: 1899,
            originalPrice: 2199,
            rating: 4,
            image: "https://th.bing.com/th/id/OIP.XoHx_0YPkHDSx1X8bHoNbQHaKX?rs=1&pid=ImgDetMain&cb=idpwebp2&o=7&rm=3",
            discount: "15% OFF"
        },
        {
            id: 9,
            title: "Traditional Suit",
            category: "handicraft",
            description: "Embroidered traditional patterns.",
            price: 1599,
            originalPrice: null,
            rating: 5,
            image: "https://i.pinimg.com/originals/ed/69/84/ed6984b305e53f9e4cf76eaccf8dda94.jpg",
            discount: null
        },
        {
            id: 10,
            title: "Bamboo Handicraft Set",
            category: "handicraft",
            description: "Eco-friendly bamboo products including baskets and decor items.",
            price: 1799,
            originalPrice: 1999,
            rating: 4,
            image: "https://tiimg.tistatic.com/fp/1/006/823/bamboo-handicraft-cup-set-781.jpg",
            discount: "10% OFF"
        }
    ];

        // Display products on page load
        function displayProducts(productsToDisplay) {
            const productsGrid = document.getElementById('products-grid');
            productsGrid.innerHTML = '';
            
            productsToDisplay.forEach(product => {
                const productCard = document.createElement('div');
                productCard.className = 'product-card';
                productCard.innerHTML = `
                    <div class="product-image-container">
                        <img src="${product.image}" alt="${product.title}" class="product-image">
                        ${product.discount ? `<div class="discount-tag">${product.discount}</div>` : ''}
                    </div>
                    <div class="product-info">
                        <h3 class="product-title">${product.title}</h3>
                        <span class="product-category">${product.category}</span>
                        <div class="rating">
                            ${'★'.repeat(product.rating)}${'☆'.repeat(5 - product.rating)}
                        </div>
                        <p class="product-description">${product.description}</p>
                        <div class="product-price">
                            ${product.price} ${product.originalPrice ? `<span class="original-price">₹${product.originalPrice}</span>` : ''}
                        </div>
                        <button class="buy-btn" onclick="addToCart(${product.id})">Add to Cart</button>
                    </div>
                `;
                productsGrid.appendChild(productCard);
            });
        }

        // Add product to cart
        function addToCart(productId) {
            const product = products.find(p => p.id === productId);
            if (product) {
                cart.push(product);
                updateCartCount();
                showNotification(`Added ${product.title} to cart!`);
            }
        }

        // Update cart count
        function updateCartCount() {
            const cartCount = document.getElementById('cart-count');
            cartCount.textContent = cart.length;
        }

        // Show notification
        function showNotification(message) {
            const notification = document.getElementById('notification');
            notification.textContent = message;
            notification.style.display = 'block';
            notification.style.animation = 'none';
            void notification.offsetWidth; // Trigger reflow
            notification.style.animation = 'slideIn 0.3s ease, fadeOut 0.5s ease 2.5s forwards';
        }

        // Open cart function
        function openCart() {
            // Simplified function without cart modal implementation
            if (cart.length > 0) {
                showNotification(`You have ${cart.length} items in your cart`);
            } else {
                showNotification("Your cart is empty");
            }
        }

        // Sort products
        function sortProducts() {
            const sortValue = document.getElementById('price-sort').value;
            let sortedProducts = [...products];
            
            if (sortValue === 'low-to-high') {
                sortedProducts.sort((a, b) => a.price - b.price);
            } else {
                sortedProducts.sort((a, b) => b.price - a.price);
            }
            
            displayProducts(sortedProducts);
        }

        // Filter products by category
        function filterProducts(category) {
            // Update active button
            document.querySelectorAll('.category-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            event.target.classList.add('active');
            
            // Filter products
            const filteredProducts = category === 'all' 
                ? products 
                : products.filter(product => product.category === category);
            
            displayProducts(filteredProducts);
        }

        // Initialize the page
        window.onload = function() {
            displayProducts(products);
            updateCartCount();
        };