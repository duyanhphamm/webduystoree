let userApi = "http://localhost:3000/user"; // Chỉnh sửa API endpoint

function login() {
    getUser(handlesLogin);
}

function getUser(callback) {
    fetch(userApi)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Lỗi HTTP! Trạng thái: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            callback(data);
        })
        .catch(error => {
            console.error('Lỗi khi truy xuất người dùng:', error);
            console.log('Phản hồi từ máy chủ:', error.response);
        });
}

function handlesLogin(data) {
    let username = document.getElementById("usernameJs").value.trim();
    let password = document.getElementById("passwordJs").value.trim();

    if (!username || !password) {
        alert("Vui lòng nhập cả tên đăng nhập và mật khẩu");
        return;
    }

    let userFound = data.find(user => user.username === username && user.password === password);

    if (userFound) {
        console.log("Đăng nhập thành công");

        // Kiểm tra nếu là tài khoản admin
        if (username === "admin" && password === "admin") {
            alert('Chào mừng trở lại ADMIN 👨‍💻.');
            window.location.href = "./admin.html";
        } else {
            // Nếu không phải admin
            let isConfirmed = confirm('Đăng nhập thành công <3  Nhấn "OK" để tiếp tục 😘.');
    
            if (isConfirmed) {
                window.location.href = "./index.html";
            } else {
                window.location.href = "";
            }
        }
    } else {
        alert('Tài khoản hoặc Mật khẩu không chính xác 😥  Nhấn "OK" để đăng nhập lại :((.');
    }
}