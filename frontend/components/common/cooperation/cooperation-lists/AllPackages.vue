<script setup lang="ts">
import Package from '../Package.vue';
</script>

<template>
	<div class="allpackages">
		<div class="cooperation__our-services">{{ $t('cooperation.ourServices') }}</div>
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
			:name="$t('cooperation.package.standard.name')"
			option="premium"
			:price="$t('cooperation.package.standard.price')"
			:button="$t('cooperation.package.standard.button')"
		/>
	</div>
</template>
<style lang="less" scoped>
.allpackages {
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 60px;
	padding-bottom: 20px;
}
</style>
