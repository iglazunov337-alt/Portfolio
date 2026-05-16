// js/scroll-reveal.js
document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Поиск всех секций для анимации появления (Крок 1)
    const sections = document.querySelectorAll(
        '.about-section, .skills-section, .portfolio-section, .blog-section, .contact-section'
    );

    // Добавляем класс .hidden ко всем секциям изначально
    sections.forEach(section => {
        section.classList.add('hidden');
    });

    // 2. Создаем IntersectionObserver (Спостерігач)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.replace('hidden', 'visible');
                if (entry.target.classList.contains('skills-section') || entry.target.id === 'skills') {
                    animateAllBars();
                }
                observer.unobserve(entry.target);
            }
        });
    }, { 
        threshold: 0,          /* Срабатывает сразу же, как только появляется первый пиксель секции */
        rootMargin: "0px 0px 80px 0px"  /* ХИТРЫЙ ХАК: заставляет браузер "видеть" секцию за 150 пикселей ДО её появления на экране */
    });
   

    // Запускаем наблюдение за всеми секциями
    sections.forEach(section => {
        observer.observe(section);
    });
});

// 3. Функция анимации всех progress bars (Крок 3)
function animateAllBars() {
    const bars = document.querySelectorAll('.progress-bar');
    bars.forEach(bar => {
        const target = parseInt(bar.getAttribute('data-target'));
        animateProgress(bar, target);
    });
}

// 4. Пошаговый счетчик через requestAnimationFrame (Крок 3)
function animateProgress(bar, target) {
    let current = 0;
    function step() {
        current += 1; // Увеличиваем на 1% за кадр
        bar.style.width = current + '%';
        bar.textContent = current + '%';
        
        // Также обновляем текстовый процент над полосой, если он есть
        const parentSkillItem = bar.closest('.skill-item');
        if (parentSkillItem) {
            const percentLabel = parentSkillItem.querySelector('.skill-percent');
            if (percentLabel) {
                percentLabel.textContent = current + '%';
            }
        }
        
        if (current < target) {
            requestAnimationFrame(step);
        }
    }
    requestAnimationFrame(step);
}
