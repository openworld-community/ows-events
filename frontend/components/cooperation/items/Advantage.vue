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
			<h3 class="advantage__header">{{ $t(title) }}</h3>
			<p class="advantage__description text1">{{ $t(description) }}</p>
		</div>
	</div>
</template>

<style scoped lang="less">
.advantage {
	display: flex;
	flex-direction: v-bind(direction);
	justify-content: space-between;
	gap: 50px;

	@media (max-width: 768px) {
		gap: 35px;
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
		@media (max-width: 375px) {
			padding-bottom: 10px;
		}
	}

	&__header {
		margin-bottom: 35px;
		text-align: center;

		@media (min-width: 1440px) {
			text-align: left;
		}
	}
}
</style>
