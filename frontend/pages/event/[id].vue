<script setup lang="ts">
import { useModal, type UseModalOptions, VueFinalModal } from 'vue-final-modal';
import { RouteNameEnum } from '@/constants/enums/route';
import EventModal from '@/components/modal/Event.client.vue';
import DeleteEvent from '@/components/modal/DeleteEvent.vue';
import type { UserInfo } from '@/../common/types/user';

definePageMeta({ name: RouteNameEnum.EVENT });
const route = useRoute();
const id = getFirstParam(route.params.id);

const user = useCookie<UserInfo | null>('user');

const { data, refresh: refreshEvent } = await apiRouter.events.get.useQuery({ data: { id } });

const posterEvent = computed(() => {
	if (!data.value) return void navigateTo({ name: RouteNameEnum.HOME });
	return data.value;
});

useHead({ titleTemplate: `%s / ${posterEvent.value?.title}` });

const redirect = () => {
	useTrackEvent('redirect');
	const tmpEl = document.createElement('a');
	if (!posterEvent.value?.url) return 0;
	tmpEl.href = posterEvent.value?.url;
	tmpEl.target = '_blank';
	tmpEl.click();
};

const deleteCard = async () => {
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

const imgWrapper = ref<HTMLDivElement | undefined>(undefined);
const actionsWrapper = ref<HTMLDivElement | null>(null);
const infoWrapper = ref<HTMLDivElement | null>(null);
const descriptionHeight = ref();
const getDescriptionHeight = () => {
	descriptionHeight.value = `max-height: calc(${window.innerHeight}px - (52px + ${
		actionsWrapper.value?.getBoundingClientRect().height
	}px + ${infoWrapper.value?.getBoundingClientRect().height}px + ${
		imgWrapper.value?.getBoundingClientRect().height
	}px))`;
};

onMounted(() => {
	window.addEventListener('resize', getDescriptionHeight);
	getDescriptionHeight();
});
onBeforeUnmount(() => window.removeEventListener('resize', getDescriptionHeight));
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
			ref="imgWrapper"
		>
			<span class="event-image__price">
				{{ getPrice(posterEvent) }}
			</span>
			<img
				v-if="posterEvent.image"
				:src="getEventImage(posterEvent)"
				:alt="$t('event.image.event')"
				class="event-image__image"
			/>
		</div>

		<div class="event event-info">
			<!--      TODO когда будет user info, нужно будет подставлять имя создавшего-->
			<div
				class="event-info__wrapper"
				ref="infoWrapper"
			>
				<p
					v-if="posterEvent.title.toLowerCase().includes('peredelanoconf')"
					class="event-info__author"
				>
					Peredelano
				</p>
				<h2 class="event-info__title">
					{{ posterEvent.title }}
				</h2>

				<p class="event-info__datetime">
					<span v-if="posterEvent.durationInSeconds">
						{{ convertToLocaleString(posterEvent.date) }}
						-
						{{
							convertToLocaleString(
								posterEvent.date + posterEvent.durationInSeconds * 1000
							)
						}}
					</span>
					<span v-else>
						{{ convertToLocaleString(posterEvent.date ?? Date.now()) }}
					</span>
					<br />
					({{ posterEvent.timezone?.timezoneOffset }}
					{{ posterEvent.timezone?.timezoneName }})
				</p>
				<!-- TODO пока заглушка, ведущая на указанный город в гуглокарты, потом нужно будет продумать добавление точного адреса -->
				<NuxtLink
					class="event-info__geolink"
					:to="`https://www.google.com/maps/place/${posterEvent.location.city}+${posterEvent.location.country}`"
					target="_blank"
				>
					{{ posterEvent.location.country }}, {{ posterEvent.location.city }}
				</NuxtLink>
			</div>
			<p
				class="event-info__description"
				:style="descriptionHeight"
			>
				{{ posterEvent.description }}
			</p>
		</div>

		<div
			class="event-actions"
			ref="actionsWrapper"
		>
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
					(user?.id === posterEvent.creatorId || posterEvent.creatorId === 'dev-user')
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
	max-height: 100vh;
	padding-left: var(--padding-side);
	padding-right: var(--padding-side);
	margin-bottom: auto;

	&-info {
		display: flex;
		width: 100%;
		flex-direction: column;
		padding-inline: 0;

		&__wrapper {
			padding-bottom: 15px;
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
			padding-bottom: 12px;
		}

		&__title {
			//TODO: пока верстка только мобилки
			max-width: 480px;
			word-wrap: break-word;
			font-size: var(--font-size-L);
			font-weight: var(--font-weight-bold);
			line-height: 24px;
			padding-top: 12px;
			padding-bottom: var(--space-related-items);
		}

		&__datetime {
			font-size: var(--font-size-XS);
			font-weight: var(--font-weight-bold);
			line-height: 16px;
			color: var(--color-text-secondary);
			padding-bottom: var(--space-related-items);
		}

		&__geolink {
			font-size: var(--font-size-XS);
			line-height: 16px;
			text-decoration-line: underline;
			color: #5c9ad2;
		}

		&__description {
			//TODO: пока верстка только мобилки
			max-width: 480px;
			min-height: 150px;
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
				margin-bottom: var(--space-unrelated-items);
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
		min-height: 232px;
		position: relative;
		line-height: 0;
		background-color: var(--color-input-field);

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
