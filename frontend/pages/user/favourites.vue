<script setup lang="ts">
import { apiRouter } from '~/composables/useApiRouter';
import { SeoItemTypeEnum } from '~/constants/enums/seo';
import type { EventOnPoster } from '../../../common/types';

definePageMeta({
	layout: 'profile'
});

const mobile = inject<boolean>('mobile');
const favourites = ref<EventOnPoster[] | []>([]);

const { data } = await apiRouter.user.favourites.get.useQuery({});
if (data.value) favourites.value = data.value;
</script>

<template>
	<div class="favourites">
		<div
			v-if="!mobile"
			class="favourites__title-wrapper"
		>
			<h1 class="favourites__title">
				{{ $t('user.favourites.title') }}
			</h1>
		</div>

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
	</div>
</template>

<style scoped lang="less">
.favourites {
	display: flex;
	width: 100%;
	height: 100%;
	flex-direction: column;
	align-items: center;
	padding-bottom: var(--padding-vertical);

	@media (min-width: 768px) {
		justify-content: flex-start;
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
		width: 100%;
		font-size: var(--font-size-XL);
		font-weight: var(--font-weight-regular);
		text-align: left;

		@media (min-width: 768px) {
			width: 100%;
			font-size: var(--font-size-XL);
			font-weight: var(--font-weight-regular);
			text-align: left;
			margin-bottom: 20px;
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
	}
}

.empty {
	display: flex;
	width: 100%;
	flex-direction: column;
	align-items: center;

	&__image {
		width: 260px;
		height: 202px;
		background-image: url('/img/user/favourites-screen.svg');
		margin-bottom: var(--space-subsections);
	}

	&__text {
		text-align: center;
		font-size: var(--font-size-S);
		color: var(--color-text-secondary);
	}
}
</style>
