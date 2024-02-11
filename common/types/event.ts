import type { Timezone } from './location';
import { EventTypes } from '../const/eventTypes';
import { type Tag, Tags } from '../const/tags';

export type Time = { hours: number | string; minutes: number | string; seconds?: number | string };

export type EventDbEntity = {
	id: string;
	creatorId?: string;
	title: string;
	description: string;
	date: number;
	durationInSeconds: number;
	isOnline: boolean;
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
	tags?: Tag[];
	type: EventTypes;
};

export type EventOnPoster = EventDbEntity & {};

export type EventToShow = EventDbEntity & {
	startDate: string;
	endDate?: string | null;
};

export type EventFormType = {
	startDate: Date;
	endDate?: Date;
	startTime: Time;
	endTime?: Time;
	image?: string;

	price: {
		val: number | null;
		currency: string;
	};
	isFree: boolean;
	timezone: string;
	title: string;
	description: string;
	organizer: string;
	isOnline: boolean;
	location: { country: string; city: string; address: string };
	url: string;
	tags?: string[];
};

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
	isOnline: boolean;
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
	tags?: Tags[];
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
