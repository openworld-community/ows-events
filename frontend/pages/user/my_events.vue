<script setup lang="ts">
import { SeoItempropGlobalEnum, SeoItemTypeEnum } from '~/constants/enums/seo';
import type { EventOnPoster } from '../../../common/types';

const myEvents = ref<EventOnPoster[] | []>([]);

const { data } = await apiRouter.events.createdEvents.get.useQuery({});
if (data.value) myEvents.value = data.value;
</script>

<template>
	<div class="my-events">
		<h1 class="my-events__title">{{ $t('user.my_events.title') }}</h1>
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
		<div
			v-else
			class="my-events__empty empty"
		>
			<img
				src="~/assets/img/user/my-events-screen.svg"
				width="202"
				height="203"
				alt=""
				class="empty__image"
				:itemprop="SeoItempropGlobalEnum.IMAGE"
			/>
			<p class="empty__text">
				{{ $t('user.my_events.no_my_events') }}
			</p>
		</div>
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
