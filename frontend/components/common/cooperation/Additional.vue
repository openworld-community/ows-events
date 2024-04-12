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
			<div class="additional__text__header">{{ name }}</div>
			<div class="additional__text__description">{{ description }}</div>
		</div>
		<div>{{ price }}</div>
		<div>{{ button }}</div>
	</div>
</template>

<style lang="less" scoped>
.additional {
	display: flex;
	justify-content: space-between;
	padding-top: 10px;
	padding-bottom: 10px;
}
</style>
