<script setup lang="ts">
import {
	DialogClose,
	DialogContent,
	type DialogContentEmits,
	type DialogContentProps,
	DialogOverlay,
	DialogPortal,
	useEmitAsProps
} from 'radix-vue';

const props = defineProps<DialogContentProps>();
const emits = defineEmits<DialogContentEmits>();

const emitsAsProps = useEmitAsProps(emits);
</script>

<template>
	<DialogPortal>
		<DialogOverlay class="dialog-overlay">
			<DialogContent
				v-bind="{ ...props, ...emitsAsProps }"
				class="dialog-content"
			>
				<slot />

				<DialogClose>
					<CommonIcon
						name="close"
						color="var(--color-input-icons)"
					/>
				</DialogClose>
			</DialogContent>
		</DialogOverlay>
	</DialogPortal>
</template>

<style lang="less">
.dialog-overlay {
	background-color: var(--color-white-semitransparent);
	position: fixed;
	inset: 0;
	z-index: 30;
}
.dialog-content {
	z-index: 100;
	background-color: var(--color-white);
	position: fixed;
	top: 50%;
	left: 50%;
	max-height: 85vh;
	width: 90vw;
	max-width: 450px;
	transform: translate(-50%, -50%);
	border-radius: 6px;
	padding: 25px;
	box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.14);
	outline: none;
}
</style>
