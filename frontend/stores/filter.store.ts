import { defineStore } from 'pinia';
import type { City, Country } from '../../common/types/location';
import type { EventOnPoster } from '../../common/types/event';
import type { Tag } from '../../common/const/tags';
import { getFirstDateFromFilters, getSecondDateFromFilters } from '~/utils/dates';
import { RouteNameEnum } from '~/constants/enums/route';

export type LocaleKey = 'en' | 'ru';

export type UsedCitiesInternType = { [key in LocaleKey]: City }[];

export interface FilterStore {
	usedCountries: { label: string; value: string }[];
	usedCities: { label: string; value: string }[];
	usedTags: string[];
	filters: {
		//	city: City;
		//searchLine: string;
		tags: Tag[];
		date: Date[];
	};
	filteredEvents: EventOnPoster[];
	loading: boolean;
}

const getTagsFromQuery = (queryTags: string | undefined, routeName: string) => {
	if (routeName !== RouteNameEnum.HOME) return [];
	if (!queryTags) return [];
	getFirstQuery(routeName)
		.split(', ')
		.filter((item) => item !== '');
};

export const useFilterStore = defineStore('filter', {
	state: (): FilterStore => {
		const route = useRoute();
		return {
			usedCities: [],
			usedCountries: [],
			usedTags: [],
			filters: {
				//	city: getFirstQuery(route.query.city) ?? '',
				//	searchLine: getFirstQuery(route.query.search) ?? '',
				tags: getTagsFromQuery(getFirstQuery(route.query.tags), route.name as string),
				date: [
					getDateFromQuery(
						getFirstQuery(route.query.startDate),
						getRouteName(route.name as string)
					) ?? undefined,
					getDateFromQuery(
						getFirstQuery(route.query.endDate),
						getRouteName(route.name as string)
					) ?? undefined
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

			// начало ивента считаем от 00:00:00, конец от 23:59:59

			const { data: posterEvents } = await apiRouter.filters.findEvents.useQuery({
				data: {
					query: {
						...this.filters,
						startDate: getFirstDateFromFilters(this.filters?.date[0]),
						endDate: getSecondDateFromFilters(this.filters?.date[1])
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
			this.usedCities = usedCitiesIntern.value.map((objCity) => {
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
