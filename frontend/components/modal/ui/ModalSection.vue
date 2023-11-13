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
	<div class="body__section section">
		<h3 class="section__subtitle">
			{{ props.label }}
		</h3>
		<div :class="`section__${type}`">
			<slot name="child"></slot>
		</div>
	</div>
</template>

<style lang="less" scoped>
.section {
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

		& > :deep(div:not(:last-child)),
		& > :deep(div > div:not(:last-child)) {
			margin-bottom: 20px;
		}
	}

	&__row {
		display: flex;
		width: 100%;

		& > :deep(div:not(:last-child)) {
			margin-right: 16px;
		}
	}

	&__column-row {
		display: flex;
		flex-direction: column;

		& > :deep(div:not(:last-child)) {
			display: flex;
			gap: 16px;
			margin-bottom: var(--space-unrelated-items);
		}
	}
}
</style>
