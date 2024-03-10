export enum TagsOld {
	CONFERENCE = 'conference', // not remove and not in new tags(peredelano)
	FESTIVAL = 'festival', // remove
	EXHIBITION = 'exhibition', // remove
	STANDUP = 'standup', // remove
	EXCURSION = 'excursion', // remove
	LECTURE = 'lecture', // remove
	PARTY = 'party', // remove
	MASTERCLASS = 'masterclass', // remove
	TOURISM = 'tourism', // remove
	HOLIDAY = 'holiday', // remove
	CONCERT = 'concert', // remove
	ONLINE = 'online'
}

export enum TagsNew {
	CONCERT_AND__SHOW = 'concert-and-show',
	FESTIVALS = 'festivals',
	EXHIBITIONS = 'exhibitions',
	THEATER = 'theater',
	LECTIONS_AND_MASTERCLASSESS = 'masterclass-and-lections',
	PARTIES = 'parties',
	BUSINESS_AND_NETWORKING = 'business-and-networking',
	TOURISM_AND_EXCURSION = 'tourism-and-excursion',
	BOARD_GAMES_AND_QIZZE = 'board-games-and-quizze',
	TASTINGS = 'tastings',
	RESTOURANT = 'restaurant',
	FAIRS_AND_CITY_EVENTS = 'fairs-and-cities-events',
	SPORT = 'sport',
	CHILDREN = 'children',
	ADULT = 'adult'
}
export const Tags = { ...TagsNew, ...TagsOld }; // this is for translation purposes until events with old tags exist then remove this
export type AllTags = typeof Tags; // this is for translation purposes until events with old tags exist then remove this

export const TagsArray: string[] = Object.values(TagsNew);

export type TagList = typeof TagsArray;
export type Tag = (typeof TagsArray)[number];
