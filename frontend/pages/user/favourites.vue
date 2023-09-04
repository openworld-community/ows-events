<script setup lang="ts">
import { apiRouter } from '../../composables/useApiRouter';
import type { EventOnPoster } from '../../../common/types';
import { SeoItemTypeEnum } from '../../constants/enums/seo';

const favourites = ref<EventOnPoster[] | []>([]);

const { data } = await apiRouter.user.favourites.get.useQuery({});
if (data.value) favourites.value = data.value;
</script>

<template>
	<div class="favourites">
		<h1 class="favourites__title">{{ $t('user.favourites') }}</h1>

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
		<p
			v-else
			class="favourites__empty"
		>
			{{ $t('user.no_favourites') }}
		</p>
	</div>
</template>

<style scoped lang="less">
.favourites {
	padding: var(--padding-vertical) var(--padding-side);

	&__title {
		font-size: var(--font-size-ML);
		font-weight: var(--font-weight-regular);
		margin-bottom: var(--space-subsections);
		text-align: center;
	}

	&__empty {
		text-align: center;
		font-size: var(--font-size-S);
		color: var(--color-text-secondary);
	}
}
</style>
