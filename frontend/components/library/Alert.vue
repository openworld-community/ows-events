<script setup lang="ts">
import { DialogClose, DialogDescription, DialogTitle } from 'radix-vue';

defineProps({
	title: {
		type: String,
		required: true
	},
	descriptionText: {
		type: String,
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
				<DialogTitle>{{ title }}</DialogTitle>
				<DialogDescription>{{ descriptionText }}</DialogDescription>
				<div class="alert-footer">
					<DialogClose as-child>
						<CommonButton
							:button-text="$t('global.button.cancel')"
							class="button__ordinary--filled"
							button-kind="ordinary"
						/>
					</DialogClose>
					<DialogClose as-child>
						<CommonButton
							button-text="Yes"
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
	width: calc(var(--width-mobile) - 2 * var(--padding-side));

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
