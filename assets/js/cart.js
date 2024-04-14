let iconCart = document.querySelector('.header__cart');
let closeCart = document.querySelector('.header__cart-close-btn')
let body = document.querySelector('body');
let listProductHTML = document.querySelector('.home-product');

let listProducts = [];

iconCart.addEventListener('click', () => {
    body.classList.toggle('show-cart');
})

closeCart.addEventListener('click', () => {
    body.classList.toggle('show-cart');
})



