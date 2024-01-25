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
		[Tags.ADULT]: 'Для взрослых',
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
		[Tags.TOURISM]: 'Туризм'
	}
};
