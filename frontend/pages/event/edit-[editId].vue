<script setup lang="ts">
import { LocalStorageEnum } from '../../constants/enums/common';
import type { EventOnPoster, PostEventPayload } from '../../../common/types/event';
import { useEventStore } from '../../stores/event.store';
import { useUserStore } from '../../stores/user.store';
import { RoutePathEnum } from '../../constants/enums/route';

import { useRouter, useRoute, navigateTo } from 'nuxt/app';
import { onMounted, ref } from 'vue';
import { apiRouter } from '../../composables/useApiRouter';
import { getFirstParam } from '../../utils';

import { getInitialEventFormValues } from '../../utils/events';
import { useSendTrackingEvent } from '~/composables/useSendTrackingEvent';

const { sendAnalytics } = useSendTrackingEvent();
const router = useRouter();
const localePath = useLocalePath();
const route = useRoute();
const userStore = useUserStore();
const eventStore = useEventStore();
const { t } = useI18n();

onMounted(async () => {
	await eventStore.getTimezones();
});
const id = getFirstParam(route.params.editId);
getMeta({
	title: id === 'new' ? t('meta.create.title') : t('meta.edit.title'),
	description: id === 'new' ? t('meta.create.description') : t('meta.edit.description')
});
definePageMeta({
	layout: false
});

const event = ref<EventOnPoster>();
const openSuccess = ref(false);

const onSuccess = (eventId: string) => {
	openSuccess.value = true;
	setTimeout(async () => {
		eventStore.navTo
			? navigateTo(localePath(`${eventStore.navTo}`))
			: navigateTo(localePath(`${RoutePathEnum.EVENT}/${eventId}`));
		openSuccess.value = false;
	}, 1000);
};

if (id !== 'new') {
	const { data } = await apiRouter.events.get.useQuery({ data: { id } });
	if (data.value) {
		event.value = data.value;
	} else {
		throw createError({
			statusCode: 404,
			data: { message: t('errors.NOT_FOUND_BY_ID', { id: id }) }
		});
	}
}

const initialValues = computed(() => {
	const init = getInitialEventFormValues(event.value);

	return init;
});

const submitEvent = async (payload: PostEventPayload) => {
	if (id !== 'new') {
		payload.id = id;
		const { error } = await apiRouter.events.edit.useMutation({
			data: { event: payload }
		});
		if (!error.value) {
			localStorage.removeItem(LocalStorageEnum.EVENT_DATA);

			sendAnalytics.formEvent({
				id_user: event.value.creatorId,
				id_event: id,
				country: payload?.location?.country,
				city: payload?.location?.city,
				online: payload?.isOnline,
				type: 'edit_event'
			});
			onSuccess(id);
		}
	} else {
		const { data } = await apiRouter.events.add.useMutation({
			data: { event: payload }
		});

		if (data.value) {
			localStorage.removeItem(LocalStorageEnum.EVENT_DATA);
			sendAnalytics.formEvent({
				id_user: userStore.id,
				id_event: data.value.id,
				country: payload?.location?.country,
				city: payload?.location?.city,
				online: payload?.isOnline,
				type: 'create_event'
			});
			onSuccess(data.value.id);
		}
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
			:title="id !== 'new' ? $t('form.event.title_edit') : $t('form.event.title')"
			:initial-values="initialValues"
			@submit-event="submitEvent"
			@cancel-event="cancel"
		/>
		<LibrarySuccess
			:open-dialog="openSuccess"
			:title="$t('form.global.success')"
			:description-text="
				id === 'new' ? $t('form.global.successCreate') : $t('form.global.successEdit')
			"
		>
		</LibrarySuccess>
	</ClientOnly>
</template>
