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
	align-items: center;
	@media (min-width: 768px) {
		gap: 16px;
	}

	&__title {
		word-wrap: break-word;
		word-break: break-word;
	}
}
</style>
