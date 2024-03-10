import { Tags } from '../../../../common/const/tags';

export default {
	image: {
		event: 'Изображение мероприятия'
	},
	description_title: 'Описание мероприятия',
	price: {
		free: 'Бесплатно',
		unknown: 'Цена не указана',
		from: 'От',
		to: 'До'
	},
	tags: {
		[Tags.ADULT]: '18+',
		[Tags.CHILDREN]: 'Для детей',
		[Tags.CONCERT]: 'Концерт',
		[Tags.CONFERENCE]: 'Конференция',
		[Tags.EXCURSION]: 'Экскурсия',
		[Tags.EXHIBITION]: 'Выставка',
		[Tags.FESTIVAL]: 'Фестиваль',
		[Tags.HOLIDAY]: 'Праздник',
		[Tags.LECTURE]: 'Лекция',
		[Tags.MASTERCLASS]: 'Мастер-класс',
		[Tags.ONLINE]: 'Онлайн',
		[Tags.PARTY]: 'Вечеринка',
		[Tags.SPORT]: 'Спорт',
		[Tags.STANDUP]: 'Стендап',
		[Tags.THEATER]: 'Театр',
		[Tags.TOURISM]: 'Туризм',
		[Tags.FESTIVALS]: 'Фестивали',
		[Tags.EXHIBITIONS]: 'Выставки',
		[Tags.LECTIONS_AND_MASTERCLASSESS]: 'Лекции и мастер-классы',
		[Tags.PARTIES]: 'Вечеринки',
		[Tags.BUSINESS_AND_NETWORKING]: 'Бизнес и Нетворкинг',
		[Tags.TOURISM_AND_EXCURSION]: 'Туры и Экскурсии',
		[Tags.BOARD_GAMES_AND_QIZZE]: 'Настольные игры и Квизы',
		[Tags.TASTINGS]: 'Дегустации',
		[Tags.RESTOURANT]: 'Рестораны',
		[Tags.FAIRS_AND_CITY_EVENTS]: 'Ярмарки и городские мероприятия',
		[Tags.CONCERT_AND__SHOW]: 'Концерты и шоу'
	},
	filteredEvents: {
		no_events_found: 'Мероприятий не найдено'
	}
};
