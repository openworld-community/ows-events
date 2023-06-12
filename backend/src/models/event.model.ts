import mongoose, { Schema, Document } from 'mongoose';
import { EventOnPoster } from '@common/types/event';

export type IEventDocument = EventOnPoster & Document;

const schema = new Schema<IEventDocument>(
	{
		id: {
			type: String,
			required: true
		},
		creatorId: {
			type: String,
			required: true
		},
		title: {
			type: String,
			required: true
		},
		description: {
			type: String,
			required: false
		},
		date: {
			type: Number,
			required: true
		},
		durationInSeconds: {
			type: Number
		},
		location: {
			country: {
				type: String,
				required: true
			},
			city: {
				type: String,
				required: true
			}
		},
		image: {
			type: String
		},
		price: {
			type: Number
		},
		timezone: {
			timezoneName: {
				type: String,
				required: true
			},
			timezoneOffset: {
				type: String,
				required: true
			}
		}
	},
	{
		versionKey: false,
		timestamps: true
	}
);

schema.index({
	title: 'text',
	description: 'text',
	'location.city': 'text',
	'location.country': 'text'
});

export const EventModel = mongoose.model<EventOnPoster>('Event', schema);
