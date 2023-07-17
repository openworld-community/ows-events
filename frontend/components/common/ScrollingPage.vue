<script setup lang="ts">
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css';
import { useListStore } from '~/stores/list.store';

const listSrore = useListStore();

const emit = defineEmits(['loadEvents']);

defineProps({
	items: {
		type: Array,
		required: true
	},
	minItemSize: {
		type: Number as PropType<number>,
		required: true
	},
	buffer: {
		type: Number as PropType<number>,
		default: 400
	},
	isPageMode: {
		type: Boolean
	},
	isEmitUpdate: {
		type: Boolean
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
		emit('loadEvents');
	},
	{ distance: 20 }
);

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

			<template #default="{ item, index, active }">
				<slot
					name="dynamic"
					:item="item"
					:index="index"
					:active="active"
				></slot>
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
