export const modal = {
	new_event_modal: {
		title: 'Добавьте мероприятие',
		title_edit: 'Редактирование мероприятия',
		cancel: 'Отмена',
		submit: 'Сохранить',
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
			description: 'Описание',
			start: 'Начало',
			end: 'Окончание',
			price: 'Стоимость',
			price_placeholder: 'Цена',
			currency_placeholder: 'Валюта',
			url_to_registration: 'Ссылка на регистрацию',
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
	edit_profile: {
		title: 'Редактирование профиля',
		fields: {
			name: 'Как к Вам обращаться?',
			name_placeholder: 'Имя',
			surname_placeholder: 'Фамилия',
			nickname: 'Никнейм',
			nickname_placeholder: 'Введите никнейм',
			organizer: 'Организатор',
			email: 'E-mail',
			phone: 'Номер телефона',

			organizer_placeholder: 'Имя организатора мероприятия'
		}
	}
};
