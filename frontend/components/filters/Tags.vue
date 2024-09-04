<script setup lang="ts">
import type { TagList } from '../../../common/const/tags';

const props = defineProps({
	tagList: {
		type: Array as PropType<TagList>,
		default: () => []
	},
	modelValue: {
		type: Array as PropType<string[]>,
		default: () => []
	},
	size: {
		type: String as PropType<'small' | 'standard'>,
		default: 'standart'
	}
});

const emit = defineEmits(['update:model-value']);

const model = computed({
	get() {
		return props.modelValue;
	},
	set(value) {
		emit('update:model-value', value);
	}
});
</script>
<template>
	<HomeCollapsible>
		<template #tags>
			<div>
				<div class="filter-tags">
					<CommonUiTag
						v-for="tagElem in tagList"
						:key="tagElem"
						v-model="model"
						name="tags"
						:tag-key="tagElem"
						is-checkbox
						:size="size"
						appearance="filter"
						:aria-label="$t(`home.filter.tags.aria`)"
					/>
				</div>
			</div>
		</template>
	</HomeCollapsible>
</template>

<style lang="css" scoped>
.filter-tags {
	display: flex;
	width: 100%;
	align-items: center;
	flex-wrap: wrap;
	gap: 8px;
	padding-bottom: 24px;

	@media (min-width: 1440px) {
		gap: 12px;
	}
}
</style>
