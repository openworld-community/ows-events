<script setup lang="ts">
import { useUserStore } from '../../stores/user.store';

const route = useRoute();

const userStore = useUserStore();

const { locale, t } = useI18n();
const mobile = inject('mobile');

import { CommonErrorsEnum } from '../../../common/const/common-errors';
import {
	declinationCountries,
	countries as supportedCountries,
	queryToCountryLocaleName,
	queryToCountryCode
} from '../../../common/const/supportedCountries';

const { sendAnalytics } = useSendTrackingEvent();

const country = getFirstParam(route.params.country);
const { data: usedLocales } = await apiRouter.filters.getUsedLocations.useQuery({});

const { data: usedTags } = await apiRouter.filters.getUsedTagsByCountry.useQuery({
	data: { country }
});

getMeta({
	title: t('meta.country.title', {
		country: declinationCountries[queryToCountryLocaleName[country][locale.value]]
	}),
	description: t('meta.country.description', {
		country: declinationCountries[queryToCountryLocaleName[country][locale.value]]
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
} = await apiRouter.filters.findEventsByCountry.useQuery({
	data: {
		country,
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
		errorEvents.value.data.message === CommonErrorsEnum.COUNTRY_NOT_FOUND
	) {
		throw createError({
			statusCode: 404,
			data: {
				message: t(`errors.${CommonErrorsEnum.COUNTRY_NOT_FOUND}`, { country: country })
			}
		});
	}
}

export type Option = { label: string; value: string };

const filterCitiesOptions = computed(() => {
	const filtered: Option[] = usedLocales.value.cities
		.filter((objCity) => {
			return !country || objCity.countryCode == queryToCountryCode[country];
		})
		.map((objCity) => {
			return { value: objCity['en'], label: objCity[locale.value] };
		});

	return filtered;
});

const filterCountriesOptions = computed(() => {
	const filtered = usedLocales.value.countries
		.map((countryName) => {
			return {
				['label']: supportedCountries[countryName][locale.value],
				['value']: supportedCountries[countryName]['en']
			};
		})
		.filter((countryOption) => countryOption.value !== transformFromQuery(country));
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
	<main class="country-page">
		<FiltersHeroWrap
			:title="
				$t('country.title', {
					country: queryToCountryLocaleName[country][locale]
				})
			"
		>
			<FiltersWrapper
				current-city=""
				:tag-list="usedTags"
				:filter-cities="filterCitiesOptions"
				:current-country="queryToCountryLocaleName[country][locale]"
				:filter-countries="filterCountriesOptions"
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
			<!--			<SearchEventCardsList-->
			<!--				v-if="posterEvents && posterEvents.length !== 0"-->
			<!--				:events="posterEvents"-->
			<!--			/>-->
			<div class="country-page__divider"></div>
			<SearchPaginationCountry />
			<!-- <SearchHeading
				v-if="posterEvents && posterEvents.length !== 0"
				position="down"
				:title="
					$t('country.heading', {
						country: queryToCountryLocaleName[country][locale]
					})
				"
			/> -->
		</SearchCardsWrapper>
		<CommonCreateButton :is-authorized="userStore.isAuthorized" />
	</main>
</template>

<style lang="less" scoped>
.country-page {
	//tag main has padding in global
	position: relative;
	flex-grow: 1;
	padding-top: var(--header-height);

	@media (max-width: 768px) {
		padding-top: var(--header-height);
	}
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
