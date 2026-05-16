// js/storage.js — збереження стану через localStorage

// === 1. Керування Темою (Light/Dark) ===
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    // Якщо збережено 'dark', додаємо клас темної теми до body
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        const themeBtn = document.getElementById('themeToggle');
        if (themeBtn) themeBtn.textContent = '☀️ Світла тема';
    }
}

function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    const isDark = document.body.classList.contains('dark-theme');
    
    // Зберігаємо вибір у localStorage
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    
    // Оновлюємо текст на кнопці
    const themeBtn = document.getElementById('themeToggle');
    if (themeBtn) {
        themeBtn.textContent = isDark ? '☀️ Світла тема' : '🌑 Темна тема';
    }
}

// Прив'язка кліку до кнопки перемикання теми
const themeBtn = document.getElementById('themeToggle');
if (themeBtn) {
    themeBtn.addEventListener('click', toggleTheme);
}


// === 2. Лічильник відвідувань сайту ===
function initVisitCounter() {
    let count = parseInt(localStorage.getItem('visitCount') || '0');
    count++;
    localStorage.setItem('visitCount', count.toString());

    // Зчитуємо дату минулого візиту перед тим, як перезаписати її новою
    const lastVisit = localStorage.getItem('lastVisit');
    
    // Записуємо поточну дату як новий останній візит
    localStorage.setItem('lastVisit', new Date().toLocaleDateString('uk-UA'));

    // Якщо це повторний візит (більше 1) і є дата минулого візиту — показуємо тост
    if (count > 1 && lastVisit) {
        showWelcomeBack(count, lastVisit);
    }
}

// Створення та запуск спливаючого вікна (Toast)
function showWelcomeBack(count, lastVisit) {
    const toast = document.createElement('div');
    toast.className = 'welcome-toast';
    toast.innerHTML = `<strong>Ласкаво просимо назад!</strong><br>Ви відвідали сайт ${count} разів.<br>Останній візит: ${lastVisit}`;
    
    document.body.appendChild(toast);
    
    // Автоматично видаляємо плашку через 5 секунд, як у методичці
    setTimeout(() => {
        toast.remove();
    }, 5000);
}


// === 3. Запуск ініціалізації при завантаженні сторінки ===
document.addEventListener('DOMContentLoaded', function() {
    initTheme();
    initVisitCounter();
});
