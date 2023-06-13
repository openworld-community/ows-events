<script lang="ts" setup>

const props = defineProps({
	type: {
		type: String,
		default: 'column'
	},
	label: {
		type: String,
		default: ''
	},
});

</script>

<template>
	<div
			class="body__section section"
	>
		<h3 class="section__subtitle">
			{{ props.label }}
		</h3>
		<div :class="type === 'column' ? 'section__column' : 'section__row'">
			<slot name="child"></slot>
		</div>
	</div>
</template>

<style lang="less" scoped>
.section {
	display: flex;
	flex-direction: column;
	margin-bottom: 8px;

	&__subtitle {
		font-weight: var(--font-size-L);
		margin-bottom: 12px;
	}

	&__column {
		display: flex;
		flex-direction: column;
		width: 100%;
	}

	&__row {
		display: flex;
		width: 100%;
		gap: 16px;
	}
}
</style>
