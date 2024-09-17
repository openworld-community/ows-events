<script setup lang="ts">
import { SeoItemTypeEnum } from '~/constants/enums/seo';
import type { EventOnPoster } from '../../../common/types';
import { RoutePathEnum } from '../../constants/enums/route';
import { ref } from 'vue';
import UserButtons from '~/components/user/UserButtons.vue';

definePageMeta({
	layout: 'profile'
});

const mobile = inject<boolean>('mobile');

const myEvents = ref<EventOnPoster[] | []>([]);

const localePath = useLocalePath();
const { data } = await apiRouter.events.createdEvents.get.useQuery({});
if (data.value) myEvents.value = data.value;

const deleteCard = async (id: string) => {
	// если запрос проходит, то ничего не приходит, т.е. может придти только error
	const { error } = await apiRouter.events.delete.useMutation({ data: { id } });
	if (error.value) return;

	myEvents.value = myEvents.value.filter((event: EventOnPoster) => event.id !== id);
};

const onEditButtonClick = async (id: string) => {
	await navigateTo(localePath({ path: `${RoutePathEnum.EVENT_EDIT}${id}` }));
};

// const addToFavorites = async (id: string) => {
// 	// Задел для избранного добавьте в UserButtons @favorite="addToFavorites" и перепишите визуал в компоненте UserButtons
// };
</script>

<template>
	<div class="my-events">
		<ul
			v-if="myEvents.length"
			class="my-events__list"
		>
			<div
				v-if="!mobile"
				class="my-events__title-wrapper"
			>
				<h1 class="my-events__title">
					{{ $t('user.my_events.title') }}
				</h1>
			</div>
			<li
				v-for="event in myEvents"
				:key="event.id"
				itemscope
				:itemtype="SeoItemTypeEnum.EVENT"
				class="my-events__list__event"
			>
				<UserEventCard :event-data="event">
					<UserButtons
						:show-edit-delete-buttons="true"
						:event="event"
						@delete="deleteCard"
						@edit="onEditButtonClick"
					/>
				</UserEventCard>
			</li>
		</ul>

		<div
			v-else
			class="my-events__empty empty"
		>
			<div class="empty__image" />
			<p class="empty__text">
				{{ $t('user.my_events.no_my_events') }}
			</p>
		</div>
		<div class="my-events__bottom">
			<CommonButton
				class="my-events__button"
				button-kind="success"
				:button-text="$t('global.button.new_event')"
				:link="`${RoutePathEnum.EVENT_EDIT}new`"
			/>
		</div>
	</div>
</template>

<style scoped lang="less">
.my-events {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-bottom: var(--padding-vertical);

	@media (min-width: 768px) {
		justify-content: center;
		//height: unset;
		padding-left: 5px;
		padding-right: 0;
		padding-top: 20px;
	}

	&__title-wrapper {
		@media (min-width: 768px) {
			display: flex;
			width: 100%;
			justify-content: center;
		}
	}

	&__title {
		@media (min-width: 768px) {
			width: 100%;
			font-size: var(--font-size-XL);
			font-weight: var(--font-weight-regular);
			text-align: left;
			margin-bottom: 20px;
			text-align: center;
		}

		@media (min-width: 1440px) {
			font-size: var(--font-size-XXL);
			line-height: 38px;
			font-weight: 500;
			padding-left: 15px;
			text-align: left;
		}
	}

	&__list {
		display: flex;
		flex-direction: column;
		width: 100%;
		flex-grow: 1;
		gap: 12px;

		@media (min-width: 768px) {
			width: 55vw;
			max-width: 900px;
		}

		&__event {
			position: relative;
			transition: width 0.3s ease-in-out, height 1s ease-in-out;
		}
	}

	&__bottom {
		display: flex;
		width: 100%;
		justify-content: center;
		position: static;
		bottom: 0;
		left: 0;
		background-color: var(--color-white);
		padding: 20px var(--padding-side);

		@media (min-width: 768px) {
			width: 55vw;
			max-width: 900px;
			justify-content: flex-end;
			background-color: transparent;
			padding-right: 0px;
			padding-bottom: 0;
			margin: unset;
			position: sticky;
			bottom: 20px;
			right: 0;
			z-index: 1;
		}
	}

	&__button {
		width: 80%;

		@media (min-width: 768px) {
			width: max-content;
		}
	}
}

.empty {
	display: flex;
	width: 100%;
	flex-direction: column;
	//position: absolute;
	//top: 50%;
	//left: 50%;
	//margin-top: 40%;
	//margin-top: 50%;
	//transform: translate(-50%, -50%);
	align-items: center;

	&__image {
		width: 202px;
		height: 203px;
		background-image: url('/img/user/my-events-screen.svg');
		margin-bottom: var(--space-subsections);
	}

	&__text {
		text-align: center;
		font-size: var(--font-size-S);
		color: var(--color-text-secondary);
	}
}
</style>
