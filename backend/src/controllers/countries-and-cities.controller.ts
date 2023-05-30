import fs from 'fs';

class CountriesAndCitiesController {
	countries: string[];

	citiesByCountry: { [key: string]: string[] } = {};

	constructor() {
		const map = JSON.parse(fs.readFileSync('./assets/countries.json', 'utf8'));

		this.countries = Object.keys(map);
		this.citiesByCountry = map;
	}

	getCitiesByCountry(country: string) {
		return this.citiesByCountry[country];
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
