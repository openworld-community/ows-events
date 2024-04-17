import { defineStore } from 'pinia';
import type { City } from '../../common/types/location';
import type { EventOnPoster } from '../../common/types/event';
import type { Tag } from '../../common/const/tags';

export interface FilterStore {
	usedCities: City[];
	usedTags: { name: string; key: Tag }[];
	filters: {
		city: City;
		searchLine: string;
		tags: Tag[];
		date: string[];
	};
	filteredEvents: EventOnPoster[];
	loading: boolean;
}

export const useFilterStore = defineStore('filter', {
	state: (): FilterStore => {
		const route = useRoute();
		return {
			usedCities: [],
			usedTags: [],
			filters: {
				city: getFirstQuery(route.query.city) ?? '',
				searchLine: getFirstQuery(route.query.search) ?? '',
				tags:
					getFirstQuery(route.query.tags)
						.split(', ')
						.filter((item) => item !== '') ?? [],
				date: [
					getFirstQuery(route.query.startDate) ?? '',
					getFirstQuery(route.query.endDate) ?? ''
				]
			},
			filteredEvents: undefined,
			loading: false,
		};
	},
	getters: {},
	actions: {
		async getFilteredEvents() {
			if (process.server) return;

			// явно приводим к Date и ставим точное время для каждой из дат
			// начало ивента считаем от 00:00:00, конец от 23:59:59
			// Date.setHours(hours: number, min?: number, sec?: number, ms?: number): number
			const startDate = new Date(this.filters?.date[0]).setHours(0, 0, 0);
			const endDate = new Date(this.filters?.date[1]).setHours(23, 59, 59);

			//Приводим таймзону времени устройства юзера к миллисекундам
			// dayjs(startDate).utc(true)
			// dayjs(endDate).utc(true) можно сделать так, но понятнее не сильно становится
			const timezoneOffset = new Date().getTimezoneOffset() * 60 * 1000;

			// Перевод в UTC 0
			const startDateTS = startDate ? startDate - timezoneOffset : null;
			const endDateTS = endDate ? endDate - timezoneOffset : null;

			const { data: posterEvents } = await apiRouter.filters.findEvents.useQuery({
				data: {
					query: {
						...this.filters,
						startDate: startDateTS,
						endDate: endDateTS
					}
				}
			});

			if (posterEvents) {
				this.filteredEvents = posterEvents.value;
			}
		},
		async getUsedFilters() {
			if (process.server) return;
			const { data: usedCities } = await apiRouter.filters.getUsedCities.useQuery({});

			if (usedCities.value?.length) this.usedCities = usedCities.value;
			const { data: usedTags } = await apiRouter.filters.getUsedTags.useQuery({});

			if (usedTags.value?.length) {
				const { $i18n } = useNuxtApp();
				usedTags.value.sort((a, b) => b.length - a.length)
				this.usedTags = usedTags.value.map((elem) => {
					return { key: elem, name: $i18n.t(`event.tags.${elem}`) };
				});
			}
		}
	}
});
