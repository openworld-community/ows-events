<script setup lang="ts">
const { t } = useI18n();
getMeta({
	title: t('meta.cooperation.title'),
	description: t('meta.cooperation.description')
});
</script>

<template>
	<div class="cooperation">
		<div class="cooperation__wrapper">
			<h1 class="cooperation__title">{{ $t('cooperation.header.title') }}</h1>
			<p class="cooperation__description">{{ $t('cooperation.header.description') }}</p>
			<CooperationAdvantage />
			<CooperationWhyUs />
			<!-- <CooperationServices />
				<CooperationAdditional /> -->
		</div>
	</div>
</template>

<style lang="less" scoped>
.cooperation {
	display: flex;
	justify-content: center;
	max-width: 1440px;
	margin: 0 auto;
	padding-top: 55px;
	padding-inline: 100px;

	@media (max-width: 768px) {
		padding-top: 50px;
		padding-left: 45px;
		padding-right: 45px;
	}
	@media (max-width: 767px) {
		padding-top: 90px;
	}

	@media (max-width: 375px) {
		padding-top: 90px;
		padding-left: 18px;
		padding-right: 18px;
	}

	&__wrapper {
		width: 100%;
		max-width: 1440px;
		// padding-block: 55px;
		display: flex;
		flex-direction: column;

		@media (max-width: 768px) {
			gap: 30px;
		}
	}

	&__title {
		line-height: 1.3;
		font-size: 32px;

		@media (min-width: 375px) and (max-width: 768px) {
			text-align: center;
		}

		@media (max-width: 768px) {
			font-size: var(--font-size-XL);
			font-weight: 600;
			line-height: 1.3;
		}
	}

	&__description {
		font-size: var(--font-size-L);
		line-height: 1.5;
		padding-top: 52px;
		margin-bottom: 76px;
		@media (max-width: 768px) {
			font-size: var(--font-size-ML);
			padding-top: 0px;
			margin-bottom: 12px;
		}
	}

	&__advantage,
	&__services {
		display: flex;
		flex-direction: column;
		gap: 50px;
	}

	&__services--wrapper {
		border: 2px solid var(--color-accent-green-main);
		padding: 24px 89px 45px 72px;
		border-radius: 8px;
	}
}
</style>
