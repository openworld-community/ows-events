import mongoose, { Schema } from 'mongoose';

export type ICity = {
	countryCode: string;
	en: string;
	ru: string;
	alternateNames: string[];
};

const schema = new Schema<ICity>({
	countryCode: {
		type: String,
		required: true
	},
	en: {
		type: String,
		required: true
	},
	ru: {
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

export const CitiesModel = mongoose.model<ICity>('service_cities', schema);
