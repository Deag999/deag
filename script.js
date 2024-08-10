document.addEventListener('DOMContentLoaded', function() {
    const dateElement = document.getElementById('date');
    const currentDate = new Date().toDateString();
    dateElement.textContent = `Сьогодні: ${currentDate}`;
});