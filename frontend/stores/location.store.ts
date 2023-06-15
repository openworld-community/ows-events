import { defineStore } from 'pinia';
import type { UserLocation } from '../../common/types/location';

export type City = string;
export type Country = string;
type LocationStore = {
	countries: Set<Country>;
	citiesByCountry: Map<Country, City[]>;
	userLocation: UserLocation;
};

const COUNTRIES_KEY = 'COUNTRIES';

export const useLocationStore = defineStore('location', {
	state: (): LocationStore => {
		return {
			countries: new Set(),
			citiesByCountry: new Map(),
			userLocation: {}
		};
	},
	actions: {
		async loadCountries(): Promise<void> {
			if (this.countries.size) return;

			const { $locationStoreForage } = useNuxtApp();
			const localCountries: Country[] | null = await $locationStoreForage.getItem(
				COUNTRIES_KEY
			);
			if (localCountries) {
				this.countries = new Set(localCountries);
				return;
			}

			const { data } = await apiRouter.location.country.getAll.useQuery({});
			if (!data.value) return;
			this.countries = new Set(data.value);
			// data.value is Proxy which can't copied to storage directly - spread operator converts back to native object
			$locationStoreForage.setItem(COUNTRIES_KEY, [...data.value]);
		},
		async loadCitiesByCountry(country: Country): Promise<void> {
			if (this.citiesByCountry.get(country) || !this.countries.has(country)) return;

			const { $locationStoreForage } = useNuxtApp();
			const localCities: City[] | null = await $locationStoreForage.getItem(country);
			if (localCities) {
				this.citiesByCountry.set(country, localCities);
				return;
			}

			const { data } = await apiRouter.location.country.getCities.useQuery({
				data: { country }
			});
			if (!data.value) return;
			this.citiesByCountry.set(country, data.value);
			// data.value is Proxy which can't copied to storage directly - spread operator converts back to native object
			$locationStoreForage.setItem(country, [...data.value]);
		},
		async init() {
			await this.loadCountries();
		}
	}
});
