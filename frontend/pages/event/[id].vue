<script setup lang="ts">
import { useModal, type UseModalOptions, VueFinalModal } from 'vue-final-modal';
import { RouteNameEnum } from '@/constants/enums/route';
import EventModal from '@/components/modal/Event.client.vue';
import DeleteEvent from '@/components/modal/DeleteEvent.vue';

import { trimString } from '../../utils/trimString';
import {
	SeoItempropEventEnum,
	SeoItempropGlobalEnum,
	SeoItemTypeEnum
} from '../../constants/enums/seo';
import { useUserStore } from '../../stores/user.store';
import { apiRouter } from '../../composables/useApiRouter';

definePageMeta({ name: RouteNameEnum.EVENT });
const route = useRoute();
const id = getFirstParam(route.params.id);

const userStore = useUserStore();

const { data, refresh: refreshEvent } = await apiRouter.events.get.useQuery({ data: { id } });

const posterEvent = computed(() => {
	if (!data.value) return void navigateTo({ name: RouteNameEnum.HOME });
	return data.value;
});

const eventImage = computed(() => {
	return getEventImage(posterEvent.value);
});

getMeta({
	title: posterEvent.value?.location
		? `${posterEvent.value?.title} / ${posterEvent.value?.location?.city}, ${posterEvent.value?.location.country}`
		: posterEvent.value?.title,
	description: trimString(posterEvent.value?.description ?? '', 120),
	image: eventImage.value
});

const isEditable = computed(() => {
	return posterEvent.value ? posterEvent.value.date > Date.now() : false;
});

const redirect = () => {
	useTrackEvent('redirect');
	const tmpEl = document.createElement('a');
	if (!posterEvent.value?.url) return 0;
	tmpEl.href = posterEvent.value?.url;
	tmpEl.target = '_blank';
	tmpEl.click();
};

const isInFavourites = computed(() => {
	return userStore.favouriteIDs.includes(id);
});

const toggleFavourites = async () => {
	const { error } = await apiRouter.user.favourites[
		isInFavourites.value ? 'remove' : 'add'
	].useMutation({ data: { eventId: id } });
	if (!error.value) await userStore.getFavouriteIDs();
};

const deleteCard = async () => {
	// если запрос проходит, то ничего не приходит, т.е. может придти только error
	const { error } = await apiRouter.events.delete.useMutation({ data: { id } });
	if (error.value) return;

	await closeDeleteEventModal();
	navigateTo({ name: RouteNameEnum.HOME });
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

const {
	open: openEventModal,
	close: closeEventModal,
	patchOptions: patchEventModal
} = useModal({ component: EventModal } as UseModalOptions<
	InstanceType<typeof VueFinalModal>['$props']
>);
patchEventModal({
	attrs: {
		dataForEdit: posterEvent,
		closeEventModal,
		refreshEvent
	}
});

const {
	open: openDeleteEventModal,
	close: closeDeleteEventModal,
	patchOptions: patchDeleteEventModal
} = useModal({ component: DeleteEvent } as UseModalOptions<
	InstanceType<typeof VueFinalModal>['$props']
>);
patchDeleteEventModal({
	attrs: {
		closeDeleteEventModal,
		removeEvent: deleteCard
	}
});
</script>

<template>
	<div
		v-if="posterEvent"
		class="event"
		itemscope
		:itemtype="SeoItemTypeEnum.EVENT"
	>
		<div
			:class="[
				'event-image',
				'event-image__container',
				{ 'event-image__container--background': !posterEvent.image }
			]"
			:itemprop="SeoItempropGlobalEnum.IMAGE"
		>
			<img
				v-if="posterEvent.image"
				:src="eventImage"
				:alt="$t('event.image.event')"
				class="event-image__image"
				:itemprop="SeoItempropGlobalEnum.IMAGE"
			/>
		</div>

		<div class="event event-info">
			<div class="event-info__tag-wrapper">
				<CommonTag
					:class-name="'event-info__price'"
					:price="posterEvent.price"
				/>
				<div
					v-if="userStore.isAuthorized"
					class="event-info__favourite"
				>
					<CommonButton
						is-icon
						:icon-name="isInFavourites ? 'heart-filled' : 'heart'"
						:alt="
							isInFavourites
								? $t('global.button.add_to_favourites')
								: $t('global.button.add_to_favourites')
						"
						@click="toggleFavourites"
					/>
				</div>
			</div>

			<!--      TODO когда будет user info, нужно будет подставлять имя создавшего-->
			<p
				v-if="posterEvent.title.toLowerCase().includes('peredelanoconf')"
				class="event-info__author"
				:itemprop="SeoItempropEventEnum.ORGANIZER"
			>
				Peredelano
			</p>
			<h1
				class="event-info__title"
				:itemprop="SeoItempropEventEnum.NAME"
			>
				{{ posterEvent.title }}
			</h1>

			<p class="event-info__datetime">
				<span
					v-if="posterEvent.durationInSeconds"
					:itemprop="SeoItempropEventEnum.DURATION"
				>
					{{ convertToLocaleString(posterEvent.date) }}
					-
					{{
						convertToLocaleString(
							posterEvent.date + posterEvent.durationInSeconds * 1000
						)
					}}
				</span>
				<span
					v-else
					:itemprop="SeoItempropEventEnum.DURATION"
				>
					{{ convertToLocaleString(posterEvent.date ?? Date.now()) }}
				</span>
				<br />
				({{ posterEvent.timezone?.timezoneOffset }}
				{{ posterEvent.timezone?.timezoneName }})
			</p>
			<CommonAddress
				:location="posterEvent.location"
				class="event-info__geolink"
				is-link
			/>
			<p
				class="event-info__description"
				:itemprop="SeoItempropEventEnum.DESCRIPTION"
			>
				{{ posterEvent.description }}
			</p>
		</div>

		<div class="event-actions">
			<template v-if="posterEvent.url">
				<CommonButton
					v-if="posterEvent.url !== 'self'"
					button-kind="success"
					class="event-actions__button event-actions__button--connect"
					:button-text="$t('event.button.contact')"
					@click="redirect"
				/>
				<!--TODO подключить, когда вернемся к проработке регистрации-->
				<!--				<CommonButton-->
				<!--					v-else-->
				<!--					button-kind="success"-->
				<!--					class="event-actions__button"-->
				<!--					:button-text="$t('event.button.register')"-->
				<!--					@click="openRegistrationModal"-->
				<!--				/>-->
			</template>
			<div
				v-if="
					posterEvent.creatorId &&
					((userStore.isAuthorized && userStore.id === posterEvent.creatorId) ||
						posterEvent.creatorId === 'dev-user')
				"
				class="event-actions__manage"
			>
				<CommonButton
					class="event-actions__button event-actions__button--admin"
					button-kind="warning"
					:button-text="$t('event.button.delete')"
					icon-name="trash"
					icon-width="16"
					icon-height="16"
					@click="openDeleteEventModal"
				/>
				<CommonButton
					v-if="isEditable"
					class="event-actions__button event-actions__button--admin"
					button-kind="ordinary"
					:button-text="$t('event.button.edit')"
					icon-name="edit"
					icon-width="16"
					icon-height="16"
					@click="openEventModal"
				/>
			</div>
		</div>
	</div>
	<!-- todo - временная затычка -->
	<div v-else>Request errored or pending</div>
