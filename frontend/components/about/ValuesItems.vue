<script setup lang="ts">
import type { AboutValuesData } from './AboutData';
defineProps<AboutValuesData>();
</script>

<template>
	<li class="values-item">
		<img
			class="values-item__image"
			:src="imageUrl"
		/>
		<p class="values-item__text text1">{{ $t(title) }}</p>
	</li>
</template>

<style lang="less" scoped>
.values-item {
	display: flex;
	flex-direction: column;
	width: 90%;

	@media (min-width: 768px) {
		width: 43%;
	}
	@media (min-width: 1440px) {
		gap: 20px;
	}

	&__text {
		margin-top: 10px;
	}

	&__image {
		width: 100%;
		height: 100%;
	}
}
</style>
