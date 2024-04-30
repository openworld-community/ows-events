<script lang="ts" setup>
import type { PropType } from 'vue';

type Type = 'column' | 'row';
defineProps({
	type: {
		type: String as PropType<Type>,
		default: 'column'
	},
	label: {
		type: String,
		default: ''
	}
});
</script>

<template>
	<div :class="`block-section__${type}`">
		<slot></slot>
	</div>
</template>

<style lang="less" scoped>
.block-section {
	&__row {
		display: flex;
		width: 100%;
		gap: 16px;
	}
	&__column {
		display: flex;
		flex-direction: column;
		width: 100%;
		gap: 20px;
	}
}
</style>
