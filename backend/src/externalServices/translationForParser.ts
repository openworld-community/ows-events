import { citiesForParserController } from '../controllers/cities-for-parser.controller';
import { countriesForParserController } from '../controllers/countries-for-parser.controller';

export const translatePeredelanoPlaceName = async (place: string) => {
	const isRussian = !/^[а-яА-Я0-9]+$/.test(place);
	if (!isRussian) throw new Error(`Not russian language detected in string: ${place}`);
	const city = await citiesForParserController.findEnglishCityNameByRussian(place);
	const country = await countriesForParserController.findEnglishCountryNameByRussian(place);
	return city || country;
};
