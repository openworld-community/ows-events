import { citiesForParserController } from '../controllers/cities-for-parser.controller';
import { countriesForParserController } from '../controllers/countries-for-parser.controller';

export const translatePeredelanoPlaceName = async (place: string) => {
	const isRussian = /^[а-яА-Я0-9-]+$/.test(place);
	if (!isRussian) throw new Error(`Not russian language detected in string: ${place}`);
	const englishName =
		(await citiesForParserController.findEnglishCityNameByRussian(place)) ||
		(await countriesForParserController.findEnglishCountryNameByRussian(place));
	if (!englishName) throw new Error(`No city or country found for russian name: ${place}`);
	return englishName;
};
