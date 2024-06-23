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
	<div class="event-info-title">
		<h1
			class="event-info-title__title"
			:itemprop="SeoItempropEventEnum.NAME"
		>
			{{ title }}
		</h1>
		<CommonButton
			v-if="!mobile && isShowFavourites"
			is-icon
			is-round
			:icon-name="iconName"
			:alt="altContent"
			@click="emit('toggleFavourites')"
		/>
	</div>
</template>

<style lang="less" scoped>
.event-info-title {
	display: flex;
	width: 100%;
	margin-bottom: 10px;

	&__title {
		word-wrap: break-word;
		font-size: var(--font-size-L);
		font-weight: var(--font-weight-bold);
		line-height: 24px;

		@media (min-width: 768px) {
			font-size: var(--font-size-XXL);
			line-height: 36px;
			margin-bottom: 12px;
			margin-right: 16px;
		}
	}
}
</style>
