<script setup lang="ts">
import { RouteNameEnum } from '../../constants/enums/route';
import type { EventOnPoster } from '../../../common/types';

definePageMeta({ name: RouteNameEnum.USER_FAVOURITES });

const myEvents = ref<EventOnPoster[] | []>([])

onMounted(async () => {
	const { data } = await apiRouter.events.createdEvents.get.useQuery({});
	if (data.value) myEvents.value = data.value
})

</script>

<template>
	<div class="my-events">
		<h1 class="my-events__title">{{ $t('user.my_events') }}</h1>
		<p
			v-if="!myEvents.length"
			class="my-events__empty"
		>
			{{ $t('user.no_my_events') }}
		</p>
		<ul v-else>
			<li
				v-for="event in myEvents"
				:key="event.id"
			>
				{{ event.title }}
			</li>
		</ul>
	</div>
</template>

<style scoped lang="less">
.my-events {
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