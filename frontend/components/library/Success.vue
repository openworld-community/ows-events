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
		default: false
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
		open.value = value;
		return value;
	}
});
</script>

<template>
	<DialogRoot v-model:open="model">
		<DialogTrigger><slot></slot></DialogTrigger>
		<LibraryUiModalDialogContent>
			<div class="success-content">
				<div class="success-icon">
					<CommonIcon
						class="checkbox-row__icon"
						name="check"
						color=" var(--color-white)"
						style="display: flex; align-items: center; justify-content: center"
					/>
				</div>
				<DialogTitle>{{ title }}</DialogTitle>
				<DialogDescription>{{ descriptionText }}</DialogDescription>
			</div>
		</LibraryUiModalDialogContent>
	</DialogRoot>
</template>

<style lang="less" scoped>
.success-content {
	min-width: 200px;
	display: flex;
	flex-direction: column;
	gap: 20px;
	align-items: center;
}
.success-icon {
	height: 40px;
	width: 40px;
	background-color: var(--color-accent-green-main);
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 50px;
}
</style>
