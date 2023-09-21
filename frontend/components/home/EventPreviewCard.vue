<script setup lang="ts">
import type { EventOnPoster } from '../../../common/types';
import { SeoItempropEventEnum, SeoItempropGlobalEnum } from '../../constants/enums/seo';
import { RoutePathEnum } from '../../constants/enums/route';

defineProps<{ eventData: EventOnPoster }>();
const localePath = useLocalePath();
</script>

<template>
	<NuxtLink
		class="card"
		:to="localePath(`${RoutePathEnum.EVENT}/${eventData.id}`)"
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
				width="375"
				height="176"
			/>
		</div>

		<div class="card-description">
			<div class="card-description__top">
				<!--      TODO когда будет user info, нужно будет подставлять имя создавшего-->
				<p
					v-if="eventData.organizer"
					class="card-description__author"
					:itemprop="SeoItempropEventEnum.ORGANIZER"
				>
					{{ eventData.organizer }}
				</p>
				<CommonTag
					:price="eventData?.price"
					class="card-description__tag"
				/>
				<h2
					class="card-description__title"
					:itemprop="SeoItempropEventEnum.NAME"
				>
					{{ eventData.title }}
				</h2>
			</div>
			<div class="card-description__bottom">
				<CommonEventDetails
					class="card-description__datetime"
					:start-date="convertToLocaleString(eventData.date)"
					with-pin
				/>
				<CommonEventDetails
					class="card-description__geo"
					:location="eventData.location"
					with-pin
				/>
			</div>
		</div>
	</NuxtLink>
</template>

<style scoped lang="less">
.card {
	display: flex;
	flex-direction: column;
	width: 100%;

	@media (min-width: 768px) {
		width: 100%;
		height: 100%;
		border: 1px solid var(--color-input-field);
		border-radius: 8px;
	}

	@media (min-width: 1440px) {
		width: 100%;
	}

	&__image-container {
		display: flex;
		width: calc(100% + 2px);
		height: 250px;
		background-color: var(--color-input-field);
		background-size: cover;
		line-height: 0;
		margin-top: -1px;
		margin-left: -1px;
		margin-right: -1px;

		&--background {
			background: url('@/assets/img/event-preview@2x.png') center center no-repeat;
			background-size: cover;
		}

		@media (min-width: 768px) {
			min-height: 250px;
			max-height: 250px;
			border-top-left-radius: 8px;
			border-top-right-radius: 8px;
		}
	}

	&__image {
		width: 100%;
		min-width: 100%;
		max-width: 100%;
		height: 100%;
		object-fit: cover;

		@media (min-width: 768px) {
			border-top-left-radius: 8px;
			border-top-right-radius: 8px;
		}
	}

	.card-description {
		display: flex;
		width: 100%;
		flex-direction: column;
		padding: 12px 16px 44px;

		@media (min-width: 768px) {
			height: inherit;
			justify-content: space-between;
			padding: 12px;
			border-bottom-left-radius: 8px;
			border-bottom-right-radius: 8px;
		}

		&__bottom {
			@media (min-width: 786px) {
				margin-top: auto;
			}
		}

		&__author {
			//TODO: пока верстка только мобилки
			max-width: 480px;
			word-wrap: break-word;
			font-size: var(--font-size-XS);
			font-weight: var(--font-weight-bold);
			line-height: 16px;
			text-align: left;
			color: var(--color-text-secondary);
			margin-bottom: 12px;
		}

		&__tag {
			margin-bottom: 12px;
		}

		&__title {
			//TODO: пока верстка только мобилки
			max-width: 480px;
			word-wrap: break-word;
			font-size: var(--font-size-L);
			font-weight: var(--font-weight-bold);
			line-height: 24px;
			margin-bottom: 12px;
		}

		&__datetime {
			margin-bottom: 8px;
		}
	}
}
</style>
