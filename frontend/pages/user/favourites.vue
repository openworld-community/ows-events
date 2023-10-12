<script setup lang="ts">
import { apiRouter } from '~/composables/useApiRouter';
import { SeoItemTypeEnum } from '~/constants/enums/seo';
import type { EventOnPoster } from '../../../common/types';

const mobile = inject<boolean>('mobile');
const favourites = ref<EventOnPoster[] | []>([]);

const { data } = await apiRouter.user.favourites.get.useQuery({});
if (data.value) favourites.value = data.value;
</script>

<template>
	<div class="root">
		<HeaderCommon :has-back-button="mobile" />
		<main class="favourites">
			<h1 class="favourites__title">{{ $t('user.favourites.title') }}</h1>

			<ul
				v-if="favourites.length"
				class="favourites__list"
			>
				<li
					v-for="event in favourites"
					:key="event.id"
					itemscope
					:itemtype="SeoItemTypeEnum.EVENT"
				>
					<UserEventCard :event-data="event" />
				</li>
			</ul>
			<div
				v-else
				class="favourites__empty empty"
			>
				<div class="empty__image" />
				<p class="empty__text">
					{{ $t('user.favourites.no_favourites') }}
				</p>
			</div>
		</main>
		<FooterCommon v-if="!mobile" />
	</div>
</template>

<style scoped lang="less">
.favourites {
	display: flex;
	width: 100%;
	height: 100%;
	flex-direction: column;
	align-items: center;
	padding-left: var(--padding-side);
	padding-right: var(--padding-side);
	padding-bottom: var(--padding-vertical);

	@media (min-width: 768px) {
		justify-content: center;
		height: unset;
		padding-top: 60px;
	}

	&__title {
		width: 100%;
		font-size: var(--font-size-ML);
		font-weight: var(--font-weight-regular);
		margin-bottom: var(--space-subsections);
		text-align: center;
		margin-top: var(--padding-vertical);

		@media (min-width: 768px) {
			max-width: 820px;
			font-size: var(--font-size-XXL);
			line-height: 38px;
			text-align: left;
			margin-top: 0;
			margin-bottom: 32px;
		}
	}

	&__list {
		width: 100%;

		@media (min-width: 768px) {
			max-width: 820px;
		}
	}
}

.empty {
	display: flex;
	width: 100%;
	flex-direction: column;
	margin-top: 40%;
	align-items: center;

	@media (min-width: 768px) {
		margin-top: 5%;
	}

	&__image {
		width: 260px;
		height: 202px;
		background-image: url('~/assets/img/user/favourites-screen.svg');
		margin-bottom: var(--space-subsections);
	}

	&__text {
		text-align: center;
		font-size: var(--font-size-S);
		color: var(--color-text-secondary);
	}
}
</style>
