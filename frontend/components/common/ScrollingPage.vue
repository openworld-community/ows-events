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
	// если true, можно использовать событие @update на DynamicScroller, чтобы получить viewStartIndex (возможно пригодится для загрузки карточек в будущем)
	isEmitUpdate: {
		type: Boolean as PropType<boolean>,
		default: false
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
	stopInfinity: {
		type: Boolean as PropType<boolean>,
		default: false
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

useInfiniteScroll(
	listSelector,
	() => {
		if (props.stopInfinity) return;
		console.log('loadItems');
		emit('loadItems');
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

// const updateParts: Ref<{
// 	viewStartIdx: number;
// }> = ref({
// 	viewStartIdx: 0
// });

// type update = (viewStartIndex: number) => void;

// const onUpdate: update = (viewStartIndex) => {
// 	listSrore.changeViewStartIdx(viewStartIndex, false);
// 	// updateParts.value.viewStartIdx = viewStartIndex;
// };

// watch(
// 	() => updateParts.value.viewStartIdx,
// 	() => {
// 		listSrore.changeViewStartIdx(updateParts.value.viewStartIdx);
// 	}
// );
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
			:emit-update="isEmitUpdate"
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
				<!-- <slot
					name="dynamic"
					:item="item"
					:index="index"
					:active="active"
				></slot> -->
			</template>
		</DynamicScroller>
	</div>
</template>

<style lang="less" scoped>
.scroll-list {
	width: 100%;
	overflow-y: auto;
	height: calc(100vh - var(--header-height));

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
