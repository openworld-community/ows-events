<script setup lang="ts">
const props = defineProps({
	name: {
		type: String,
		default: ''
	},
	description: {
		type: String,
		default: ''
	},
	image: {
		type: String,
		default: '[]'
	},
	isRevercedHead: {
		type: String,
		default: 'advantage'
	},
	isRevercedText: {
		type: String,
		default: 'advantage__text'
	}
});
</script>

<template>
	<div :class="isRevercedHead">
		<img
			src="../../../assets/img/cooperation/allEvents.png"
			class="advantage__image"
		/>
		<div :class="isRevercedText">
			<h2 class="advantage__header">{{ name }}</h2>
			<p class="advantage__description">{{ description }}</p>
		</div>
	</div>
</template>

<style lang="less" scoped>
.advantage {
	display: flex;
	@media (max-width: 768px) {
		flex-direction: column;
	}
	&--reverced {
		display: flex;
		flex-direction: row-reverse;
		@media (max-width: 768px) {
			flex-direction: column;
		}
	}
	&__image {
		width: 100%;
		height: 100%;
		max-width: 315px;
		max-height: 255px;
		@media (max-width: 768px) {
			align-self: center;
		}
	}
	&__text {
		padding-left: 100px;
		@media (max-width: 768px) {
			padding: 0px;
		}
		&--reverced {
			padding-right: 100px;
			@media (max-width: 768px) {
				padding: 0px;
			}
		}
	}
	&__header {
		padding-bottom: 35px;
		@media (max-width: 768px) {
			display: flex;
			justify-content: center;
		}
	}

	&__description {
		font-size: var(--font-size-L);
		@media (max-width: 768px) {
			display: flex;
			justify-content: center;
			text-align: justify;
		}
	}
}
</style>
