<script setup>
defineProps({
	imageUrl: {
		type: String,
		default: ''
	},
	altContent: {
		type: String,
		default: ''
	}
});
</script>
<template>
	<div class="event-image event-image__container">
		<img
			v-if="imageUrl"
			class="event-image__image"
			:src="imageUrl"
			width="350"
			height="250"
			:alt="altContent"
		/>
		<img
			v-else
			class="event-image__image"
			src="/img/event-preview@2x.png"
			width="350"
			height="250"
			alt=""
		/>
	</div>
</template>

<style lang="less" scoped>
.event-image {
	&__container {
		display: flex;
		width: 100%;
		aspect-ratio: 16 / 9;
		height: auto;
		max-height: 450px;
		line-height: 0;
		background-color: var(--color-input-field);
		margin-bottom: 12px;
		border-radius: 8px;
		overflow: hidden;

		@media (min-width: 768px) {
			aspect-ratio: 16 / 9;
			max-height: 540px;
			margin-bottom: 24px;
		}

		@media (min-width: 1440px) {
			max-height: 580px;
			margin-top: 10px;
		}
	}

	&__image {
		width: 100%;
		min-width: 100%;
		max-width: 100%;
		aspect-ratio: 16 / 9;
		height: auto;
		object-fit: cover;
		border-radius: 8px;

		@media (min-width: 768px) {
			aspect-ratio: 16 / 9;
		}
	}
}
</style>
