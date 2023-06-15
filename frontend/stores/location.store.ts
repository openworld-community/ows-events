import { defineStore } from 'pinia';
import type { UserLocation } from '../../common/types/location';

export type City = string;
export type Country = string;
type LocationStore = {
	_countries: Set<Country>;
	_citiesByCountry: Map<Country, City[]>;
	userLocation: UserLocation;
};

const COUNTRIES_KEY = 'COUNTRIES';

export const useLocationStore = defineStore('location', {
	state: (): LocationStore => {
		return {
			_countries: new Set(),
			_citiesByCountry: new Map(),
			userLocation: {}
		};
	},
	getters: {
		countries(state): LocationStore['_countries'] {
			(async function () {
				if (state._countries.size) return;

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
		}
	},
	actions: {
		getCitiesByCountry(country: Country) {
			(async () => {
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

			return this._citiesByCountry.get(country);
		}
	}
});
