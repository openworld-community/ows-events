<script setup lang="ts">
import type { EventOnPoster } from '../../../common/types';
import { SeoItempropEventEnum, SeoItempropGlobalEnum } from '../../constants/enums/seo';
import { RoutePathEnum } from '../../constants/enums/route';
import { trimString } from '../../utils/trimString';
import { convertEventDateToLocaleString } from '../../utils/dates';
import { Tags } from '../../../common/const/tags';

const props = defineProps<{ eventData: EventOnPoster }>();
const { t } = useI18n();
const mobile = inject('mobile');
const { sendAnalytics } = useSendTrackingEvent();

const startDate = ref(
	convertEventDateToLocaleString(
		props.eventData.date,
		props.eventData.isOnline,
		props.eventData.timezone
	)
);

const endDate = computed(() => {
	// проверка на однодневный ивент
	if (props.eventData.date + props.eventData.durationInSeconds * 1000 === props.eventData.date) {
		return '';
	}

	return convertEventDateToLocaleString(
		props.eventData.date + props.eventData.durationInSeconds * 1000,
		props.eventData.isOnline,
		props.eventData.timezone
	);
});
</script>

<template>
	<CommonNavLink
		class="card"
		:prefetch="false"
		:to="`${RoutePathEnum.EVENT}/${eventData.id}`"
		:title="
			trimString(
				`Afisha: ${
					eventData.isOnline ? t(`event.tags.${Tags.ONLINE}`) : eventData.location.city
				}, ${eventData.title}` ?? '',
				460
			)
		"
		:itemprop="SeoItempropGlobalEnum.URL"
		@click="
			sendAnalytics.clickEvent({
				id_creator: eventData.creatorId,
				id_event: eventData.id,
				country: eventData?.location?.country,
				city: eventData?.location?.city,
				online: eventData?.isOnline
			})
		"
	>
		<div
			class="card__image-container"
			:itemprop="eventData.image ? undefined : SeoItempropGlobalEnum.IMAGE"
		>
			<img
				v-if="eventData.image"
				class="card__image"
				:src="getEventImage(eventData.image)"
				:alt="
					trimString(
						`Afisha: ${
							eventData.isOnline
								? t(`event.tags.${Tags.ONLINE}`)
								: eventData.location.city
						}, ${eventData.title}` ?? '',
						460
					)
				"
				:itemprop="SeoItempropGlobalEnum.IMAGE"
			/>
			<img
				v-else
				class="card__image"
				src="/img/event-preview@2x.png"
				:itemprop="SeoItempropGlobalEnum.IMAGE"
				alt=""
			/>
			<CommonUiTag
				v-if="eventData.isOnline"
				:tag-key="Tags.ONLINE"
				appearance="accent"
				class="card__online-tag"
			/>
		</div>

		<div class="card-description">
			<div class="card-description__top">
				<CommonTagList
					v-if="!mobile && eventData.tags"
					:tag-list="eventData.tags"
					class="card-description__tags"
				/>
				<h2
					class="card-description__title"
					:itemprop="SeoItempropEventEnum.NAME"
				>
					{{ eventData.title }}
				</h2>
				<p
					v-if="eventData.organizer"
					class="card-description__author"
					:itemprop="SeoItempropEventEnum.ORGANIZER"
				>
					{{ eventData.organizer }}
				</p>
			</div>
			<div class="card-description__bottom">
				<CommonEventDetails
					class="card-description__details"
					:price="eventData?.price"
					:is-online="eventData.isOnline"
					:location="eventData.location"
					:start-date="startDate"
					:end-date="endDate"
				/>
				<CommonTagList
					v-if="mobile && eventData.tags"
					:tag-list="eventData.tags"
					class="card-description__tags"
				/>
			</div>
		</div>
	</CommonNavLink>
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
		width: 100%;
		aspect-ratio: 2 / 1.33;
		height: auto;
		max-height: 400px;
		position: relative;
		background-color: var(--color-input-field);
		background-size: cover;
		line-height: 0;

		@media (min-width: 768px) {
			aspect-ratio: 2 / 1.25;
			height: auto;
			max-height: unset;
			border-top-left-radius: 8px;
			border-top-right-radius: 8px;
		}
	}

	&__image {
		width: 100%;
		min-width: 100%;
		max-width: 100%;
		aspect-ratio: 2 / 1.33;
		height: auto;
		object-fit: cover;

		@media (min-width: 768px) {
			aspect-ratio: 2 / 1.25;
			height: auto;
			border-top-left-radius: 8px;
			border-top-right-radius: 8px;
		}
	}

	&__online-tag {
		position: absolute;
		top: 16px;
		left: 16px;

		@media (min-width: 768px) {
			top: 12px;
			left: 12px;
		}
	}

	.card-description {
		display: flex;
		width: 100%;
		flex-direction: column;
		padding: 12px 16px 18px;

		@media (min-width: 768px) {
			height: inherit;
			padding: 12px;
			border-bottom-left-radius: 8px;
			border-bottom-right-radius: 8px;
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

		&__tags {
			margin-top: auto;
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

		&__details {
			margin-bottom: 12px;
		}
	}
}
</style>
