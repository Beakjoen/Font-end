$(document).ready(function() {
    $(".owl-carousel").owlCarousel({
        items: 1,
        loop: true,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: true
    });
});
$(document).ready(function() {
    var products = [{
            name: "Laptop Dell XPS 15",
            price: 1500.00,
            image: "img/Screenshot 2024-06-19 193633-fotor-20240619195057.jpg"
        },
        {
            name: "PC Gaming",
            price: 2000.00,
            image: "img/Screenshot 2024-06-19 194657.png"
        },
        {
            name: "Tai nghe Bluetooth",
            price: 150.00,
            image: "img/Screenshot 2024-06-19 195518.png"
        },
        {
            name: "Máy in HP LaserJet",
            price: 120.00,
            image: "img/Screenshot 2024-06-19 195706.png"
        },
        {
            name: "Máy tính bảng Samsung Galaxy Tab",
            price: 300.00,
            image: "img/Screenshot 2024-06-19 195813.png"
        },
        {
            name: "Ổ cứng SSD 1TB",
            price: 80.00,
            image: "img/Screenshot 2024-06-19 195853.png"
        }

    ];

    var productContainer = $('#product-list');

    products.forEach(function(product) {
        var productHTML = `
            <div class="col-md-4 product">
                <div class="card">
                    <img src="${product.image}" class="card-img-top" alt="${product.name}">
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text"><strong>Giá: $${product.price.toFixed(2)}</strong></p>
                        <button class="btn btn-primary add-to-cart" data-name="${product.name}" data-price="${product.price}">Mua sản phẩm</button>
                    </div>
                </div>
            </div>
        `;
        productContainer.append(productHTML);
    });

    $('#product-list').on('click', '.add-to-cart', function(event) {
        event.preventDefault();
        var name = $(this).data('name');
        var price = Number($(this).data('price'));
        addItemToCart(name, price);
        displayCart();
    });

    var cart = [];

    function loadCart() {
        cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
        displayCart();
    }

    function saveCart() {
        localStorage.setItem('shoppingCart', JSON.stringify(cart));
    }

    function displayCart() {
        var cartList = $('.cart-list');
        cartList.empty();
        var cartTotal = 0;
        cart.forEach(function(item) {
            var itemTotal = item.price * item.count;
            cartTotal += itemTotal;
            var productItem = `
                <li class="list-group-item d-flex justify-content-between align-items-center">
                    ${item.name} - ${item.count} x $${item.price.toFixed(2)}
                    <span class="badge badge-primary badge-pill">$${itemTotal.toFixed(2)}</span>
                </li>
            `;
            cartList.append(productItem);
        });
        $('.cart-total').text(`$${cartTotal.toFixed(2)}`);
    }

    $('.checkout-btn').click(function(event) {
        event.preventDefault();

        cart = [];
        saveCart();
        displayCart();
        alert('Thanh toán thành công! Giỏ hàng của bạn đã được xử lý.');
    });

    $('#product-list').on('click', '.add-to-cart', function(event) {
        event.preventDefault();
        var name = $(this).data('name');
        var price = Number($(this).data('price'));
        var image = $(this).data('image');
        addItemToCart(name, price, image);
        displayCart();
    });

    $('.cart-list').on('click', '.remove-item', function(event) {
        var name = $(this).data('name');
        for (var i = 0; i < cart.length; i++) {
            if (cart[i].name === name) {
                cart[i].count--;
                if (cart[i].count === 0) {
                    cart.splice(i, 1);
                }
                break;
            }
        }
        saveCart();
        displayCart();
    });

    $('.cart-list').on('click', '.list-group-item', function() {
        var name = $(this).find('span').first().text().split(' - ')[0];
        var selectedItem = cart.find(item => item.name === name);
        if (selectedItem) {
            $('#product-image').attr('src', selectedItem.image);
        }
    });

    function addItemToCart(name, price, image) {
        var found = false;
        for (var i = 0; i < cart.length; i++) {
            if (cart[i].name === name) {
                cart[i].count++;
                found = true;
                break;
            }
        }
        if (!found) {
            cart.push({ name: name, price: price, count: 1, image: image });
        }
        saveCart();
    }
    loadCart();
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    $('#logout-btn').click(function() {
        localStorage.removeItem('currentUser');
        alert('Bạn đã đăng xuất thành công.');
        window.location.href = 'login.html';
    });

});