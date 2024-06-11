<script setup lang="ts">
import type { Advantage } from '.';

const props = defineProps<Advantage>();

const { width } = useWindowSize();

const direction = computed(() => {
	if (width.value > 900) {
		return props.isRevercedText ? 'row-reverse' : 'row';
	} else {
		return 'column';
	}
});

const alignSelf = computed(() => (props.isRevercedText ? 'flex-end' : 'flex-start'));
</script>

<template>
	<div class="advantage">
		<img
			:src="image"
			class="advantage__image"
		/>
		<div class="advantage__text">
			<h2 class="advantage__header">{{ $t(title) }}</h2>
			<p class="advantage__description">{{ $t(description) }}</p>
		</div>
	</div>
</template>

<style scoped lang="less">
.advantage {
	display: flex;
	flex-direction: v-bind(direction);
	justify-content: space-between;
	gap: 50px;
	font-size: var(--font-size-L);
	@media (max-width: 768px) {
		gap: 35px;
		font-size: var(--font-size-ML);
	}

	&__image {
		width: 315px;
		height: 255px;
		align-self: v-bind(alignSelf);
		@media (max-width: 900px) {
			align-self: center;
		}
	}

	&__text {
		max-width: 66%;
		@media (max-width: 900px) {
			max-width: none;
		}
	}

	&__description {
		line-height: 1.5;
		@media (max-width: 375px) {
			padding-bottom: 10px;
		}
		
	}

	&__header {
		margin-bottom: 35px;
		font-size: var(--font-size-ML);
		@media (min-width: 375px) and (max-width: 768px) {
			font-size: var(--font-size-XL);
			text-align: center;
		}
		@media (max-width: 375px) {
			text-align: start;
		}
	}
}
</style>
