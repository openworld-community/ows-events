<script setup lang="ts">
import { computed, PropType } from 'vue';
import { IconDefaultParams } from '@/constants/defaultValues/icon';

const props = defineProps({
	name: {
		type: String as PropType<string>,
		required: true
	},
	color: {
		type: String as PropType<string>,
		default: 'var(--color-input-field)'
	},
	width: {
		type: [String, Number] as PropType<string | number>,
		default: IconDefaultParams.WIDTH
	},
	height: {
		type: [String, Number] as PropType<string | number>,
		default: IconDefaultParams.HEIGHT
	}
});

const symbolId = computed(() => `#${props.name}`);
</script>

<template>
	<svg
		aria-hidden="true"
		:width="props.width"
		:height="props.height"
	>
		<use :href="symbolId" />
	</svg>
</template>

<style scoped lang="less">
svg {
	pointer-events: none;
	color: v-bind('color');
}
</style>
