<script setup lang="ts">
import { useUserStore } from '../../stores/user.store';

const route = useRoute();

const userStore = useUserStore();

const { locale, t } = useI18n();
const mobile = inject('mobile');
import { CommonErrorsEnum } from '../../../common/const/common-errors';
import {
	declinationCountries,
	countries as supportedCountries
} from '../../../common/const/supportedCountries';

const { sendAnalytics } = useSendTrackingEvent();

const findCurrenCity = (param: string): string => {
	const englishName = transformFromQuery(param);
	const currentCity = usedLocales.value.cities.find((city) => city['en'] === englishName);
	if (!currentCity) return;

	return currentCity[locale.value];
};

const findCountryByParam = (param: string): string => {
	const englishName = transformFromQuery(param);
	const cityObjectWithCountryCode = usedLocales.value.cities.find(
		(city) => city['en'] === englishName
	);
	if (!cityObjectWithCountryCode) return '';
	const countryCode = cityObjectWithCountryCode['countryCode'];
	if (!countryCode) return '';

	const currentCountry = supportedCountries[countryCode][locale.value];
	return currentCountry;
};

const city = getFirstParam(route.params.city);
const { data: usedLocales } = await apiRouter.filters.getUsedLocations.useQuery({});

const { data: usedTags } = await apiRouter.filters.getUsedTagsByCity.useQuery({ data: { city } });

getMeta({
	title: `${t('meta.city.title.first', { city: findCurrenCity(city) })} - ${t(
		'meta.city.title.second'
	)} ${declinationCountries[findCountryByParam(city)]}`,
	description: t('meta.city.description', {
		country: declinationCountries[findCountryByParam(city)]
	})
});

const dateStart = computed(() =>
	dateFromQueryToFilter('first', getFirstQuery(route.query.startDate as string))
);
const dateEnd = computed(() => {
	return dateFromQueryToFilter('second', getFirstQuery(route.query.endDate as string));
});
const tags = computed(() =>
	getFirstQuery(route.query.tags)
		.split(', ')
		.filter((item) => item !== '')
);
const {
	data: posterEvents,
	error: errorEvents,
	pending
} = await apiRouter.filters.findEventsByCity.useQuery({
	data: {
		city,
		query: {
			tags,
			startDate: dateStart,
			endDate: dateEnd
		},
		watch: [tags.value, dateStart.value, dateEnd.value]
	}
});

if (errorEvents.value) {
	if (
		errorEvents.value.data &&
		errorEvents.value.data.message === CommonErrorsEnum.CITY_NOT_FOUND
	) {
		throw createError({
			statusCode: 404,
			data: { message: t(`errors.${CommonErrorsEnum.CITY_NOT_FOUND}`, { city: city }) }
		});
	}
}

export type Option = { label: string; value: string };

const filterCities = computed(() => {
	const englishName = transformFromQuery(city);
	const selectedCountryCode = usedLocales.value.cities.find(
		(city) => city['en'] === englishName
	)?.countryCode;
	const filtered: Option[] = usedLocales.value.cities
		.filter((objCity) => {
			return objCity.countryCode == selectedCountryCode;
		})
		.map((objCity) => {
			return { value: objCity['en'], label: objCity[locale.value] };
		})
		.filter((cityObj) => cityObj['value'] !== transformFromQuery(city));
	return filtered;
});

const filterCountriesOptions = computed(() => {
	const filtered = usedLocales.value.countries.map((countryName) => {
		return {
			['label']: supportedCountries[countryName][locale.value],
			['value']: supportedCountries[countryName]['en']
		};
	});

	return filtered;
});

useHead({
	script: [
		posterEvents.value
			? getJSONEventList(posterEvents.value, locale.value, route.path)
			: undefined
	]
});

watch(
	() => route.query,
	(value) => {
		if (Object.keys(value).length) {
			sendAnalytics.search({
				search_term: route.fullPath.split('?')[1],
				tags: value.tags ? getFirstQuery(value.tags) : ''
			});
		}
	},
	{ deep: true }
);
</script>
<template>
	<main class="citi-page">
		<FiltersHeroWrap :title="$t('city.title', { city: findCurrenCity(city) })">
			<FiltersWrapper
				:current-city="findCurrenCity(city)"
				:tag-list="usedTags"
				:filter-cities="filterCities"
				:filter-countries="filterCountriesOptions"
				:current-country="findCountryByParam(city)"
			/>
		</FiltersHeroWrap>

		<SearchCardsWrapper>
			<SearchLoader
				v-if="pending"
				:size="mobile ? 'middle' : 'big'"
			/>
			<SearchNotFound
				v-if="!pending && !posterEvents"
				:title="$t('event.filteredEvents.no_events_found')"
			/>
			<SearchEventCardsList
				v-if="posterEvents && posterEvents.length !== 0"
				:events="posterEvents"
			/>
			<SearchHeading
				v-if="posterEvents && posterEvents.length !== 0"
				position="down"
				:title="
					$t('city.heading', {
						city: findCurrenCity(city),
						country: findCountryByParam(city)
					})
				"
			/>
		</SearchCardsWrapper>
		<CommonCreateButton :is-authorized="userStore.isAuthorized" />
	</main>
</template>

<style lang="less" scoped>
.city-page {
	//tag main has padding in global
	flex-grow: 1;
	padding-top: var(--header-height);

	@media (max-width: 768px) {
		padding-top: var(--header-height);
	}
	@media (min-width: 768px) {
		padding-top: 0px;
	}
}
</style>
