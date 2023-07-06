export const modal = {
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
	}
};
