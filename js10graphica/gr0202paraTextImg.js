document.addEventListener('DOMContentLoaded', () => {
    const messagePara = document.querySelector('#message-para');
    const container = document.querySelector('#blocks-container'); // Контейнер для блоков
    const blocks = Array.from(document.querySelectorAll('.block')); // Преобразуем NodeList в массив

    // Перемешиваем блоки случайным образом
    for (let i = blocks.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [blocks[i], blocks[j]] = [blocks[j], blocks[i]];
    }

    // Очищаем контейнер и добавляем перемешанные блоки
    container.innerHTML = '';
    blocks.forEach(block => container.appendChild(block));

    // Пары для сравнения
    const pairs = {
        "Друкована реклама": "Брошура",
        "Зовнішня реклама": "Банер",
        "Реклама в засобах масової інформації": "Газети"
    };

    let firstSelected = null;

    blocks.forEach(block => {
        block.addEventListener('click', () => {
            // Если блок уже совпал, игнорируем клик
            if (block.classList.contains('matched')) return;

            // Если ни один блок не выбран, выбираем текущий
            if (!firstSelected) {
                firstSelected = block;
                block.classList.add('selected');
                return;
            }

            // Если тот же самый блок кликнут повторно, снимаем выделение
            if (firstSelected === block) {
                block.classList.remove('selected');
                firstSelected = null;
                return;
            }

            // Проверяем, совпадают ли выбранные блоки
            const firstContent = firstSelected.textContent.trim() || firstSelected.querySelector('img')?.alt;
            const secondContent = block.textContent.trim() || block.querySelector('img')?.alt;

            if (pairs[firstContent] === secondContent || pairs[secondContent] === firstContent) {
                firstSelected.classList.add('matched');
                block.classList.add('matched');

                // Проверяем, найдены ли все пары
                const allMatched = blocks.every(b => b.classList.contains('matched'));
                if (allMatched) {
                    messagePara.style.display = 'block';
                }
            }

            // Убираем состояние выбора
            firstSelected.classList.remove('selected');
            firstSelected = null;
        });
    });

    // Скрываем сообщение "Правильно!" по умолчанию
    messagePara.style.display = 'none';
});






/*
Объяснение изменений:
Добавлена проверка для блоков с изображениями:
Если текст отсутствует (например, в блоках с изображениями), используется alt атрибут изображения.

javascript
Копировать код
const firstContent = firstSelected.textContent.trim() || firstSelected.querySelector('img')?.alt;
const secondContent = block.textContent.trim() || block.querySelector('img')?.alt;
Корректные пары для выбора:
Пары теперь определяются как текст + описание (или alt у изображения).

Сообщение о победе:
Сообщение показывается, когда все блоки получили класс matched.

Как это работает:
Каждый раз при клике проверяется, являются ли два блока парой: текст из одного блока сравнивается с alt из другого (или наоборот).
Если пара найдена, блоки получают класс matched, и пользователь может продолжить искать оставшиеся пары.
Когда все блоки найдены, отображается сообщение.
*/