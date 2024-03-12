import { defineStore } from 'pinia';
import type { City } from '../../common/types/location';
import type { EventOnPoster } from '../../common/types/event';
import type { Tag } from '../../common/const/tags';

type FilterStore = {
	usedCities: City[];
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
		city: City;
		searchLine: string;
		tags: Tag[];
		startDate: string | null;
		endDate: string | null;
	};
	filteredEvents: EventOnPoster[];
};

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
				startDate: getFirstQuery(route.query.startDate) ?? '',
				endDate: getFirstQuery(route.query.endDate) ?? ''
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
			const startDate = new Date(this.filters?.startDate);
			const endDate = new Date(this.filters?.endDate);

			//Приводим таймзону времени устройства юзера к миллисекундам
			// dayjs(startDate).utc(true)
			// dayjs(endDate).utc(true) можно сделать так, но понятнее не сильно становится
			const timezoneOffset = new Date().getTimezoneOffset() * 60 * 1000;

			// Перевод в UTC 0
			const startDateTS = startDate.getTime() ? startDate.getTime() - timezoneOffset : null;
			const endDateTS = endDate.getTime() ? endDate.getTime() - timezoneOffset : null;

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
				this.usedTags = usedTags.value.map((elem: string) => {
					return { key: elem, name: $i18n.t(`event.tags.${elem}`) };
				});
			}
		},
	}
});
