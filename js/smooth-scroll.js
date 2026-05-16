// js/smooth-scroll.js — Плавна прокрутка та підсвічування меню (Scroll Spy)

document.addEventListener('DOMContentLoaded', function() {
    
    // === 1. ПЛАВНА ПРОКРУТКА (Smooth Scroll) ===
    // Находимо всі посилання у стовпчику, які ведуть на внутрішні id (починаються з #)
    const menuLinks = document.querySelectorAll('.dropdown-column-menu a[href^="#"]');

    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Скасовуємо різкий стрибок браузера

            const targetId = this.getAttribute('href'); // Отримуємо куди летіти (наприклад, #about)
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                // Вираховуємо висоту шапки, щоб вона не перекривала заголовок секції
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight;

                // Плавно скролимо сторінку до потрібної точки
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });


    // === 2. АВТО-ПІДСВІЧУВАННЯ АКТИВНОГО ПУНКТУ (Scroll Spy) ===
    const sections = document.querySelectorAll('section[id]'); // Наші секції з id
    const dropdownLinks = document.querySelectorAll('.dropdown-column-menu a');

    window.addEventListener('scroll', function() {
        let scrollPosition = window.scrollY + document.querySelector('.navbar').offsetHeight + 50;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            // Перевіряємо, чи знаходиться скролл в межах поточної секції
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                dropdownLinks.forEach(link => {
                    // Скидаємо активний клас у всіх
                    link.style.color = 'white';
                    link.style.backgroundColor = 'transparent';

                    // Додаємо підсвітку лише тому пункту, який відповідає поточній секції
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.style.color = '#333';
                        link.style.backgroundColor = '#ffcc00';
                    }
                });
            }
        });
    });
});
