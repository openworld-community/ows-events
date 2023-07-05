import {ServerErrors} from "./errors";
import {header} from "./header";
import {about} from "./about";

const ruTranslation = {
	error: ServerErrors,
	header,
	about,
	meta: {
		title: 'Афиша',
		home: {
			title: 'Главная'
		},
		about_us: {
			title: 'О нас'
		},
		payment_info: {
			title: 'Оплата'
		}
	},
	global: {
		country: 'Страна',
		city: 'Город',
		search: 'Поиск',
		timezone: 'Часовой пояс',
		button: {
			back: 'Назад',
			share: 'Поделиться',
			cancel: 'Отмена',
			search: 'Поиск',
			delete: 'Очистить'
		}
	},

	home: {
		title: 'Мероприятия',
		button: {
			add_event_aria: 'Добавить мероприятие',
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
			aria_city: 'Фильтр по городу'
		},
		peredelano: {
			description:
				'Тут мы объединяемся, чтобы вместе сделать проекты. Рынок и мир сейчас сложные, с работой туго, со смыслами тоже — поэтому мы решили делать и то и другое сами.'
		}
	},
	event: {
		button: {
			delete: 'Удалить',
			edit: 'Редактировать',
			contact: 'Связаться',
			register: 'Зарегистрироваться'
		},
		image: {
			event: 'изображение мероприятия'
		},
		price: {
			free: 'Бесплатно',
			not_found: 'Цена не указана'
		}
	},
	limitation_of_liability: {
		title: 'Ограничение ответственности'
	},
	component: {
		user_location: {
			not_found: 'Мы не смогли найти вас('
		},
		new_event_modal: {
			title: 'Добавьте мероприятие',
			cancel: 'Отмена',
			submit: 'Сохранить',
			add_image: 'Добавить фото',
			remove_image: 'Удалить фото',
			fields: {
				location: 'Локация',
				country: 'Страна',
				city: 'Город',
				timezone: 'Часовой пояс',
				main_info: 'Общая информация',
				title: 'Название',
				description: 'Описание',
				start: 'Начало',
				end: 'Окончание',
				price: 'Стоимость, RSD',
				price_placeholder: 'Укажите стоимость в RSD',
				url_to_rigistration: 'Ссылка на регистрацию',
				url_placeholder: 'https://example.com'
			}
		},
		need_authorize_modal: {
			title: 'Для создания мероприятия необходимо авторизоваться',
			button: {
				close: 'Закрыть'
			}
		},
		delete_event_modal: {
			title: 'Удаление мероприятия',
			button: {
				cancel: 'Отмена',
				submit: 'Подтвердить'
			}
		},
		pre_authorisation_modal: {
			title: 'Войдите в аккаунт',
			telegram_login: 'Войти через Telegram',
			button: {
				cancel: 'Отмена',
				login: 'Войти',
				logout: 'Выйти'
			}
		},
		language_selector: {
			label: 'Язык'
		},
	},
	dates: {
		day: {
			key_zero: '{count} дней',
			key_one: '{count} день',
			key_few: '{count} дня',
			key_many: '{count} дней'
		},
		clock: 'часы'
	},
};

export default ruTranslation;
