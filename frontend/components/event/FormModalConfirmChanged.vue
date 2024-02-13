<script setup lang="ts">
import { LocalStorageEnum } from '~/constants/enums/common';
import { useEventStore } from '../../stores/event.store';

const eventStore = useEventStore();

const cancel = () => {
	eventStore.resetEventData();
};

const confirm = async () => {
	localStorage.removeItem(LocalStorageEnum.EVENT_DATA);
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
				@click="cancel"
			/>
			<CommonButton
				button-kind="dark"
				:button-text="$t('global.button.close')"
				@click="confirm"
			/>
		</template>
	</CommonModalWrapper>
</template>

<style scoped lang="less"></style>
