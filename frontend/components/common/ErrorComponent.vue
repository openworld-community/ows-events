<script setup lang="ts">
const props = defineProps({
	error: {
		type: String,
		default: ''
	}
});
</script>
<template>
	<p :class="['form-error', { validation_error: error }]">{{ error }}</p>
</template>

<style lang="less" scoped>
.form-error {
	margin-top: 6px;
	font-size: 10px;
	line-height: 12px;
	color: var(--color-accent-red);
}
</style>
