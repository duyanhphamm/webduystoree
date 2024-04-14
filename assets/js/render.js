var products;
var currentPage = 1;
var itemsPerPage = 10; 
var currentCategory = 'Thiết bị điện tử';
function formatCurrency(amount) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(amount);
}

function filterProductsByCategory(category) {
    fetch('http://localhost:3000/products')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            products = data; 
            var filteredProducts = products.filter(function (product) {
                return product.category === category;
            });
            displayFilteredProducts(filteredProducts);
        })
        .catch(error => console.error('Error fetching data:', error));
}

window.onload = function () {
    filterProductsByCategory(currentCategory);

    document.querySelectorAll('.category-item__link').forEach(function (link) {
        link.addEventListener('click', function () {
            // Loại bỏ lớp active từ tất cả các liên kết danh mục
            document.querySelectorAll('.category-item__link').forEach(function (otherLink) {
                otherLink.classList.remove('category-item__link--active');
            });

            // Thêm lớp active vào liên kết danh mục đã nhấp
            this.classList.add('category-item__link--active');

            var category = this.innerText.trim();
            currentCategory = category;
            filterProductsByCategory(category);
        });
    });

    function displayAllProducts() {
        fetch('http://localhost:3000/products')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                products = data.products; 
                displayFilteredProducts(products);
            })
            .catch(error => console.error('Error fetching data:', error));
    }

    // Thêm sự kiện click vào sản phẩm để hiển thị modal
    document.querySelector('.home-product .js-grid__row').addEventListener('click', function (event) {
        var target = event.target.closest('.product-item');
        var productNameElement = event.target.closest('.product-item__title');
        var productImageElement = event.target.closest('.product-item__img');
    
        if (target && (productNameElement || productImageElement)) {
            var productName = productNameElement.innerText.trim();
            var product = products.find(p => p.name === productName);
            if (product) {
                displayProductDetails(product);
            }
        }
    });

    function displayProductDetails(product) {
        function formatNumberWithCurrency(number) {
            return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number);
        }
        var modalContent = document.getElementById('modalContent');
        modalContent.innerHTML = `
        <div class="modal-product-full">
            <div>
                <img src="${product.img}" alt="${product.name}" class="modal-product-img">
                <p class="modal-product-list__img">
                    <img src="${product.imgf}" alt="Không có ảnh" class="modal-product-list__img">
                    <img src="${product.imgs}" alt="Không có ảnh" class="modal-product-list__img">
                    <img src="${product.imgt}" alt="Không có ảnh" class="modal-product-list__img">
                    <img src="${product.imgp}" alt="Không có ảnh" class="modal-product-list__img">
                </p>
            </div>
            <div class="modal-product-wrap">
                <h2 class="modal-product-name">${product.name}</h2>
                <div class="modal-product-sold">
                    <div class="modal-product-sold-heart ">
                        <i class="modal-product-like-empty fa-solid fa-heart "></i>
                        Yêu thích
                        <i class="modal-product-like-share fa-solid fa-share-nodes"></i>
                    </div>
                    <div class="modal-product-assess">
                        <i class="modal-product-assess-gold fa-solid fa-star"></i>
                        <i class="modal-product-assess-gold fa-solid fa-star"></i>
                        <i class="modal-product-assess-gold fa-solid fa-star"></i>
                        <i class="modal-product-assess-gold fa-solid fa-star"></i>
                        <i class="modal-product-assess-gold fa-solid fa-star"></i>
                    </div>
                </div>
                <p class="modal-product-origin">Giá: ${formatNumberWithCurrency(product.origin)}</p>
                <p class="modal-product-sale">Giảm: ${product.sale}%</p>
                <p class="modal-product-country">Vận chuyển từ: ${product.country}</p>
            </div>
        </div>
        `;
        document.getElementById('productModal').style.display = 'block';
    }

    function closeModal() {
        document.getElementById('productModal').style.display = 'none';
    }

    //  click vào nút close
    document.querySelector('.close').addEventListener('click', closeModal);

    //  click ra ngoài modal
    window.addEventListener('click', function (event) {
        var modal = document.getElementById('productModal');
        if (event.target == modal) {
            closeModal();
        }
    });

    document.querySelector('.home-product .js-grid__row').addEventListener('click', function (event) {
        var target = event.target.closest('.product-item__link');
        if (target) {
            event.preventDefault(); // Ngăn chặn hành động mặc định của thẻ a
            var productName = target.querySelector('.product-item__title').innerText.trim();
            var product = products.find(p => p.name === productName);
            if (product) {
                displayProductDetails(product);
            }
        }
    });
};

