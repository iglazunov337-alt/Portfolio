document.addEventListener('DOMContentLoaded', function() {
    // 1. Завантажувач
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(() => { loader.style.opacity = '0'; setTimeout(() => loader.style.display = 'none', 500); }, 1000);
    }

    // 2. Кнопка Нагору
    const scrollBtn = document.getElementById('scrollTopBtn');
    window.onscroll = function() {
        if (scrollBtn) {
            scrollBtn.style.display = (window.scrollY > 300) ? "block" : "none";
        }
    };

    if (scrollBtn) {
        scrollBtn.onclick = function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        };
    }

    // 3. Темна тема
    const themeBtn = document.getElementById('themeToggle');
    if (themeBtn) {
        themeBtn.onclick = function() {
            document.body.classList.toggle('dark-theme');
            const заставки = document.body.classList.contains('dark-theme');
            themeBtn.innerHTML = заставки ? "☀️ Світла тема" : "🌙 Темна тема";
            themeBtn.className = заставки ? "btn btn-light btn-sm" : "btn btn-dark btn-sm";
        };
    }
    
    // 4. Лічильник символів (якщо ти на сторінці контактів)
    const msgArea = document.getElementById('message');
    if (msgArea) {
        msgArea.oninput = function() {
            const count = msgArea.value.length;
            const counter = document.getElementById('charCount');
            if (counter) {
                counter.textContent = count + " символів";
                counter.style.color = count < 10 ? "red" : "gray";
            }
        };
    }
});
