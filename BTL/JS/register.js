$(document).ready(function() {
    $('#register-form').submit(function(event) {
        event.preventDefault();

        var username = $('#username').val();
        var password = $('#password').val();
        var users = JSON.parse(localStorage.getItem('users')) || [];
        var existingUser = users.find(function(user) {
            return user.username === username;
        });

        if (existingUser) {
            alert('Tên đăng nhập đã tồn tại. Vui lòng chọn tên đăng nhập khác.');
        } else {
            users.push({ username: username, password: password });
            localStorage.setItem('users', JSON.stringify(users));
            alert('Đăng ký thành công!');
            window.location.href = 'dangnhap.html';
        }
    });
});