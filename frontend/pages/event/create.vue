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
	const { data } = await apiRouter.events.add.useMutation({
		data: { event: payload }
	});
	if (data.value) {
		localStorage.removeItem(LocalStorageEnum.EVENT_DATA);

		await navigateTo(localePath(`RoutePathEnum.EVENT/${data.value.id}`));
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
