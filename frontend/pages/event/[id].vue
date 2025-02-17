<script setup lang="ts">
import { RoutePathEnum } from '@/constants/enums/route';
import { trimString } from '../../utils/trimString';

import { apiRouter } from '../../composables/useApiRouter';

import { PEREDELANO_CREATOR_ID } from '../../../common/const/eventTypes';
import { Tags } from '../../../common/const/tags';

import { useSendTrackingEvent } from '~/composables/useSendTrackingEvent';
import { useUserStore } from '../../stores/user.store';
const { sendAnalytics } = useSendTrackingEvent();
const userStore = useUserStore();

const route = useRoute();

const localePath = useLocalePath();
const { t } = useI18n();
const id = getFirstParam(route.params.id);
const mobile = inject<boolean>('mobile');
const posterEvent = ref(null);

const toggleFavourites = async () => {
	const { error } = await apiRouter.user.favourites[
		isInFavourites.value ? 'remove' : 'add'
	].useMutation({ data: { eventId: id } });
	if (!error.value) await userStore.getFavouriteIDs();
};
const { data } = await apiRouter.events.get.useQuery({ data: { id } });
const isInFavourites = computed(() => {
	return userStore.favouriteIDs.includes(id);
});

const analyticsOnRedirect = () => {
	sendAnalytics.redirect({
		link_url: posterEvent.value.url,
		id_event: posterEvent.value.id,
		country: posterEvent?.value.location?.country,
		city: posterEvent?.value.location?.city,
		online: posterEvent?.value.isOnline
	});
};

watch(isInFavourites, (value) => {
	if (value) {
		sendAnalytics.favourites({
			id_user: posterEvent?.value.creatorId,
			id_event: posterEvent?.value.id,
			country: posterEvent?.value.location?.country,
			city: posterEvent?.value?.location?.city,
			online: posterEvent?.value?.isOnline
		});
	}
});
if (data.value) {
	posterEvent.value = data.value;
} else {
	throw createError({
		statusCode: 404,
		data: { message: t('errors.NOT_FOUND_BY_ID', { id: id }) }
	});
}

const eventImage = computed(() => {
	return getEventImage(posterEvent.value?.image);
});

getMeta({
	title: posterEvent.value?.isOnline
		? `${posterEvent.value?.title} / ${t(`event.tags.${Tags.ONLINE}`)}`
		: `${posterEvent.value?.title} / ${posterEvent.value?.location?.city}, ${posterEvent.value?.location.country}`,
	description:
		posterEvent.value.creatorId === PEREDELANO_CREATOR_ID
			? t('meta.event.description_peredelano')
			: trimString(posterEvent.value?.description ?? '', 120),
	image: eventImage.value
});

useHead({
	script: [posterEvent.value ? getJSONEvent(posterEvent.value) : undefined]
});

const deleteCard = async () => {
	// если запрос проходит, то ничего не приходит, т.е. может придти только error
	const { error } = await apiRouter.events.delete.useMutation({ data: { id } });
	if (error.value) return;

	navigateTo(localePath({ path: RoutePathEnum.USER_PAGE }));
};

const onEditButtonClick = async () => {
	await navigateTo(localePath({ path: `${RoutePathEnum.EVENT_EDIT}${id}` }));
};

// TODO подключить, когда вернемся к проработке регистрации
// const {
// 	open: openRegistrationModal,
// 	close: closeRegistrationModal,
// 	patchOptions: patchRegistrationModal
// } = useModal({
// 	component: RegistrationModal,
// 	attrs: { eventId: id, close: () => void 0 }
// } as UseModalOptions<InstanceType<typeof VueFinalModal>['$props']>);
// patchRegistrationModal({ attrs: { close: closeRegistrationModal } });
</script>

<template>
	<main
		v-if="posterEvent"
		class="event"
	>
		<DetailesImage
			:image-url="eventImage"
			:alt-content="
				trimString(
					`Afisha: ${
						posterEvent.isOnline
							? $t(`event.tags.${Tags.ONLINE}`)
							: posterEvent.location.city
					}, ${posterEvent.title}`,
					460
				)
			"
		/>
		<DetailesTags
			:tag-list="posterEvent.tags"
			:icon-name="isInFavourites ? 'heart-filled' : 'heart'"
			:is-show-favourites="userStore.isAuthorized"
			:is-in-favourites="isInFavourites"
			@toggle-favourites="toggleFavourites"
		/>
		<DetailesEventSummary
			:poster-event="posterEvent"
			:is-in-favourites="isInFavourites"
			:is-owner="userStore.id === posterEvent.creatorId"
			:is-show-favourites="userStore.isAuthorized"
			:is-active-buttons="userStore.isAuthorized && !mobile"
			@toggle-favourites="toggleFavourites"
			@delete-click="deleteCard"
			@edit-click="onEditButtonClick"
		/>
		<DetailesDescription :poster-event="posterEvent" />

		<CommonButton
			v-if="posterEvent.url"
			class="event__button-contact"
			:button-kind="userStore.id === posterEvent.creatorId ? 'dark' : 'success'"
			:button-text="$t('global.button.contact')"
			:link="posterEvent.url"
			is-external-link
			@click="analyticsOnRedirect"
		/>
		<DetailesActions
			v-if="userStore.isAuthorized && mobile"
			:creator-id="posterEvent.creatorId"
			@delete-click="deleteCard"
			@edit-click="onEditButtonClick"
		/>

		<DetailesInfoPoster v-if="mobile" />
	</main>
</template>

<style lang="less" scoped>
.event {
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
	min-height: calc(100vh - var(--header-height));
	padding-left: var(--padding-side);
	padding-right: var(--padding-side);
	padding-bottom: 15px;

	// Для адаптивной height на iOs
	@supports (-webkit-touch-callout: none) {
		min-height: -webkit-fill-available;
	}

	@media (min-width: 768px) {
		padding-bottom: 30px;
		min-height: unset;
		height: unset;
	}

	&__button-contact {
		margin-top: auto;

		@media (min-width: 768px) {
			margin-top: 0;
			width: 272px;
		}

		@media (min-width: 1440px) {
			width: 351px;
		}
	}
}
</style>
