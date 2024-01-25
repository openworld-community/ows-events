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
				:button-text="$t('global.button.cancel')"
				@click="props.closeDeleteEventModal"
			/>
			<CommonButton
				button-kind="dark"
				:button-text="$t('global.button.confirm')"
				@click="props.removeEvent"
			/>
		</template>
	</CommonModalWrapper>
</template>

<style scoped lang="less"></style>
