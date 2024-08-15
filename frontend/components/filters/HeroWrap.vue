<script setup lang="ts">
defineProps({
	title: {
		type: String,
		default: ''
	}
});
</script>
<template>
	<div class="herowrap">
		<h1 class="herowrap__title">{{ title }}</h1>
		<slot></slot>
	</div>
</template>
<style lang="less" scoped>
.herowrap {
	width: 100%;
	background: linear-gradient(
		90deg,
		var(--color-accent-background) 0%,
		var(--color-accent-green-main) 100%
	);
	padding-left: var(--padding-side);
	padding-right: var(--padding-side);

	@media (min-width: 768px) {
		padding-top: 32px;
	}

	@media (min-width: 1440px) {
		position: relative; // for what?
		padding-top: 60px;
	}

	&__title {
		text-align: center;
		word-wrap: break-word;
		color: var(--color-white);
		padding-top: 28px;
		margin-bottom: 24px;

		@media (min-width: 768px) {
			max-width: 600px;
			padding-top: 0;
			margin-bottom: 40px;
		}

		@media (min-width: 1440px) {
			max-width: 900px;
			margin-bottom: 60px;
		}
	}
}
</style>
