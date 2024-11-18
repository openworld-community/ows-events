import { PaginationOptions } from './pagination';
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

export type EventOnPoster = EventDbEntity;
// TODO in Event formype in price using val instead value because value - reserved word and ve-validate has problems, better not use value at all
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
	startDate?: number;
	endDate?: number;
	tags?: (typeof Tags)[];
};

export type SearchEventCityPayload = {
	searchLine?: string;
	startDate?: number;
	endDate?: number;
	tags?: (typeof Tags)[];
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

export type PaginationQueryPayload = {
	query: SearchEventPayload;
	options: PaginationOptions;
};

export type PaginationCityQueryPayload = {
	query: SearchEventCityPayload;
	options: PaginationOptions;
};
