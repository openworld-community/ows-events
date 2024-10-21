import { Tags } from '../../../../common/const/tags';
export default {
	image: {
		event: 'Event image'
	},
	description_title: 'Event description',
	poster: {
		create_title: 'And you can also create an event yourself and rally people around it.',
		click_button: 'Just click on the button:',
		button: 'in your profile',
		button_plus: 'on the main page'
	},

	price: {
		free: 'Free',
		unknown: 'Price not specified',
		from: 'From',
		to: 'To'
	},
	tags: {
		[Tags.ADULT]: '18+',
		[Tags.CHILDREN]: 'For children',
		[Tags.ONLINE]: 'Online',
		[Tags.SPORT]: 'Sport',
		[Tags.THEATER]: 'Theatre',
		[Tags.FESTIVALS]: 'Festivals',
		[Tags.EXHIBITIONS]: 'Exhibitions',
		[Tags.LECTIONS_AND_MASTERCLASSESS]: 'Lectures and masterclasses',
		[Tags.PARTIES]: 'Parties',
		[Tags.BUSINESS_AND_NETWORKING]: 'Business and networking',
		[Tags.TOURISM_AND_EXCURSION]: 'Tourism and excursions',
		[Tags.BOARD_GAMES_AND_QIZZE]: 'Board games and quizzes',
		[Tags.TASTINGS]: 'Tastings',
		[Tags.RESTOURANT]: 'Restaurants',
		[Tags.FAIRS_AND_CITY_EVENTS]: 'Fairs and city events',
		[Tags.CONCERT_AND__SHOW]: 'Concerts and show'
	},
	filteredEvents: {
		no_events_found: 'No events found'
	}
};
