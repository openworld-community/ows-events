<script setup lang="ts">
const props = defineProps({
	name: {
		type: String,
		default: ''
	},
	image: {
		type: String,
		default: ''
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
		<div class="additional__image">{{ image }}</div>
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
	&__button{
	padding-top: 0px;
	padding-bottom: 0px;
	}
}
</style>
