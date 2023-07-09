type Post = {
	title: string;
	body: string;
	date: string;
	author: string;
};

export const posts: Post[] = [
	{
		title: 'Добрый день! Сегодня хотим вернуться к знакомству с командой Афиши.',
		body: `
С каждым новым рассказом ребят понимаешь, насколько яркие и интересные их жизни, в каждой видится своя уникальность.

Привет, я Вася.
Я - магистр физики, закончил физфак МГУ. Плотно занимался научной работой, много прогал на разных языках. Затем перешёл в IT, потому что мне захотелось применять свои навыки программирования для создания крутых продуктов с использованием продвинутых технологий и подходов. Именно это я нашел на Афише. Здесь у меня есть комфортный стек, возможность экспериментировать, а также цветник крутых горящих специалистов. Мы используем много продвинутых инструментов и практик. До Афиши, ещё во время учебы, я работал питонистом в приборостроительной отрасли. Там меня научили основам, показали, как писать максимально надежный код, ибо цена ошибки – стоимость дорогущего устройства. Сейчас параллельно с Афишей я работаю в финтехе, много вожусь с базами данных, обработкой и анализом транзакций. Вне работы я политэмигрант, немного ролевик, любитель тяжелого музла, походник, счастливый муж. Мы с женой очень любим НРИ, регулярно играем с друзьями онлайн. Во мне не угас интерес к формулам, поэтому в свободное время я пилю проекты со сложными расчетами.
(с) Вася - Head of Data engineering @kompoth


Меня зовут Яна.
Я екс-доктор, который выгорел и ушёл из медицины.
Я пошла в тестирование, потому что люблю за всеми проверять работу. Мой опыт не столь большой, моей первой работой в IT был небольшой стартап, который в прошлом году, к сожалению, распался.
Переехала в Алматы и тут я нашла свою нынешнюю работу единственным тестировщиком на огромном проекте по безопасности на производстве. Было страшно быть единственным тестером, но у меня классная понимающая команда.
Как я попала в Афишу? Помню все писали в чат кратко о себе и были в основном разрабы, и Илья Лахов начал зазывать этих разрабов на разные проекты. А я думаю, ну неужели тестер никому не нужен ( так и написала ему, он ответил, что конечно нужны и позвал в Афишу) .
Из увлечений: после переезда в Алматы я просто подсела на аэройогу, это йога в гамаках, это ощущение невесомости просто окрыляет.
(С) Яна - Head QA @yanablinova


Я Иван и я тестировщик.
В сфере IT я около 4х лет, начал свою карьеру как Android разработчик в небольшой компании. Однако, через год я перешел в область IT-рекрутмента. Активно выступал на конференциях, аргументируя необходимость знания рекрутерами технологического стека, и проводил исследования, подтверждающие это утверждение.
В тестировании мне нравится видеть результаты своей работы, поэтому я выбрал эту область. В Переделано попал после конференции в Сербии и тут же меня схантил Тимур) В Афише я прилагаю усилия, чтобы обнаружить все ошибки и проблемы, чтобы порадовать конечного пользователя качественным продуктом.
В свободное время читаю литературу по блокчейну и криптовалюте и играю в Ведьмака)
(С) Иван - QA  @IvanEmely`,
		date: '2023-06-30',
		author: 'AfishaPeredelano'
	},
	{
		title: 'Приветствуем всех! У нас есть захватывающие новости, которыми мы хотим поделиться!',
		body: `
В современное время, когда многие меняют свои локации и путешествуют, становится необходимым иметь новые проекты, которые помогут быстро ориентироваться и найти интересные мероприятия в новом месте. Именно для этого был создан проект "Афиши”.

А теперь перейдем к самым интересным новостям! С сегодняшнего дня мы начинаем работать в Сербии!  Мы собрали информацию о всех мероприятиях по всей Сербии, чтобы помочь вам найти развлечения, соответствующие вашим интересам.
Все, что вам нужно сделать, это зайти на сайт AfishaPeredelano и выбрать то, что вам близко по духу.

Наша команда, работающая над проектом "Афиши", находится в разных уголках мира, и мы уверены, что наше будущее — в расширении географии. Мы планируем добавить еще больше стран и локаций, чтобы вы могли наслаждаться разнообразием мероприятий в разных уголках мира!

`,
		date: '2023-06-26',
		author: 'AfishaPeredelano'
	},
	{
		title: 'Всем привет от команды AfishaPeredelano. Можно мы расскажем вам о нашем проекте?',
		body: `
		Проект "Афиши" создан для упрощения поиска мероприятий, которые проходят в регионе, интересующем пользователя. На нашей платформе вы сможете найти информацию о мероприятиях, которые проходят в основном в Сербии, но мы планируем расширить географию и добавить больше стран и локаций в будущем. Есть много идей и планов, которые лежат в бэклоге. Например, мы хотели бы добавить онлайн-мероприятия.

Представьте ситуацию: вы приехали на несколько дней в Белград, но у вас нет знакомых в городе, и вы не знаете, чем можно занять себя на это время. Отличная новость! Афиша сделала все за вас. Мы собрали все ивенты города в одном месте, чтобы облегчить задачу поиска развлечений.

Основными аналогами Афиши являются телеграмм-сообщества и чаты русскоязычных пользователей. Наши дизайнеры создали интерфейс, который легок в использовании. Вам не потребуется много времени, чтобы найти то, что вам нужно. Просто выберите город, и перед вами отобразится список всего, что удалось найти по вашему запросу.
`,
		date: '2023-06-22',
		author: 'AfishaPeredelano'
	},
	{
		title: 'Всем привет, на связи PeredelanoAfisha! В такой теплый июньский день хочется продолжить знакомить вас с нашей командой. ',
		body: `
Меня зовут Оксана, мне 28 лет, с августа 2022 живу в Черногории с мужем и собакой.
Есть опыт работы в аудите и бух.учете, два высших по экономике и еще магистратура по юриспруденции, преподавала в ВУЗе. Муж-программист успешно обратил в свою айтишную веру, поэтому рассматривала варианты профессии, связанные с IT. Так, в сентябре начала обучение в Яндекс.Практикуме по специальности "проджект-менеджер" и в феврале его успешно завершила. Руководителем проектов уже была, но не в IT-сфере, для меня тут многое в новинку. Очень благодарна нашей команде, в особенности Тимуру и Эмилии за то, что поддерживают, подсказывают, дают такую приятную и конкретную обратную связь из-за которой хочется делать больше и больше. В целом считаю, что люди - это главное в любом проекте, в силу своего экстравертизма обожаю общаться с людьми и стараюсь находить пути решения проблем, выгодные для всех.
Я геймер со стажем, обожаю вселенную Ведьмака, Ассасина, RDR, Хогвартс Легаси и т.д.) Надеюсь когда-нибудь увидеть Афишу как отдельную захватывающую вселенную с огромным количеством пользователей)

(С) Оксана - Product/Project manager @oksana-kotelianets


Я - интернет-маркетолог с 6 летним опытом. Суммарно в IT года 4.
Много работал с трафиком, веб-аналитикой, стратегией и позиционированием. Шарю за управление проектами - неоднократно курировал разработку сайтов. В своей карьере регулярно сталкивался с задачами по дизайну, они драйвили больше всего. В 2022 году решил все-таки послушать свой внутренний голос и систематизировать знания и скиллы - прошел курс по дизайну интерфейсов и теперь хочу полностью перейти в эту профессию.
Хобби: горные лыжи (хочу попробовать и сноуборд), велопрогулки, пауэрлифтинг, видеоигры. В России любил ездить в приют для собак и гулять с ними. Прям почти каждые выходные в теплое время года)
(С) Валентин - UI/UX designer @valentinudovik


Меня зовут Андрей, в команде я в роли UI/UX дизайнера.
Работаю менеджером по продажам в строительной фирме. UI/UX дизайном увлекся чуть более полугода назад, когда жил в Турции, находясь там в длительном отпуск: начал изучать самостоятельно, хотелось убедиться, что будет интересно. Сейчас прохожу курс Google UX Design, работаю над портфолио.
Мечтаю в обозримом будущем полностью посвятить себя новой профессии. Надеюсь помочь проекту Afisha своими знаниями и умениями.
(С) Андрей - UI/UX designer @andreilebed
`,
		date: '2023-06-18',
		author: 'AfishaPeredelano'
	},
	{
		title: 'Добрый день!',
		body: `
С сегодняшнего дня мы начнем знакомить вас с нашей командой. Мы попросили ребят рассказать о себе и своем опыте. Все такие разные, но всех объединяет желание оставить свой след в нашем продукте.

Я Тимур. Работаю разработчиком больше 4 лет, все это время я был фулстеком с python и js во всяких разных исполнениях. В недалеком прошлом техлид.
Работал репетитором по физике и преподавал в школе астрономию. Попутно с преподаванием я пробовал себя и автобизнесе, и в реставрации.
В один из дней ученик попросил объяснить Python, так и понеслось. Первую работу нашел спустя 3 месяца после старта!
Хобби у меня - всякие электронные железки, домашний сервер и иногда пишу “штуки” для личного пользования.
(С) Тимур - СЕО @timur_bondarenko


Меня зовут Эмилия. Сейчас живу с мужем на Кипре, вместе воспитываем двух сфинксов.
Всего полтора года назад я знала об айти очень поверхностно, пока муж-фронтендер не предложил попробовать покодить, и через месяц меня уже было не остановить. С его поддержкой я получила кучу знаний и навыков за это время.
Когда увидела, что переделано запускает стартапы, хотела прийти сюда за опытом, а получилось, что влетела в проект с обеих ног. С задачами и сложностями справиться несложно: я на проекте с самого начала и в курсе всего, что происходило по фронтовой части. Очень помогает предыдущий опыт управления проектами и командами!
В свободное время занимаюсь дайвингом на продвинутом уровне и играю в ДнД)
(С) Эмилия - Head Frontend @emiliia-toropova


Я Игорь. В IT уже 10 лет, из которых 6 потратил на учёбу в вузе и попытки научной деятельности. 4 года пилю пет-проекты и фриланшу, полгода работал в аутсорс компании.
Помимо IT стараюсь следить за киберспортом и спортом, практически во всех проявлениях, от формулы-1 и доты до синхронного плавания и трэкмании. Есть судейская категория по синхронному плаванию (только российская, к сожалению). Являюсь хорошим специалистом в мемологии вселенной Звёздных войн. Нелпохо разбираюсь во вселенных Властелина колец и Гарри Поттера.
Попал в Переделано то ли из твиттера Фила, то ли из его телеграмма. Каким-то образом был заханчен в Афишу в этот же день. Резко поднялся в тимлиды бэкенда на ноде и выполняю некоторые функции девопса. Пытаюсь сделать жизнь разрабов в Афише удобнее в технологическом плане.
(С) Игорь - Head Backend @iskopaemoe
`,
		date: '2023-06-9',
		author: 'AfishaPeredelano'
	},
	{
		title: 'Приветствуем вас на странице Peredelano Afisha!',
		body: `
Мы рады видеть вас здесь и предлагаем вам уникальную возможность погрузиться в мир IT-сообщества среди релокантов. Будьте в курсе последних событий и участвуйте в интересных мероприятиях, которые обогатят вашу жизнь и помогут расширить круг знакомств.

На странице Peredelano Afisha вы сможете следить за тем, как мы развиваемся, стараясь сделать вашу жизнь проще путем создания удобной платформы для поиска множества интересных мероприятий. В наших планах освещать все значимые мероприятия, начиная от выставок и концертов до конференций и лекций. Мы предлагаем вам начать пользоваться нашей платформой уже сейчас, дать обратную связь и помочь нам сделать максимально удобный и полезный проект для вас!

Добро пожаловать в мир Peredelano Afisha! Будем рады видеть вас здесь и помогать вам открыть новые горизонты культурных возможностей.
`,
		date: '2023-06-3',
		author: 'AfishaPeredelano'
	}
];
