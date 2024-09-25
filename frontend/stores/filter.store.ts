import { defineStore } from 'pinia';
import type { City, Country } from '../../common/types/location';
import type { EventOnPoster } from '../../common/types/event';
import { countries as supportedCountries } from '../../common/const/supportedCountries';
import type { Tag } from '../../common/const/tags';
import { getDateFromFilters } from '~/utils/dates';
import { RouteNameEnum } from '~/constants/enums/route';

export type LocaleKey = 'en' | 'ru';

export type usedCitiesKeys = LocaleKey | 'countryCode';

type CitiesType = {
	[key in LocaleKey]: City;
};
type CountriesPartType = {
	['countryCode']: Country;
};

export type UsedCitiesInternType = CitiesType & CountriesPartType[];

export type UsedLocationType = {
	countries: Country[];
	cities: UsedCitiesInternType;
};

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
						startDate: getDateFromFilters('first', this.filters?.date[0]),
						endDate: getDateFromFilters('second', this.filters?.date[1])
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
			const { data: usedLocations } = await apiRouter.filters.getUsedLocations.useQuery({});
			//	console.log('USED_CITIES', usedCities);
			//	this.usedCities = usedCitiesIntern.value;
			this.usedCities = usedLocations.value.cities.map((objCity) => {
				return { value: objCity['en'], label: objCity[lang] };
			});

			this.usedCountries = usedLocations.value.countries.map((countryName) => {
				return {
					['label']: supportedCountries[countryName][lang],
					['value']: supportedCountries[countryName]['en']
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
