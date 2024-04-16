<script setup lang="ts">
import { advantage } from './items';
</script>

<template>
	<ul class="advantage__list">
		<li
			v-for="item in advantage"
			:key="item.title"
			class="advantage__item"
		>
			<CooperationItemsAdvantage v-bind="item" />
		</li>
	</ul>
</template>

<style lang="less" scoped>
.advantage {
	&__list {
		display: flex;
		flex-direction: column;
		gap: 50px;
	}
}
</style>
