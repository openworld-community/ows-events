import { defineStore } from 'pinia';
import type { Country, City } from '../../common/types/location';
import type { EventOnPoster } from '../../common/types/event';

type FilterStore = {
	usedCountries: Country[];
	usedCitiesByCountry: { [key: string]: City[] };
	modal: {
		show: boolean;
		list: string[];
		type: string;
	};
	filters: {
		country: string;
		city: string;
		searchLine: string;
	};
	filteredEvents: EventOnPoster[];
};

export const useFilterStore = defineStore('filter', {
	state: (): FilterStore => {
		const route = useRoute();
		return {
			usedCountries: [],
			usedCitiesByCountry: {},
			filters: {
				country: getFirstQuery(route.query.country) ?? '',
				city: getFirstQuery(route.query.city) ?? '',
				searchLine: getFirstQuery(route.query.search) ?? ''
			},
			filteredEvents: [],
			modal: {
				show: false,
				list: [],
				type: ''
			}
		};
	},
	getters: {
		async getUsedCitiesByCountry(state) {
			if (process.server) return;
			const country = state.filters.country;
			if (!country || state.usedCitiesByCountry?.[country]) return;
			const { data } = await apiRouter.location.country.getUsedCities.useQuery({
				data: { country }
			});
			if (!data.value) return;
			state.usedCitiesByCountry[country] = data.value;
			return state.usedCitiesByCountry;
		}
	},
	actions: {
		async getFilteredEvents() {
			if (process.server) return;
			const { data: posterEvents } = await apiRouter.events.findMany.useQuery({
				data: { query: this.filters }
			});
			if (posterEvents) {
				this.filteredEvents = posterEvents.value;
			}
		},
		async getUsedCountries() {
			if (process.server) return;
			if (this.usedCountries.length) return;
			const { data } = await apiRouter.location.country.getUsedCountries.useQuery({});
			if (!data.value?.length) return;
			this.usedCountries = data.value;

			return this.usedCountries;
		}
	}
});
