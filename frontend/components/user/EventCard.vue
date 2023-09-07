<script setup lang="ts">
import type { PropType } from 'vue';
import type { EventOnPoster } from '../../../common/types';
import { RoutePathEnum } from '../../constants/enums/route';
import { SeoItempropEventEnum, SeoItempropGlobalEnum } from '../../constants/enums/seo';
import { dateNow } from '~/utils/dates';

defineProps({
	eventData: {
		type: Object as PropType<EventOnPoster>,
		required: true
	}
});

const localePath = useLocalePath();
</script>

<template>
	<NuxtLink
		:to="localePath(`${RoutePathEnum.EVENT}/${eventData.id}`)"
		:class="['card', {'card--expired': eventData.date < dateNow}]"
		:itemprop="SeoItempropGlobalEnum.URL"
	>
		<div
			:class="[
				'card__image-container',
				{ 'card__image-container--background': !eventData.image }
			]"
			:itemprop="eventData.image ? undefined : SeoItempropGlobalEnum.IMAGE"
		>
			<img
				v-if="eventData.image"
				:itemprop="SeoItempropGlobalEnum.IMAGE"
				:alt="$t('home.events.image_alt')"
				class="card__image"
				:src="getEventImage(eventData)"
				width="94"
				height="74"
			/>
		</div>
		<div class="card__description description">
			<h2
				class="description__title"
				:itemprop="SeoItempropEventEnum.NAME"
			>
				{{ eventData.title }}
			</h2>
			<p
				class="description__date"
				:itemprop="SeoItempropEventEnum.START_DATE"
			>
				{{ convertToLocaleString(eventData.date) }}
			</p>
			<CommonTag
				:price="eventData.price"
				size="small"
			/>
		</div>
	</NuxtLink>
</template>

<style scoped lang="less">
.card {
	display: flex;
	width: 100%;
	background-color: var(--color-background-secondary);
	border-radius: 8px;
	padding: var(--space-related-items);
	margin-bottom: var(--padding-side);

	&--expired {
		opacity: 0.5;
	}

	&__image-container {
		display: flex;
		width: 94px;
		min-width: 94px;
		height: 74px;
		background-color: var(--color-input-field);
		background-size: cover;
		border-radius: 4px;
		line-height: 0;
		margin-right: var(--space-related-items);

		&--background {
			background: url('@/assets/img/event-small-preview@2x.png') center center no-repeat;
			background-size: cover;
		}
	}

	&__image {
		width: 100%;
		min-width: 100%;
		max-width: 100%;
		height: 100%;
		object-fit: cover;
		border-radius: 4px;
	}
}

.description {
	display: flex;
	flex-direction: column;
	overflow: hidden;

	&__title {
		display: inline-block;
		font-size: var(--font-size-S);
		line-height: 20px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		margin-bottom: var(--space-related-items);
	}

	&__date {
		font-size: var(--font-size-XS);
		line-height: 16px;
		margin-bottom: var(--space-related-items);
	}
}
</style>