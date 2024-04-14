let userApi = "http://localhost:3000/user"; // Chỉnh sửa API endpoint

function register() {
    let username = document.getElementById("username").value.trim();
    let password = document.getElementById("password").value.trim();
    let confirmPassword = document.getElementById("confirmPassword").value.trim();

    if (!username || !password || !confirmPassword) {
        alert("Vui lòng điền đầy đủ thông tin.");
        return;
    }

    if (password !== confirmPassword) {
        alert("Mật khẩu và mật khẩu nhập lại không khớp 😟.");
        return;
    }

    // Kiểm tra xem tên đăng nhập đã tồn tại chưa
    fetch(userApi)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Lỗi HTTP! Trạng thái: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            let userExists = data.some(user => user.username === username);
            if (userExists) {
                alert("Tài khoản đã tồn tại :(( Vui lòng chọn tên khác 😔.");
            } else {
                // Thêm người dùng mới
                addUser(username, password);
            }
        })
        .catch(error => {
            console.error('Lỗi khi kiểm tra tên đăng nhập:', error);
            console.log('Phản hồi từ máy chủ:', error.response);
        });
}

function addUser(username, password) {
    fetch(userApi, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Lỗi HTTP! Trạng thái: ${response.status}`);
            }
            return response.json();
        })
        .then(() => {
            console.log("Đăng ký thành công");
            alert('Đăng ký thành công 😘.');
        })
        .catch(error => {
            console.error('Lỗi khi thêm người dùng mới:', error);
            console.log('Phản hồi từ máy chủ:', error.response);
        });
}
