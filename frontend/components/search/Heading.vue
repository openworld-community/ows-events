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
	<h3
		:class="[
			'heading',
			{ 'heading--up': position === 'up' },
			{ 'heading--down': position === 'down' }
		]"
	>
		{{ title }}
		<slot />
	</h3>
</template>
<style lang="less" scoped>
.heading {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	@media (max-width: 768px) {
		font-size: var(--font-size-L);
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
		padding-left: var(--padding-side);
		padding-right: var(--padding-side);
		margin-top: 23px;
		margin-bottom: 17px;

		@media (min-width: 768px) {
			margin-top: 40px;
			margin-bottom: 30px;
		}
	}
	&--down {
		margin-top: 30px;
		margin-bottom: 4px;
		text-align: center;
		margin-left: 16px;
		margin-right: 16px;
		font-size: var(--font-size-ML);

		@media (min-width: 768px) {
			text-align: left;
			margin-left: 0px;
			margin-right: 0px;
			font-size: 2.2rem;
		}
		@media (min-width: 1440px) {
			margin-top: 50px;
			margin-bottom: 50px;
		}
	}
}
</style>
