// import about from '/locales/ru/about';
// import dates from '/locales/ru/dates';
// import donate from '/locales/ru/donate';
// import ServerErrors from '/locales/ru/errors';
// import event from '/locales/ru/event';
// import global from '/locales/ru/global';
// import header from '/locales/ru/header';
// import home from '/locales/ru/home';
// import limitation_of_liability from '/locales/ru/limitation-of-liability';
// import meta from '/locales/ru/meta';
// import modal from '/locales/ru/modal';
// import user from '/locales/ru/user';
// import { type ErrorCodes } from '@/../common/const';
import { CommonErrorsEnum } from '../../common/const/common-errors';
import { EventValidatorErrorTypes } from '../../common/const/event-validation-error'

// TODO: сейчас в либе nuxtjs i18n не работает разбивка по файлам при lazy load по локалям, необходимо отслеживать issue
// https://github.com/nuxt-modules/i18n/issues/2215 и вернуть разбивку, когда проблема решится

export default {
	about: {
		title: 'О нас',
		idea: 'В AfishaPeredelano мы стремимся сделать культурную и социальную жизнь более доступной.',
		mission: 'Нашей миссией является объединение людей по интересам, чтобы они могли легко находить и создавать уникальные события — от выставок и концертов до еженедельных занятий йогой в парке.',
		functionality: 'Теперь информация о мероприятиях всех масштабов собрана в одном месте. Благодаря удобным поисковым функциям и фильтрам, организовать свой досуг можно всего за несколько минут.',
		team: 'Мы — команда энтузиастов, желающих делать мир интереснее и социально активнее. Наши разработчики, дизайнеры и менеджеры работают над тем, чтобы ваш опыт использования приложения был незабываемым.',
		values: {
			title: 'Наши ценности, которых мы придерживаемся в своей работе:',
			openness: 'Открытость: мы верим в силу общения и открытости;',
			innovation: 'Инновации: постоянно ищем способы сделать наше приложение лучше;',
			community: 'Сообщество: стремимся создать пространство, где каждый чувствует себя принятым;',
			accessibility: 'Доступность: мы делаем культурные события доступными для всех;',
			quality: 'Качество: не уступаем в качестве как крупным платформам, так и маленьким инициативам.'

		},
		github: 'Ссылка на GitHub проекта',
		social: {
			title: 'Подпишитесь на нас в соцсетях:',
			alt: 'Ссылка на страницу в'
		}
	},
	dates: {
		day: {
			key_zero: '{count} дней',
			key_one: '{count} день',
			key_few: '{count} дня',
			key_many: '{count} дней'
		},
	},
	donate: {
		title: 'Станьте частью нашего проекта!',
		description:
			'Мы приглашаем Вас вступить в нашу творческую семью и вместе создавать нечто большее, чем просто список мероприятий. Ваша поддержка позволит нам развивать проект, расширять его возможности и реализовывать наши самые смелые идеи, чтобы мы могли предложить Вам нечто поистине уникальное.',
		gratitude: 'Спасибо, что делаете нашу миссию возможной!',
		subscription: 'С любовью, Команда AfishaPeredelano.',
		method: {
			title: 'Внести вклад:',
			patreon: 'Patreon',
			bitcoin: 'Bitcoin',
			ethereum: 'Ethereum',
			usdt: 'USDT',
			usdc: 'USDC'
		},
	},
	error: {
		[EventValidatorErrorTypes.EVENT_IS_NOT_DEFINED]: 'Мероприятие не определено',
		TITLE_IS_NOT_DEFINED: 'Заголовок не определен',
		TITLE_IS_TOO_SHORT: 'Заголовок слишком короткий',
		TITLE_IS_TOO_LONG: 'Заголовок слишком длинный',
		DESCRIPTION_IS_NOT_DEFINED: 'Описание не определено',
		DESCRIPTION_IS_TOO_SHORT: 'Описание слишком короткое',
		DESCRIPTION_IS_TOO_LONG: 'Описание слишком длинное',
		START_DATE_IS_NOT_DEFINED: 'Дата начала не определена',
		START_DATE_IS_IN_THE_PAST: 'Дата начала в прошлом',
		DURATION_IS_NEGATIVE: 'Длительность отрицательная',
		LOCATION_IS_NOT_DEFINED: 'Место проведения не определено',
		COUNTRY_IS_NOT_DEFINED: 'Страна не определена',
		CITY_IS_NOT_DEFINED: 'Город не определен',
		IMAGE_LINK_IS_TOO_SHORT: 'Ссылка на изображение слишком короткая',
		IMAGE_LINK_IS_TOO_LONG: 'Ссылка на изображение слишком длинная',
		URL_IS_NOT_DEFINED: 'Ссылка на мероприятие не определена',
		URL_IS_TOO_SHORT: 'Ссылка на мероприятие слишком короткая',
		URL_IS_TOO_LONG: 'Ссылка на мероприятие слишком длинная',
		TITLE_IS_NOT_CLEAN: 'В заголовоке ненормативная лексика',
		DESCRIPTION_IS_NOT_CLEAN: 'В описании ненормативная лексика',
		[CommonErrorsEnum.EVENT_NOT_FOUND]: 'Мероприятие не найдено',
		'image-addition-error': 'Ошибка при добавлении изображения',
		'image-deletion-error': 'Ошибка при удалении изображения',
		'image-encoding-problem': 'Ошибка формата изображения',
		'image-too-large': 'Файл изображения слишком большой',
		'no-image-to-add': 'Файл изображения не найден',
		'no-image-to-delete': 'Файл изображения не найден',
		'paymant-info-file-parse-error': 'Ошибка при ',
		'payment-info-file-not-exist': 'Метод оплаты не задан',
		'payment-info-not-found': 'Метод оплаты не найден',
		'unknown-image-route-error': 'Непредвиденная ошибка при обработке изображения',
		'wrong-token': 'Ваш токен авторизации поврежден',
		forbidden: 'Ошибка допуска',
		unauthorized: 'У вас нет доступа к данному ресурсу',
		'event-already-exists': 'Данное мероприятие	уже существует',
		'event-sent-on-moderation': 'Мероприятие отправлено на модерацию',
		'no-payload-provided': 'ОТправлен пустой запрос',
		'timezone-city-not-found': 'Не удалось найти часовой пояс по указанным параметрам',
		'user-does-not-exist': 'Пользователь не найден'
		},
	event: {
		image: {
			event: 'Изображение мероприятия'
		},
		description_title: 'Описание мероприятия',
		price: {
			free: 'Бесплатно',
			unknown: 'Цена не указана',
			from: 'От',
			to: 'До'
		}
	},
	footer: {
		navigation: {
			about: 'Об Афише',
			support: 'Поддержка',
			donate: 'Поддержать проект',
			limitation_of_liability: 'Ограничение ответственности'
		}
	},
	form: {
		global: {
			required: '* поля, обязательные для заполнения'
		},
		event: {
			title: 'Создание мероприятия',
			title_edit: 'Редактирование мероприятия',
			add_image: 'Добавить фото',
			remove_image: 'Удалить фото',
			fields: {
				location: 'Локация',
				country: 'Страна',
				city: 'Город',
				address: 'Адрес',
				address_placeholder: 'Улица, дом или название локации',
				check_address: 'Проверьте правильность отображения локации ',
				// \u00A0 - неразрывный пробел
				address_link: 'на\u00A0карте',
				timezone: 'Часовой пояс',
				main_info: 'Общая информация',
				title: 'Название',
				organizer: 'Организатор',
				description: 'Описание',
				start: 'Начало',
				end: 'Окончание',
				price: 'Стоимость',
				price_placeholder: 'Цена',
				currency_placeholder: 'Валюта',
				price_free: 'Бесплатно',
				url_to_registration: 'Ссылка на регистрацию',
				url_placeholder: 'https://example.com'
			}
		},
	},
	global: {
		country: 'Страна',
		city: 'Город',
		timezone: 'Часовой пояс',
		button: {
			authorize: 'Авторизоваться',
			add_to_favourites: 'Добавить в избранное',
			back: 'Назад',
			cancel: 'Отмена',
			close: 'Закрыть',
			confirm: 'Подтвердить',
			contact: 'Связаться',
			copy: 'Копировать',
			copied: 'Скопировано',
			clear: 'Очистить',
			delete: 'Удалить',
			edit: 'Редактировать',
			edit_profile: 'Редактировать профиль',
			follow: 'Перейти',
			in_favourites: 'В избранном',
			logout: 'Выйти из аккаунта',
			register: 'Зарегистрироваться',
			remove_from_favourites: 'Удалить из избранного',
			save: 'Сохранить',
			search: 'Поиск',
			share: 'Поделиться',
		}
	},
	header: {
		logo: {
			at_home_aria: 'Вернуться к началу страницы',
			other_page_aria: 'Вернуться на домашнюю страницу'
		},
		language_selector: {
			label: 'Выберите язык',
			language: {
				ru: 'Русский',
				en: 'Английский'
			}
		},
		burger: {
			open: 'Открыть меню навигации',
			close: 'Скрыть меню навигации'
		},
		navigation: {
			user: 'Пользователь',
			authorize: 'Авторизоваться',
			about: 'O проекте',
			support: 'Поддержка',
			donation: 'Поддержать проект',
			limitation_of_liability: 'Ограничение ответственности',

		},
		subscription_expired: '$t(dates.day.key) до конца подписки',
	},
	home: {
		title: 'Объединяем людей вокруг событий',
		button: {
			add_event_aria: 'Добавить мероприятие'
		},
		events: {
			image_alt: 'Фото мероприятия',
			ad: 'Реклама',
			anchor_chat: 'Перейти в чат'
		},
		location: {
			aria: 'Вы находитесь в'
		},
		filter: {
			aria_country: 'Фильтр по стране',
			aria_city: 'Фильтр по городу',
			search: 'Что вас интересует?',
		},
		user_location: {
			not_found: 'Мы не смогли найти вас'
		}
	},
	limitation_of_liability: {
		title: 'Ограничение ответственности',
		last_change: 'Дата последнего изменения:',
		p_1_1: 'Администрация сайта',
		p_1_2: ' и социальных сетей AfishaPeredelano (Далее — Афиша) не занимается самостоятельной организацией мероприятий, освещаемых на сайте',
		p_1_3: ' или в социальных сетях',
		p_1_4: '(Далее — Сервис). Состоится мероприятие или нет, зависит от третьих лиц, за действия которых Афиша не отвечает и не может оказывать на них влияние. В связи с этим Афиша не гарантирует достоверность сведений, размещенных на Сервисе.',
		p_2: 'Афиша не гарантирует корректную работу сайтов, ссылки на которые размещены на Сервисе. Также Афиша не гарантирует соответствие сторонних сайтов требованиям законодательства. Афиша не гарантирует конфиденциальность данных пользователя на сторонних сайтах.',
		p_3: 'Афиша не несет ответственности и не возмещает никакой ущерб, прямой или косвенный, причиненный пользователю сайта или любым третьим лицам в результате использования или невозможности использования Сервиса и размещенной на Сервисе информации.',
		p_4: 'У пользователей сайта есть возможность размещать на сайте Афиши контент самостоятельно, без участия администрации. Афиша не обязуется модерировать контент, размещаемый пользователями.',
		p_5: 'Афиша не гарантирует достоверность информации, размещаемой пользователями на Сервисе. Афиша не гарантирует, что мероприятия, информация о которых размещается пользователями, состоятся, а сайты, ссылки на которые размещают пользователи, исправно работают, отвечают требованиям закона и обеспечивают конфиденциальность данных пользователей.',
		p_6: 'Пользователи, размещающие контент на Сервисе, самостоятельно отвечают перед третьими лицами и государственными органами за свои действия. Пользователь, используя Сервис, обязуется не нарушать ничьи авторские права, права на товарные знаки, средства индивидуализации и/или права на иные объекты интеллектуальной собственности. Пользователь обязуется самостоятельно и за свой счет урегулировать конфликты с третьими лицами, связанные с действиями пользователя на Сервисе.',
		p_7: 'Пользователь и третьи лица обязуются урегулировать конфликты с Афишей во внесудебном порядке путём направления претензий по любым доступным каналам связи. В случае невозможности урегулировать конфликт в претензионном порядке, он подлежит урегулировании в соответствии с применимым законодательством.',
		p_8: 'Отсутствие гарантий означает, что Афиша и/или любые лица, прямо или косвенно причастные к ней, не принимают на себя никаких обязательств и не несут никакую ответственность перед пользователями Сервиса и/или любыми иными третьими лицами в связи с контентом, размещенным на Сервисе.'
	},
	meta: {
		site_name: 'Афиша Peredelano',
		default_title: 'Афиша мероприятий Сербии, Черногории, Кыргызстана',
		default_description: 'В каталоге представлены десятки мероприятий по различным направлениям: концерты, встречи, выставки, фестивали, мастер-классы',
		about_us: {
			title: 'О проекте Peredelano Афиша',
			description: 'Узнайте больше о нашем проекте, команде и миссии'
		},
		payment_info: {
			title: 'Оплата'
		},
		donate: {
			title: 'Поддержать проект Peredelano Афиша',
			description: 'Благодаря вашей помощи мы развиваемся, расширяем возможности проекта и реализуем наши самые смелые идеи'
		},
		user: {
			info: {
				title: 'Личный кабинет',
				description: 'Управляйте Вашим профилем и мероприятиями в личном кабинете'
			}
		}
	},
	modal: {
		global: {
			required: '* поля, обязательные для заполнения'
		},
		need_authorize_modal: {
			title: 'Для создания мероприятия необходимо авторизоваться',
		},
		delete_event_modal: {
			title: 'Удаление мероприятия',
		},
		edit_profile: {
			title: 'Редактирование профиля',
			fields: {
				name: 'Как к вам обращаться?',
				name_placeholder: 'Имя',
				surname_placeholder: 'Фамилия',
				nickname: 'Никнейм',
				nickname_placeholder: 'Введите никнейм',
				organizer: 'Организатор',
				organizer_placeholder: 'Имя организатора мероприятия'
			}
		}
	},
	user: {
		unauthorized: {
			title: 'Войдите в личный кабинет',
			text: 'Авторизуйтесь, чтобы получить доступ к дополнительным возможностям',
			continue: 'Продолжить без авторизации',
		},
		greeting: 'Привет',
		user: 'Пользователь',
		my_events: {
			title: 'Мои мероприятия',
			no_my_events: 'У Вас пока нет созданных мероприятий',
		},
		favourites: {
			title: 'Избранное',
			no_favourites: 'Вы еще ничего не добавили в “Избранное”',
		},
		donate: {
			title: 'Станьте частью нашего проекта!',
			text: 'Мы приглашаем вас вступить в нашу творческую семью и вместе создавать нечто особенное',
			button: 'Внести вклад'
		}
	}

	// about,
	// dates,
	// donate,
	// error: ServerErrors,
	// event,
	// global,
	// header,
	// home,
	// limitation_of_liability,
	// meta,
	// modal,
	// user,
};