function displayFilteredProducts(products) {
    var productContainer = document.querySelector('.home-product .js-grid__row');
    productContainer.innerHTML = '';

    if (products && products.length > 0) {
        var startIndex = (currentPage - 1) * itemsPerPage;
        var endIndex = startIndex + itemsPerPage;
        var currentProducts = products.slice(startIndex, endIndex);

        currentProducts.forEach(function (product) {
            function formatNumberWithCurrency(number) {
                return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number);
            }
            var productElement = document.createElement('div');
            productElement.classList.add('grid__column-2-4');
            productElement.dataset.id = product.id

            productElement.innerHTML = `
                <div class="product-item">
                    <a href="#" class="product-item__link">
                        <div class="product-item__img" style="background-image: url(${product.img});"></div>
                        <h3 class="product-item__title">${product.name}</h3>
                    </a>
                    <span class="product-item__deal">Mua kèm deal sốc</span>
                    <div class="product-item-price">
                        <div class="product-item__origin">${formatNumberWithCurrency(product.origin)}</div>
                        <div class="product-item__sale">-${product.sale}%</div>
                    </div>
                    <div class="product-item-country">${product.country}</div>
                    <div class="home-product-favourite">
                        <i class="home-product-favourite-icon ti-check"></i>
                        <p class="home-product-favourite-text">Yêu thích</p>
                    </div>
                    <div class="home-product-saleoff">
                        <span class="home-product-saleoff-precent">${product.sale}%</span>
                        <span class="home-product-saleoff-label">Giảm</span>
                    </div>
                    <div class="add-to-cart-wrap">
                        <button class="add-to-cart">
                            <i class="fa-solid fa-cart-plus"></i>
                            Thêm vào giỏ hàng
                        </button>
                    </div>
                </div>
            `;

            productContainer.appendChild(productElement);
        });

        // Hiển thị phân trang
        displayPagination(products.length);
    } else {
        productContainer.innerHTML = 'Không có sản phẩm nào.';
    }
}

function removeAccents(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function searchProducts() {
    var searchTerm = removeAccents(document.getElementById('searchInput').value.toLowerCase());
    var filteredProducts = [];

    if (searchTerm.trim() !== '') {
        filteredProducts = products.filter(function (product) {
            return removeAccents(product.name.toLowerCase()).includes(searchTerm);
        });
    } else {
        // Nếu ô tìm kiếm trống, hiển thị tất cả sản phẩm
        filteredProducts = products;
    }

    displayFilteredProducts(filteredProducts);
}

function handleSearchKeyPress(event) {
    if (event.key === 'Enter') {
        searchProducts();
    }
}

function displayPagination(totalItems) {
    var totalPages = Math.ceil(totalItems / itemsPerPage);
    var paginationContainer = document.querySelector('.home-product-pagination');
    paginationContainer.innerHTML = '';

    for (var i = 1; i <= totalPages; i++) {
        var pageItem = document.createElement('li');
        pageItem.classList.add('pagination-item');
        if (i === currentPage) {
            pageItem.classList.add('pagination-item--active');
        }
        pageItem.innerHTML = `<a href="#" class="pagination-item-link" onclick="changePage(${i})">${i}</a>`;
        paginationContainer.appendChild(pageItem);
    }
}

function changePage(page) {
    currentPage = page;
    filterProductsByCategory(currentCategory);
}

// thêm giỏ hàng 
let iconCart = document.querySelector('.header__cart');
let closeCart = document.querySelector('.header__cart-close-btn')
let body = document.querySelector('body');
let listProductHTML = document.querySelector('.home-product');
let listCartHTML = document.querySelector('.product-cart__wrap')
let listCartSpan = document.querySelector('.header__cart .header__cart-notice')

let carts = [];
let listProducts = [];

iconCart.addEventListener('click', () => {
    body.classList.toggle('show-cart');
})

closeCart.addEventListener('click', () => {
    body.classList.toggle('show-cart');
})

listProductHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if(positionClick.classList.contains('add-to-cart')) {
        let product_id = positionClick.closest('.grid__column-2-4').getAttribute('data-id');
        addToCart(product_id);
    }
});

