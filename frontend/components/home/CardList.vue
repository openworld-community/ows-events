<script setup lang="ts">
import { SeoItemTypeEnum } from '../../constants/enums/seo';
const { t } = useI18n();
const mobile = inject('mobile');
const filterStore = useFilterStore();

const countries = {
	en: {
		ME: 'Montenegro',
		RS: 'Serbia'
	},
	ru: {
		ME: 'Черногория',
		RS: 'Сербия'
	}
};

const { locale } = useI18n();

import { useFilterStore } from '~/stores/filter.store';
</script>
<template>
	<div class="cards">
		<div
			v-if="filterStore.loading"
			class="loader"
		>
			<CommonUiLoadSpinner
				color="#48c78e"
				:size="mobile ? 'middle' : 'big'"
			/>
		</div>
		<div
			v-if="
				filterStore.filteredEvents &&
				filterStore.filteredEvents.length === 0 &&
				!filterStore.loading
			"
			class="no-results"
		>
			<span>{{ t('event.filteredEvents.no_events_found') }}</span>
		</div>
		<h2
			v-if="filterStore.filteredEvents && filterStore.filteredEvents.length"
			class="cards__heading cards__heading--up"
		>
			{{ t('home.headings.up', { country: `${countries[locale]['RS']}` }) }}
			&nbsp;&nbsp;|&nbsp;&nbsp;
			{{ t('home.headings.up', { country: `${countries[locale]['ME']}` }) }}
		</h2>

		<ul
			v-if="filterStore.filteredEvents && filterStore.filteredEvents.length"
			class="cards__list"
		>
			<li
				v-for="event in filterStore.filteredEvents"
				:key="event.id"
				class="cards__list-item"
				itemscope
				:itemtype="SeoItemTypeEnum.EVENT"
			>
				<HomeEventPreviewCard :event-data="event" />
				<!-- <HomeAdCard v-else :ad-data="event" class="ad-block" /> -->
			</li>
		</ul>
		<h2
			v-if="filterStore.filteredEvents && filterStore.filteredEvents.length"
			class="cards__heading cards__heading--down"
		>
			{{ t('home.headings.down', { country: `${countries[locale]['RS']}` }) }}
			&nbsp;&nbsp;|&nbsp;&nbsp;
			{{ t('home.headings.down', { country: `${countries[locale]['ME']}` }) }}
		</h2>
	</div>
</template>
<style lang="less" scoped>
.no-results {
	display: flex;
	width: 100%;
	justify-content: center;
	align-items: center;

	font-size: 24px;
}

.cards {
	position: relative;
	padding-top: 32px;
	@media (min-width: 768px) {
		padding-top: 60px;
	}

	&__heading {
		@media (max-width: 768px) {
			font-size: var(--font-size-ML);
			margin-left: 11px;
			letter-spacing: -0.3;
		}
		@media (min-width: 768px) {
			padding-left: var(--padding-side);
			padding-right: var(--padding-side);
			margin-bottom: 28px;
			font-weight: 600;
		}

		&--up {
			margin-bottom: 20px;

			@media (min-width: 768px) {
				margin-bottom: 28px;
			}

			@media (min-width: 768px) {
				margin-bottom: 30px;
			}
		}
		&--down {
			margin-top: 30px;
			@media (min-width: 1440px) {
				margin-top: 70px;
			}
		}
	}

	&__list {
		display: flex;
		flex-direction: column;
		width: 100%;

		@media (min-width: 768px) {
			flex-direction: row;
			flex-wrap: wrap;
			padding-left: var(--padding-side);
			padding-right: var(--padding-side);
		}

		&-item {
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
}
.loader {
	display: flex;
	width: 100%;
	justify-content: center;
	align-items: center;

	position: absolute;
	top: 0px;
	left: 0px;
	z-index: 10;
	@media (min-width: 768px) {
		top: 8px;
	}
}
</style>
