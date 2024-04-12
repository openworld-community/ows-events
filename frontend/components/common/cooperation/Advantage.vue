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
	}
});
</script>

<template>
	<div class="advantage">
		<div class="advantage__image">{{ image }}</div>
		<div class="advantage__text">
			<div class="advantage__header">{{ name }}</div>
			<div class="advantage__description">{{ description }}</div>
		</div>
	</div>
</template>

<style lang="less" scoped>
.advantage {
	display: flex;
	border: 1px solid black;
	align-items: center;
	&__image {
		width: 100%;
		height: 100%;
		max-width: 315px;
		max-height: 255px;
	}
	&__text {
	}
	&__header {
		font-weight: 500;
		font-size: medium;
	}

	&__description {
	}
}
</style>
