export default {
	title: 'Афиша {city}',
	heading: 'Мероприятия {city} ({country}) ',
	filters: {
		city: {
			placeholder: 'Выберите город',
			aria: 'Навигация по городам'
		},
		country: {
			placeholder: 'Выберите страну',
			aria: 'Навигация по странам'
		},
		date: {
			placeholder: 'Когда пойдем?',
			title: 'Когда пойдем?',
			aria: 'Фильтр по дате'
		},
		tags_button: {
			aria: 'Выбор категории мероприятия',
			open: 'Категории',
			close: 'Свернуть'
		}
	}
};
