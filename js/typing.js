// js/typing.js — Ефект друкарської машинки (Крок 5 методички)

document.addEventListener('DOMContentLoaded', function() {
    // Масив фраз, які будуть по черзі друкуватися
    const words = ["маркетолог", "веб-розробник", "студент КНУ"];
    
    let wordIndex = 0;  // Індекс поточної фрази
    let charIndex = 0;  // Індекс поточної літери
    let isDeleting = false; // Прапорець: друкуємо чи стираємо
    
    const typingDelay = 150; // Швидкість друку однієї літери (мс)
    const erasingDelay = 75; // Швидкість стирання однієї літери (мс)
    const newWordDelay = 2000; // Пауза перед початком стирання слова (мс)

    const textSpan = document.getElementById('typingText');

    function type() {
        if (!textSpan) return; // Якщо елемента немає на сторінці — виходимо

        const currentWord = words[wordIndex];

        if (isDeleting) {
            // Якщо режим стирання — зменшуємо кількість літер
            charIndex--;
        } else {
            // Якщо режим друку — збільшуємо кількість літер
            charIndex++;
        }

        // Виводимо поточну частину слова в HTML
        textSpan.textContent = currentWord.substring(0, charIndex);

        // Поточна затримка за замовчуванням
        let currentDelay = isDeleting ? erasingDelay : typingDelay;

        // Якщо слово повністю надруковано
        if (!isDeleting && charIndex === currentWord.length) {
            currentDelay = newWordDelay; // Робимо довгу паузу
            isDeleting = true; // Перемикаємося на стирання
        } 
        // Якщо слово повністю стерто
        else if (isDeleting && charIndex === 0) {
            isDeleting = false; // Перемикаємося на друк
            wordIndex = (wordIndex + 1) % words.length; // Переходимо до наступного слова в масиві
            currentDelay = 500; // Невелика пауза перед новим словом
        }

        // Викликаємо функцію знову через прораховану затримку
        setTimeout(type, currentDelay);
    }

    // Запускаємо першу ітерацію друку через 500 мс після завантаження сайту
    setTimeout(type, 500);
});
