<script setup lang="ts">
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css';
import { useListStore } from '~/stores/list.store';
import type { EventOnPoster } from '../../../common/types';

const listStore = useListStore();

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
	},
	prerender: {
		type: Number as PropType<number>,
		required: true 
	}
});

const listSelector = ref<HTMLElement | null>(null);
const hasNextPage = ref(props.hasNextPage);

watch(
	() => props.hasNextPage,
	() => {
		hasNextPage.value = props.hasNextPage;
	}
);

watch(
	() => listStore.needScrollList,
	() => {
		if (listStore.needScrollList) {
			const actions = {
				NONE: () => {},
				HEADER: () => listSelector.value?.scrollTo({ top: 0, behavior: 'smooth' }),
				INDEX: async () => {
					await nextTick();
					listSelector.value?.scrollTo({ top: listStore.scrollTop });
				}
			};

			const action = actions[listStore.lastAction];

			if (action) {
				action();
			}

			listStore.$patch({
				needScrollList: false,
				lastAction: 'NONE'
			});
		}
	}
);

const debouncedScrollUpdate = useDebounceFn((e) => {
	listStore.$patch({
		scrollTop: e.target?.scrollTop
	});
}, 300);

useInfiniteScroll(
	listSelector,
	() => {
		if (hasNextPage.value) emit('loadItems');
	},
	{ distance: props.distance }
);

interface NestedEventOnPoster {
	[key: string]: string;
}

const sizeDependenciesFormatter = (item: NestedEventOnPoster): Array<string> => {
	return props.sizeDependencies.map((dependency: string) => {
		let str: string;
		dependency.includes('.')
			? (str = dependency.split('.').reduce((obj: any, key: string) => obj[key], item))
			: (str = item[dependency]);
		if (typeof str === 'object') {
			throw new Error(`Property ${dependency} is an object and can't be converted to string`);
		}
		return str;
	});
};
</script>

<template>
	<div
		ref="listSelector"
		class="scroll-list"
		@scroll="debouncedScrollUpdate"
	>
		<DynamicScroller
			:items="items"
			:min-item-size="minItemSize"
			:buffer="buffer"
			:page-mode="isPageMode"
			:prerender="prerender"
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
	height: calc(100vh - var(--header-height));
	@supports (-webkit-touch-callout: none) {
		height: -webkit-fill-available;
	}

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
