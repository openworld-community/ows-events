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
//aria-describedby="undefined" - to remove description if we not use it
//<VisuallyHidden as-child> - to remove title if we not use it (radix docs)
</script>

<template>
	<DialogPortal>
		<DialogOverlay class="downsheet-overlay">
			<DialogContent
				v-bind="{ ...props, ...emitsAsProps }"
				class="downsheet-content"
				:aria-describedby="undefined"
			>
				<VisuallyHidden as-child>
					<DialogTitle />
				</VisuallyHidden>
				<slot />

				<DialogClose as-child>
					<button
						type="button"
						class="downsheet-close"
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
@keyframes overlaydownsheetshow {
	from {
		opacity: 0;
	}

	to {
		opacity: 1;
	}
}

@keyframes contentdownsheetshow {
	from {
		transform: translate(0, 100%) scale(0.96);
		opacity: 0;
	}

	to {
		transform: translate(0, 5%) scale(1);
		opacity: 1;
	}
}
.downsheet-overlay {
	background-color: var(--color-white-semitransparent);
	position: fixed;
	inset: 0;
	z-index: 30;
}
.downsheet-content {
	z-index: 100;
	background-color: var(--color-white);
	position: fixed;
	bottom: 0%;
	min-height: 5vh;
	max-height: 100vh;
	height: 60%;
	width: 100%;
	max-width: 100%;
	border-top-left-radius: 8px;
	border-top-right-radius: 8px;
	padding: 25px;
	box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.14);
	outline: none;
	overflow-y: scroll;
	scrollbar-width: none;
}

.downsheet-close {
	position: absolute;
	top: 10px;
	right: 10px;
	&:hover svg {
		color: var(--color-accent-green-main-50);
	}
}

.downsheet-content[data-state='open'] {
	animation: contentdownsheetshow 150ms ease-in;
}

.downsheet-overlay[data-state='open'] {
	animation: overlaydownsheetshow 150ms cubic-bezier(0.16, 1, 0.3, 1);
}
</style>
