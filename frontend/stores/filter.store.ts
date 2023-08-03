import { defineStore } from 'pinia';
import type { Country, City } from '../../common/types/location';

type FilterStore = {
	_usedCountries: Set<Country[]>;
	_usedCitiesByCountry: Map<Country, City[]>;
	showModal: boolean;
	country: string;
	city: string;
	searchLine: string;
};

export const useFilterStore = defineStore('filter', {
	state: (): FilterStore => {
		return {
			_usedCountries: new Set(),
			_usedCitiesByCountry: new Map(),
			country: '',
			city: '',
			searchLine: '',
			showModal: false
		};
	},
	getters: {
		async usedCountries(state): Promise<FilterStore['_usedCountries']> {
			await (async function () {
				if (process.server) return;
				if (state._usedCountries.size) return;

				// otherwise Nuxt doesn't do request on client during initial hydration, I'm not smart enough to tell why
				await new Promise((r) => r(0));

				const { data } = await apiRouter.location.country.getUsedCountries.useQuery({});
				if (!data.value?.length) return;

				state._usedCountries = new Set(data.value);
			})();

			return state._usedCountries;
		}
	},
	actions: {
		async getUsedCitiesByCountry(country: Country) {
			await (async () => {
				if (process.server) return;
				if (!country || this._usedCitiesByCountry.get(country)) return;

				// forces Nuxt to await function calls if there are multiple of them(avoid duplication of requests)
				await new Promise((r) => r(0));

				const { data } = await apiRouter.location.country.getUsedCities.useQuery({
					data: { country }
				});

				if (!data.value) return;
				this._usedCitiesByCountry.set(country, data.value);
			})();

			return this._usedCitiesByCountry.get(country) ?? [];
		}
	}
});
