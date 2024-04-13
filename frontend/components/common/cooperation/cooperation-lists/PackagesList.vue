<script setup lang="ts">
import Package from '../Package.vue';
</script>

<template>
	<div class="packageslist">
		<h1>{{ $t('cooperation.ourServices') }}</h1>
		<Package
			:name="$t('cooperation.package.basic.name')"
			option="basic"
			:price="$t('cooperation.package.basic.price')"
			:button="$t('cooperation.package.basic.button')"
		/>
		<Package
			:name="$t('cooperation.package.standard.name')"
			option="standard"
			:price="$t('cooperation.package.standard.price')"
			:button="$t('cooperation.package.standard.button')"
		/>
		<Package
			:name="$t('cooperation.package.premium.name')"
			option="premium"
			:price="$t('cooperation.package.premium.price')"
			:button="$t('cooperation.package.premium.button')"
		/>
	</div>
</template>
<style lang="less" scoped>
.packageslist {
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 60px;
	padding-bottom: 20px;
	justify-content: center;
}
</style>
