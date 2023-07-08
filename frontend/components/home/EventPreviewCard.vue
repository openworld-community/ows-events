<script setup lang="ts">
import type { EventOnPoster } from '../../../common/types';
import Currency from '../common/Tag.vue';
import Address from '../common/Address.vue';

const props = defineProps<{ eventData: EventOnPoster }>();
</script>

<template>
	<NuxtLink
		itemscope
		itemtype="https://schema.org/Event"
		class="card"
		:to="`/event/${props.eventData.id}`"
		itemprop="url"
	>
		<div
			:class="[
				'card__image-container',
				{ 'card__image-container--background': !eventData.image }
			]"
			itemprop="image"
		>
			<img
				v-if="eventData.image"
				itemprop="image"
				:alt="$t('home.events.image_alt')"
				class="card__image"
				:src="getEventImage(props.eventData)"
				width="375"
				height="176"
			/>
		</div>

		<div class="card-description">
			<!--      TODO когда будет user info, нужно будет подставлять имя создавшего-->
			<p
				v-if="eventData.title.toLowerCase().includes('peredelanoconf')"
				class="card-description__author"
				itemprop="composer"
			>
				Peredelano
			</p>
			<Address
				class="card-description__geo"
				:location="props.eventData.location"
				with-pin
			/>
			<h2
				class="card-description__title"
				itemprop="name"
			>
				{{ props.eventData.title }}
			</h2>
			<p
				class="card-description__datetime"
				itemprop="startDate"
			>
				{{ convertToLocaleString(props.eventData.date) }}
				<span class="card-description__datetime--timezone">
					({{ props.eventData.timezone?.timezoneOffset }},
					{{ props.eventData.timezone?.timezoneName }})
				</span>
			</p>
			<Currency
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
