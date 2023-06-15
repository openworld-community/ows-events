import cityTimezones from 'city-timezones';
import moment from 'moment-timezone';
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
		if (!byProvince) {
			return {
				type: 'error',
				errors: ['City not found. Please, check the city name and try again.']
			};
		}

		timezone = byProvince.timezone;

		return {
			type: 'success',
			data: {
				country: countryString,
				city: cityString,
				timezoneName: timezone,
				timezoneOffset: moment.tz(timezone).format('Z')
			}
		};
	}
	timezone = city.timezone;

	const timezoneOffset = moment.tz(timezone).format('Z');

	return {
		type: 'success',
		data: {
			country: countryString,
			city: cityString,
			timezoneName: timezone,
			timezoneOffset
		}
	};
};

export const getCountries: IGetCountriesHandlerProps = async () =>
	countriesAndCitiesController.countries;

export const getCitiesByCountry: IGetCitiesByCountryHandlerProps = async (request) => {
	const { country } = request.params;

	return countriesAndCitiesController.getCitiesByCountry(country);
};

export const getUsedCountries: IGetCountriesHandlerProps = async () =>
	countriesAndCitiesController.getUsedCountries()
