import { defineStore } from 'pinia';
import type { UserLocation } from '../../common/types/location';

export type City = string;
export type Country = string;
type LocationStore = {
	_countries: Set<Country>;
	_usedCountries: Set<Country>;
	_citiesByCountry: Map<Country, City[]>;
	_usedСitiesByCountry: Map<Country, City[]>;
	userLocation: UserLocation;
};

const COUNTRIES_KEY = 'COUNTRIES';
const USED_COUNTRIES_KEY = 'USED_COUNTRIES';

const sortCitiesByCapital = (cities: string[], country: string): string[] => {
	if (country === 'Serbia') {
		return [
			'Belgrade',
			'Niš',
			'Novi Sad',
			...cities.filter((city) => city !== 'Belgrade' && city !== 'Niš' && city !== 'Novi Sad')
		];
	}

	return cities;
};

export const useLocationStore = defineStore('location', {
	state: (): LocationStore => {
		return {
			_countries: new Set(),
			_usedCountries: new Set(),
			_citiesByCountry: new Map(),
			_usedСitiesByCountry: new Map(),
			userLocation: {}
		};
	},
	getters: {
		countries(state): LocationStore['_countries'] {
			(async function () {
				if (process.server) return;
				if (state._countries.size) return;

				// otherwise Nuxt doesn't do request on client during initial hydration, I'm not smart enough to tell why
				await new Promise((r) => r(0));

				const { $locationStoreForage } = useNuxtApp();
				const localCountries: Country[] | null = await $locationStoreForage.getItem(
					COUNTRIES_KEY
				);
				if (localCountries) {
					state._countries = new Set(localCountries);
					return;
				}

				const { data } = await apiRouter.location.country.getAll.useQuery({});

				if (!data.value) return;
				state._countries = new Set(data.value);
				// data.value is Proxy which can't copied to storage directly - spread operator converts back to native object
				$locationStoreForage.setItem(COUNTRIES_KEY, [...data.value]);
			})();
			return state._countries;
		},
		usedCountries(state): LocationStore['_usedCountries'] {
			(async function () {
				if (process.server) return;
				if (state._usedCountries.size) return;

				// otherwise Nuxt doesn't do request on client during initial hydration, I'm not smart enough to tell why
				await new Promise((r) => r(0));

				const { data } = await apiRouter.location.country.getAll.useQuery({});

				state._usedCountries = new Set(data.value);
			})();

			return state._usedCountries;
		}
	},
	actions: {
		getCitiesByCountry(country: Country) {
			(async () => {
				if (process.server) return;
				if (this._citiesByCountry.get(country) || !this.countries.has(country)) return;

				const { $locationStoreForage } = useNuxtApp();
				const localCities: City[] | null = await $locationStoreForage.getItem(country);
				if (localCities) {
					this._citiesByCountry.set(country, localCities);
					return;
				}

				const { data } = await apiRouter.location.country.getCities.useQuery({
					data: { country }
				});
				if (!data.value) return;
				this._citiesByCountry.set(country, data.value);
				// data.value is Proxy which can't copied to storage directly - spread operator converts back to native object
				$locationStoreForage.setItem(country, [...data.value]);
			})();

			return sortCitiesByCapital(this._citiesByCountry.get(country) ?? [], country);
		},
		getUsedCitiesByCountry(country: Country) {
			(async () => {
				if (process.server) return;
				if (!country || this._usedСitiesByCountry.get(country)) return;

				const { data } = await apiRouter.location.country.getUsedCities.useQuery({
					data: { country }
				});

				if (!data.value) return;
				this._usedСitiesByCountry.set(country, data.value);
			})();

			return this._usedСitiesByCountry.get(country) ?? [];
		}
	}
});
