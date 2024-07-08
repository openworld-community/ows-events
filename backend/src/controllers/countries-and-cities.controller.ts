import { EventModel } from '../models/event.model';
import { CitiesModel } from '../models/cities.model';
import { CommonErrorsEnum, SupportedLanguages, SupportedCountries } from '../../../common/const';
import { CountriesForParserModel } from '../models/countries-for-parser.model';
import { citiesForParserController } from './cities-for-parser.controller';
import { countriesForParserController } from './countries-for-parser.controller';

class CountriesAndCitiesController {
	async getLocalizedCities(lang: SupportedLanguages) {
		const pipeline = [
			{
				$unset: ['countryCode', 'alternateNames', '_id']
			}
		];
		const cities = await CitiesModel.aggregate(pipeline).exec();
		return cities.map((city) => city[lang]);
	}

	async getLocalizedCountries(lang: SupportedLanguages) {
		const pipeline = [
			{
				$match: {
					iso_3166_1_alpha_2_codes: {
						$in: Object.values(SupportedCountries)
					}
				}
			}
		];
		const countries = await CountriesForParserModel.aggregate(pipeline).exec();
		return countries.map((country) => {
			if (lang === SupportedLanguages.RUSSIAN) return country.russian_short!;
			return country.english_short!;
		});
	}

	async getLocalizedCityName(cityName: string, lang: SupportedLanguages) {
		if (cityName === '') return '';
		const city = await CitiesModel.findOne({
			$or: [{ en: cityName }, { ru: cityName }, { alternateNames: cityName }]
		});
		if (!city) return cityName;
		return city[lang];
	}

	async getLocalizedCountryName(countryName: string, lang: SupportedLanguages) {
		if (countryName === '') return '';
		const country = await CountriesForParserModel.findOne({
			$or: [
				{ english_short: countryName },
				{ french_short: countryName },
				{ spanish_short: countryName },
				{ russian_short: countryName }
			]
		});
		if (!country) throw new Error(CommonErrorsEnum.COUNTRY_NOT_FOUND);
		if (lang === SupportedLanguages.RUSSIAN) return country.russian_short!;
		return country.english_short!;
	}

	async getCountryCodeByName(countryName: string) {
		if (countryName === '') return '';
		const country = await CountriesForParserModel.findOne({
			$or: [
				{ english_short: countryName },
				{ french_short: countryName },
				{ spanish_short: countryName },
				{ russian_short: countryName }
			]
		});
		if (!country) throw new Error(CommonErrorsEnum.COUNTRY_NOT_FOUND);
		return country.iso_3166_1_alpha_2_codes!;
	}

	async getCountryByCity(city: string) {
		const countryCode = await citiesForParserController.findCountryByCityName(city);
		if (!countryCode) throw new Error(CommonErrorsEnum.CITY_NOT_FOUND);
		const countryName = await countriesForParserController.findEnglishCountryNameByCountryCode(
			countryCode
		);
		if (!countryName) throw new Error(CommonErrorsEnum.COUNTRY_NOT_FOUND);
		return countryName;
	}

	async getCitiesByCountry(country: SupportedCountries, lang: SupportedLanguages) {
		const pipeline = [
			{
				$match: {
					countryCode: country
				}
			}
		];

		const cities = await CitiesModel.aggregate(pipeline).exec();
		return cities.map((city) => city[lang]);
	}

	async getUsedCountries(lang: SupportedLanguages) {
		const countries: string[] = await EventModel.distinct('location.country', {
			'meta.moderation.status': { $nin: ['declined', 'in-progress'] },
			$expr: {
				$gte: [{ $add: ['$date', { $multiply: [1000, '$durationInSeconds'] }] }, Date.now()]
			},
			'location.country': { $nin: [''] }
		});
		return Promise.all(
			countries.map(async (country) => this.getLocalizedCountryName(country, lang))
		);
	}

	async getUsedCitiesByCountry(country: string, lang: SupportedLanguages) {
		const cities: string[] = await EventModel.distinct('location.city', {
			'location.country': country,
			'meta.moderation.status': { $nin: ['declined', 'in-progress'] },
			'location.city': { $nin: [''] },
			$expr: {
				$gte: [{ $add: ['$date', { $multiply: [1000, '$durationInSeconds'] }] }, Date.now()]
			}
		});
		return Promise.all(cities.map(async (city) => this.getLocalizedCityName(city, lang)));
	}

	async getUsedCities(lang: SupportedLanguages) {
		const cities: string[] = await EventModel.distinct('location.city', {
			'location.country': { $in: ['Serbia', 'Montenegro'] },
			'meta.moderation.status': { $nin: ['declined', 'in-progress'] },
			'location.city': { $nin: [''] },
			$expr: {
				$gte: [{ $add: ['$date', { $multiply: [1000, '$durationInSeconds'] }] }, Date.now()]
			}
		});
		return Promise.all(cities.map(async (city) => this.getLocalizedCityName(city, lang)));
	}
}

export const countriesAndCitiesController = new CountriesAndCitiesController();
