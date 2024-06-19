<script setup lang="ts">
import { RoutePathEnum } from '@/constants/enums/route';
import { trimString } from '../../utils/trimString';
import { SeoItemTypeEnum } from '../../constants/enums/seo';

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
		itemscope
		:itemtype="SeoItemTypeEnum.EVENT"
	>
		<DetailesImage
			:image-url="eventImage"
			:alt-content="
				trimString(
					`Afisha: ${
						posterEvent.isOnline
							? $t(`event.tags.${Tags.ONLINE}`)
							: posterEvent.location.city
					}, ${posterEvent.title}` ?? '',
					460
				)
			"
		/>
		<DetailesTags
			:tag-list="posterEvent.tags"
			:icon-name="isInFavourites ? 'heart-filled' : 'heart'"
			:alt-content="
				isInFavourites
					? $t('global.button.remove_from_favourites')
					: $t('global.button.add_to_favourites')
			"
			:is-show-favourites="userStore.isAuthorized"
			@toggle-favourites="toggleFavourites"
		/>
		<div class="event-info">
			<DetailesInfo
				:poster-event="posterEvent"
				:is-in-favourites="isInFavourites"
				:is-owner="userStore.id === posterEvent.creatorId"
				:is-show-favourites="userStore.isAuthorized"
				@on-click-redirect="analyticsOnRedirect"
				@toggle-favourites="toggleFavourites"
			/>

			<DetailesActions
				v-if="userStore.isAuthorized"
				:creator-id="posterEvent.creatorId"
				@delete-click="deleteCard"
				@edit-click="onEditButtonClick"
			/>
		</div>
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
}

.event-info {
	flex: 1;
	display: flex;
	flex-direction: column;
	width: 100%;
	min-height: 250px;
	padding-inline: 0;

	@media (min-width: 768px) {
		flex-direction: row;

		justify-content: space-between;
	}

	&__actions {
		display: flex;
		width: 100%;
		padding-top: 15px;

		@media (min-width: 768px) {
			width: 34%;
			justify-content: flex-end;
			padding-top: 50px;
		}
	}
}
</style>
