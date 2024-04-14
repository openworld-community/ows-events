<script setup lang="ts">
import Package from '../Package.vue';
</script>

<template>
	<div class="packages-list">
		<h1 class="packages-list__services">{{ $t('cooperation.ourServices') }}</h1>
		<Package
			:title="$t('cooperation.package.basic.title')"
			options="cooperation.package.basic.option"
			:price="$t('cooperation.package.basic.price')"
			:button="$t('cooperation.package.basic.button')"
			image="/img/cooperation/package/basic.png"
		/>
		<Package
			:title="$t('cooperation.package.standard.title')"
			options="cooperation.package.standard.option"
			:price="$t('cooperation.package.standard.price')"
			:button="$t('cooperation.package.standard.button')"
			image="/img/cooperation/package/standard.png"
		/>
		<Package
			:title="$t('cooperation.package.premium.title')"
			options="cooperation.package.premium.option"
			:price="$t('cooperation.package.premium.price')"
			:button="$t('cooperation.package.premium.button')"
			image="/img/cooperation/package/premium.png"
		/>
	</div>
</template>
<style lang="less" scoped>
.packages-list {
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 50px;
	padding-bottom: 20px;
	justify-content: center;
	@media (max-width: 768px) {
		gap: 30px;
		padding-bottom: 50px;
	}
}
</style>
