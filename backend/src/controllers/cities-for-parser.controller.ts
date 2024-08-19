import { CitiesForParserModel } from '../models/cities-for-parser.model';

class Controller {
	async findEnglishCityNameByRussian(russianCityName: string) {
		const city = await CitiesForParserModel.findOne({
			alternateNames: russianCityName
		});
		if (!city) return null;
		return { type: 'city', name: city.name };
	}

	async findCountryByCityName(cityName: string) {
		const city = await CitiesForParserModel.findOne({
			alternateNames: cityName
		});
		if (!city) return null;
		return city.countryCode;
	}
}

export const citiesForParserController = new Controller();
