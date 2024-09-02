<script setup lang="ts">
defineProps({
	title: {
		type: String,
		default: ''
	},
	position: {
		type: String as PropType<'up' | 'down'>,
		default: 'up'
	}
});
</script>
<template>
	<h2
		:class="[
			'heading',
			{ 'heading--up': position === 'up' },
			{ 'heading--down': position === 'down' }
		]"
	>
		{{ title }}
	</h2>
</template>
<style lang="less" scoped>
.heading {
	@media (max-width: 768px) {
		font-size: var(--font-size-ML);
		font-weight: 500;
		letter-spacing: -0.3px;
	}
	@media (min-width: 768px) {
		padding-left: var(--padding-side);
		padding-right: var(--padding-side);
		margin-bottom: 28px;
		font-weight: 600;
	}

	&--up {
		margin-bottom: 20px;
		@media (max-width: 768px) {
			margin-left: 11px;
		}

		@media (min-width: 768px) {
			margin-bottom: 28px;
		}

		@media (min-width: 768px) {
			margin-bottom: 30px;
		}
	}
	&--down {
		margin-top: 30px;
		margin-bottom: 30px;
		text-align: center;
		margin-left: 16px;
		margin-right: 16px;

		@media (min-width: 768px) {
			text-align: left;
			margin-left: 0px;
			margin-right: 0px;
			margin-bottom: 70px;
		}
		@media (min-width: 1440px) {
			margin-top: 70px;
			margin-bottom: 70px;
		}
	}
}
</style>
