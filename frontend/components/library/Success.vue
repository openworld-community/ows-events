<script setup lang="ts">
import { DialogRoot, DialogTrigger } from 'radix-vue';

const props = defineProps({
	title: {
		type: String,
		required: true
	},
	descriptionText: {
		type: String,
		default: ''
	},
	openDialog: {
		type: Boolean,
		default: false,
		required: false
	}
});
const open = ref(false);

const model = computed({
	get() {
		if (props.openDialog) {
			return props.openDialog;
		} else {
			return open.value;
		}
	},

	set(value) {
		return value;
	}
});
</script>

<template>
	<DialogRoot v-model:open="model">
		<LibraryUiModalDialogContent>
			<DialogTitle>{{ title }}</DialogTitle>
			<DialogDescription>{{ descriptionText }}</DialogDescription>
		</LibraryUiModalDialogContent>
	</DialogRoot>
</template>
