<script setup lang="ts">
import { SeoItemTypeEnum } from '../../constants/enums/seo';
import type { PropType } from 'vue';
import type { EventOnPoster } from '../../../common/types';

defineProps({
	loading: {
		type: Boolean,
		default: false
	},
	events: {
		type: Array as PropType<EventOnPoster[]>,
		default: () => []
	}
});
</script>
<template>
	<ul
		v-if="events && events.length"
		class="cards-list"
	>
		<li
			v-for="event in events"
			:key="event.id"
			class="cards-list__item"
			itemscope
			:itemtype="SeoItemTypeEnum.EVENT"
		>
			<SearchEventPreviewCard :event-data="event" />
			<!-- <HomeAdCard v-else :ad-data="event" class="ad-block" /> -->
		</li>
	</ul>
</template>
<style lang="less" scoped>
.cards-list {
	display: grid;
	grid-template-columns: 1fr;

	row-gap: 20px;
	width: 100%;

	@media (max-width: 768px) {
	}

	@media (min-width: 768px) {
		grid-template-columns: 1fr 1fr;
		row-gap: 40px;
		column-gap: 14px;
		padding-left: var(--padding-side);
		padding-right: var(--padding-side);
	}

	@media (min-width: 1440px) {
		grid-template-columns: 1fr 1fr 1fr;
		column-gap: 20px;
	}

	&__item {
		@media (min-width: 768px) {
			display: flex;
			width: 100%;
			height: auto;
		}

		@media (min-width: 1440px) {
			display: flex;
			width: 100%;
			min-height: 100%;
		}
	}
}
</style>
