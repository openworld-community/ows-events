<script setup lang="ts">
import { type TagList } from '../../../common/const/tags';
const mobile = inject<boolean>('mobile');
const emit = defineEmits(['toggleFavourites']);
defineProps({
	isShowFavourites: {
		type: Boolean,
		default: false
	},
	isInFavourites: {
		type: Boolean,
		default: false
	},
	tagList: {
		type: Array as PropType<TagList>,
		required: true
	},
	iconName: {
		type: String as PropType<'heart-filled' | 'heart'>,
		default: 'heart'
	},
	altContent: {
		type: String,
		default: ''
	}
});
</script>
<template>
	<div class="event-info-tags">
		<CommonTagList
			:tag-list="tagList"
			:tag-size="mobile ? 'standard' : 'small'"
		/>

		<CommonLikeButton
			v-if="mobile && isShowFavourites"
			:is-in-favourites="isInFavourites"
			@click="emit('toggleFavourites')"
		/>
	</div>
</template>

<style lang="less" scoped>
.event-info-tags {
	display: flex;
	width: 100%;
	gap: 12px;
	margin-bottom: 12px;

	@media (min-width: 768px) {
		margin-bottom: 24px;
	}
}
</style>
