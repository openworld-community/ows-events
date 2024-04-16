<script setup lang="ts">
const mobile = inject('mobile');

const { width } = useWindowSize()
</script>

<template>
	<div class="root"> 
		<HeaderCommon :has-back-button="width > 900 ? false : true" />
		<div class="cooperation">
			<div class="cooperation__wrapper">
				<h1 class="cooperation__title">{{ $t('cooperation.header.title') }}</h1>
				<p class="cooperation__description">{{ $t('cooperation.header.description') }}</p>
				<CooperationAdvantage />
				<CooperationWhyUs />
				<CooperationServices />
				<CooperationAdditional />
			</div>
		</div>
		<FooterCommon v-if="!mobile" />
	</div>
</template>

<style lang="less" scoped>
.cooperation {
	display: flex;
	justify-content: center;
	max-width: 1440px;
	margin: 0 auto;
	padding-inline: 100px;

	@media (max-width: 768px) {
		padding: 30px;
	}

	@media (max-width: 375px) {
		padding-left: 12px;
		padding-right: 12px;
	}

	&__wrapper {
		width: 100%;
		max-width: 1440px;
		padding-block: 50px;
		display: flex;
		flex-direction: column;
		gap: 50px;

		@media (max-width: 768px) {
			gap: 30px;
		}
	}

	&__title {
		line-height: 1.3;

		@media (max-width: 768px) {
			font-size: 24px;
			font-weight: 600;
			line-height: 1.4;
			text-align: center;
		}
	}

	&__description {
		font-size: var(--font-size-L);
		line-height: 1.5;
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
