import { CountriesForParserModel } from '../models/countries-for-parser.model';

class Controller {
	async findEnglishCountryNameByRussian(russianCountryName: string) {
		const country = await CountriesForParserModel.findOne({
			russian_short: { $regex: russianCountryName, $options: 'i' }
		});
		if (!country) return null;
		return { type: 'country', name: country.english_short };
	}

	async findEnglishCountryNameByCountryCode(countryCode: string) {
		const country = await CountriesForParserModel.findOne({
			iso_3166_1_alpha_2_codes: { $regex: countryCode, $options: 'i' }
		});
		if (!country) return null;
		return country.english_short;
	}
}

export const countriesForParserController = new Controller();
