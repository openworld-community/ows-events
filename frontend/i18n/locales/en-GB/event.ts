import { Tags } from '../../../../common/const/tags';
export default {
	image: {
		event: 'Event image'
	},
	description_title: 'Event description',
	price: {
		free: 'Free',
		unknown: 'Price not specified',
		from: 'From',
		to: 'To'
	},
	tags: {
		[Tags.ADULT]: 'For adults',
		[Tags.CHILDREN]: 'For children',
		[Tags.CONCERT]: 'Concert',
		[Tags.CONFERENCE]: 'Conference',
		[Tags.EXCURSION]: 'Excursion',
		[Tags.EXHIBITION]: 'Exhibition',
		[Tags.FESTIVAL]: 'Festival',
		[Tags.HOLIDAY]: 'Holiday',
		[Tags.LECTURE]: 'Lecture',
		[Tags.MASTERCLASS]: 'Masterclass',
		[Tags.PARTY]: 'Party',
		[Tags.SPORT]: 'Sport',
		[Tags.STANDUP]: 'Stand-up',
		[Tags.THEATER]: 'Theatre',
		[Tags.TOURISM]: 'Tourism'
	}
};
