<script setup lang="ts">
import { useEventStore } from '../../stores/event.store';

const eventStore = useEventStore();

const clearForm = async () => {
	eventStore.$patch({
		showClearFormModal: false,
		clearForm: true
	});
	await navigateTo({ path: eventStore.navTo });
	eventStore.resetEventData();
};
</script>

<template>
	<CommonModalWrapper
		v-model="eventStore.showClearFormModal"
		modal-type="info"
		:title="$t('modal.clear_event_form.title')"
	>
		<template #footer>
			<CommonButton
				button-kind="ordinary"
				:button-text="$t('global.button.cancel')"
				@click="eventStore.$patch({ showClearFormModal: false })"
			/>
			<CommonButton
				button-kind="success"
				:button-text="$t('global.button.close')"
				@click="clearForm"
			/>
		</template>
	</CommonModalWrapper>
</template>

<style scoped lang="less"></style>
