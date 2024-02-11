<script setup lang="ts">
const props = defineProps({
	open: {
		type: Boolean,
		default: false
	}
});
const emit = defineEmits(['confirmEvent', 'cancelEvent']);

const isOpen = computed({
	get() {
		return props.open;
	},
	set(value) {
		return value;
	}
});
</script>

<template>
	<CommonModalWrapper
		v-model="isOpen"
		modal-type="info"
		:title="$t('modal.clear_event_form.title')"
	>
		<template #footer>
			<CommonButton
				button-kind="ordinary"
				:button-text="$t('global.button.cancel')"
				@click="emit('cancelEvent')"
			/>
			<CommonButton
				button-kind="dark"
				:button-text="$t('global.button.close')"
				@click="emit('confirmEvent')"
			/>
		</template>
	</CommonModalWrapper>
</template>

<style scoped lang="less"></style>
