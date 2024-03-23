<script setup lang="ts">
import { SeoItemTypeEnum } from '../../constants/enums/seo';
import { getFirstQuery } from '../../utils/index';

import { apiRouter } from '../../composables/useApiRouter';

import { useFilterStore } from '../../stores/filter.store';

const { t } = useI18n();
const route = useRoute();

const transformFilterDate = (dateStart, dateEnd) => {
	const startDate = new Date(dateStart).setHours(0, 0, 0);
	const endDate = new Date(dateEnd).setHours(23, 59, 59);
	console.log('Query', getFirstQuery(route.query.city));
	//Приводим таймзону времени устройства юзера к миллисекундам
	// dayjs(startDate).utc(true)
	// dayjs(endDate).utc(true) можно сделать так, но понятнее не сильно становится
	const timezoneOffset = new Date().getTimezoneOffset() * 60 * 1000;

	// Перевод в UTC 0
	const startDateTS = startDate ? startDate - timezoneOffset : null;
	const endDateTS = endDate ? endDate - timezoneOffset : null;
	return { startDateTS, endDateTS };
};

const {
	data: posterEvents,
	status,
	error
} = await apiRouter.filters.findEvents.useQuery({
	data: {
		query: {
			city: getFirstQuery(route.query.city) ?? '',
			searchLine: getFirstQuery(route.query.search) ?? '',
			tags:
				getFirstQuery(route.query.tags)
					.split(', ')
					.filter((item) => item !== '') ?? [],
			startDate: transformFilterDate(
				getFirstQuery(route.query.startDate),
				getFirstQuery(route.query.endDate)
			).startDateTS,
			endDate: transformFilterDate(
				getFirstQuery(route.query.startDate),
				getFirstQuery(route.query.endDate)
			).endDateTS
		}
	}
});
</script>
<template>
	<div
		v-if="!posterEvents || (!posterEvents.length && status === 'success')"
		class="no-results"
	>
		<span>{{ t('event.filteredEvents.no_events_found') }}</span>
	</div>
	<div
		v-if="status === 'pending'"
		class="no-results"
	>
		<CommonUiLoadSpinner
			color="#48c78e"
			size="big"
		/>
	</div>
	<ul
		v-if="posterEvents"
		class="card-list"
	>
		<li
			v-for="event in posterEvents"
			:key="event.id"
			class="card-list__item"
			itemscope
			:itemtype="SeoItemTypeEnum.EVENT"
		>
			<HomeEventPreviewCard :event-data="event" />
			<!-- <HomeAdCard v-else :ad-data="event" class="ad-block" /> -->
		</li>
	</ul>
</template>
<style lang="less" scoped>
.no-results {
	display: flex;
	width: 100%;
	justify-content: center;
	align-items: center;

	font-size: 24px;
}

.card-list {
	display: flex;
	flex-direction: column;
	width: 100%;

	@media (min-width: 768px) {
		flex-direction: row;
		flex-wrap: wrap;
		padding-left: var(--padding-side);
		padding-right: var(--padding-side);
	}

	&__item {
		@media (min-width: 768px) {
			display: flex;
			width: 49.2%;
			height: auto;
			margin-bottom: 5%;
			margin-right: 1.5%;

			&:nth-child(2n) {
				margin-right: 0;
			}
		}

		@media (min-width: 1440px) {
			display: flex;
			width: 32.3%;
			min-height: 100%;
			margin-right: 0;

			&:not(:nth-child(3n)) {
				margin-right: 1.5%;
			}
		}
	}
}
</style>
