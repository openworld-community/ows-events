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
	<div class="heading">
		<h1 class="heading__title">{{ title }}</h1>
		<h2 class="heading__subtitle">{{ $t('home.title') }}</h2>
	</div>
</template>
<style lang="less" scoped>
.heading {
	margin-bottom: 20px;
	display: flex;
	flex-direction: column;
	gap: 10px;

	@media (min-width: 768px) {
		max-width: 600px;
		padding-top: 0;
		gap: 5px;
		//margin-bottom: 26px;
		//margin-top: 24px;
		margin-top: 35px;
		margin-bottom: 35px;
	}

	@media (min-width: 1440px) {
		max-width: 1440px;
		margin-bottom: 40px;
		margin-top: 70px;
		gap: 22px;
	}

	&__title {
		text-align: center;
		word-wrap: break-word;
		color: var(--color-white);
		padding-top: 20px;

		@media (max-width: 768px) {
			letter-spacing: -0.3px;
		}
		@media (min-width: 768px) {
			max-width: 600px;
			padding-top: 0;
		}

		@media (min-width: 1440px) {
			max-width: 100%;
			letter-spacing: -0.3px;
		}
	}

	&__subtitle {
		text-align: center;
		word-wrap: break-word;
		font-weight: 500;
		letter-spacing: -0.03em;
		color: var(--color-white);

		@media (min-width: 768px) {
			font-weight: 600;
			// letter-spacing: -0.3px;
		}
	}
}
</style>
