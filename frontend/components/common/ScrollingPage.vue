<script setup lang="ts">
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css';
import { useListStore } from '~/stores/list.store';
import type { EventOnPoster } from '../../../common/types';

const listSrore = useListStore();

const emit = defineEmits(['loadItems']);

const props = defineProps({
	// массив с данными для отрисовки списка
	items: {
		type: Array as PropType<EventOnPoster[] | null>,
		required: true
	},
	// минимальный размер карточки
	minItemSize: {
		type: Number as PropType<number>,
		required: true
	},
	// буффер для подгрузки карточек. если меньше 400 - не успевает за скроллом
	buffer: {
		type: Number as PropType<number>,
		default: 400
	},
	isPageMode: {
		type: Boolean as PropType<boolean>,
		default: true
	},
	// дистанция, по достижении которой будут подгружаться новые карточки
	distance: {
		type: Number as PropType<number>,
		required: true
	},
	// зависимости размера карточки. следит внутри items за переданными параметрами
	sizeDependencies: {
		type: Array as PropType<string[]>,
		required: true
	},
	// приходит из бд. если false, то страниц с ивентами в БД нет
	hasNextPage: {
		type: Boolean as PropType<boolean>,
		required: true
	}
});

const listSelector = ref<HTMLElement | null>(null);

watch(
	() => listSrore.needScrollList,
	() => {
		if (listSrore.needScrollList && listSelector.value) {
			listSelector.value.scrollTo({ top: 0, behavior: 'smooth' });
			listSrore.needScrollList = false;
		}
	}
);

const hasNextPage = toRef(props.hasNextPage);

watch(
	() => props.hasNextPage,
	() => {
		hasNextPage.value = props.hasNextPage;
	}
);

useInfiniteScroll(
	listSelector,
	() => {
		if (hasNextPage.value) {
			emit('loadItems');
		}
	},
	{ distance: props.distance }
);

const sizeDependenciesFormatter = (item: Record<string, any>): Array<string> => {
	return props.sizeDependencies.map((dependency: string) => {
		let value;
		dependency.includes('.')
			? (value = dependency.split('.').reduce((obj, key) => obj?.[key], item))
			: (value = item[dependency]);
		return value;
	});
};
</script>

<template>
	<div
		ref="listSelector"
		class="scroll-list"
	>
		<DynamicScroller
			:items="items"
			:min-item-size="minItemSize"
			:buffer="buffer"
			:page-mode="isPageMode"
			class="scroll-list__content"
		>
			<template #before>
				<slot name="stable"></slot>
			</template>
			<template
				v-if="items ? items.length > 0 : null"
				#default="{ item, index, active }"
			>
				<DynamicScrollerItem
					:item="item"
					:data-index="index"
					:active="active"
					:size-dependencies="sizeDependenciesFormatter(item)"
				>
					<slot
						name="dynamic"
						:item="item"
					>
					</slot>
				</DynamicScrollerItem>
			</template>
		</DynamicScroller>
	</div>
</template>

<style lang="less" scoped>
.scroll-list {
	width: 100%;
	overflow-y: auto;
	height: calc(100dvh - var(--header-height));

	&__content {
		max-width: 480px;
		display: flex;
		flex-direction: column;
		width: 100%;
		margin-right: auto;
		margin-left: auto;
	}
}
</style>
