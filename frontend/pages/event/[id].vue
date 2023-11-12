<script setup lang="ts">
import { useModal, type UseModalOptions, VueFinalModal } from 'vue-final-modal';
import { RoutePathEnum } from '@/constants/enums/route';
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

const mobile = inject<boolean>('mobile');
const route = useRoute();
const localePath = useLocalePath();
const id = getFirstParam(route.params.id);

const userStore = useUserStore();

const { data, refresh: refreshEvent } = await apiRouter.events.get.useQuery({ data: { id } });

const posterEvent = computed(() => {
	if (!data.value) return void navigateTo(localePath(RoutePathEnum.HOME));
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
	navigateTo(localePath({ path: RoutePathEnum.USER_PAGE }));
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
const tags = ref([
	{
		id: 1,
		tagKey: 'free'
	},
	{
		id: 2,
		tagKey: 'free 2'
	}
]);
</script>

<template>
	<div class="root">
		<HeaderCommon :has-back-button="mobile" />
		<main
			v-if="posterEvent"
			class="event"
			itemscope
			:itemtype="SeoItemTypeEnum.EVENT"
		>
			<div
				class="event-image event-image__container"
				:itemprop="SeoItempropGlobalEnum.IMAGE"
			>
				<img
					v-if="posterEvent.image"
					class="event-image__image"
					:src="eventImage"
					width="350"
					height="250"
					:alt="$t('event.image.event')"
					:itemprop="SeoItempropGlobalEnum.IMAGE"
				/>
				<img
					v-else
					class="event-image__image"
					src="@/assets/img/event-preview@2x.png"
					width="350"
					height="250"
					:alt="$t('event.image.event')"
					:itemprop="SeoItempropGlobalEnum.IMAGE"
				/>
			</div>

			<div class="event-info">
				<div class="event-info__summary">
					<div class="event-info__tag-wrapper">
						<template
							v-for="tag in tags"
							:key="tag.tagKey"
						>
							<CommonTag
								v-if="tags.length > 0"
								:tags="tags"
								class-name="event-info__price"
								:tag-key="tag.tagKey"
							/>
						</template>
						<CommonButton
							v-if="
								mobile && userStore.isAuthorized && userStore.id !== posterEvent.id
							"
							is-icon
							is-round
							:icon-name="isInFavourites ? 'heart-filled' : 'heart'"
							:alt="
								isInFavourites
									? $t('global.button.remove_from_favourites')
									: $t('global.button.add_to_favourites')
							"
							@click="toggleFavourites"
						/>
					</div>
					<div class="event-info__title-wrapper">
						<!--      TODO когда будет user info, нужно будет подставлять имя создавшего -->
						<p
							v-if="posterEvent.organizer"
							class="event-info__author"
							:itemprop="SeoItempropEventEnum.ORGANIZER"
						>
							{{ posterEvent?.organizer }}
						</p>
						<h1
							class="event-info__title"
							:itemprop="SeoItempropEventEnum.NAME"
						>
							{{ posterEvent.title }}
						</h1>
					</div>
					<div class="event-info__details">
						<CommonEventDetails
							class="event-info__datetime"
							:price="posterEvent.price"
							:location="posterEvent.location"
							:start-date="convertToLocaleString(posterEvent.date)"
							:end-date="
								posterEvent.durationInSeconds
									? convertToLocaleString(
											posterEvent.date + posterEvent.durationInSeconds * 1000
									  )
									: null
							"
							with-pin
						/>
					</div>
					<p
						v-if="!mobile && posterEvent.creatorId !== 'peredelanoParser'"
						class="event-info__description-title"
					>
						{{ $t('event.description_title') }}
					</p>
					<p
						v-if="posterEvent.creatorId !== 'peredelanoParser'"
						class="event-info__description"
						:itemprop="SeoItempropEventEnum.DESCRIPTION"
					>
						{{ posterEvent.description }}
					</p>
					<div
						v-if="posterEvent.creatorId === 'peredelanoParser'"
						class="event-info__html-description"
						:itemprop="SeoItempropEventEnum.DESCRIPTION"
						v-html="posterEvent.description"
					/>
					<CommonButton
						v-if="posterEvent.url"
						class="event-info__button-contact"
						button-kind="success"
						:button-text="$t('global.button.contact')"
						:link="posterEvent.url"
						is-external-link
					/>
				</div>

				<!--			<template v-if="posterEvent.url">-->

				<!--TODO подключить, когда вернемся к проработке регистрации-->
				<!--				<CommonButton-->
				<!--					v-else-->
				<!--					button-kind="success"-->
				<!--					class="event-actions__button"-->
				<!--					:button-text="$t('event.button.register')"-->
				<!--					@click="openRegistrationModal"-->
				<!--				/>-->
				<!--			</template>-->
				<div
					v-if="userStore.isAuthorized"
					class="event-info__actions"
				>
					<div
						v-if="
							userStore.id === posterEvent.creatorId ||
							posterEvent.creatorId === 'dev-user'
						"
						class="event-info__manage"
					>
						<CommonButton
							class="event-info__button-admin"
							button-kind="warning"
							:button-text="$t('global.button.delete')"
							icon-name="trash"
							icon-width="16"
							icon-height="16"
							@click="openDeleteEventModal"
						/>
						<CommonButton
							class="event-info__button-admin"
							button-kind="ordinary"
							:button-text="$t('global.button.edit')"
							icon-name="edit"
							icon-width="16"
							icon-height="16"
							@click="openEventModal"
						/>
					</div>
					<CommonButton
						v-if="
							!mobile &&
							posterEvent.id !== userStore.id &&
							posterEvent.creatorId !== 'dev-user'
						"
						button-kind="ordinary"
						:icon-name="isInFavourites ? 'heart-filled' : 'heart'"
						:button-text="
							isInFavourites
								? $t('global.button.in_favourites')
								: $t('global.button.add_to_favourites')
						"
						@click="toggleFavourites"
					/>
				</div>
			</div>
		</main>
		<FooterCommon v-if="!mobile" />
	</div>
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

.event-image {
	&__container {
		display: flex;
		width: 100%;
		aspect-ratio: 2 / 1.43;
		height: auto;
		max-height: 450px;
		line-height: 0;
		background-color: var(--color-input-field);
		margin-bottom: 12px;
		border-radius: 8px;

		@media (min-width: 768px) {
			aspect-ratio: 2 / 1;
			max-height: 540px;
			margin-bottom: 24px;
		}

		@media (min-width: 1440px) {
			max-height: 580px;
			margin-top: 10px;
		}
	}

	&__image {
		width: 100%;
		min-width: 100%;
		max-width: 100%;
		aspect-ratio: 2 / 1.43;
		height: auto;
		object-fit: cover;
		border-radius: 8px;

		@media (min-width: 768px) {
			aspect-ratio: 2 / 1;
		}
	}
}

.event-info {
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
	min-height: 250px;
	padding-inline: 0;

	@media (min-width: 768px) {
		flex-direction: row;
	}

	&__summary {
		display: flex;
		width: 100%;
		height: 100%;
		flex-direction: column;

		@media (min-width: 768px) {
			width: 66%;
		}
	}

	&__tag-wrapper {
		display: flex;
		width: 100%;
		gap: var(--space-related-items);
		align-items: center;
		margin-bottom: 12px;

		@media (min-width: 768px) {
			margin-bottom: 24px;
		}
	}

	&__title-wrapper {
		display: flex;
		width: 100%;
		flex-direction: column;
		margin-bottom: var(--space-related-items);

		@media (min-width: 768px) {
			flex-direction: column-reverse;
			margin-bottom: 24px;
		}
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

		@media (min-width: 768px) {
			margin-bottom: 0;
		}
	}

	&__title {
		//TODO: пока верстка только мобилки
		max-width: 480px;
		word-wrap: break-word;
		font-size: var(--font-size-L);
		font-weight: var(--font-weight-bold);
		line-height: 24px;

		@media (min-width: 768px) {
			font-size: var(--font-size-XXL);
			line-height: 36px;
			margin-bottom: 12px;
		}
	}

	&__details {
		display: flex;
		width: 100%;
		flex-direction: column;
		margin-bottom: var(--space-unrelated-items);

		@media (min-width: 768px) {
			width: 295px;
			padding-top: 24px;
			border-top: 1px solid var(--color-input-field);
		}
	}

	&__datetime {
		margin-bottom: var(--space-inner);
	}

	&__description-title {
		@media (min-width: 768px) {
			display: flex;
			width: 100%;
			font-size: var(--font-size-ML);
			padding-top: 24px;
			border-top: 1px solid var(--color-input-field);
			margin-bottom: 24px;
		}
	}

	&__description {
		word-wrap: break-word;
		white-space: pre-line;
		overflow-y: auto;
		-webkit-overflow-scrolling: touch;
		font-size: var(--font-size-S);
		line-height: 20px;
		margin-bottom: 24px;
	}

	&__html-description {
		word-wrap: break-word;
		white-space: pre-line;
		overflow-y: auto;
		-webkit-overflow-scrolling: touch;
		font-size: var(--font-size-S);
		line-height: 20px;
		margin-bottom: 24px;
		padding-top: 8px;

		&:deep(h1),
		&:deep(h2),
		&:deep(h3),
		&:deep(h4),
		&:deep(h5) {
			padding-bottom: 0.3em;
			margin-bottom: 16px;
			line-height: normal;
		}

		&:deep(h1),
		&:deep(h2) {
			border-bottom: 1px solid var(--color-input-icons, var(--color-input-icons));
		}

		&:deep(a) {
			text-decoration: underline;
			text-underline-offset: 0.2rem;
		}

		&:deep(p) {
			margin-top: 0;
			margin-bottom: 16px;
		}

		&:deep(img) {
			min-width: 0 !important;
			max-width: 100% !important;
			box-sizing: content-box;
		}

		&:deep(blockquote) {
			padding: 0 1em;
			border-left: 0.25em solid var(--color-input-icons, var(--color-input-icons));
		}

		&:deep(table) {
			width: max-content;
			max-width: 100%;
			overflow: auto;
			margin-top: 0;
			margin-bottom: 16px;
			border-collapse: collapse;
			border-spacing: 0;
		}

		&:deep(tr) {
			border-top: 1px solid var(--color-input-icons, var(--color-input-icons));
		}

		&:deep(th),
		&:deep(td) {
			padding: 6px 13px;
			border: 1px solid var(--color-input-icons, var(--color-input-icons));
		}

		&:deep(th) {
			font-weight: var(--base-text-weight-semibold, 600);
		}
	}

	&__button-contact {
		margin-top: auto;

		@media (min-width: 768px) {
			margin-top: 0;
			max-width: 60%;
		}

		@media (min-width: 1440px) {
			max-width: 43%;
		}
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

	&__manage {
		display: flex;
		width: 100%;
		justify-content: center;

		@media (min-width: 768px) {
			flex-direction: column-reverse;
			justify-content: flex-end;
			align-items: flex-start;
			padding-left: 30px;
		}

		@media (min-width: 1440px) {
			flex-direction: row;
		}
	}

	&__button-admin {
		width: 100%;
		min-width: 165px;
		height: 40px;

		@media (min-width: 768px) {
			margin-bottom: 15px;
		}

		&:not(:last-child) {
			margin-right: 17px;
		}
	}
}
</style>
