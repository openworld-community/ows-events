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
		<p class="values-item__text">{{ $t(title) }}</p>
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
		font-size: var(--font-size-S);
		margin-top: 10px;

		@media (min-width: 1440px) {
			font-size: var(--font-size-L);
		}
	}

	&__image {
		width: 100%;
		height: 100%;
	}
}
</style>
