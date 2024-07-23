<script setup lang="ts">
import { v4 as uuid } from 'uuid';

import { CookieNameEnum, LocalStorageEnum } from '../../constants/enums/common';
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
import { CommonErrorsEnum } from '../../../common/const';
import { useField } from 'vee-validate';

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
const env = useField<string>(() => 'env');
const token = useField<string>(() => 'token');

const environments = [
	'https://api-test.afisha.peredelano.com',
	'https://api-demo.afisha.peredelano.com',
	'https://api.afisha.peredelano.com'
];

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
	const opts = {
		method: 'POST' as 'POST',
		headers: {
			Authorization: token.value.value
		},
		body: { event: payload },
		key: uuid()
	};
	console.log(token.value.value);
	console.log(env.value.value);
	const url = `${env.value.value}/api/events/add`;

	const getData = () => useFetch(url, opts);
	const data = await getData();
	if (data.error.value) {
		// todo - переделать эту проверку когда бэк уже стандартизирует вывод своих ошибок везде
		if (data.error.value?.data?.message) {
			const errorMessage = data.error.value.data.message;

			const { $errorToast, $i18n } = useNuxtApp();
			$errorToast($i18n.t(`errors.${errorMessage}`));
		} else {
			console.error(data.error.value);
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
		<CommonFormField>
			<LibrarySelect
				v-model="env.value.value"
				:options="environments"
				placeholder="Environment"
			/>
		</CommonFormField>
		<CommonFormField>
			<CommonUiBaseInput
				v-model="token.value.value"
				name="token"
				placeholder="Token"
			/>
		</CommonFormField>
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
