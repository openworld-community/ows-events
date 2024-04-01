import fs from 'fs';
import { EventModel } from '../models/event.model';

class CountriesAndCitiesController {
	countries: string[];

	citiesByCountry: { [key: string]: string[] } = {};

	constructor() {
		const map = JSON.parse(fs.readFileSync('./assets/countries.json', 'utf8'));

		this.countries = Object.keys(map);
		this.citiesByCountry = map;
	}

	getCountryByCity(city: string) {
		const { countries } = this;
		if (countries.includes(city)) return city;
		const possibleCountries = countries.filter((country) =>
			this.citiesByCountry[country].includes(city)
		);
		return possibleCountries[0];
	}

	getCitiesByCountry(country: string) {
		const citiesByCountry = this.citiesByCountry[country];
		return citiesByCountry;
	}

	async getUsedCountries() {
		const countries: string[] = await EventModel.distinct('location.country', {
			'meta.moderation.status': { $nin: ['declined', 'in-progress'] },
			$expr: {
				$gte: [{ $add: ['$date', { $multiply: [1000, '$durationInSeconds'] }] }, Date.now()]
			},
			'location.country': { $nin: [''] }
		});
		return countries;
	}

	async getUsedCitiesByCountry(country: string) {
		const cities: string[] = await EventModel.distinct('location.city', {
			'location.country': country,
			'meta.moderation.status': { $nin: ['declined', 'in-progress'] },
			'location.city': { $nin: [''] },
			$expr: {
				$gte: [{ $add: ['$date', { $multiply: [1000, '$durationInSeconds'] }] }, Date.now()]
			}
		});
		return cities;
	}

	async getUsedCities() {
		const cities: string[] = await EventModel.distinct('location.city', {
			'location.country': { $in: ['Serbia', 'Montenegro'] },
			'meta.moderation.status': { $nin: ['declined', 'in-progress'] },
			'location.city': { $nin: [''] },
			$expr: {
				$gte: [{ $add: ['$date', { $multiply: [1000, '$durationInSeconds'] }] }, Date.now()]
			}
		});
		return cities;
	}

	getRandomPair({ country, city }: { country?: string; city?: string }) {
		const getRandomCountry = () => {
			const randomCountryIndex = Math.floor(Math.random() * this.countries.length);
			const randomCountry = this.countries[randomCountryIndex];
			return randomCountry;
		};

		const getRandomCity = (randomCountry: string) => {
			const randomCityIndex = Math.floor(
				Math.random() * (this.citiesByCountry[randomCountry]?.length || 0)
			);
			const randomCity = this.citiesByCountry[randomCountry]?.[randomCityIndex];
			return randomCity;
		};

		const newCountry = country || getRandomCountry();
		const newCity = city || getRandomCity(newCountry);

		return { country: newCountry, city: newCity };
	}
}

export const countriesAndCitiesController = new CountriesAndCitiesController();
