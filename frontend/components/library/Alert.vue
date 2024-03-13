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
							class="event-form__button"
							button-kind="ordinary"
						/>
					</DialogClose>
					<DialogClose as-child>
						<CommonButton
							button-text="Yes"
							class="event-form__button"
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
	min-width: 200px;

	@media (min-width: 768px) {
		width: 400px;
	}
}
.alert-footer {
	display: flex;
	justify-content: space-between;
}
</style>
