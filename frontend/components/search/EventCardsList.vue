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
	display: flex;
	flex-direction: column;

	width: 100%;

	@media (max-width: 768px) {
		gap: 20px;
	}

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
