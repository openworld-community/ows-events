<script setup lang="ts">
import type { EventOnPoster } from '../../../common/types';

const props = defineProps<{ eventData: EventOnPoster }>();

//TODO пока заглушка, ведущая на указанный город в гуглокарты, потом нужно будет продумать добавление точного адреса
const templateURL = `https://www.google.com/maps/place/${props.eventData?.location.city}+${props.eventData?.location.country}`;
</script>

<template>
	<div class="card">
		<NuxtLink :to="`/event/${props.eventData.id}`">
			<div
				:class="[
					'card__image-container',
					{ 'card__image-container--background': !eventData.image }
				]"
			>
				<span class="card__price">
					{{ getPrice(eventData) }}
				</span>
				<img
					v-if="eventData.image"
					:alt="$translate('home.events.image_alt')"
					class="card__image"
					:src="getEventImage(props.eventData)"
					width="375"
					height="176"
				/>
			</div>

			<div class="card-description">
				<!--      TODO когда будет регистрация, нужно будет подставлять имя создавшего-->
				<p class="card-description__author">Peredelano</p>
				<h2 class="card-description__title">
					{{ props.eventData.title }}
				</h2>
				<p class="card-description__datetime">
					{{ convertToLocaleString(props.eventData.date) }}
					({{ props.eventData.timezone?.timezoneOffset }}
					{{ props.eventData.timezone?.timezoneName }})
				</p>
			</div>
		</NuxtLink>

		<!--    отдельный линк, т.к. нельзя ссылку класть в ссылку, а если делать другим типом контейнера и переходить по @click.prevent, отрабатывает некорректно и местами багует-->
		<NuxtLink
			:to="templateURL"
			target="_blank"
			class="card-link card-link__geolink"
		>
			{{ props.eventData.location.country }}, {{ props.eventData.location.city }}
		</NuxtLink>
	</div>
</template>

<style scoped lang="less">
.card {
	width: 100%;
	position: relative;
	padding-bottom: 44px;

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

	&__price {
		min-width: 50px;
		position: absolute;
		left: 16px;
		top: 12px;

		font-size: var(--font-size-XS);
		line-height: 16px;
		text-align: center;

		border-radius: 16px;
		color: var(--color-white);
		background-color: var(--color-accent-green-main);

		padding: 6px 10px;
		z-index: 1;
	}

	.card-description {
		display: flex;
		width: 100%;
		flex-direction: column;
		padding-left: 16px;
		padding-right: 16px;

		&__author {
			font-size: var(--font-size-XS);
			font-weight: var(--font-weight-bold);
			line-height: 16px;
			text-align: left;
			color: var(--color-text-secondary);

			margin-bottom: 12px;
		}

		&__title {
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
	}

	.card-link {
		display: block;
		width: max-content;
		padding-left: 16px;
		padding-right: 16px;

		&__geolink {
			width: max-content;
			font-size: var(--font-size-XS);
			line-height: 16px;
			text-decoration-line: underline;
			color: #5c9ad2;
		}
	}
}
</style>
