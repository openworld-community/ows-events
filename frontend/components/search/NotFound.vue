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
}
</style>
