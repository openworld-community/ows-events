<script setup lang="ts">
import { useModal, type UseModalOptions, VueFinalModal } from 'vue-final-modal';
import { RouteNameEnum } from '@/constants/enums/route';
import RegistrationModal from '../../components/modal/Registration.vue';
import EventModal from '../../components/modal/Event.vue';
import type { UserInfo } from '@/../common/types/user';
import DeleteEvent from '../../components/modal/DeleteEvent.vue';
import type { EventOnPoster } from '../../../common/types';

definePageMeta({ name: RouteNameEnum.EVENT });

const route = useRoute();
const id = route.params.id as string;

const user = useCookie<UserInfo | null>('user');

const { data, refresh: refreshEvent } = await apiRouter.events.get.useQuery({ id });

//TODO: Перепишите позже на нормальном, пожалуйста
let posterEvent: EventOnPoster;
if (data.value?.type === 'success') {
	posterEvent = data.value.data;
} else {
	throw 'err';
}

const { $translate } = useNuxtApp();

useHead({
	title: `${$translate('meta.title')} / ${posterEvent?.title}`
});

const deleteCard = async () => {
	const { data } = await apiRouter.events.delete.useMutation({ id });
	if (data.value?.type === 'success') {
		await closeDeleteEventModal();
		navigateTo({ name: RouteNameEnum.HOME });
	} else {
		console.error(data.value?.errors);
	}
};

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
	>
		<div
			:class="[
				'event-image',
				'event-image__container',
				{ 'event-image__container--background': !posterEvent.image }
			]"
		>
			<span class="event-image__price">{{ posterEvent.price }} €</span>
			<img
				v-if="posterEvent.image"
				:src="getEventImage(posterEvent)"
				:alt="$translate('event.image.event')"
				class="event-image__image"
			/>
		</div>

		<div class="event event-description">
			<!--      TODO когда будет регистрация, нужно будет подставлять имя создавшего-->
			<p class="event-description__author">Peredelano</p>
			<h2 class="event-description__title">
				{{ posterEvent.title }}
			</h2>

			<p class="event-description__datetime">
				<span v-if="posterEvent.durationInSeconds">
					{{ convertToLocaleString(posterEvent.date, posterEvent.timezone) }}
					-
					{{
						convertToLocaleString(
							posterEvent.date + posterEvent.durationInSeconds,
							posterEvent.timezone
						)
					}}
				</span>
				<span v-else>
					{{
						convertToLocaleString(posterEvent.date ?? Date.now(), posterEvent.timezone)
					}}
				</span>
				<br />
				({{ posterEvent.timezone?.timezoneOffset }}
				{{ posterEvent.timezone?.timezoneName }})
			</p>
			<!-- TODO пока заглушка, ведущая на указанный город в гуглокарты, потом нужно будет продумать добавление точного адреса -->
			<NuxtLink
				class="event-description__geolink"
				:to="`https://www.google.com/maps/place/${posterEvent.location.city}+${posterEvent.location.country}`"
				target="_blank"
			>
				{{ posterEvent.location.country }}, {{ posterEvent.location.city }}
			</NuxtLink>
			<p class="event-description__description">
				{{ posterEvent.description }}
			</p>
		</div>

		<div class="event-actions">
			<template v-if="posterEvent.url">
				<CommonButton
					v-if="posterEvent.url !== 'self'"
					button-kind="success"
					class="event-actions__button"
					:button-text="$translate('event.button.contact')"
					:link="posterEvent.url"
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
				v-if="user?.id === posterEvent.creatorId"
				class="event-actions__manage"
			>
				<CommonButton
					class="event-actions__button"
					button-kind="warning"
					:button-text="$translate('event.button.delete')"
					icon-name="trash"
					icon-width="16"
					icon-height="16"
					@click="openDeleteEventModal"
				/>
				<CommonButton
					class="event-actions__button"
					:button-text="$translate('event.button.edit')"
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
	padding-left: var(--padding-side);
	padding-right: var(--padding-side);
	padding-bottom: 30px;
	margin-bottom: auto;

	&-description {
		display: flex;
		width: 100%;
		flex-direction: column;
		padding-inline: 0;

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
			max-height: 155px;
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
		gap: var(--space-unrelated-items);
		margin-top: auto;

		&__manage {
			display: flex;
			justify-content: center;
			gap: 10px;
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
		position: relative;
		line-height: 0;
		background-color: var(--color-input-field);
		margin-bottom: 12px;

		&--background {
			background: url('@/assets/img/event-card@2x.png') center center no-repeat;
			background-size: cover;
		}
	}

	&__image {
		width: 100%;
		min-width: 100%;
		max-width: 100%;
		height: 232px;
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
