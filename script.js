document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('register');
    const loginForm = document.getElementById('login');
    const profileSection = document.getElementById('profile');
    const profileUsername = document.getElementById('profile-username');
    const profilePhoto = document.getElementById('profile-photo');
    const profilePhotoDisplay = document.getElementById('profile-photo-display');
    const postForm = document.getElementById('postForm');
    const postsContainer = document.getElementById('posts');
    const adminSection = document.getElementById('admin');
    const userList = document.getElementById('userList');

    // Проверка аутентификации и отображение секций
    function checkAuth() {
        const currentUser = localStorage.getItem('currentUser');
        if (currentUser) {
            profileSection.style.display = 'block';
            profileUsername.textContent = currentUser;
            document.getElementById('signin').style.display = 'none';
            if (currentUser === 'Admin') {
                adminSection.style.display = 'block';
            }
            updatePosts();
            updateUserList();
        } else {
            profileSection.style.display = 'none';
            adminSection.style.display = 'none';
        }
    }

    // Регистрация
    registerForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const username = document.getElementById('register-username').value;
        const password = document.getElementById('register-password').value;

        if (localStorage.getItem(username)) {
            alert('Пользователь с таким именем уже зарегистрирован.');
            return;
        }

        localStorage.setItem(username, password);
        alert('Регистрация успешна! Вы можете войти теперь.');
        registerForm.reset();
    });

    // Вход
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;
        const storedPassword = localStorage.getItem(username);

        if (username === 'Admin' && password === 'Admin') {
            localStorage.setItem('currentUser', 'Admin');
            alert('Вы вошли как администратор.');
            checkAuth();
        } else if (storedPassword === password) {
            localStorage.setItem('currentUser', username);
            alert(`Добро пожаловать, ${username}!`);
            checkAuth();
        } else {
            alert('Неверное имя пользователя или пароль.');
        }
    });

    // Профиль
    profilePhoto.addEventListener('change', () => {
        const file = profilePhoto.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                profilePhotoDisplay.src = reader.result;
                profilePhotoDisplay.style.display = 'block';
            };
            reader.readAsDataURL(file);
        }
    });

    // Форум
    postForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const title = document.getElementById('post-title').value;
        const message = document.getElementById('post-message').value;
        const currentUser = localStorage.getItem('currentUser');

        const post = {
            title: title,
            message
