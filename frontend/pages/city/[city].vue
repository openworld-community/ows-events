<script setup lang="ts">
import { useUserStore } from '../../stores/user.store';
import {
	declinationCountries,
	countries as supportedCountries
} from '../../../common/const/supportedCountries';

const route = useRoute();

const userStore = useUserStore();

const { locale, t } = useI18n();
const mobile = inject('mobile');

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

const config = useRuntimeConfig();

const city = getFirstParam(route.params.city);
const { data: usedLocales } = await apiRouter.filters.getUsedLocations.useQuery({});

const { data: usedTags } = await apiRouter.filters.getUsedTagsByCity.useQuery({ data: { city } });

useHead({
	link: [
	{
			rel: 'canonical',
			href: `https://${config.public.domain}/ru`
		},
	]
})

getMeta({
	title: `${t('meta.city.title.first', { city: findCurrenCity(city) })} - ${t(
		'meta.city.title.second'
	)} ${declinationCountries[findCountryByParam(city)]}`,
	description: t('meta.city.description', {
		country: declinationCountries[findCountryByParam(city)]
	})
});

const tags = computed(() =>
	getFirstQuery(route.query.tags)
		.split(', ')
		.filter((item) => item !== '')
);

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
	<main class="city-page">
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
			<!--			<SearchEventCardsList-->
			<!--				v-if="posterEvents && posterEvents.length !== 0"-->
			<!--				:events="posterEvents"-->
			<!--			/>-->
			<div class="city-page__divider"></div>
			<SearchPaginationCity />
			<!-- <SearchHeading
				v-if="posterEvents && posterEvents.length !== 0"
				position="down"
				:title="
					$t('city.heading', {
						city: findCurrenCity(city),
						country: findCountryByParam(city)
					})
				"
			/> -->
		</SearchCardsWrapper>
		<CommonCreateButton :is-authorized="userStore.isAuthorized" />
	</main>
</template>

<style lang="less" scoped>
.city-page {
	//tag main has padding in global
	flex-grow: 1;
	padding-top: var(--header-height);

	@media (min-width: 768px) {
		padding-top: 0px;
	}
	&__divider {
		height: 32px;
		@media (min-width: 768px) {
			height: 60px;
		}
	}
}
</style>
