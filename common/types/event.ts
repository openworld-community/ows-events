import type { IDelocalizedObject, ILocalizedObject } from './localization';
import type { Timezone } from './location';
import { SupportedLanguages } from '../const';
import { EventTypes } from '../const/eventTypes';

export type EventDbEntity = {
	id: string;
	creatorId?: string;
	title: string;
	originDescriptionLanguage?: SupportedLanguages | 'undefined';
	description: ILocalizedObject;
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
	tags?: string[];
	type: EventTypes;
};

export type EventOnPoster = IDelocalizedObject<EventDbEntity>;

export type PostEventPayload = {
	event: {
		date: number;
		image: string;
		durationInSeconds: number;
		price: EventPrice;
		timezone: Timezone;
		description: string;
		location: { country: string; city: string; address: string };
		title: string;
		url: string;
		tags?: string[];
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
