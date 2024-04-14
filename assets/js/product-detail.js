// // product-detail.js
// document.addEventListener('DOMContentLoaded', function () {
//     // Lấy id sản phẩm từ query parameter (ví dụ: ?id=123)
//     var productId = getParameterByName('id');

//     // Gọi hàm để hiển thị chi tiết sản phẩm
//     displayProductDetail(productId);

//     // Hiển thị modal khi trang được nạp
//     openModal();
// });

// function displayProductDetail(productId) {
//     // Fetch thông tin chi tiết sản phẩm từ API hoặc server
//     fetch('http://localhost:3000/products/' + productId)
//         .then(response => response.json())
//         .then(product => {
//             // Hiển thị thông tin chi tiết sản phẩm
//             var productDetailContainer = document.getElementById('product-detail');
//             productDetailContainer.innerHTML = `
//                 <h2>${product.name}</h2>
//                 <img src="${product.img}" alt="${product.name}">
//                 <p>Giá: ${product.origin}đ</p>
//                 <p>Giảm giá: ${product.sale}%</p>
//                 <p>Xuất xứ: ${product.origin}</p>
//                 <p>Quốc gia: ${product.country}</p>
//                 <!-- Thêm các thông tin khác cần hiển thị -->
//             `;
//         })
//         .catch(error => console.error('Error fetching product detail:', error));
// }

// // Hàm để lấy giá trị của query parameter từ URL
// function getParameterByName(name) {
//     var url = new URL(window.location.href);
//     return url.searchParams.get(name);
// }

// // Thêm hàm để mở modal
// function openModal() {
//     var modal = document.getElementById('productDetailModal');
//     modal.style.display = 'block';
// }

// // Thêm hàm để đóng modal
// function closeModal() {
//     var modal = document.getElementById('productDetailModal');
//     modal.style.display = 'none';
// }
