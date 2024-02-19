<script setup lang="ts">
import { SeoItemTypeEnum } from '~/constants/enums/seo';
import type { EventOnPoster } from '../../../common/types';
import { RoutePathEnum } from '../../constants/enums/route';

const mobile = inject<boolean>('mobile');
const localePath = useLocalePath();

const myEvents = ref<EventOnPoster[] | []>([]);

const { data } = await apiRouter.events.createdEvents.get.useQuery({});
if (data.value) myEvents.value = data.value;
</script>

<template>
	<div class="root">
		<HeaderCommon
			:has-back-button="mobile"
			:title-on-mobile="$t('user.my_events.title')"
		/>
		<main class="my-events">
			<div
				v-if="!mobile"
				class="my-events__title-wrapper"
			>
				<h1 class="my-events__title">
					{{ $t('user.my_events.title') }}
				</h1>
			</div>
			<div
				v-if="myEvents.length"
				class="my-events__list-wrapper"
			>
				<ul class="my-events__list">
					<li
						v-for="event in myEvents"
						:key="event.id"
						itemscope
						:itemtype="SeoItemTypeEnum.EVENT"
					>
						<UserEventCard :event-data="event" />
					</li>
				</ul>
			</div>
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
					:link="localePath(`${RoutePathEnum.EVENT_EDIT}new`)"
				/>
			</div>
		</main>
		<FooterCommon v-if="!mobile" />
	</div>
</template>

<style scoped lang="less">
.my-events {
	display: flex;
	width: 100%;
	height: 100%;
	min-height: calc(100vh - var(--header-height));
	flex-direction: column;
	align-items: center;
	position: relative;
	padding-bottom: var(--padding-vertical);

	//Для адаптивной height на iOs
	@supports (-webkit-touch-callout: none) {
		min-height: -webkit-fill-available;
	}

	@media (min-width: 768px) {
		justify-content: space-between;
		min-height: unset;
		padding-top: 20px;
		padding-bottom: 20px;
	}

	&__title-wrapper {
		@media (min-width: 768px) {
			display: flex;
			width: 100%;
			justify-content: center;
			padding-left: var(--padding-side);
			padding-right: var(--padding-side);
		}
	}

	&__title {
		@media (min-width: 768px) {
			width: 100%;
			font-size: var(--font-size-XL);
			font-weight: var(--font-weight-regular);
			text-align: left;
			max-width: 820px;
			margin-bottom: 32px;
		}

		@media (min-width: 1440px) {
			font-size: var(--font-size-XXL);
			line-height: 38px;
		}
	}

	&__list-wrapper {
		display: flex;
		width: 100%;
		max-height: calc(100vh - var(--header-height) - 76px);
		overflow-y: auto;
		padding-left: var(--padding-side);
		padding-right: var(--padding-side);

		@media (min-width: 768px) {
			height: 100%;
			max-height: unset;
			overflow-y: unset;
			justify-content: center;
		}
	}

	&__list {
		width: 100%;

		@media (min-width: 768px) {
			max-width: 820px;
		}
	}

	&__bottom {
		display: flex;
		width: 100%;
		justify-content: center;
		position: fixed;
		bottom: 0;
		left: 0;
		background-color: var(--color-white);
		padding: 20px var(--padding-side);

		@media (min-width: 768px) {
			justify-content: flex-end;
			background-color: transparent;
			padding-top: 0;
			padding-bottom: 0;
			margin: unset 0 0 auto;

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
	position: absolute;
	top: 50%;
	left: 50%;
	//margin-top: 40%;
	//margin-top: 50%;
	transform: translate(-50%, -50%);
	align-items: center;

	&__image {
		width: 202px;
		height: 203px;
		background-image: url('~/assets/img/user/my-events-screen.svg');
		margin-bottom: var(--space-subsections);
	}

	&__text {
		text-align: center;
		font-size: var(--font-size-S);
		color: var(--color-text-secondary);
	}
}
</style>
