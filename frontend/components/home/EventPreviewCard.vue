<script setup lang="ts">
import type { EventOnPoster } from '../../../common/types';
import Currency from '../common/Currency.vue';
import Address from '../common/Address.vue';
const { $i18n } = useNuxtApp();

const props = defineProps<{ eventData: EventOnPoster }>();

</script>

<template>
	<div
		itemscope
		itemtype="https://schema.org/Event"
	>
		<NuxtLink
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
				<Currency
						:price="eventData.price"
						:currency="'RSD'"
				/>

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
				>
					<span itemprop="composer">
						Peredelano
					</span>
				</p>
				<h2
						class="card-description__title"
						itemprop="name"
				>
					{{ props.eventData.title }}
				</h2>
				<p class="card-description__datetime">
					<span itemprop="startDate">
						{{ convertToLocaleString(props.eventData.date) }}
					</span>
					({{ props.eventData.timezone?.timezoneOffset }}
					{{ props.eventData.timezone?.timezoneName }})
				</p>

				<div class="card-description__geo-box">
					<CommonIcon
							name="map-pin"
							class="card-description__pin"
					/>
					<Address
							class-name="card-description__geo"
							:country="props.eventData.location.country"
							:city="props.eventData.location.city"
					/>
				</div>
			</div>
		</NuxtLink>
	</div>
</template>

<style scoped lang="less">
.card {
	width: 100%;
	min-height: 287px;
	position: relative;
	margin-bottom: 44px;

	&__image-container {
		display: flex;
		width: 100%;
		height: 176px;
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
			margin-bottom: var(--space-related-items);
		}

		&__datetime {
			font-size: var(--font-size-XS);
			font-weight: var(--font-weight-bold);
			line-height: 16px;
			color: var(--color-text-secondary);
			margin-bottom: var(--space-related-items);
		}

		&__geo-box {
			display: flex;
			align-items: center;
		}

		&__geo {
			display: block;
			width: max-content;
			font-size: var(--font-size-XS);
			color: var(--color-text-secondary);
			font-weight: var(--font-weight-bold);
			line-height: 16px;
		}

		&__pin {
			color: var(--color-text-secondary);
			margin-right: 13px;
		}
	}
}
</style>
