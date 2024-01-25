<script setup lang="ts">
import type { PropType } from 'vue';
import { type Tag, type TagList, Tags } from '../../../common/const/tags';

const props = defineProps({
	tagList: {
		type: Array as PropType<TagList>,
		required: true
	},
	tagSize: {
		type: String as PropType<'standard' | 'small'>,
		default: 'standard'
	}
});

const tags = computed(() => props.tagList.filter((el: Tag) => el !== Tags.ONLINE));
</script>

<template>
	<ul class="tag-list">
		<li
			v-for="tag in tags"
			:key="tag"
		>
			<CommonUiTag
				:tag-key="tag"
				:size="tagSize"
			/>
		</li>
	</ul>
</template>

<style scoped lang="less">
.tag-list {
	display: flex;
	width: 100%;
	align-items: center;
	flex-wrap: wrap;
	gap: 8px;

	@media (min-width: 1440px) {
		gap: 12px;
	}
}
</style>