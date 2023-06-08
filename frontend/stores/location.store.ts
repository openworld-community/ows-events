import { defineStore } from 'pinia';
import { getCitiesByCountry, getCountries, getUserLocation } from '@/services/location.services';
import { UserLocation } from '../../common/types/location';
import parseJSON from '@/utils/json';

const useLocationStore = defineStore('location', {
	state: () => {
		if (process.server) {
			return {
				pickedCountry: '',
				countries: [],
				cities: [],
				citiesByCountry: {},
				pickedCity: '',
				userLocation: {}
			};
		}

		return {
			pickedCountry: localStorage.getItem('LOCATIONS_PICKED_COUNTRY') ?? '',
			countries: parseJSON<string[]>(localStorage.getItem('LOCATIONS_COUNTRIES') ?? '[]', []),
			cities: parseJSON<string[]>(localStorage.getItem('LOCATIONS_CITIES') ?? '[]', []),
			citiesByCountry: parseJSON<Record<string, string[]>>(
				localStorage.getItem('LOCATIONS_CITIES_BY_COUNTRY') ?? '{}',
				{}
			),
			pickedCity: localStorage.getItem('LOCATIONS_PICKED_CITY') ?? '',
			userLocation: parseJSON<UserLocation>(
				localStorage.getItem('LOCATIONS_USER_LOCATION') ?? '{}'
			)
		};
	},
	getters: {},
	actions: {
		pickCountry(country: string) {
			if (this.pickedCountry === country) {
				return;
			}
			this.pickCity('');

			this.pickedCountry = country;
			if (process.client) {
				localStorage.setItem('LOCATIONS_PICKED_COUNTRY', country);
			}

			this.loadCitiesByCountry(country);
		},

		pickCity(city: string) {
			this.pickedCity = city;
			if (process.client) {
				localStorage.setItem('LOCATIONS_PICKED_CITY', city);
			}
		},

		async loadCountries() {
			if (this.countries.length) {
				return;
			}

			this.countries = await getCountries();

			if (process.client) {
				localStorage.setItem('LOCATIONS_COUNTRIES', JSON.stringify(this.countries));
			}
		},
		async loadCitiesByCountry(country: string) {
			if (this.citiesByCountry[country]) {
				this.cities = this.citiesByCountry[country];
				return;
			}

			if (!this.countries.find((x) => x === country)) {
				return;
			}

			const cities = await getCitiesByCountry(country);

			if (cities) {
				this.citiesByCountry[country] = cities;
				this.cities = this.citiesByCountry[country] || [];
				this.citiesByCountry = { ...this.citiesByCountry };
				localStorage.setItem(
					'LOCATIONS_CITIES_BY_COUNTRY',
					JSON.stringify(this.citiesByCountry)
				);
				localStorage.setItem('LOCATIONS_CITIES', JSON.stringify(cities));
			}
		},
		async init() {
			this.userLocation = await getUserLocation();
			await this.loadCountries();

			if (!this.pickedCountry) return;

			this.loadCitiesByCountry(this.pickedCountry);
			this.pickCountry(this.pickedCountry);

			if (!this.pickedCity) return;

			this.pickCity(this.pickedCity);
		}
	}
});

export { useLocationStore };
