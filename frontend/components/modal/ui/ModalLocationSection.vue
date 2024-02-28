<script lang="ts" setup>
import type { PropType } from 'vue';

type Type = 'column' | 'row' | 'column-row';
const props = defineProps({
	//для типа "column-row" необходимо обернуть в div айтемы, которые идут в строку
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
	<div class="body__part part">
		<h3 class="part__subtitle">
			{{ props.label }}
		</h3>
		<div :class="`part__${type}`">
			<slot name="child"></slot>
		</div>
	</div>
</template>

<style lang="less" scoped>
.part {
	display: flex;
	flex-direction: column;
	margin-bottom: 24px;

	&__subtitle {
		font-size: var(--font-size-L);
		font-weight: var(--font-weight-regular);
		margin-bottom: 12px;
	}

	&__column {
		display: flex;
		flex-direction: column;
		width: 100%;
		gap: 20px;
	}
}
</style>
