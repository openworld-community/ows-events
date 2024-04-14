<script setup lang="ts">
const props = defineProps({
	name: {
		type: String,
		default: ''
	},
	image: {
		type: String,
		default: '/cooperation/socialMedia.png'
	},
	description: {
		type: String,
		default: ''
	},
	price: {
		type: String,
		default: ''
	},
	button: {
		type: String,
		default: ''
	}
});
</script>

<template>
	<div class="additional">
		<img
			:src="image"
			class="additional__image"
		/>
		<div class="additional__text">
			<h3 class="additional__text__header">{{ name }}</h3>
			<div class="additional__text__description">{{ description }}</div>
		</div>
		<div>{{ price }}</div>
		<CommonButton
			class="additional__button"
			button-kind="success"
			:button-text="button"
		/>
	</div>
</template>

<style lang="less" scoped>
.additional {
	display: flex;
	justify-content: space-between;
	padding-top: 10px;
	padding-bottom: 10px;
	&__image{
		width: 105px;
		height: 100px;
	}
	&__button {
		height: 40px;
	}
}
</style>
