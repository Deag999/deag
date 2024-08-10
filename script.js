document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('feedbackForm');
    
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        
        const name = document.getElementById('name').value;
        const message = document.getElementById('message').value;
        
        alert(`Спасибо за ваше сообщение, ${name}! Мы получили следующее сообщение:\n\n"${message}"`);
        
        form.reset();
    });
});
