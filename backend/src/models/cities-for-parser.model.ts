import mongoose, { Schema } from 'mongoose';

export type ICityForParser = {
	countryCode: string;
	name: string;
	alternateNames: string[];
};

const schema = new Schema<ICityForParser>({
	countryCode: {
		type: String,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	alternateNames: [
		{
			type: String,
			required: true
		}
	]
});

export const CitiesForParserModel = mongoose.model<ICityForParser>(
	'service_CitiesForParser',
	schema
);