</template>

<style lang="less" scoped>
.event {
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
	//max-height: calc(100vh - var(--header-height));
	padding-left: var(--padding-side);
	padding-right: var(--padding-side);

	//// Для адаптивной height на iOs
	//@supports (-webkit-touch-callout: none) {
	//	max-height: -webkit-fill-available;
	//}

	&-info {
		display: flex;
		width: 100%;
		min-height: 250px;
		flex-direction: column;
		padding-inline: 0;

		&__tag-wrapper {
			display: flex;
			width: 100%;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 12px;
		}

		&__favourite {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 36px;
			height: 36px;
			background-color: var(--color-background-secondary);
			border-radius: 50%;
		}

		&__author {
			//TODO: пока верстка только мобилки
			max-width: 480px;
			word-wrap: break-word;
			font-size: var(--font-size-XS);
			font-weight: var(--font-weight-bold);
			line-height: 16px;
			text-align: left;
			color: var(--color-text-secondary);
			margin-bottom: 12px;
		}

		&__title {
			//TODO: пока верстка только мобилки
			max-width: 480px;
			word-wrap: break-word;
			font-size: var(--font-size-L);
			font-weight: var(--font-weight-bold);
			line-height: 24px;
			margin-bottom: var(--space-related-items);
		}

		&__datetime {
			font-size: var(--font-size-XS);
			font-weight: var(--font-weight-bold);
			line-height: 16px;
			color: var(--color-text-secondary);
			margin-bottom: var(--space-related-items);
		}

		&__geolink {
			margin-bottom: var(--space-unrelated-items);
		}

		&__description {
			//TODO: пока верстка только мобилки
			max-width: 480px;
			word-wrap: break-word;
			overflow-y: auto;
			font-size: var(--font-size-S);
			line-height: 20px;
		}
	}

	&-actions {
		display: flex;
		flex-direction: column;
		background-color: var(--color-white);
		margin-top: auto;
		padding-top: 15px;
		padding-bottom: 15px;

		&__manage {
			display: flex;
			justify-content: center;
		}

		&__button {
			width: 100%;
			min-width: 165px;
			height: 40px;

			&--connect {
				&:not(:last-child) {
					margin-bottom: var(--space-unrelated-items);
				}
			}

			&--admin {
				&:not(:last-child) {
					margin-right: 17px;
				}
			}
		}
	}
}

.event-image {
	&__container {
		display: flex;
		width: 100%;
		min-height: 250px;
		position: relative;
		line-height: 0;
		background-color: var(--color-input-field);
		margin-bottom: 12px;
		border-radius: 8px;

		&--background {
			background: url('@/assets/img/event-preview@2x.png') center center no-repeat;
			background-size: cover;
		}
	}

	&__image {
		width: 100%;
		min-width: 100%;
		max-width: 100%;
		height: 250px;
		position: absolute;
		top: 0;
		left: 0;
		object-fit: cover;
		border-radius: 8px;
	}
}
</style>
