<script setup lang="ts">
import { DialogClose, DialogDescription, DialogTitle } from 'radix-vue';
type LinkObjectType = {
	name?: string;
	path?: string;
};
defineProps({
	title: {
		type: String,
		default: ''
	},
	descriptionText: {
		type: String,
		default: ''
	},
	cancelButtonText: {
		type: String,
		default: 'global.button.cancel'
	},
	confirmButtonText: {
		type: String,
		default: 'global.button.yes'
	},
	link: {
		// если это ссылка
		type: [String, Object] as PropType<string | LinkObjectType>,
		default: ''
	}
});
const emit = defineEmits(['onConfirm']);
</script>

<template>
	<LibraryDialog>
		<template #trigger>
			<slot></slot>
		</template>

		<template #content>
			<div class="alert-content">
				<DialogTitle v-if="title">{{ title }}</DialogTitle>
				<VisuallyHidden
					v-if="!title"
					as-child
				>
					<DialogTitle />
				</VisuallyHidden>
				<DialogDescription>{{ descriptionText }}</DialogDescription>
				<div class="alert-footer">
					<DialogClose as-child>
						<CommonButton
							:button-text="$t(`${cancelButtonText}`)"
							class="button__ordinary--filled"
							button-kind="ordinary"
						/>
					</DialogClose>
					<DialogClose as-child>
						<CommonButton
							:link="link"
							:button-text="$t(`${confirmButtonText}`)"
							class="button__success--filled"
							button-kind="success"
							@click="emit('onConfirm')"
						/>
					</DialogClose>
				</div>
			</div>
		</template>
	</LibraryDialog>
</template>

<style lang="less" scoped>
.alert-content {
	display: flex;
	flex-direction: column;
	gap: 20px;
	width: calc(var(--width-mobile) - var(--padding-side) * 4);

	@media (min-width: 768px) {
		width: 400px;
	}
}
.alert-footer {
	display: flex;
	justify-content: flex-end;
	gap: 12px;
}
</style>
