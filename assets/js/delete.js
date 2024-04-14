var productsApi = "http://localhost:3000/products";

function deleteProduct(id) {
    var userConfirmed = confirm("Bạn có chắc chắn muốn xóa sản phẩm này?");
    if (!userConfirmed) {
        return;
    }
    var options = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    };

    fetch(productsApi + '/' + id, options)
        .then(function(response) {
            return response.json();
        })
        .then(function() {
            // Xóa sản phẩm khỏi giao diện người dùng
            var productItem = document.querySelector('.js-form-cart-item-' + id);
            if (productItem) {
                productItem.remove();
            }
        })
        .catch(function(error) {
            console.error('Lỗi khi xóa sản phẩm:', error);
        });
}