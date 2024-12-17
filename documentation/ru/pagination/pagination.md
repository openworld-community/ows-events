### [← На страницу документации](../../ru-documentation.md)
---

### Элементы пагинации находятся на:

-   Главной странице
-   Странице Страны
-   Странице Города

#### Примечание элемент пагинации содержит в себе (это костыль будем переписывать)
- #### Заголовки Афиша Сербия | Афиша Черногория и тд
- #### Список ивентов
- #### Блок пагинации описание ниже

---

### Блок пагинации содержит в себе:

-   #### Кнопку "Первая страница" - "<<"
-   #### Кнопку "Назад" - "<"
-   #### Кнопки "Номер страницы" - "2 3 4" - (**[Выделенная]**кнопка Отдельной страницы)
-   #### Кнопку "Вперед" - ">"
-   #### Кнопку "Последняя страница" - ">>"


 

### Изображения Компонента и стили

-   <details>
             <summary style="cursor: pointer;"> ⬇️ МОБИЛЬНАЯ И ПЛАНШЕТ ⬇️ </summary>
                <img src="./img/short-start-mobile.webp" alt="ДЕСКТОП" style="max-width: 400px;"><br>
                <img src="./img/long-mobile.webp" alt="ДЕСКТОП" style="max-width: 600px;"><br>
                <img src="./img/short-finish-mobile.webp" alt="ДЕСКТОП" style="max-width: 400px;">
    </details>
-   <details>
            <summary style="cursor: pointer;"> ⬇️ ДЕСКТОП ⬇️ </summary>
                <img src="./img/short-start-desktop.webp" alt="ДЕСКТОП" style="max-width: 400px;"><br>
                <img src="./img/long-desktop.webp" alt="ДЕСКТОП" style="max-width: 600px;"><br>
                <img src="./img/short-finish-desktop.webp" alt="ДЕСКТОП" style="max-width: 400px;">
    </details>

-   <details>
    <summary style="cursor: pointer;"> ⬇️ Стили ⬇️ </summary>

        -   Активный элемент
            -   Размер шрифта: var(--font-size-L) - 18px            
            -   Цвет шрифта: var(--color-icons) #4e4e4e
            -   Обводка: ❗Зеленая всегда❗
            -   Прозрачность: 1

        - Элемент
            -   Размер шрифта: var(--font-size-L) - 18px
            -   Жирность шрифта: 500
            -   Цвет: var(--color-icons) - #4e4e4e
            -   Прозрачность: 0.85
            -   Слабая тень на цифрах

        - Стрелки
            -   Цвет: var(--color-icons)
            -   Прозрачность: 1
                
    </details>

---

### Поведение

-   #### Активности

    -   <details>
        <summary style="cursor: pointer;"> ⬇️ <strong> При нажатии на цифру или значок "<<" "<" ">" ">>" </strong> ⬇️ </summary>

                    -   "<<" - На ПЕРВУЮ страницу
                    -   "<" - На страницу назад
                    -   ">" - На страницу Вперед
                    -   ">>" - На ПОСЛЕДНЮЮ страницу

        </details>

    -  #### При наведении (:hover) **❗Работает только на десктопе❗**

        -   <details>
            <summary style="cursor: pointer;"> Активный элемент ⬇️ </summary>
                        <img src="./img/active-element-hover-desktop.webp" alt="ДЕСКТОП" style="max-width: 400px;">

                        # Выделен активный элемент
                        
                        -   Зеленая тень снаружи

            </details>

        -   <details>
            <summary style="cursor: pointer;"> Элемент ⬇️ </summary>
                        <img src="./img/element-hover-desktop.webp" alt="ДЕСКТОП" style="max-width: 400px;">
                        
                        # Выделена цифра 3

                        -   Цвет шрифта: Зеленый
                        -   Увеличение размера: 1.2
                        -   Плавное увеличение: Да
                        -   Прозрачность: 1

            </details>

        -   <details>
            <summary style="cursor: pointer;"> Стрелки ⬇️ </summary>
                        <img src="./img/arrow-hover-desktop.webp" alt="ДЕСКТОП" style="max-width: 400px;"><br>
                        <img src="./img/double-arrow-hover-desktop.webp" alt="ДЕСКТОП" style="max-width: 400px;">

                        # Выделены стрелки справа

                        -   Цвет иконки: Зеленый
                        -   Увеличение размера: 1.5
                        -   Плавное увеличение: Да

            </details>


    - #### Прокрутка при нажатии на другую страницу до фильтров Страны / Города
        -   <details>
              <summary style="cursor: pointer;"> Мобильное ⬇️ </summary>
                  <img src="./img/scroll-mobile.webp" alt="МОБИЛЬНОЕ" style="max-width: 400px;">
            </details>
        -   <details>
              <summary style="cursor: pointer;"> Десктоп ⬇️ </summary>
                  <img src="./img/scroll-desktop.webp" alt="ДЕСКТОП" style="max-width: 800px;">
            </details>
        -   <details>
              <summary style="cursor: pointer;"> Планшет ⬇️ </summary>
                  <img src="./img/scroll-tablet.webp" alt="ПЛАНШЕТ" style="max-width: 600px;">
            </details> 

---

### Вид и Размеры
-   ### Мобильное устройство

    -   <details>
              <summary style="cursor: pointer;"> Появление: Сверху и Снизу экрана ⬇️ </summary>
                  <img src="./img/full-view-mobile.webp" alt="МОБИЛЬНОЕ" style="max-width: 400px;">
        </details>

    -   #### Размеры:
        #### Элемента
        -   Высота: 43px
        -   Ширина активного: 46px

        #### Блока пагинации
        -   Высота: 43px
        -   Промежуток (gap): 8px
        -   Ширина: по количеству элементов + промежутки
    -   #### При повороте экрана
        -   Выглядит как на планшете

-   ### Десктоп

    -   <details>
            <summary style="cursor: pointer;"> Появление: Снизу экрана ⬇️ </summary>
                <img src="./img/full-view-desktop.webp" alt="ДЕСКТОП" style="max-width: 800px;">
        </details>

    -   #### Размеры:
        #### Элемента
        -   Высота: 59px
        -   Ширина активного: 56px

        #### Блока пагинации
        -   Высота: 59px
        -   Промежуток (gap): 8px
        -   Ширина: по количеству элементов + промежутки

-   ### Планшет
    -   <details>
            <summary style="cursor: pointer;"> Появление: Сверху и Снизу экрана ⬇️ </summary>
                <img src="./img/full-view-tablet.webp" alt="Планшет" style="max-width: 600px;">
        </details>
    -   Размеры как у мобильной версии
    -   Поведение как у мобильной версии
    -   При повороте экрана - зависит от разрешения, если больше 1440 - как у десктопа

---
### [← На страницу документации](../../ru-documentation.md)
