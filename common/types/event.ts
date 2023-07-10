import type { Timezone } from './location';

export type EventTagsTypes =
	| 'CONCERT'
	| 'EXHIBITION'
	| 'FESTIVAL'
	| 'LECTURE'
	| 'MASTER_CLASS'
	| 'MEETING'
	| 'PARTY'
	| 'PERFORMANCE'
	| 'SPORT'
	| 'THEATRE'
	| 'TOUR'
	| 'OTHER';

export const EventTags: EventTagsTypes[] = [
	'CONCERT',
	'EXHIBITION',
	'FESTIVAL',
	'LECTURE',
	'MASTER_CLASS',
	'MEETING',
	'PARTY',
	'PERFORMANCE',
	'SPORT',
	'THEATRE',
	'TOUR',
	'OTHER'
];

export type EventOnPoster = {
	id: string;
	creatorId?: string;
	title: string;
	description: string;
	date: number;
	durationInSeconds: number;
	location: {
		country: string;
		city: string;
		address: string;
	};
	image: string;
	price: string;
	timezone?: Timezone;
	url: string;
	tags?: EventTagsTypes[];
};

export type PostEventPayload = {
	event: {
		date: number;
		image: string;
		durationInSeconds: number;
		price: string;
		timezone: Timezone;
		description: string;
		location: { country: string; city: string; address: string };
		title: string;
		url: string;
		tags: EventTagsTypes[];
	};
};

export type EventParams = {
	id: string;
};

export type SearchEventPayload = {
	searchLine?: string;
	country?: string;
	city?: string;
};
