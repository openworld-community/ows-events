<script setup lang="ts">
import { EventOnPoster } from '../../../common/types';

const props = defineProps<{ eventData: EventOnPoster }>();

const openLocation = (url: string) => {
	window.open(url, '_blank');
};

//TODO пока заглушка, ведущая на указанный город в гуглокарты, потом нужно будет продумать добавление точного адреса
const templateURL = `https://www.google.com/maps/place/${props.eventData?.location.city}+${props.eventData?.location.country}`;
</script>

<template>
	<NuxtLink
		:to="`/event/${props.eventData.id}`"
		class="card"
	>
		<div class="card__image-container">
			<span class="card__price">{{ props.eventData.price }} €</span>
			<img
				:alt="$translate('home.events.image_alt')"
				class="card__image"
				:src="getEventImage(props.eventData)"
			/>
		</div>

		<div class="card card-description">
			<!--      TODO когда будет регистрация, нужно будет подставлять имя создавшего-->
			<p class="card-description__author">Peredelano</p>
			<h2 class="card-description__title">
				{{ props.eventData.title }}
			</h2>
			<p class="card-description__datetime">
				{{ convertToLocaleString(props.eventData.date, props.eventData?.timezone) }}
				({{ props.eventData.timezone?.timezoneOffset }}
				{{ props.eventData.timezone?.timezoneName }})
			</p>
			<span
				class="card-description__geolink"
				role="link"
				tabindex="0"
				@click.prevent="openLocation(templateURL)"
			>
				{{ props.eventData.location.country }}, {{ props.eventData.location.city }}
			</span>
		</div>
	</NuxtLink>
</template>

<style scoped lang="less">
.card {
	width: 100%;
	box-shadow: none;
	position: relative;

	&__image-container {
		display: flex;
		height: 176px;
		background-color: var(--color-background-secondary);
		margin-bottom: 12px;
		width: 100%;
		line-height: 0;
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
		margin-bottom: 44px;

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
