import { CountriesForParserModel } from '../models/countries-for-parser.model';

class Controller {
	async findEnglishCountryNameByRussian(russianCountryName: string) {
		const country = await CountriesForParserModel.findOne({
			russian_short: { $regex: russianCountryName, $options: 'i' }
		});
		if (!country) return null;
		return { type: 'country', name: country.english_short };
	}
}

export const countriesForParserController = new Controller();
