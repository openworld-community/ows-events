<script setup lang="ts">
defineProps({
	title: {
		type: String,
		default: ''
	},
	subtitle: {
		type: String,
		default: ''
	}
});
</script>
<template>
	<div class="herowrap">
		<FiltersDoubleHeading
			:title="title"
			:subtitle="subtitle"
		/>
		<slot></slot>
	</div>
</template>
<style lang="less" scoped>
.herowrap {
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	background: linear-gradient(
		90deg,
		var(--color-accent-background) 0%,
		var(--color-accent-green-main) 100%
	);
	padding-left: var(--padding-side);
	padding-right: var(--padding-side);

	@media (min-width: 1440px) {
		position: relative; // for what?
	}
}
</style>
