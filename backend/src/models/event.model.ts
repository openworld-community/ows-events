import mongoose, { Schema, Document } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';
import { EventOnPoster } from '@common/types/event';

export type IEventMeta = {
	meta: {
		moderation: {
			status: string;
			problems: string[];
		};
	};
};
export type IEventDocument = EventOnPoster & IEventMeta & Document;

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

schema.plugin(mongoosePaginate);
schema.plugin(mongooseAggregatePaginate);

export const EventModel = mongoose.model<
	IEventDocument,
	mongoose.AggregatePaginateModel<IEventDocument>
>('Event', schema);