const addToCart = (product_id) => {
    let positionThisProductInCart = carts.findIndex((value) => value.product_id == product_id);
    if(carts.length <= 0) {
        carts = [{
            product_id: product_id,
            quantity: 1,
        }]
    } else if(positionThisProductInCart < 0) {
        carts.push({
            product_id: product_id,
            quantity: 1
        })
    } else {
        carts[positionThisProductInCart].quantity = carts[positionThisProductInCart].quantity + 1;
    }
    addCartToHTML();
    addCartToMemory();
}

const addCartToMemory = () => {
    localStorage.setItem('cart', JSON.stringify(carts));
}
const addCartToHTML = () => {
    listCartHTML.innerHTML = '';
    let totalQuantity = 0;
    let totalValue = 0;

    if (carts.length > 0) {
        carts.forEach(cart => {
            function formatNumberWithCurrency(number) {
                return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number);
            }
            totalQuantity += cart.quantity;
            const info = products.find(product => product.id == cart.product_id);
            totalValue += info.origin * cart.quantity * (1 - info.sale / 100);

            let newCart = document.createElement('div');
            newCart.classList.add('product-cart__item');
            newCart.dataset.id = cart.product_id;
            newCart.innerHTML = `
                <div class="product-cart__item">
                    <div class="product-cart-img" style="background-image: url(${info.img});"></div>
                    <div class="product-cart__name">
                        ${info.name}
                    </div>
                    <div class="product-cart__price">
                    ${formatNumberWithCurrency(info.origin * cart.quantity)}
                    </div>
                    <div class="product-cart__qty">
                        <span class="minus" onclick="decreaseQuantity(${cart.product_id})"><</span>
                        <span>${cart.quantity}</span>
                        <span class="plus" onclick="increaseQuantity(${cart.product_id})">></span>
                    </div>
                </div>
            `;
            listCartHTML.appendChild(newCart);
        });
    }

    listCartSpan.innerText = totalQuantity;

    // tổng giá trị
    const totalCartValueSpan = document.querySelector('.header__cart-total span');
    totalCartValueSpan.innerText = `${totalValue.toFixed(0)} VNĐ`;
}

function decreaseQuantity(productId) {
    let positionThisProductInCart = carts.findIndex((value) => value.product_id == productId);

    if (positionThisProductInCart >= 0) {
        if (carts[positionThisProductInCart].quantity > 1) {
            carts[positionThisProductInCart].quantity -= 1;
        } else {
            carts.splice(positionThisProductInCart, 1);
        }

        addCartToHTML();
        addCartToMemory();
    }
}

function increaseQuantity(productId) {
    let positionThisProductInCart = carts.findIndex((value) => value.product_id == productId);

    if (positionThisProductInCart >= 0) {
        carts[positionThisProductInCart].quantity += 1;
        addCartToHTML();
        addCartToMemory();
    }
}

document.querySelector('.header__cart-order-btn').addEventListener('click', function () {
    placeOrder();
});

function placeOrder() {
    if (carts.length === 0) {
        alert("Giỏ hàng của bạn đang trống. Vui lòng thêm sản phẩm vào giỏ hàng trước khi đặt hàng.");
        return;
    }

    // Reset giỏ hàng
    carts = [];
    addCartToHTML();
    addCartToMemory();

    showOrderSuccessMessage();
}

function showOrderSuccessMessage() {
    alert('Đặt hàng thành công! Cảm ơn bạn đã mua sắm.');

    // Đóng modal 
    closeModal();
}

// Hàm tính tổng giá trị của giỏ hàng
function calculateTotalCartValue() {
    let totalValue = 0;

    if (carts.length > 0) {
        for (const cart of carts) {
            const product = products.find(p => p.id == cart.product_id);
            if (product) {
                totalValue += product.origin * cart.quantity * (1 - product.sale / 100);
            }
        }
    }

    return totalValue;
}