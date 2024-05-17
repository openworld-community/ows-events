<script setup lang="ts">
import { services } from './items';
</script>

<template>
	<h2 class="services__header">{{ $t('cooperation.ourServices') }}</h2>
	<ul class="services__list">
		<li
			v-for="item in services"
			:key="item.title"
			class="services__item"
		>
			<CooperationItemsServices v-bind="item" />
		</li>
	</ul>
</template>

<style lang="less" scoped>
.services {
	&__list {
		display: flex;
		flex-direction: column;
		gap: 50px;
	}
}
</style>
