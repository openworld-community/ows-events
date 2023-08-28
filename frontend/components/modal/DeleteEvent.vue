<script setup lang="ts">
type Props = {
	closeDeleteEventModal: () => void;
	removeEvent: () => void;
};

const props = defineProps<Props>();
</script>

<template>
	<CommonModalWrapper
		modal-type="info"
		:title="$t('modal.delete_event_modal.title')"
	>
		<template #footer>
			<CommonButton
				button-kind="ordinary"
				:button-text="$t('modal.delete_event_modal.button.cancel')"
				@click="props.closeDeleteEventModal"
			/>
			<CommonButton
				button-kind="success"
				:button-text="$t('modal.delete_event_modal.button.submit')"
				@click="props.removeEvent"
			/>
		</template>
	</CommonModalWrapper>
</template>

<style scoped lang="less"></style>
