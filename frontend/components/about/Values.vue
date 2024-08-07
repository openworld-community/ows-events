<script setup lang="ts">
import { values } from './AboutData';
</script>

<template>
	<ul class="list">
		<AboutValuesItems
			v-for="item in values"
			v-bind="item"
			:key="item.title"
		/>
	</ul>
</template>

<style lang="less" scoped>
.list {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 30px;

	@media (min-width: 768px) {
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		align-items: flex-start;
		//width: 786px;
		gap: 75px;
	}

	@media (min-width: 1440px) {
		width: 1260px;
		
	}
}
</style>
