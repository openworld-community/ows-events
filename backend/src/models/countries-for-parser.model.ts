import mongoose, { Schema } from 'mongoose';

export type ICountryForParser = {
	iso_3166_1_alpha_2_codes?: string;
	iso_3166_1_alpha_3_codes?: string;
	preferred_term?: string;
	english_short?: string;
	french_short?: string;
	spanish_short?: string;
	russian_short?: string;
	chinese_short?: string;
	arabic_short?: string;
	region_code?: number;
	region_name?: string;
	sub_region_code?: number;
	sub_region_name?: string;
	intermediate_region_name?: string;
};

const schema = new Schema<ICountryForParser>({
	iso_3166_1_alpha_2_codes: {
		type: String
	},
	iso_3166_1_alpha_3_codes: {
		type: String
	},
	preferred_term: {
		type: String
	},
	english_short: {
		type: String
	},
	french_short: {
		type: String
	},
	spanish_short: {
		type: String
	},
	russian_short: {
		type: String
	},
	chinese_short: {
		type: String
	},
	arabic_short: {
		type: String
	},
	region_code: {
		type: Number
	},
	region_name: {
		type: String
	},
	sub_region_code: {
		type: Number
	},
	sub_region_name: {
		type: String
	},
	intermediate_region_name: {
		type: String
	}
});

export const CountriesForParserModel = mongoose.model<ICountryForParser>(
	'service_CountriesForParser',
	schema
);
