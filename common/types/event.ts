import type { Timezone } from './location';
import { EventTypes } from '../const/eventTypes';
import { Tags } from '../const/tags';

export type EventDbEntity = {
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
	price: EventPrice | null;
	timezone?: Timezone;
	url: string;
	organizer?: string;
	tags?: Tags[];
	type: EventTypes;
};

export type EventOnPoster = EventDbEntity;

export type PostEventPayload = {
	id?: string;
	date: number;
	image: string;
	durationInSeconds: number;
	price: EventPrice;
	timezone: Timezone;
	title: string;
	description: string;
	organizer: string;
	location: { country: string; city: string; address: string };
	url: string;
	tags?: string[];
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
	currency: string | null;
};

export type IEventMeta = {
	meta: {
		moderation: {
			status: string;
			problems: string[];
		};
	};
};
