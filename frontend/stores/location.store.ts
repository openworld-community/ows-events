import { defineStore } from 'pinia';
import type { UserLocation } from '../../common/types/location';
import { LOCATION_API_URL } from '../constants/url';

export type City = string;
export type Country = string;
export type Currency = string;

type LocationStore = {
	_countries: Set<Country>;
	_citiesByCountry: Map<Country, City[]>;
	_currencies: Currency[];
	userLocation: UserLocation;
};

// const COUNTRIES_KEY = 'COUNTRIES';

export const useLocationStore = defineStore('location', {
	state: (): LocationStore => {
		return {
			_countries: new Set(),
			_citiesByCountry: new Map(),
			_currencies: [],
			userLocation: {}
		};
	},
	getters: {
		countries(state): LocationStore['_countries'] {
			// Список всех стран:

			(async function () {
				if (process.server) return;

				// otherwise Nuxt doesn't do request on client during initial hydration, I'm not smart enough to tell why
				await new Promise((r) => r(0));
				//
				// 	const { $locationStoreForage } = useNuxtApp();
				// 	const localCountries: Country[] | null = await $locationStoreForage.getItem(
				// 		COUNTRIES_KEY
				// 	);
				// 	if (localCountries) {
				// 		if (!localCountries.length) return;
				// 		state._countries = new Set(localCountries);
				// 		return;
				// 	}
				//
				const { data } = await apiRouter.location.country.getAll.useQuery({});
				if (!data.value?.length) return;
				//
				state._countries = new Set(data.value);
				// 	// data.value is Proxy which can't copied to storage directly - spread operator converts back to native object
				// 	$locationStoreForage.setItem(COUNTRIES_KEY, [...data.value]);
			})();
			return state._countries;

			// // Сейчас добавляем страны вручную
			// const countries = ['Montenegro', 'Serbia'];
			//
			// state._countries = new Set(countries);
			// return state._countries;
		},
		currencies(state): LocationStore['_currencies'] {
			state._currencies = ['USD', 'EUR', 'RSD', 'BTC', 'USDT', 'USDC', 'ETH'];
			return state._currencies;
		}
	},
	actions: {
		async getUserLocation() {
			await (async () => {
				if (process.server) return;
				navigator.geolocation.getCurrentPosition(
					// if user allowed to get GEO, do this:
					async (position) => {
						try {
							const { data } = await useFetch(
								`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}`,
								{
									lazy: true,
									server: false,
									transform: (data: {
										city: string;
										countryCode: string;
										countryName: string;
									}): UserLocation => {
										return {
											code: data.countryCode,
											city: data.city,
											country: data.countryName
										};
									}
								}
							);
							if (!data.value) return;
							this.userLocation = data.value;
						} catch (error: any) {
							console.error('error: ', error.message);
						}
					},

					// if user not allowed to get his GEO
					async (error) => {
						if (error.message == 'User denied Geolocation') {
							const { data } = await useFetch(
								process.server
									? useRequestHeaders()['x-forwarded-for']
									: LOCATION_API_URL,
								{
									query: {
										key:
											import.meta.env.VITE_IPREGISTRY_API_KEY ??
											process.env.VITE_IPREGISTRY_API_KEY
									},
									baseURL: LOCATION_API_URL,
									transform: (data: {
										location: {
											city: string;
											country: { code: string; name: string };
										};
									}): UserLocation => {
										return {
											code: data.location.country.code,
											city: data.location.city,
											country: data.location.country.name
										};
									}
								}
							);
							if (!data.value) return;
							this.userLocation = data.value;
						}
					}
				);
			})();
		},
		getCitiesByCountry(country: Country) {
			(async () => {
				// 	if (process.server) return;
				if (this._citiesByCountry.get(country) || !this.countries.has(country)) return;
				//
				// forces Nuxt to await function calls if there are multiple of them(avoid duplication of requests)
				await new Promise((r) => r(0));
				//
				// 	const { $locationStoreForage } = useNuxtApp();
				// 	const localCities: City[] | null = await $locationStoreForage.getItem(country);
				// 	if (localCities) {
				// 		this._citiesByCountry.set(country, localCities);
				// 		return;
				// 	}
				//
				const { data } = await apiRouter.location.country.getCities.useQuery({
					data: { country }
				});
				if (!data.value) return;
				this._citiesByCountry.set(country, data.value);
				// 	// data.value is Proxy which can't copied to storage directly - spread operator converts back to native object
				// 	$locationStoreForage.setItem(country, [...data.value]);
			})();
			return this._citiesByCountry.get(country) ?? [];
		}
	}
});
