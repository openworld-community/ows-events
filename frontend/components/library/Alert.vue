<script setup lang="ts">
import { DialogRoot, DialogTrigger } from 'radix-vue';

const props = defineProps({
	modelValue: {
		type: Boolean,
		required: false
	}
});
const open = ref(false);

computed(() => {
	if (props.modelValue) open.value = props.modelValue;
	else {
		return open.value;
	}
});
</script>

<template>
	<DialogRoot v-model:open="open">
		<DialogTrigger>
			<slot name="trigger"></slot>
		</DialogTrigger>
		<LibraryUiModalDialogContent>
			<slot name="content"></slot>
		</LibraryUiModalDialogContent>
	</DialogRoot>
</template>
