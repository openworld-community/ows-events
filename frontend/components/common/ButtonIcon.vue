<script setup lang="ts">
const props = defineProps({
	iconName: {
		type: String,
		required: true
	},
	iconWidth: {
		type: String,
		default: '24'
	},
	iconHeight: {
		type: String,
		default: '24'
	}
});
</script>

<template>
	<button>
		<CommonCustomIcon
			:name="props.iconName"
			:width="props.iconWidth"
			:height="props.iconHeight"
		/>
	</button>
</template>

<style scoped lang="less"></style>
