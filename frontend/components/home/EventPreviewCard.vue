<script setup lang="ts">
import type { EventOnPoster } from '../../../common/types';
import {
	SeoItempropEventEnum,
	SeoItempropGlobalEnum,
	SeoItemTypeEnum
} from '../../constants/enums/seo';

defineProps<{ eventData: EventOnPoster }>();
</script>

<template>
	<NuxtLink
		itemscope
		:itemtype="SeoItemTypeEnum.EVENT"
		class="card"
		:to="`/event/${eventData.id}`"
		:itemprop="SeoItempropGlobalEnum.URL"
	>
		<div
			:class="[
				'card__image-container',
				{ 'card__image-container--background': !eventData.image }
			]"
			:itemprop="SeoItempropGlobalEnum.IMAGE"
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
			<!--      TODO когда будет user info, нужно будет подставлять имя создавшего-->
			<p
				v-if="eventData.title.toLowerCase().includes('peredelanoconf')"
				class="card-description__author"
				:itemprop="SeoItempropEventEnum.ORGANIZER"
			>
				Peredelano
			</p>
			<CommonAddress
				class="card-description__geo"
				:location="eventData.location"
				with-pin
			/>
			<h2
				class="card-description__title"
				:itemprop="SeoItempropEventEnum.NAME"
			>
				{{ eventData.title }}
			</h2>
			<p
				class="card-description__datetime"
				:itemprop="SeoItempropEventEnum.START_DATE"
			>
				{{ convertToLocaleString(eventData.date) }}
				<span
					v-if="eventData.timezone"
					class="card-description__datetime--timezone"
				>
					({{ eventData.timezone?.timezoneOffset }},
					{{ eventData.timezone?.timezoneName }})
				</span>
			</p>
			<CommonTag
				:price="eventData.price"
				:currency="'RSD'"
			/>
		</div>
	</NuxtLink>
</template>

<style scoped lang="less">
.card {
	display: block;
	width: 100%;
	position: relative;
	 padding-bottom: 44px;

	&__image-container {
		display: flex;
		width: 100%;
		height: 250px;
		background-color: var(--color-input-field);
		background-size: cover;
		margin-bottom: 12px;
		line-height: 0;

		&--background {
			background: url('@/assets/img/event-preview@2x.png') center center no-repeat;
			background-size: cover;
		}
	}

	&__image {
		width: 100%;
		min-width: 100%;
		max-width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.card-description {
		display: flex;
		width: 100%;
		flex-direction: column;
		padding-left: 16px;
		padding-right: 16px;

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
			font-weight: var(--font-weight-bold);
			font-size: var(--font-size-S);
			line-height: 20px;
			margin-bottom: 11px;

			&--timezone {
				font-size: var(--font-size-XS);
				line-height: 16px;
				color: var(--color-text-secondary);
			}
		}

		&__geo {
			margin-bottom: 12px;
		}
	}
}
</style>
