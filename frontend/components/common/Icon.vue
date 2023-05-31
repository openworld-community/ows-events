<script setup lang="ts">
import { computed } from 'vue';
import { IconDefault } from '@/constants/defaultValues/icon';

const props = defineProps({
	name: {
		type: String,
		required: true
	},
	color: {
		type: String,
		default: null
	},
	width: { type: [String, Number], default: IconDefault.WIDTH },
	height: { type: [String, Number], default: IconDefault.HEIGHT }
});

const symbolId = computed(() => `#${props.name}`);
</script>

<template>
	<svg
		aria-hidden="true"
		:width="props.width"
		:height="props.height"
	>
		<use
			:href="symbolId"
			:fill="color"
		/>
	</svg>
</template>

<style scoped lang="less">
svg {
	pointer-events: none;
	fill: var(--color-text-main);
}
</style>
