<script setup lang="ts">
import { SeoItemTypeEnum } from '../../constants/enums/seo';
const route = useRoute();

const { locale, t } = useI18n();
const mobile = inject('mobile');
import { countries as supportedCountries } from '../../../common/const/supportedCountries';

const findCurrenCity = (param: string): string => {
	const englishName = transformFromQuery(param);
	const currentCity = usedCities.value.find((city) => city['en'] === englishName);
	if (!currentCity) return;

	return currentCity[locale.value];
};

const findCountryByParam = (param: string): string => {
	const englishName = transformFromQuery(param);
	const countryCode = usedCities.value.find((city) => city['en'] === englishName)['countryCode'];
	if (!countryCode) return '';

	const currentCountry = supportedCountries[countryCode][locale.value];
	return currentCountry;
};
//change
getMeta({
	title: `${t('meta.default_title.first')} | ${t('meta.default_title.second')}`
});

const { data: usedCities } = await apiRouter.filters.getUsedCities.useQuery({});

const { data: usedTags } = await apiRouter.filters.getUsedTags.useQuery({});

const city = computed(() => route.params.city as string);

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
		city: city.value,
		query: {
			tags,
			startDate: dateStart,
			endDate: dateEnd
		},
		watch: [tags.value, dateStart.value, dateEnd.value]
	}
});

if (errorEvents.value) {
	throw createError({
		statusCode: 404,
		data: { message: t('errors.NOT_FOUND_BY_ID', { city: city }) }
	});
}

export type Option = { label: string; value: string };

const filterCities = computed(() => {
	const filtered: Option[] = usedCities.value
		.map((objCity) => {
			return { value: objCity['en'], label: objCity[locale.value] };
		})
		.filter((cityObj) => cityObj['value'] !== transformFromQuery(city.value));
	return filtered;
});
</script>
<template>
	<main
		class="citi-page"
		itemscope
		:itemtype="SeoItemTypeEnum.EVENT"
	>
		<FiltersHeroWrap :title="$t('city.title', { city: findCurrenCity(city).toUpperCase() })">
			<FiltersContent
				:current-city="findCurrenCity(city)"
				:tag-list="usedTags"
				:filter-cities="filterCities"
			/>
		</FiltersHeroWrap>

		<pre>{{ errorEvents }}</pre>

		<SearchCardsWrapper>
			<SearchLoader
				v-if="pending"
				:size="mobile ? 'middle' : 'big'"
			/>
			<SearchNotFound
				v-if="!pending && posterEvents && posterEvents.length === 0"
				:title="$t('event.filteredEvents.no_events_found')"
			/>
			<SearchEventCardsList :events="posterEvents" />
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
