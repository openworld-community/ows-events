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

 

### Изображения Компонента

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

---

### Поведение

-   #### Активности

    -   <details>
        <summary style="cursor: pointer;"> ⬇️ При нажатии на цифру или значок "<<" "<" ">" ">>" переход на нужную страницу ⬇️ </summary>

                    -   "<<" - На ПЕРВУЮ страницу
                    -   "<" - На страницу назад
                    -   ">" - На страницу Вперед
                    -   ">>" - На ПОСЛЕДНЮЮ страницу

        </details>

    -  #### При наведении (:hover) **❗СКРИНЫ ДЕСКТОПА❗**

        -   <details>
            <summary style="cursor: pointer;"> Активный элемент ⬇️ </summary>
                        <img src="./img/active-element-hover-desktop.webp" alt="ДЕСКТОП" style="max-width: 400px;">

                        -   Зеленая обводка
                        -   Зеленая тень снаружи
                        -   Жирность шрифта: 500
                        -   Прозрачность: 1

            </details>

        -   <details>
            <summary style="cursor: pointer;"> Элемент ⬇️ </summary>
                        <img src="./img/element-hover-desktop.webp" alt="ДЕСКТОП" style="max-width: 400px;">

                        -   Зеленая обводка
                        -   Зеленая тень внутри и снаружи
                        -   Жирность шрифта: 500
                        -   Прозрачность: 1

            </details>

    -  #### При фокусировании с помощью Tab (:focus) **❗СКРИНЫ ДЕСКТОПА❗**

        -   <details>
            <summary style="cursor: pointer;"> Активный элемент ⬇️ </summary>
                        <img src="./img/active-element-hover-desktop.webp" alt="ДЕСКТОП" style="max-width: 400px;">

                        -   Зеленая обводка
                        -   Зеленая тень снаружи
                        -   Жирность шрифта: 500
                        -   Прозрачность: 1

            </details>

        -   <details>
                   <summary style="cursor: pointer;"> Элемент ⬇️ </summary>
                        <img src="./img/element-focus-desktop.webp" alt="ДЕСКТОП" style="max-width: 400px;">

                         -   Зеленая тень внутри и снаружи
                         -   Жирность шрифта: 500
                         -   Прозрачность: 1

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
        -   Ширина: 46px
        -   Жирность шрифта: 400
        -   Слабая тень на цифрах
        -   Прозрачность: 0.8
        #### Блока пагинации
        -   Высота: 43px
        -   Промежуток (gap): 8px
        -   Ширина: по количеству элементов + промежутки
    -   #### При повороте экрана
        -   Поведение как на планшете

-   ### Десктоп

    -   <details>
            <summary style="cursor: pointer;"> Появление: Снизу экрана ⬇️ </summary>
                <img src="./img/full-view-desktop.webp" alt="ДЕСКТОП" style="max-width: 800px;">
        </details>

    -   #### Размеры:
        #### Элемента
        -   Высота: 59px
        -   Ширина: 56px
        -   Жирность шрифта: 400
        -   Слабая тень на цифрах
        -   Прозрачность: 0.8
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
