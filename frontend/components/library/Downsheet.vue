<script setup lang="ts">
import { DialogRoot, DialogTrigger } from 'radix-vue';

const props = defineProps({
	opendialog: {
		type: Boolean,
		default: false,
		required: false
	},
	title: {
		type: String,
		default: ''
	},
	description: {
		type: String,
		default: ''
	},
	disabled: {
		type: Boolean,
		default: false
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
		<DialogTrigger
			as-child
			:disabled="disabled"
			class="dialog__trigger"
		>
			<slot name="trigger"></slot>
		</DialogTrigger>
		<LibraryUiModalDownsheetContent>
			<VisuallyHidden
				v-if="!title"
				as-child
			>
				<DialogTitle />
			</VisuallyHidden>

			<VisuallyHidden
				v-if="!description"
				as-child
			>
				<DialogDescription />
			</VisuallyHidden>
			<slot name="content"></slot>
		</LibraryUiModalDownsheetContent>
	</DialogRoot>
</template>
<style lang="less" scoped>
.dialog {
	&__trigger:disabled {
		opacity: 0.8;
	}
}
</style>
