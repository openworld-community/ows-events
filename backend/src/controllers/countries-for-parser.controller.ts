import { CountriesForParserModel } from '../models/countries-for-parser.model';

class Controller {
	async findEnglishCountryNameByRussian(russianCountryName: string) {
		const country = await CountriesForParserModel.findOne({
			russian_short: { $regex: russianCountryName, $options: 'i' }
		});
		if (!country) throw new Error(`No country found with russian name: ${russianCountryName}`);
		return country.english_short;
	}
}

export const countriesForParserController = new Controller();
