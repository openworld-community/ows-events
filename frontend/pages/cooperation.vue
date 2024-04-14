<script setup lang="ts">
import AdvantagesList from '../components/common/cooperation/cooperation-lists/AdvantagesList.vue';
import PackagesList from '../components/common/cooperation/cooperation-lists/PackagesList.vue';
import AdditionalsList from '../components/common/cooperation/cooperation-lists/AdditionalsList.vue';

const { t } = useI18n();
const mobile = inject('mobile');
</script>

<template>
	<div class="root">
		<HeaderCommon />
		<div class="cooperation">
			<div class="cooperation__wrapper">
				<h1 class="cooperation__title">{{ $t('cooperation.title.name') }}</h1>
				<p class="cooperation__description">{{ $t('cooperation.title.description') }}</p>
				<AdvantagesList />
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
	padding-left: 5vw;
	padding-right: 5vw;
	@media (max-width: 768px) {
		padding-left: 30px;
		padding-right: 30px;
	}
	&__wrapper {
		width: 100%;
		max-width: 1440px;
		padding-top: 50px;
		display: flex;
		flex-direction: column;
		gap: 30px;
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
		font-size: --font-size-L;
	}
}
</style>
