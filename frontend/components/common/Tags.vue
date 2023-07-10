<script setup lang="ts">
import { type PropType } from 'vue';

const props = defineProps({
	tags: {
		type: Array as PropType<string[]>,
		default: () => []
	},
	className: {
		type: String as PropType<string>,
		default: ''
	}
});
</script>

<template>
	<span
		v-if="props.tags?.length"
		:class="`card__price ${props.className}`"
		itemprop="offers"
		itemscope
		itemtype="https://schema.org/Offer"
	>
		{{ props.tags.join(', ') }}
	</span>
</template>
<style lang="less" scoped>
.card__price {
	min-width: 50px;
	position: absolute;
	right: 16px;
	top: 12px;

	font-size: var(--font-size-XS);
	line-height: 16px;
	text-align: center;

	border-radius: 16px;
	color: var(--color-white);
	background-color: var(--color-accent-green-dark);

	padding: 6px 10px;
	z-index: 1;
}
</style>
