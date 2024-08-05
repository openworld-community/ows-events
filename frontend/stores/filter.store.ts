import { defineStore } from 'pinia';
import type { City } from '../../common/types/location';
import type { EventOnPoster } from '../../common/types/event';
import type { Tag } from '../../common/const/tags';

export interface FilterStore {
	usedCountries: any;
	usedCities: any;
	usedTags: string[];
	filters: {
		city: City;
		//searchLine: string;
		tags: Tag[];
		date: Date[];
	};
	filteredEvents: EventOnPoster[];
	loading: boolean;
}

export const useFilterStore = defineStore('filter', {
	state: (): FilterStore => {
		const route = useRoute();
		return {
			usedCities: [],
			usedCountries: [],
			usedTags: [],
			filters: {
				city: getFirstQuery(route.query.city) ?? '',
				//	searchLine: getFirstQuery(route.query.search) ?? '',
				tags:
					getFirstQuery(route.query.tags)
						.split(', ')
						.filter((item) => item !== '') ?? [],
				date: [
					getDateFromQuery(getFirstQuery(route.query.startDate)) ?? undefined,
					getDateFromQuery(getFirstQuery(route.query.endDate)) ?? undefined
				]
			},
			filteredEvents: undefined,
			loading: false
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
			const { $i18n } = useNuxtApp();
			const lang = $i18n.locale.value;
			const { data: usedCitiesIntern } = await apiRouter.filters.getUsedCities.useQuery({});
			//	console.log('USED_CITIES', usedCities);
			//	this.usedCities = usedCitiesIntern.value;
			this.usedCities = usedCitiesIntern.value
				.reduce((acc, rec) => {
					acc = [...acc, ...rec.cities];

					return acc;
				}, [])
				.map((objCity) => {
					return { value: objCity['en'], label: objCity[lang] };
				});

			this.usedCountries = usedCitiesIntern.value.map((obj) => {
				return {
					value: obj['en'],
					label: obj[lang]
				};
			});

			//	if (usedCities.length) this.usedCities = usedCities;
			const { data: usedTags } = await apiRouter.filters.getUsedTags.useQuery({});

			if (usedTags.value?.length) {
				usedTags.value.sort((a, b) => b.length - a.length);
				this.usedTags = usedTags.value;
			}
		}
	}
});
