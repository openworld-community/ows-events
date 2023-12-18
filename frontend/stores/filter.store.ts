import { defineStore } from 'pinia';
import type { Country, City } from '../../common/types/location';
import type { EventOnPoster } from '../../common/types/event';
import type { Tag } from '../../common/const/tags';

type FilterStore = {
	usedCountries: Country[];
	usedCitiesByCountry: { [key: string]: City[] };
	usedTags: { name: string; key: Tag }[];
	modal: {
		show: boolean;
		list: string[];
		type: string;
	};
	filters: {
		country: Country;
		city: City;
		searchLine: string;
		tags: Tag;
	};
	filteredEvents: EventOnPoster[];
};

export const useFilterStore = defineStore('filter', {
	state: (): FilterStore => {
		const route = useRoute();
		return {
			usedCountries: [],
			usedCitiesByCountry: {},
			usedTags: [],
			filters: {
				country: getFirstQuery(route.query.country) ?? '',
				city: getFirstQuery(route.query.city) ?? '',
				searchLine: getFirstQuery(route.query.search) ?? '',
				tags: getFirstQuery(route.query.tags) ?? ''
			},
			filteredEvents: [],
			modal: {
				show: false,
				list: [],
				type: ''
			}
		};
	},
	getters: {},
	actions: {
		async getFilteredEvents() {
			if (process.server) return;

			const tags: Tag[] = this.usedTags.reduce((acc, elem) => {
				if (elem.name === this.filters.tags) acc.push(elem.key);
				return acc;
			}, []);

			const { data: posterEvents } = await apiRouter.filters.findEvents.useQuery({
				data: {
					query: {
						country: this.filters.country,
						city: this.filters.city,
						searchLine: this.filters.searchLine,
						tags: tags
					}
				}
			});
			if (posterEvents) {
				this.filteredEvents = posterEvents.value;
			}
		},
		async getUsedFilters() {
			if (process.server) return;
			// получение usedCountries
			if (!this.usedCountries.length) {
				const { data: usedCountries } = await apiRouter.filters.getUsedCountries.useQuery(
					{}
				);
				if (usedCountries.value?.length) this.usedCountries = usedCountries.value;
			}
			// получение usedTags
			const { data: usedTags } = await apiRouter.filters.getUsedTags.useQuery({});
			if (usedTags.value?.length) {
				const { $i18n } = useNuxtApp();
				this.usedTags = usedTags.value.map((elem: string) => {
					return { key: elem, name: $i18n.t(`event.tags.${elem}`) };
				});
			}
		},
		async getUsedCitiesByCountry(country: Country) {
			if (process.server) return;
			if (!country || this.usedCitiesByCountry[country]) return;
			const { data } = await apiRouter.filters.getUsedCities.useQuery({
				data: { country }
			});
			if (!data.value) return;
			this.usedCitiesByCountry[country] = data.value;
		}
	}
});
