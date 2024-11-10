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
	<DialogPortal to="body">
		<DialogOverlay class="dialog-overlay">
			<DialogContent
				v-bind="{ ...props, ...emitsAsProps }"
				class="dialog-content"
			>
				<slot />

				<DialogClose as-child>
					<button
						type="button"
						class="dialog-close"
						:aria-label="$t('global.button.clear')"
						tabindex="0"
					>
						<CommonIcon
							name="close"
							color="var(--color-input-icons)"
						/>
					</button>
				</DialogClose>
			</DialogContent>
		</DialogOverlay>
	</DialogPortal>
</template>

<style scoped lang="less">
@keyframes overlayshow {
	from {
		opacity: 0;
	}

	to {
		opacity: 1;
	}
}

@keyframes contentshow {
	from {
		transform: translate(-50%, -48%) scale(0.96);
		opacity: 0;
	}

	to {
		transform: translate(-50%, -50%) scale(1);
		opacity: 1;
	}
}
.dialog-overlay {
	background-color: var(--color-white-semitransparent);
	position: fixed;
	inset: 0;
	z-index: 30;
	width: 100%;
}
.dialog-content {
	z-index: 100;
	background-color: var(--color-white);
	position: fixed;
	top: 50%;
	left: 50%;
	max-height: 90vh;
	transform: translate(-50%, -50%);
	border-radius: 6px;
	padding: 25px;
	box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.14);
	outline: none;
}

.dialog-close {
	position: absolute;
	top: 10px;
	right: 10px;
	&:hover svg {
		color: var(--color-accent-green-main-50);
	}
	&:focus:deep(svg) {
		color: var(--color-accent-green-main);
	}
}

.dialog-content[data-state='open'] {
	animation: contentshow 150ms cubic-bezier(0.16, 1, 0.3, 1);
}

.dialog-overlay[data-state='open'] {
	animation: overlayshow 150ms cubic-bezier(0.16, 1, 0.3, 1);
}
</style>
