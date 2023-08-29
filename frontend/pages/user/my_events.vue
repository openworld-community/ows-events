<script setup lang="ts">
import { RouteNameEnum } from '../../constants/enums/route';
import type { EventOnPoster } from '../../../common/types';
import { SeoItemTypeEnum } from '../../constants/enums/seo';

definePageMeta({ name: RouteNameEnum.USER_FAVOURITES });

const myEvents = ref<EventOnPoster[] | []>([]);

if (process.client) {
	const { data } = await apiRouter.events.createdEvents.get.useQuery({});
	if (data.value) myEvents.value = data.value;
}
</script>

<template>
	<div class="my-events">
		<h1 class="my-events__title">{{ $t('user.my_events') }}</h1>
		<ul v-if="myEvents.length">
			<li
				v-for="event in myEvents"
				:key="event.id"
				itemscope
				:itemtype="SeoItemTypeEnum.EVENT"
			>
				<UserEventCard :event-data="event" />
			</li>
		</ul>
		<p
			v-else
			class="my-events__empty"
		>
			{{ $t('user.no_my_events') }}
		</p>
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
