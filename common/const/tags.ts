export enum Tags {
	CONFERENCE = 'conference',
	FESTIVAL = 'festival',
	EXHIBITION = 'exhibition',
	THEATER = 'theater',
	STANDUP = 'standup',
	EXCURSION = 'excursion',
	LECTURE = 'lecture',
	PARTY = 'party',
	MASTERCLASS = 'masterclass',
	SPORT = 'sport',
	TOURISM = 'tourism',
	HOLIDAY = 'holiday',
	CONCERT = 'concert',
	CHILDREN = 'children',
	ADULT = 'adult',
	ONLINE = 'online'
}

export const TagsArray: string[] = Object.values(Tags);

export type TagList = typeof TagsArray;
export type Tag = (typeof TagsArray)[number];
