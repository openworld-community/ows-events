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
		list: string[] | { [key: string]: string }[];
		multiple: boolean;
		type: string;
		showKey: string;
		returnKey: string;
	};
	filters: {
		country: Country;
		city: City;
		searchLine: string;
		tags: Tag[];
		startDate: number | string,
		endDate: number | string
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
				tags:
					getFirstQuery(route.query.tags)
						.split(', ')
						.filter((item) => item !== '') ?? [],
				startDate: getFirstQuery(route.query.startDate) ?? '',
				endDate: getFirstQuery(route.query.endDate) ?? '',
			},
			filteredEvents: [],
			modal: {
				show: false,
				list: [],
				multiple: false,
				type: '',
				showKey: '',
				returnKey: ''
			}
		};
	},
	getters: {},
	actions: {
		async getFilteredEvents() {
			if (process.server) return;

			// явно приводим к Date
			const startDate = new Date(this.filters?.startDate)
			const endDate = new Date(this.filters?.endDate)

			// временный костыль из-за часовых поясов на беке (крутим +1 день)
			const startDateTS = new Date(new Date(startDate).setDate(startDate.getDate() + 1))
			const endDateTS = new Date(new Date(endDate).setDate(endDate.getDate() + 1))
			
			const { data: posterEvents } = await apiRouter.filters.findEvents.useQuery({
				data: {
					query: {
						...this.filters,
						startDate: startDateTS.getTime() ? startDateTS.getTime() :  null,
						endDate: endDateTS.getTime() ? endDateTS.getTime() :  null,
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
			const { data: usedCountries } = await apiRouter.filters.getUsedCountries.useQuery({});
			if (usedCountries.value?.length) this.usedCountries = usedCountries.value;
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
