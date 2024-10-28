<script setup lang="ts">
defineProps({
	title: {
		type: String,
		default: ''
	}
});
</script>
<template>
	<div class="no-results">
		<span>{{ title }}</span>
	</div>
</template>
<style lang="less" scoped>
.no-results {
	display: flex;
	width: 100%;
	justify-content: center;
	align-items: center;
	font-size: 24px;
	margin-top: 20px;
	transition: all 0.4s ease-in-out;
	@media (min-width: 375px) {
		margin-top: 32px;
	}
	@media (min-width: 768px) {
		margin-top: 60px;
	}
}
</style>
