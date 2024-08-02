<script setup lang="ts">
import dayjs from 'dayjs';
import { useFilterStore } from '../../stores/filter.store';
import type { TagList } from '../../../common/const/tags';

import {
	PopoverArrow,
	PopoverClose,
	PopoverContent,
	PopoverPortal,
	PopoverRoot,
	PopoverTrigger
} from 'radix-vue';

const route = useRoute();
const mobile = inject('mobile');

const filterStore = useFilterStore();

defineProps({
	tagList: {
		type: Array as PropType<TagList>,
		default: () => []
	}
});

const belg = 'belgrade';
const nov = 'novisad';
const podg = 'podgoritsa';
const dates = ref([
	dayjs(getFirstQuery(route.query.startDate)).toDate() ?? undefined,
	dayjs(getFirstQuery(route.query.endDate)).toDate() ?? undefined
]);
const tags = ref(
	getFirstQuery(route.query.tags)
		.split(', ')
		.filter((item) => item !== '') ?? []
);

watch(
	() => tags,
	async (val) => {
		await navigateTo({
			query: {
				...route.query,
				tags: val.value.join(', ') || undefined
			}
		});
	},

	{ deep: true }
);

watch(
	() => dates,
	async (val) => {
		alert(JSON.stringify(val.value[1]));
		await navigateTo({
			query: {
				...route.query,

				startDate: val.value[0] ? dayjs(val.value[0]).format('YYYY-MM-DD') : undefined,
				endDate: val.value[1] ? dayjs(val.value[1]).format('YYYY-MM-DD') : undefined
			}
		});
	},

	{ deep: true }
);
</script>
<template>
	<CommonNavLink :to="`/city/${belg}`">Belgrade</CommonNavLink>
	<CommonNavLink :to="`/city/${nov}`">Novi Sad</CommonNavLink>
	<CommonNavLink :to="`/city/${podg}`">Podgoritsa</CommonNavLink>

	<LibraryPopover>
		<template #trigger>
			<div class="trigger-popover2">
				<span>I am trigger</span>
				<CommonIcon
					name="container"
					color="var(--color-input-icons)"
				/>
			</div>
		</template>
		<template #content>
			<div class="content-popover2">
				<CommonNavLink :to="`/city/${belg}`">Belgrade</CommonNavLink>
				<CommonNavLink :to="`/city/${nov}`">Novi Sad</CommonNavLink>
				<CommonNavLink :to="`/city/${podg}`">Podgoritsa</CommonNavLink>
			</div>
		</template>
	</LibraryPopover>

	<CommonUiDateTimepicker
		v-model="dates"
		type="date"
		:range="true"
		is-filter
		appearance="no-border"
		class="filter"
		name="date"
		:placeholder="$t(`home.filter.date.placeholder`)"
		:aria-label="$t(`home.filter.date.aria`)"
		:min-date="new Date(roundTime(Date.now(), 10))"
	/>

	<HomeCollapsible>
		<template #tags>
			<div>
				<div class="filter-tags">
					<CommonUiTag
						v-for="tagElem in tagList"
						:key="tagElem"
						v-model="tags"
						name="tags"
						:tag-key="tagElem"
						is-checkbox
						:size="mobile ? 'small' : 'standard'"
						appearance="filter"
						:aria-label="$t(`home.filter.tags.aria`)"
					/>
				</div>
			</div>
		</template>
	</HomeCollapsible>
</template>
<style lang="less" scoped>
.trigger-popover {
	width: 100%;
	min-width: 100%;
	display: flex;
	justify-content: space-between;
	height: 40px;
	border: 1px solid #dbdbdb;
	border-radius: 8px;
	background-color: #ffffff;
	font-family: var(--font-family-main);
	font-size: var(--font-size-M);
	color: var(--color-text-main);
	padding: 8px 45px 8px 12px;
}
.content-popover {
	height: 80px;
	background-color: aquamarine;
}
</style>
