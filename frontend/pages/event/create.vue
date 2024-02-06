<script setup lang="ts">
import { LocalStorageEnum } from '~/constants/enums/common';
import type { PostEventPayload } from '../../../common/types/event';
import { useEventStore } from '~/stores/event.store';

const router = useRouter();
const localePath = useLocalePath();

const eventStore = useEventStore();

onMounted(async () => {
	await eventStore.getTimezones();
});

const initialValues = getInitialEventFormValues();

const submitEvent = async (payload: PostEventPayload) => {
	try {
		const { data } = await apiRouter.events.add.useMutation({
			data: { event: payload }
		});
		localStorage.removeItem(LocalStorageEnum.EVENT_DATA);

		await navigateTo(localePath(`/event/${data.value.id}`));
	} catch (error) {
		console.warn('error create event:', error);
	}
};

const cancel = () => {
	localStorage.removeItem(LocalStorageEnum.EVENT_DATA);
	router.back();
};
</script>

<template>
	<ClientOnly>
		<EventForm
			:initial-values="initialValues"
			@create-event="submitEvent"
			@cancel-event="cancel"
		/>
	</ClientOnly>
</template>
