// ==========================================
// ЛАБОРАТОРНА РОБОТА — ІЛЛЯ ГЛАЗУНОВ
// ГЛОБАЛЬНІ СКРИПТИ ДЛЯ ВСІХ СТОРІНОК
// ==========================================

// 1. УНІВЕРСАЛЬНЕ ПРИХОВУВАННЯ ЗАВАНТАЖУВАЧА (Loader) ДЛЯ ВСІХ СТОРІНОК
document.addEventListener('DOMContentLoaded', function() {
    let loader = document.getElementById('loader');
    if (loader) {
        // Плавно ховаємо лоадер через 300 мілісекунд після завантаження сторінки
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500); // Час на CSS-перехід зникнення
        }, 300);
    }
});

// 2. ВАЛІДАЦІЯ ФОРМИ ТА ЛІЧИЛЬНИК СИМВОЛІВ
function validateForm() {
    clearErrors();
    let isValid = true;

    let name = document.getElementById('name').value.trim();
    if (name === '') {
        showError('nameError', "Будь ласка, введіть ім'я");
        isValid = false;
    } else if (name.length < 2) {
        showError('nameError', "Ім'я занадто коротке");
        isValid = false;
    }

    let email = document.getElementById('email').value.trim();
    if (email === '') {
        showError('emailError', 'Будь ласка, введіть email');
        isValid = false;
    } else if (!email.includes('@') || !email.includes('.')) {
        showError('emailError', 'Некоректний формат email');
        isValid = false;
    }

    let message = document.getElementById('message').value.trim();
    if (message === '') {
        showError('messageError', 'Будь ласка, введіть повідомлення');
        isValid = false;
    } else if (message.length < 10) {
        showError('messageError', 'Повідомлення занадто коротке (мін. 10 символів)');
        isValid = false;
    }

    if (isValid) {
        const successMsg = document.getElementById('successMessage');
        if (successMsg) successMsg.style.display = 'block';
        
        const contactForm = document.getElementById('contactForm');
        if (contactForm) contactForm.reset();
        
        const charCount = document.getElementById('charCount');
        if (charCount) charCount.textContent = '0 symbols';
        
        alert('Дякуємо! ГЛАЗУНОВ отримав ваше повідомлення.');
    }
    return false; 
}

function showError(elementId, message) {
    let errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.color = 'red';
    }
}

function clearErrors() {
    let errors = document.querySelectorAll('.error-message');
    errors.forEach(err => err.textContent = '');
}

// Функція підрахунку символів (для форми контактів)
function countCharacters() {
    let messageElem = document.getElementById('message');
    if (!messageElem) return;

    let message = messageElem.value;
    let count = message.length;
    let charCountElem = document.getElementById('charCount');
    
    if (charCountElem) {
        charCountElem.textContent = count + ' символів';
        charCountElem.style.color = (count < 10 && count > 0) ? 'red' : '#6c757d';
    }
}

// 3. КНОПКА "НАГОРУ" (Працює на всіх сторінках при скролі)
window.onscroll = function() {
    let scrollTopBtn = document.getElementById('scrollTopBtn');
    if (scrollTopBtn) {
        scrollTopBtn.style.display = (document.documentElement.scrollTop > 300) ? 'block' : 'none';
    }
};

document.addEventListener('click', function(e) {
    let btn = document.getElementById('scrollTopBtn');
    if (e.target === btn) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});
