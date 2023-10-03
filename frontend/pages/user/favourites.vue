<script setup lang="ts">
import { apiRouter } from '~/composables/useApiRouter';
import { SeoItempropGlobalEnum, SeoItemTypeEnum } from '~/constants/enums/seo';
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

			<ul v-if="favourites.length">
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
				<img
					src="~/assets/img/user/favourites-screen.svg"
					width="260"
					height="202"
					alt=""
					class="empty__image"
					:itemprop="SeoItempropGlobalEnum.IMAGE"
				/>
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
	width: 100%;
	height: 100%;
	padding-left: var(--padding-side);
	padding-right: var(--padding-side);
	padding-bottom: var(--padding-vertical);

	&__title {
		font-size: var(--font-size-ML);
		font-weight: var(--font-weight-regular);
		margin-bottom: var(--space-subsections);
		text-align: center;
		margin-top: var(--padding-vertical);
	}
}

.empty {
	display: flex;
	width: 100%;
	flex-direction: column;
	margin-top: 40%;
	align-items: center;

	&__image {
		margin-bottom: var(--space-subsections);
	}

	&__text {
		text-align: center;
		font-size: var(--font-size-S);
		color: var(--color-text-secondary);
	}
}
</style>
