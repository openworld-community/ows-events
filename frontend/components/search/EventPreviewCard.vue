<script setup lang="ts">
import type { EventOnPoster } from '../../../common/types';
import { SeoItempropGlobalEnum } from '../../constants/enums/seo';
import { RoutePathEnum } from '../../constants/enums/route';
import { trimString } from '../../utils/trimString';
import { Tags } from '../../../common/const/tags';
import { apiRouter } from '../../composables/useApiRouter';
import { useUserStore } from '../../stores/user.store';

const props = defineProps<{ eventData: EventOnPoster }>();
const { t } = useI18n();
const mobile = inject('mobile');
const tablet = inject('tablet');
const { sendAnalytics } = useSendTrackingEvent();
const isTest = import.meta.env.VITE_STAGE == 'test' || process.env.VITE_STAGE == 'test';

const userStore = useUserStore();
const toggleFavourites = async () => {
	console.log(event);
	const { error } = await apiRouter.user.favourites[
		isInFavourites.value ? 'remove' : 'add'
	].useMutation({ data: { eventId: props.eventData.id } });
	if (!error.value) await userStore.getFavouriteIDs();
};
const isInFavourites = computed(() => {
	return userStore.favouriteIDs.includes(props.eventData.id);
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
				}, ${eventData.title}`,
				460
			)
		"
		itemprop="item"
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
			<NuxtImg
				v-if="eventData.image && !isTest"
				class="card__image"
				provider="weserv"
				:src="getEventImage(eventData.image)"
				:alt="
					trimString(
						`Afisha: ${
							eventData.isOnline
								? t(`event.tags.${Tags.ONLINE}`)
								: eventData.location.city
						}, ${eventData.title}`,
						460
					)
				"
				:itemprop="SeoItempropGlobalEnum.IMAGE"
				placeholder
				loading="lazy"
			/>
			<img
				v-else-if="eventData.image"
				class="card__image"
				:src="getEventImage(eventData.image)"
				:alt="
					trimString(
						`Afisha: ${
							eventData.isOnline
								? t(`event.tags.${Tags.ONLINE}`)
								: eventData.location.city
						}, ${eventData.title}`,
						460
					)
				"
				:itemprop="SeoItempropGlobalEnum.IMAGE"
				loading="lazy"
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
					v-if="!mobile && !tablet && eventData.tags"
					:tag-list="eventData.tags"
					class="card-description__tags"
					tag-size="small"
				/>
				<div class="card-description__title">
					<h4
						class="card-description__title__text"
						itemprop="name"
					>
						{{ eventData.title }}
					</h4>
					<CommonLikeButton
						v-if="userStore.isAuthorized"
						width="24"
						height="24"
						:is-in-favourites="isInFavourites"
						@toggle-favourites.stop.prevent="toggleFavourites"
					/>
				</div>
				<p
					v-if="eventData.organizer"
					class="card-description__author text3"
				>
					{{ eventData.organizer }}
				</p>
			</div>
			<div class="card-description__bottom">
				<CommonEventDetails
					class="card-description__details"
					:price="eventData.price"
					:date="eventData.date"
					:duration="eventData.durationInSeconds"
					:is-online="eventData.isOnline"
					:location="eventData.location"
					:timezone="eventData.timezone"
					:is-preview="true"
				/>
				<CommonTagList
					v-if="(mobile || tablet) && eventData.tags"
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
		aspect-ratio: 16 / 9;
		height: auto;
		max-height: 400px;
		position: relative;
		background-color: var(--color-input-field);
		background-size: cover;
		line-height: 0;

		@media (min-width: 768px) {
			aspect-ratio: 16 / 9;
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
		aspect-ratio: 16 / 9;
		height: auto;
		object-fit: cover;

		@media (min-width: 768px) {
			aspect-ratio: 16 / 9;
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
		padding: 20px 0px 0px 15px;
		overflow: hidden;

		@media (min-width: 768px) {
			height: inherit;
			padding: 12px 10px;
			border-bottom-left-radius: 8px;
			border-bottom-right-radius: 8px;
		}

		&__top {
			padding-left: 10px;

			@media (min-width: 768px) {
				padding-left: 0px;
			}
		}

		&__author {
			//TODO: пока верстка только мобилки
			max-width: 480px;
			word-wrap: break-word;
			font-weight: var(--font-weight-bold);
			font-size: var(--font-size-XS);
			text-align: left;
			color: var(--color-text-secondary);
			margin-bottom: 20px;
			@media (min-width: 768px) {
				margin-bottom: 18px;
			}

			@media (min-width: 1440px) {
				margin-bottom: 10px;
			}
		}

		&__tags {
			margin-top: auto;
			margin-bottom: 0px;

			@media (min-width: 1440px) {
				margin-bottom: 16px;
			}
		}

		&__title {
			display: flex;
			flex-direction: row;
			align-items: flex-start;
			justify-content: space-between;
			margin-bottom: 7px;

			&__text {
				//TODO: пока верстка только мобилки
				max-width: 480px;
				overflow-wrap: break-word;
				word-break: break-word;
				font-size: var(--font-size-ML);
				font-weight: 600;
				line-height: 2.4rem;
				align-self: center;
			}

			@media (min-width: 768px) {
				font-weight: var(--font-weight-bold);
				margin-bottom: 16px;
			}
			@media (min-width: 1440px) {
				font-weight: var(--font-weight-regular);
			}
		}

		&__details {
			margin-bottom: 25px;
			@media (min-width: 768px) {
				margin-bottom: 10px;
			}
			@media (min-width: 1440px) {
				margin-bottom: 0px;
			}
		}
	}
}
</style>
