// 1. Масив проектів
const projects = [
    { name: 'Інтернет-магазин', image: 'images/portfolio/project1.jpg', description: 'Адаптивний e-commerce сайт на Bootstrap', category: 'web' },
    { name: 'Мобільний додаток', image: 'images/portfolio/project2.jpg', description: 'UI/UX для сервісу доставки їжі', category: 'mobile' },
    { name: 'Лендінг-сторінка', image: 'images/portfolio/project3.jpg', description: 'Промо-сайт для стартапу в медицині', category: 'web' },
    { name: 'Дашборда', image: 'images/portfolio/project4.jpg', description: 'Панель аналітики з графіками', category: 'ui' },
    { name: 'Портал новин', image: 'images/portfolio/project5.jpg', description: 'Новинний сайт з динамічним контентом', category: 'web' },
    { name: 'Фітнес-трекер', image: 'images/portfolio/project6.jpg', description: 'Мобільний додаток для тренувань', category: 'mobile' }
];

let currentIndex = 0;

// 2. Функція створення картки через DOM API
function createProjectCard(project, index) {
    let col = document.createElement('div');
    col.className = 'col-sm-6 col-md-4 col-lg-3';
    
    col.innerHTML = `
        <div class="card h-100 project-card" style="cursor:pointer">
            <div class="card-img-wrapper">
                <img src="${project.image}" class="card-img-top" alt="${project.name}">
                <div class="overlay">
                    <p>${project.description}</p>
                    <button class="btn btn-warning btn-sm">Детальніше</button>
                </div>
            </div>
            <div class="card-body">
                <h5 class="card-title">${project.name}</h5>
                <span class="badge bg-primary">${project.category}</span>
            </div>
        </div>
    `;

    col.addEventListener('click', () => openLightbox(index));
    return col;
}

// 3. Відображення та фільтрація
function displayProjects(filter = 'all') {
    const gallery = document.getElementById('gallery');
    if (!gallery) return;
    gallery.innerHTML = '';

    projects.forEach((project, index) => {
        if (filter === 'all' || project.category === filter) {
            gallery.appendChild(createProjectCard(project, index));
        }
    });
}

// 4. Обробка кнопок фільтрів
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelector('.filter-btn.active')?.classList.remove('active', 'btn-primary');
        this.classList.add('active', 'btn-primary');
        displayProjects(this.dataset.category);
    });
});

// 5. Lightbox (Модальне вікно)
function openLightbox(index) {
    currentIndex = index;
    const overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';
    overlay.id = 'lightbox';
    
    overlay.innerHTML = `
        <div class="lightbox-content">
            <span class="lightbox-close" onclick="closeLightbox()">&times;</span>
            <img src="${projects[index].image}" id="lightboxImg">
            <div class="lightbox-info">
                <h4 id="lightboxTitle">${projects[index].name}</h4>
                <p id="lightboxDesc">${projects[index].description}</p>
                <div class="lightbox-nav">
                    <button class="btn btn-outline-primary" onclick="event.stopPropagation(); navigateLightbox(-1)">← Попередній</button>
                    <span id="counter" class="badge bg-secondary">${index + 1} / ${projects.length}</span>
                    <button class="btn btn-primary" onclick="event.stopPropagation(); navigateLightbox(1)">Наступний →</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(overlay);
    overlay.addEventListener('click', (e) => { if(e.target === overlay) closeLightbox(); });
}

window.navigateLightbox = function(direction) {
    // 1. Оновлюємо індекс
    currentIndex = (currentIndex + direction + projects.length) % projects.length;
    
    // 2. Отримуємо дані поточного проекту
    const project = projects[currentIndex];

    // 3. Знаходимо всі елементи і оновлюємо їх вміст
    document.getElementById('lightboxImg').src = project.image;
    document.getElementById('lightboxTitle').innerText = project.name;
    document.getElementById('lightboxDesc').innerText = project.description;
    document.getElementById('counter').innerText = `${currentIndex + 1} / ${projects.length}`;
};

window.closeLightbox = function() {
    const lb = document.getElementById('lightbox');
    if (lb) lb.remove();
};

// Запуск при завантаженні
displayProjects();
