export default {
	notType: 'Неверный тип',
	matches: {
		url: 'Введенное значение должно быть ссылкой',
		email: '',
		password: ''
	},
	required: {
		price: {
			val: 'Введите число',
			currency: 'Выберите валюту'
		},
		location: {
			country: 'Введите название страны',
			city: 'Введите название города',
			address: 'Введите адрес'
		},
		timezone: 'Выберите часовую зону',
		title: 'Название является обязательным для ввода',
		description: 'Необходимо ввести описание',
		startDate: 'Дата начала является обязательным для ввода',
		startTime: 'Время начала является обязательным для ввода',
		endTime: 'Укажите время окончания мероприятия',
		url: 'Необходимо указать ссылку'
	},
	max: {
		tags: 'Можно выбрать не более {count} тэгов',
		description: 'Длина должна быть не более {count} символов',
		title: 'Длина должна быть не более {count} символов',
		organizer: 'Длина должна быть не более {count} символов',
		url: 'Максимальное количество символов не должно превышать {count}',
		location: {
			address: 'Максимальное количество символов не должно превышать {count}'
		},
		price: {
			val: 'Максимальное значение не должно превышать {count}'
		}
	},
	positive: {
		price: {
			val: 'Значение должно быть больше нуля'
		}
	},
	test: {
		endDate: 'Дата окончания не может быть меньше даты начала',
		endTime: 'Время окончания не может быть меньше начала',
		price: {
			bitcoin: 'Превышено допустимое количество знаков',
			typicalCurrency: 'Превышено допустимое количество знаков'
		}
	},
	image: {
		size: 'Файл превышает допустимый размер {count}Mb.',
		problemServer: 'Что-то пошло не так.',
		extension: 'Выберите файл {name} формата'
	},
	hints: {
		tags: 'Можно выбрать не более 6 тэгов',
		image: 'Принимаются файлы формата jpg, jpeg, png, svg, webp, размером не боле 2Mb'
	}
};
