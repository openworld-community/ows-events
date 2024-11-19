<script setup lang="ts">
import { SeoItempropEventEnum } from '../../../constants/enums/seo';
const mobile = inject<boolean>('mobile');
const emit = defineEmits(['toggleFavourites']);
defineProps({
	isShowFavourites: {
		type: Boolean,
		default: false
	},
	title: {
		type: String,
		default: ''
	},
	isInFavourites: {
		type: Boolean,
		default: false
	}
});
</script>

<template>
	<div class="event-info-title">
		<h2
			class="event-info-title__title"
			:itemprop="SeoItempropEventEnum.NAME"
		>
			{{ title }}
		</h2>
		<CommonLikeButton
			v-if="!mobile && isShowFavourites"
			:is-in-favourites="isInFavourites"
			@click="emit('toggleFavourites')"
		/>
	</div>
</template>

<style lang="less" scoped>
.event-info-title {
	display: flex;
	width: 100%;
	margin-bottom: 10px;
	align-items: start;

	&__title {
		word-break: break-all;

		@media (min-width: 768px) {
			margin-bottom: 12px;
			margin-right: 16px;
		}
	}
}
</style>
