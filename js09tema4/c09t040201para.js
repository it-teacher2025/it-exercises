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

    const pairs = {
        "Короткий текст": "Для зберігання текстів обсягом до 255 символів",
        "Автону-мерація": "Для зберігання натураль-них чисел з автома-тичним нарощу-ванням",
        "Число": "Для зберігання чисел",
        "Дата й час": "Для зберігання кален-дарних дат і часу",
        "Обчислю-вальний": "Для зберігання арифме-тичних і логічних виразів та резуль-татів обробки даних",
        "Так/Ні": "Для зберігання логічних даних у вигляді Так або Ні",
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

            // Проверяем, совпадают ли выбранные блоки по парам
            const firstContent = firstSelected.textContent.trim();
            const secondContent = block.textContent.trim();

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
=======================================================================

=======================================================================

=======================================================================

=======================================================================
*/