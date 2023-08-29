<script setup lang="ts">
import { RouteNameEnum } from '../../constants/enums/route';
import { apiRouter } from '../../composables/useApiRouter';
import type { EventOnPoster } from '../../../common/types';

definePageMeta({ name: RouteNameEnum.USER_MY_EVENTS });

const favourites = ref<EventOnPoster[] | []>([])

onMounted(async () => {
	const {data} = await apiRouter.user.favourites.get.useQuery({})
	if (data.value) favourites.value = data.value
})

</script>

<template>
	<div class="favourites">
		<h1 class="favourites__title">{{ $t('user.favourites') }}</h1>
		<p
			v-if="!favourites.length"
			class="favourites__empty"
		>
			{{ $t('user.no_favourites') }}
		</p>
		<ul v-else>
			<li
				v-for="event in favourites"
				:key="event.id"
			>
				{{ event.title }}
			</li>
		</ul>
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