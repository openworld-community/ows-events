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
		itemscope
		:itemtype="SeoItemTypeEnum.BREADCRUMBLIST"
	>
		<li
			v-for="(event, index) in events"
			:key="event.id"
			class="cards-list__item"
			itemprop="itemListElement"
			itemscope
			:itemtype="SeoItemTypeEnum.ITEMLIST"
		>
			<SearchEventPreviewCard
				:event-data="event"
				:position="index"
			/>
			<!-- <HomeAdCard v-else :ad-data="event" class="ad-block" /> -->
			<meta
				itemprop="position"
				:content="`${index}+1`"
			/>
		</li>
	</ul>
</template>
<style lang="less" scoped>
.cards-list {
	display: grid;
	width: 100%;
	max-width: 100%;
	grid-template-columns: repeat(1, 100%);
	row-gap: 20px;

	--gap: 14px;

	@media (min-width: 768px) {
		grid-template-columns: 1fr 1fr;
		row-gap: 40px;
		column-gap: var(--gap);
		padding-left: var(--padding-side);
		padding-right: var(--padding-side);
	}

	@media (min-width: 1440px) {
		--gap: 20px;
		grid-template-columns: 1fr 1fr 1fr;
		column-gap: var(--gap);
	}

	&__item {
		width: 100%;
		@media (min-width: 768px) {
			display: flex;
			height: auto;
		}

		@media (min-width: 1440px) {
			display: flex;
			min-height: 100%;
		}
	}
}
</style>
