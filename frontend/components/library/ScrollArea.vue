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
		default: undefined
	},
	width: {
		type: Number,
		default: undefined
	}
});
</script>

<template>
	<ScrollAreaRoot
		class="scroll-area"
		:type="type"
		:style="{ height: height ? `${height}px` : '100%', width: width ? `${width}px` : '100%' }"
	>
		<ScrollAreaViewport class="scroll-area__viewport">
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

<style scoped lang="less">
.scroll-area {
	border-radius: 4px;
	display: flex;
	overflow: hidden;

	&__viewport {
		width: 100%;
		height: 100%;
	}

	&__scrollbar {
		width: 4px;
		padding: 5px 2px;
		background-color: var(--color-input-icons);
		user-select: none;
		touch-action: none;

		&:hover {
			opacity: 0.8;
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
