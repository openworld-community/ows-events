import { defineTranslation } from '..';
import { type ErrorCodes } from '@/../common/const';

export const ServerErrors: {
	[key in ErrorCodes]: string;
} = {
	EVENT_IS_NOT_DEFINED: 'Мероприятие не определено',
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
	'event-not-found': 'Мероприятие не найдено',
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
};

export const defaultTranslation = {
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
	about: {
		title: 'О нас',
		idea: 'Идея проекта "Афиши" - создать удобную площадку для поиска мероприятий, которые проходят в интересующем пользователя регионе. Пока что будут только IT-мероприятия, но в будущем мы хотим добавлять все: от конференций до музыкальных вечеров.',
		functionality:
			'На странице каждого мероприятия будет доступна информация о дате начала и окончания, локации, описании и цене. Пользователь сможет записаться на мероприятие и добавить его в избранное. Организатор мероприятия сможет добавлять информацию о нем на площадку.',
		monetization:
			'Монетизация проекта будет осуществляться за счет рекламы мероприятий, которые будут подниматься в начало списка.',
		github: 'Ссылка на GitHub проекта',
		alt: 'О проекте Переделано: Афиша'
	},
	home: {
		title: 'Мероприятия',
		button: {
			add_event_aria: 'Добавить мероприятие',
			afisha_logo_aria: 'Вернуться к началу страницы'
		},
		events: {
			image_alt: 'Фото мероприятия',
			ad: 'Реклама',
			anchor_chat: 'Перейти в чат'
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
		header: {
			button: {
				open: 'Открыть меню навигации',
				close: 'Скрыть меню навигации'
			},
			about: 'Oб Афише',
			support: 'Поддержка',
			policy: 'Политика конфиденциальности',
			event: {
				manage: 'Управление событием'
			},
			authorization: {
				authorize: 'Авторизоваться',
				deauthorize: 'Выйти из аккаунта'
			}
		}
	},
	dates: {
		day: {
			key_zero: ' дней',
			key_one: ' день',
			key_few: ' дня',
			key_many: ' дней'
		},
		clock: 'часы'
	},
	header: {
		subscription_expired: '$t(dates.day.key) до конца подписки'
	},
	error: ServerErrors
};

export default defineTranslation(defaultTranslation);
