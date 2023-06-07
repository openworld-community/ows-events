<script setup lang="ts">
import { ref } from 'vue';
import { deleteEvent } from '@/services/events.services';
import { useModal, UseModalOptions, VueFinalModal } from 'vue-final-modal';
import { RouteNameEnum } from '@/constants/enums/route';
import RegistrationModal from '../../components/modal/Registration.vue';
import EventModal from '../../components/modal/Event.vue';
import { UserInfo } from '~/../common/types/user';

definePageMeta({
	name: RouteNameEnum.EVENT
});

const route = useRoute();
const id = route.params.id as string;

const user = useCookie<UserInfo | null>('user');

const { data: posterEvent } = await apiRouter.events.getById.useFetch(id);

const { $translate } = useNuxtApp();

useHead({
	title: `${$translate('meta.title')} / ${posterEvent.value.title}`
});

const {
	open: openRegistrationModal,
	close: closeRegistrationModal,
	patchOptions: patchRegistrationModal
} = useModal({
	component: RegistrationModal,
	attrs: { eventId: id, close: () => void 0 }
} as UseModalOptions<InstanceType<typeof VueFinalModal>['$props']>);
patchRegistrationModal({ attrs: { close: closeRegistrationModal } });

const {
	open: openEventModal,
	close: closeEventModal,
	patchOptions: patchEventModal
} = useModal({ component: EventModal } as UseModalOptions<
	InstanceType<typeof VueFinalModal>['$props']
>);
patchEventModal({ attrs: { closeEventModal, dataForEdit: posterEvent?.value } });

const deleteCard = async () => {
	await deleteEvent(id);
	await navigateTo({ name: RouteNameEnum.HOME });
};

const openLocation = (url: string) => {
	window.open(url, '_blank');
};

//TODO пока заглушка, ведущая на указанный город в гуглокарты, потом нужно будет продумать добавление точного адреса
const templateURL = computed(
	() =>
		`https://www.google.com/maps/place/${posterEvent?.value?.location.city}+${posterEvent?.value?.location.country}`
);
</script>

<template>
	<div class="event">
		<div class="=event-image event-image__container">
			<span class="event-image__price">{{ posterEvent?.price }} €</span>
			<img
				:src="posterEvent ? getEventImage(posterEvent) : undefined"
				:alt="$translate('event.image.event')"
				class="event-image__image"
			/>
		</div>

		<div class="event event-description">
			<!--      TODO когда будет регистрация, нужно будет подставлять имя создавшего-->
			<p class="event-description__author">Peredelano</p>
			<h2 class="event-description__title">
				{{ posterEvent?.title }}
			</h2>

			<p class="event-description__datetime">
				<span v-if="posterEvent?.durationInSeconds">
					{{ convertToLocaleString(posterEvent?.date, posterEvent?.timezone) }}
					-
					{{
						convertToLocaleString(
							posterEvent?.date + posterEvent?.durationInSeconds,
							posterEvent?.timezone
						)
					}}
				</span>
				<span v-else>
					{{
						convertToLocaleString(
							posterEvent?.date ?? Date.now(),
							posterEvent?.timezone
						)
					}}
				</span>
				<br />
				({{ posterEvent?.timezone?.timezoneOffset }}
				{{ posterEvent?.timezone?.timezoneName }})
			</p>

			<NuxtLink
				class="event-description__geolink"
				@click.prevent="openLocation(templateURL)"
			>
				{{ posterEvent?.location.country }}, {{ posterEvent?.location.city }}
			</NuxtLink>
			<p class="event-description__description">
				{{ posterEvent?.description }}
			</p>
		</div>

		<div class="event-actions">
			<template v-if="posterEvent?.url">
				<CommonButton
					v-if="posterEvent?.url !== 'self'"
					button-kind="success"
					class="event-actions__button"
					:button-text="$translate('event.button.contact')"
					:link="posterEvent?.url"
					is-external-link
				/>

				<CommonButton
					v-else
					button-kind="success"
					class="event-actions__button"
					:button-text="$translate('event.button.register')"
					@click="openRegistrationModal"
				/>
			</template>

			<div
				v-if="user?.id === posterEvent?.creatorId"
				class="event-actions__manage"
			>
				<CommonButton
					class="event-actions__button"
					:button-text="$translate('event.button.edit')"
					icon-name="edit"
					@click="openEventModal"
				/>

				<CommonButton
					class="event-actions__button"
					button-kind="warning"
					:button-text="$translate('event.button.delete')"
					icon-name="close"
					@click="deleteCard"
				/>
			</div>
		</div>
	</div>
</template>

<style lang="less" scoped>
.event {
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
	padding-left: var(--padding-side);
	padding-right: var(--padding-side);
	padding-bottom: 30px;
	margin-bottom: auto;

	&-description {
		display: flex;
		width: 100%;
		flex-direction: column;
		padding-inline: 0;
		margin-bottom: 36px;

		&__author {
			font-size: var(--font-size-XS);
			font-weight: var(--font-weight-bold);
			line-height: 16px;
			text-align: left;
			color: var(--color-text-secondary);
			margin-bottom: 12px;
		}

		&__title {
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
			font-size: var(--font-size-XS);
			line-height: 16px;
			text-decoration-line: underline;
			color: #5c9ad2;
			margin-bottom: var(--space-subsections);
		}

		&__description {
			word-wrap: break-word;
			font-size: var(--font-size-S);
			line-height: 20px;
		}
	}

	&-actions {
		display: flex;
		flex-direction: column;
		gap: var(--space-unrelated-items);
		margin-top: auto;

		&__manage {
			display: flex;
			justify-content: center;
			gap: 17px;
		}

		&__button {
			width: 100%;
			min-width: 165px;
			height: 40px;
		}
	}
}

.event-image {
	&__container {
		display: flex;
		width: 100%;
		min-height: 232px;
		height: 232px;
		position: relative;
		line-height: 0;
		background-color: var(--color-background-secondary);
		margin-bottom: 12px;
	}

	&__image {
		width: 100%;
		min-width: 100%;
		max-width: 100%;
		height: 100%;
		max-height: 232px;
		position: absolute;
		top: 0;
		left: 0;
		object-fit: cover;
		border-radius: 4px;
	}

	&__price {
		min-width: 50px;
		position: absolute;
		left: 12px;
		top: 12px;

		font-size: var(--font-size-XS);
		line-height: 16px;
		text-align: center;

		border-radius: 16px;
		color: var(--color-white);
		background-color: var(--color-accent-green-main);

		padding: 6px 10px;
		z-index: 1;
	}
}
</style>
