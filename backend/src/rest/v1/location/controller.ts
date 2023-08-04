import cityTimezones from 'city-timezones';
import moment from 'moment-timezone';
import { CommonErrorsEnum } from '@common/const';
import { countriesAndCitiesController } from '../../../controllers/countries-and-cities.controller';
import {
	IGetCitiesByCountryHandlerProps,
	IGetCountriesHandlerProps,
	IGetMetaHandlerProps
} from './type';

export const getMeta: IGetMetaHandlerProps = async (request) => {
	const countryString = request.params.country;
	const cityString = request.params.city;

	const cities = cityTimezones.lookupViaCity(cityString);
	const city = cities.find((c) => c.country === countryString);

	let timezone = '';

	if (!city) {
		const byProvince = cityTimezones.findFromCityStateProvince(countryString)[0];
		if (!byProvince) throw new Error(CommonErrorsEnum.TIMEZONE_CITY_NOT_FOUND);

		timezone = byProvince.timezone;

		return {
			country: countryString,
			city: cityString,
			timezoneName: timezone,
			timezoneOffset: moment.tz(timezone).format('Z')
		};
	}
	timezone = city.timezone;

	const timezoneOffset = moment.tz(timezone).format('Z');

	return {
		country: countryString,
		city: cityString,
		timezoneName: timezone,
		timezoneOffset
	};
};

export const getCountries: IGetCountriesHandlerProps = async () =>
	countriesAndCitiesController.countries;

export const getCitiesByCountry: IGetCitiesByCountryHandlerProps = async (request) => {
	const { country } = request.params;

	return countriesAndCitiesController.getCitiesByCountry(country);
};

export const getUsedCountries: IGetCountriesHandlerProps = async () =>
	countriesAndCitiesController.getUsedCountries();

export const getUsedCities: IGetCitiesByCountryHandlerProps = async (request) => {
	const { country } = request.params;
	return countriesAndCitiesController.getUsedCities(country);
};
