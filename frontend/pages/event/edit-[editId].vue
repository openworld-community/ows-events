<script setup lang="ts">
import { LocalStorageEnum } from '../../constants/enums/common';
import type { EventOnPoster, EventToShow, PostEventPayload } from '../../../common/types/event';
import { useEventStore } from '../../stores/event.store';
import { RouteNameEnum, RoutePathEnum } from '../../constants/enums/route';

import { useRouter, useRoute, navigateTo } from 'nuxt/app';
import { onMounted, ref } from 'vue';
import { apiRouter } from '../../composables/useApiRouter';
import { getFirstParam } from '../../utils';
import { convertEventDateToLocaleString } from '../../utils/dates';
import { getInitialEventFormValues } from '../../utils/events';
import { defineNuxtRouteMiddleware, definePageMeta } from '../../.nuxt/imports';
import { useUserStore } from '~/stores/user.store';

const router = useRouter();
const localePath = useLocalePath();
const route = useRoute();
const eventStore = useEventStore();

onMounted(async () => {
	await eventStore.getTimezones();
});
const id = getFirstParam(route.params.editId);

console.log('lkjl', route.params);
const event = ref<EventToShow>();
const pathToBack = ref('');

if (id !== 'new') {
	const { data } = await apiRouter.events.get.useQuery({ data: { id } });
	if (data.value) {
		event.value = { ...data.value, startDate: null, endDate: null };
		event.value.startDate = convertEventDateToLocaleString(
			data.value.date,
			data.value.isOnline,
			data.value.timezone
		);
		event.value.endDate = data.value.durationInSeconds
			? convertEventDateToLocaleString(
					data.value.date + data.value.durationInSeconds * 1000,
					data.value.isOnline,
					data.value.timezone
			  )
			: null;
	} else {
		router.back();
		//throw error and create error page
	}
}

const initialValues = computed({
	get() {
		return getInitialEventFormValues(event.value);
	},
	set(value) {
		return value;
	}
});

const submitEvent = async (payload: PostEventPayload) => {
	if (id !== 'new') {
		payload.id = id;
		const { error } = await apiRouter.events.edit.useMutation({
			data: { event: payload }
		});
		if (!error.value) {
			localStorage.removeItem(LocalStorageEnum.EVENT_DATA);
			eventStore.navTo
				? await navigateTo(localePath(`${eventStore.navTo}`))
				: await navigateTo(localePath(`${RoutePathEnum.EVENT}/${id}`));
		}
	} else {
		const { data } = await apiRouter.events.add.useMutation({
			data: { event: payload }
		});

		if (data.value) {
			localStorage.removeItem(LocalStorageEnum.EVENT_DATA);

			eventStore.navTo
				? await navigateTo(localePath(`${eventStore.navTo}`))
				: await navigateTo(localePath(`${RoutePathEnum.EVENT}/${data.value.id}`));
		}
	}
};

const submitNewEvent = async (payload: PostEventPayload) => {
	alert('submitNew');
};

const cancel = () => {
	localStorage.removeItem(LocalStorageEnum.EVENT_DATA);
	router.back();
};
const clearPath = () => {
	pathToBack.value = '';
};
</script>

<template>
	<ClientOnly>
		<EventForm
			:title="id !== 'new' ? $t('form.event.title_edit') : $t('form.event.title')"
			:initial-values="initialValues"
			@submit-event="submitEvent"
			@cancel-event="cancel"
			@clear-path="clearPath"
		/>
	</ClientOnly>
</template>
