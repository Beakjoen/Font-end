$(document).ready(function() {
    $('#login-form').submit(function(event) {
        event.preventDefault();

        var username = $('#username').val();
        var password = $('#password').val();
        var users = JSON.parse(localStorage.getItem('users')) || [];
        var authenticatedUser = users.find(function(user) {
            return user.username === username && user.password === password;
        });

        if (authenticatedUser) {
            alert('Đăng nhập thành công!');
            localStorage.setItem('currentUser', JSON.stringify(authenticatedUser));
            window.location.href = 'index.html';
        } else {
            alert('Tên đăng nhập hoặc mật khẩu không chính xác. Vui lòng thử lại.');
        }
    });
});