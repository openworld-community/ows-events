<script setup lang="ts">
import AdvantagesList from '../components/cooperation/cooperation-lists/AdvantagesList.vue';
import PackagesList from '../components/cooperation/cooperation-lists/PackagesList.vue';
import AdditionalsList from '../components/cooperation/cooperation-lists/AdditionalsList.vue';
import WhyUs from '../components/cooperation/WhyUs.vue';

const mobile = inject('mobile');
</script>

<template>
	<div class="root">
		<HeaderCommon />
		<div class="cooperation">
			<div class="cooperation__wrapper">
				<h1 class="cooperation__title">{{ $t('cooperation.header.title') }}</h1>
				<p class="cooperation__description">{{ $t('cooperation.header.description') }}</p>
				<AdvantagesList />
				<WhyUs />
				<PackagesList />
				<AdditionalsList />
			</div>
		</div>
		<FooterCommon v-if="!mobile" />
	</div>
</template>

<style lang="less" scoped>
.cooperation {
	display: flex;
	justify-content: center;
	padding-left: 7vw;
	padding-right: 7vw;
	@media (max-width: 768px) {
		padding-left: 30px;
		padding-right: 30px;
	}
	@media (max-width: 375px) {
		padding-left: 12px;
		padding-right: 12px;
	}
	&__wrapper {
		width: 100%;
		max-width: 1440px;
		padding-top: 50px;
		display: flex;
		flex-direction: column;
		gap: 50px;
		@media (max-width: 768px) {
			gap: 30px;
		}
	}
	&__title {
		line-height: 1.3;
		text-align: center;
		@media (max-width: 768px) {
			font-size: 24px;
			font-weight: 600;
			text-align: center;
			line-height: 1.4;
		}
	}
	&__description {
		font-size: var(--font-size-L);
		line-height: 1.5;
	}
}
</style>
