<script setup lang="ts">
import Package from '../components/common/cooperation/Package.vue';
import AllAdvantages from '../components/common/cooperation/cooperation-lists/AllAdvantages.vue';
import AllPackages from '../components/common/cooperation/cooperation-lists/AllPackages.vue';
import AllAdditionalServices from '../components/common/cooperation/cooperation-lists/AllAdditionalServices.vue';

const { t } = useI18n();
const mobile = inject('mobile');
</script>

<template>
	<div class="root">
		<HeaderCommon />
		<div class="cooperation">
			<div class="cooperation__hello">{{ $t('cooperation.hello.name') }}</div>
			<div class="cooperation__description">{{ $t('cooperation.hello.description') }}</div>
			<AllAdvantages />
			<AllPackages />
			<AllAdditionalServices />
		</div>
		<FooterCommon v-if="!mobile" />
	</div>
</template>

<style lang="less" scoped>
.cooperation {
	height: 100%;
	width: 100vw;
	padding-left: 5vw;
	padding-right: 5vw;
	padding-top: 50px;
	display: flex;
	flex-direction: column;
	gap: 30px;
	@media (max-width: 768px) {
		padding-left: 1.5vw;
		padding-right: 1.5vw;
	}
}
</style>
