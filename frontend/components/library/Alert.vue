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
			<DialogTitle>{{ title }}</DialogTitle>
			<DialogDescription>{{ descriptionText }}</DialogDescription>
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
		</template>
	</LibraryDialog>
</template>
