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
	justify-content: flex-end;
	position: absolute;
	align-items: center;
	top: 0px;
	right: 2px;
	z-index: 10;
	@media (min-width: 768px) {
		justify-content: flex-end;
		right: var(--padding-side);
	}
	@media (min-width: 1440px) {
		justify-content: center;
		right: 0px;
	}
}
</style>
