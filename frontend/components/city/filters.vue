<script setup lang="ts">
import dayjs from 'dayjs';
import { useFilterStore } from '../../stores/filter.store';
import type { TagList } from '../../../common/const/tags';

const route = useRoute();
const mobile = inject('mobile');

const filterStore = useFilterStore();

defineProps({
	tagList: {
		type: Array as PropType<TagList>,
		required: true
	}
});

const belg = 'belgrade';
const nov = 'novisad';
const podg = 'podgoritsa';
const dates = ref([
	getDateFromQuery(getFirstQuery(route.query.startDate)) ?? undefined,
	getDateFromQuery(getFirstQuery(route.query.endDate)) ?? undefined
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
		alert(JSON.stringify(val.value[0]));
		await navigateTo({
			query: {
				...route.query,
				dam: 'tyu',
				startDate: dayjs(val.value[0]).format('YYYY-MM-DD'),
				endDate: dayjs(val.value[1]).format('YYYY-MM-DD')
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
