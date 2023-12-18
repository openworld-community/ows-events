import { CitiesForParserModel } from '../models/cities-for-parser.model';

class Controller {
	async findEnglishCityNameByRussian(russianCityName: string) {
		const city = await CitiesForParserModel.findOne({
			alternateNames: russianCityName
		});
		if (!city) throw new Error(`No city found with russian name: ${russianCityName}`);
		return city.name;
	}
}

export const citiesForParserController = new Controller();
