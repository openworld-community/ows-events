export enum Tags {
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
	ADULT = 'adult',
	ONLINE = 'online'
}

export type AllTags = typeof Tags;

export const TagsArray: string[] = Object.values(Tags);

export type TagList = typeof TagsArray;
export type Tag = (typeof TagsArray)[number];
