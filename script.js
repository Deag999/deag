document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('register');
    const loginForm = document.getElementById('login');
    const feedbackForm = document.getElementById('feedbackForm');
    const blockUserForm = document.getElementById('blockUserForm');
    const userList = document.getElementById('userList');
    const adminSection = document.getElementById('admin');
    const adminLink = document.getElementById('admin-link');

    // Функция для проверки, является ли пользователь администратором
    function checkAdminAccess() {
        const currentUser = localStorage.getItem('currentUser');
        if (currentUser === 'Admin') {
            adminSection.style.display = 'block';
        } else {
            adminSection.style.display = 'none';
        }
    }

    // Функция для обновления списка пользователей
    function updateUserList() {
        userList.innerHTML = '';
        const users = Object.keys(localStorage);
        users.forEach(user => {
            if (user !== 'currentUser') {
                const li = document.createElement('li');
                li.textContent = user + (localStorage.getItem(user) === 'blocked' ? ' (заблокирован)' : '');
                userList.appendChild(li);
            }
        });
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
        updateUserList();
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
            checkAdminAccess();
        } else if (storedPassword === 'blocked') {
            alert('Ваш аккаунт заблокирован.');
        } else if (storedPassword === password) {
            localStorage.setItem('currentUser', username);
            alert(`Добро пожаловать, ${username}!`);
        } else {
            alert('Неверное имя пользователя или пароль.');
        }
    });

    // Отправка отзыва
    feedbackForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const message = document.get
