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
<style lang="less">
.herowrap {
	width: 100%;
	background: linear-gradient(
		90deg,
		var(--color-accent-background) 0%,
		var(--color-accent-green-main) 100%
	);

	@media (min-width: 768px) {
		padding-top: 32px;
	}

	@media (min-width: 1440px) {
		position: relative; // for what?
		padding-top: 60px;
	}

	&__title {
		font-size: var(--font-size-XXL);
		line-height: 40px;
		text-align: center;
		word-wrap: break-word;
		color: var(--color-white);
		padding-top: 28px;
		margin-bottom: 24px;

		@media (min-width: 768px) {
			max-width: 600px;
			font-size: 50px;
			line-height: 60px;
			padding-top: 0;
			margin-bottom: 40px;
		}

		@media (min-width: 1440px) {
			max-width: 900px;
			font-size: 70px;
			line-height: 80px;
			margin-bottom: 60px;
		}
	}
}
</style>
