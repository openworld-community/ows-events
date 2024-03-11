<script setup lang="ts">
import type { PropType } from 'vue';
import { type TagList } from '../../../common/const/tags';

defineProps({
	tagList: {
		type: Array as PropType<TagList>,
		required: true
	},
	tagSize: {
		type: String as PropType<'standard' | 'small'>,
		default: 'standard'
	}
});
</script>

<template>
	<ul class="tag-list">
		<li
			v-for="tag in tagList"
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
