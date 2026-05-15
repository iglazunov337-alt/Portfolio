// 1. Масив постів блогу (можеш додавати свої)
const posts = [
    {
        title: 'Як я вивчив CSS за 30 днів',
        date: '15 квітня 2026',
        author: 'Ілля ГЛАЗУНОВ',
        text: 'Мій шлях у веб-розробку розпочався з простого бажання зрозуміти, як працюють стилі...',
        fullText: 'За цей місяць я пройшов шлях від звичайних селекторів до складних сіток Flexbox та Grid. Головна порада — практика кожного дня! Використовуйте ресурси як MDN та CSS-Tricks.'
    },
    {
        title: 'Маркетингові стратегії 2026',
        date: '20 квітня 2026',
        author: 'Ілля ГЛАЗУНОВ',
        text: 'Аналіз сучасного ринку показує, що персоналізація контенту стає ключовим фактором успіху...',
        fullText: 'У 2026 році ШІ став невід’ємною частиною маркетингу. Вміння створювати унікальний контент, який резонує з болями клієнта — це база, яку не замінить жоден алгоритм.'
    },
    {
        title: 'UI/UX дизайн: майбутнє інтерфейсів',
        date: '5 травня 2026',
        author: 'Ілля ГЛАЗУНОВ',
        text: 'Чому мінімалізм залишається в тренді та як створювати інтуїтивні інтерфейси...',
        fullText: 'Майбутнє за голосовим керуванням та доповненою реальністю, але основи візуальної ієрархії та доступності залишаються незмінними. Менше — це краще!'
    }
];

// 2. Функція створення картки поста
function createPostCard(post, index) {
    let card = document.createElement('div');
    card.className = 'card blog-card text-dark p-3 post-card';
    
    card.innerHTML = `
        <div class="card-body">
            <h4 class="fw-bold card-title">${post.title}</h4>
            <p class="text-muted small">${post.date} | ${post.author}</p>
            <p class="card-short-text">${post.text}</p>
            
            <div id="fullText-${index}" class="full-text-block mb-3" style="display: none; padding: 15px; background: #f8f9fa; border-radius: 10px; border-left: 4px solid #ffcc00;">
                ${post.fullText}
            </div>
            
            <button class="btn btn-primary rounded-pill px-4 btn-read-more" onclick="toggleFullText(${index}, this)">
                Читати далі &rarr;
            </button>
        </div>
    `;
    return card;
}

// 3. Функція "Читати далі"
window.toggleFullText = function(index, button) {
    let fullText = document.getElementById('fullText-' + index);
    if (fullText.style.display === 'none') {
        fullText.style.display = 'block';
        button.innerHTML = 'Згорнути ▲';
        button.classList.replace('btn-primary', 'btn-warning');
    } else {
        fullText.style.display = 'none';
        button.innerHTML = 'Читати далі &rarr;';
        button.classList.replace('btn-warning', 'btn-primary');
    }
};

// 4. Генерація постів при завантаженні
const blogContainer = document.getElementById('blogPosts');
if (blogContainer) {
    posts.forEach((post, i) => {
        blogContainer.appendChild(createPostCard(post, i));
    });
}

// 5. Пошук по блогу
let blogSearch = document.getElementById('blogSearch');
if (blogSearch) {
    blogSearch.addEventListener('input', function() {
        let query = this.value.toLowerCase();
        let postCards = document.querySelectorAll('.post-card');
        
        postCards.forEach(card => {
            let title = card.querySelector('.card-title').textContent.toLowerCase();
            let text = card.querySelector('.card-short-text').textContent.toLowerCase();
            
            if (title.includes(query) || text.includes(query)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
}
