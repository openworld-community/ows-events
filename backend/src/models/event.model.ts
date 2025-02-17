import mongoose, { AggregatePaginateModel, Schema } from 'mongoose';
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';
import { EventDbEntity, IEventMeta } from '@common/types/event';

export type IEventDocument = EventDbEntity & IEventMeta;

const schema = new Schema(
	{
		id: {
			type: String,
			required: true,
			unique: true
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
			required: true
		},
		date: {
			type: Number,
			required: true
		},
		durationInSeconds: {
			type: Number
		},
		isOnline: {
			type: Boolean,
			required: true
		},
		location: {
			country: {
				type: String
			},
			city: {
				type: String
			},
			address: {
				type: String
			}
		},
		image: {
			type: String
		},
		url: {
			type: String
		},
		price: {
			minValue: {
				type: Number
			},
			value: {
				type: Number
			},
			maxValue: {
				type: Number
			},
			currency: {
				type: String
			}
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
		},
		tags: {
			type: [String]
		},
		organizer: {
			type: String
		},
		meta: {
			moderation: {
				status: {
					type: String,
					required: true,
					default: 'allow'
				},
				problems: [
					{
						type: String
					}
				]
			}
		},
		type: {
			type: String,
			enum: ['parsed', 'paid', 'user-generated']
		}
	},
	{
		versionKey: false,
		timestamps: true
	}
);

schema.plugin(mongooseAggregatePaginate);

export const EventModel: AggregatePaginateModel<IEventDocument> = mongoose.model('Event', schema);
