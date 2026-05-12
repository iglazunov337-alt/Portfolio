// ==========================================
// ЛАБОРАТОРНА РОБОТА №5 — ІЛЛЯ ГЛАЗУНОВ
// ==========================================

// 1. ПРИХОВУВАННЯ ЗАВАНТАЖУВАЧА ТА ПЕРЕВІРКА ТЕМИ
window.addEventListener('load', function() {
    // Приховуємо лоадер
    let loader = document.getElementById('loader');
    if (loader) {
        setTimeout(function() {
            loader.style.opacity = '0';
            setTimeout(() => { loader.style.display = 'none'; }, 500);
        }, 1000);
    }

    // ПЕРЕВІРКА ТЕМИ ПРИ ЗАВАНТАЖЕННІ (Щоб не злітала на інших сторінках)
    const savedTheme = localStorage.getItem('theme');
    const themeToggle = document.getElementById('themeToggle');
    
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        if (themeToggle) {
            themeToggle.innerHTML = '🔆 Світла тема';
            themeToggle.className = 'btn btn-light btn-sm ms-lg-3';
        }
    }
});

// 4. ПЕРЕМИКАЧ ТЕМИ (ЗБЕРЕЖЕННЯ В LOCALSTORAGE)
const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
        
        if (document.body.classList.contains('dark-theme')) {
            themeToggle.innerHTML = '🔆 Світла тема';
            themeToggle.className = 'btn btn-light btn-sm ms-lg-3';
            localStorage.setItem('theme', 'dark'); // Запам'ятовуємо, що тема темна
        } else {
            themeToggle.innerHTML = '⚪ Темна тема';
            themeToggle.className = 'btn btn-dark btn-sm ms-lg-3';
            localStorage.setItem('theme', 'light'); // Запам'ятовуємо, що тема світла
        }
    });
}

// 2. ВАЛІДАЦІЯ ФОРМИ ТА ЛІЧИЛЬНИК (КРОК 2, 7)
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
        document.getElementById('successMessage').style.display = 'block';
        document.getElementById('contactForm').reset();
        document.getElementById('charCount').textContent = '0 символів';
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

function countCharacters() {
    let message = document.getElementById('message').value;
    let count = message.length;
    let charCountElem = document.getElementById('charCount');
    if (charCountElem) {
        charCountElem.textContent = count + ' символів';
        charCountElem.style.color = (count < 10 && count > 0) ? 'red' : '#6c757d';
    }
}

// 3. КНОПКА "НАГОРУ" (КРОК 3)
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

// 5. ДИНАМІЧНІ НАВИЧКИ (КРОК 5)
let skills = [
    { name: 'HTML5 / CSS3 / LESS', level: 90, color: 'bg-primary' },
    { name: 'Маркетинговий аналіз', level: 85, color: 'bg-success' },
    { name: 'JavaScript', level: 75, color: 'bg-warning' },
    { name: 'Bootstrap 5', level: 95, color: 'bg-info' }
];

let skillsList = document.getElementById('skillsList');
if (skillsList) {
    let html = '';
    for (let i = 0; i < skills.length; i++) {
        html += `
            <div class="mb-3">
                <label class="fw-bold d-block mb-1 text-white">${skills[i].name}</label>
                <div class="progress" style="height: 25px; background: rgba(255,255,255,0.1);">
                    <div class="progress-bar ${skills[i].color}" role="progressbar" 
                         style="width: ${skills[i].level}%">
                        ${skills[i].level}%
                    </div>
                </div>
            </div>`;
    }
    skillsList.innerHTML = html;
}



