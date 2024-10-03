<script setup lang="ts">
import type { PropType } from 'vue';

defineProps({
	size: {
		type: String as PropType<'middle' | 'big'>,
		default: 'big'
	}
});
</script>
<template>
	<div class="loader">
		<CommonUiLoadSpinner
			color="#48c78e"
			:size="size"
		/>
	</div>
</template>

<style lang="less" scoped>
.loader {
	display: flex;
	width: 100%;
	justify-content: center;
	align-items: center;

	position: absolute;
	top: 0px;
	left: 0px;
	z-index: 10;
	@media (min-width: 768px) {
		top: 8px;
	}
}
</style>
