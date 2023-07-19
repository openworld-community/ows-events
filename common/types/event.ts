import type { Timezone } from './location';

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
	price: EventPrice;
	timezone?: Timezone;
	url: string;
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

export type EventPrice = {
	maxValue: number | null;
	value: number | null;
	minValue: number | null;
	currency: number | null;
};
