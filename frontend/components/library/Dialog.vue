<script setup lang="ts">
import { DialogRoot, DialogTrigger } from 'radix-vue';

const props = defineProps({
	opendialog: {
		type: Boolean,
		default: false,
		required: false
	}
});
const open = ref(false);
const model = computed({
	get() {
		if (props.opendialog) {
			return props.opendialog;
		} else {
			return open.value;
		}
	},
	set(value) {
		open.value = value;
		return value;
	}
});
</script>

<template>
	<DialogRoot v-model:open="model">
		<DialogTrigger as-child>
			<slot name="trigger"></slot>
		</DialogTrigger>
		<LibraryUiModalDialogContent>
			<slot name="content"></slot>
		</LibraryUiModalDialogContent>
	</DialogRoot>
</template>
