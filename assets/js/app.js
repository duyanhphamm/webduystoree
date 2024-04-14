var productsApi = "http://localhost:3000/products";

function start() {
    getProducts(renderProductAdmin);
    handlesCreateProducts();
    deleteProduct()
}

start();

function getProducts(callback) {
    fetch(productsApi)
        .then(function(response) {
            return response.json();
        })
        .then(callback)
};

function renderProductAdmin(products) {
    var productsBlock = document.querySelector('.form-cart-list');
    var htmls = products.map(function(product) {
        return `
        <li class="form-cart-item js-form-cart-item-${product.id}">
            <div class="form-cart-item__img" style="background-image: url(${product.img})"></div>
            <div class="form-cart-item__wrap">
                <div class="form-cart-item__heading">
                    <h3 class="form-cart-item__title">${product.name}</h3>
                    <div class="form-cart-item__origin">${product.origin}đ</div>
                </div>

                <div class="form-cart-item__body">
                    <div class="form-cart-item__body-origin">${product.origin}đ</div>
                    <div class="form-cart-item__body-origin">-${product.sale}%</div>
                </div>
                
                <div class="form-cart-item__footer">
                    <div class="form-cart-item-country">Vận chuyển từ: ${product.country}</div>
                    <div class="form-cart-item__footer_wrap">
                        <a href="update.html?id=${product.id}" class="form-cart-item__footer--link">
                            <i class="form-cart-item__footer--icon fa-solid fa-pen"></i>
                            Chỉnh sửa
                        </a>
                        <a href="#" class="form-cart-item__footer--link" onclick="deleteProduct(${product.id})" style="color: #f44336;" data-bs-toggle="modal" data-bs-target="#delete-cart-modal">
                            <i class="form-cart-item__footer--icon fa-solid fa-trash"></i>
                            Xóa
                        </a>
                    </div>
                </div>
            </div>
        </li>
        `
    })

    productsBlock.innerHTML = htmls.join("");
}

// functions
function removeDiacritics(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function searchProducts(products) {
    var searchProductsInput = document.querySelector(".header__search-input").value;

    const searchProductsHandles = products.filter(function(product) {
        return product.name.toUpperCase().includes(searchProductsInput.toUpperCase());
    })

    renderProduct(searchProductsHandles);
}

// thêm sản phẩm
function createProcucts(data, callback) {
    var options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data)
    }

    fetch(productsApi, options)
        .then(function(response) {
            return response.json();
        })
        .then(callback)
}

function handlesCreateProducts() {
    var createBtnProducts = document.querySelector('.submit');

    createBtnProducts.onclick = function () {
        var nameInput = document.querySelector(".form-name__input").value;
        var priceInput = document.querySelector(".form-price__input").value;
        var imgInput = document.querySelector(".form-img__input").value;
        var imgFirstInput = document.querySelector(".form-imgf__input").value;
        var imgSecondInput = document.querySelector(".form-imgs__input").value;
        var imgThirdInput = document.querySelector(".form-imgt__input").value;
        var imgPockerInput = document.querySelector(".form-imgp__input").value;
        var discountSelect = document.querySelector(".form-discount__select").value;
        var countrySelect = document.querySelector(".form-country__select").value;
        var categorySelect = document.querySelector(".form-category__select").value;

        var formCreateProducts = {
            name: nameInput,
            img: imgInput,
            imgf: imgFirstInput,
            imgs: imgSecondInput,
            imgt: imgThirdInput,
            imgp: imgPockerInput,
            origin: priceInput,
            sale: discountSelect,
            country: countrySelect,
            category: categorySelect
        }

        createProcucts(formCreateProducts, function() {
            getProducts(renderProduct)
        })
    }
}

