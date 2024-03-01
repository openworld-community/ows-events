<script setup lang="ts">
import {
	ScrollAreaRoot,
	ScrollAreaScrollbar,
	ScrollAreaThumb,
	ScrollAreaViewport
} from 'radix-vue';

defineProps({
	type: {
		type: String as PropType<'always' | 'hover' | 'auto' | 'scroll'>,
		default: 'auto'
	},
	orientation: {
		type: String as PropType<'vertical' | 'horizontal'>,
		default: 'vertical'
	},
	height: {
		type: Number,
		default: 200
	}
});
</script>

<template>
	<ScrollAreaRoot
		class="scroll-area"
		:style="{ height: `${height}px` }"
		:type="type"
	>
		<ScrollAreaViewport
			class="scroll-area__viewport"
			as-child
		>
			<slot></slot>
		</ScrollAreaViewport>
		<ScrollAreaScrollbar
			class="scroll-area__scrollbar"
			:orientation="orientation"
			style="width: 10px; padding: 5px 2px"
		>
			<ScrollAreaThumb class="scroll-area__thumb" />
		</ScrollAreaScrollbar>
	</ScrollAreaRoot>
</template>

<style lang="less">
.scroll-area {
	width: 100%;
	// height: 160px;
	border-radius: 4px;
	display: flex;
	min-height: 100px;
	max-height: 300px;
	&__viewport {
		width: 100%;
	}
	&__scrollbar {
		width: 4px;
		padding: 5px 2px;
		background-color: var(--color-input-icons);
		user-select: none;
		touch-action: none;
		&:hover {
			background-color: var(--color-text-main);
		}
	}
	&__thumb {
		background: rgba(0, 0, 0, 0.3);
		border-radius: 3px;
		flex: 1 1 0%;
		&::before {
			content: '';
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			width: 100%;
			height: 100%;
			min-width: 20px;
			min-height: 20px;
		}
	}
}
</style>
