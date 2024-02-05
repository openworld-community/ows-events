<script setup lang="ts">
import type { ComputedRef, PropType } from 'vue';
import type { EventOnPoster } from '../../../common/types';
import { RoutePathEnum } from '../../constants/enums/route';
import { SeoItempropEventEnum, SeoItempropGlobalEnum } from '../../constants/enums/seo';
import { dateNow } from '~/utils/dates';
import { convertEventDateToLocaleString } from '../../utils/dates';
import { Tags } from '../../../common/const/tags';

const props = defineProps({
	eventData: {
		type: Object as PropType<EventOnPoster>,
		required: true
	}
});
const mobile: ComputedRef<boolean> = inject('mobile');
const tablet: ComputedRef<boolean> = inject('tablet');
const desktop: ComputedRef<boolean> = inject('desktop');
const localePath = useLocalePath();

const startDate = ref(
	convertEventDateToLocaleString(
		props.eventData.date,
		props.eventData.isOnline,
		props.eventData.timezone
	)
);

const tagArray = computed(() => {
	if (mobile.value) return props.eventData.tags.slice(0, 2);
	if (tablet.value) return props.eventData.tags.slice(0, 3);
	if (desktop.value) return props.eventData.tags.slice(0, 4);
});
</script>

<template>
	<NuxtLink
		:to="localePath(`${RoutePathEnum.EVENT}/${eventData.id}`)"
		:class="[
			'card',
			{ 'card--expired': eventData.date + eventData.durationInSeconds * 1000 < dateNow }
		]"
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
			<CommonUiTag
				v-if="eventData.isOnline"
				:tag-key="Tags.ONLINE"
				appearance="accent"
				:size="mobile ? 'mini' : 'small'"
				class="card__online-tag"
			/>
		</div>
		<div class="card__description description">
			<div class="description__info">
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
					{{ startDate }}
				</p>
			</div>
			<CommonTagList
				v-if="eventData.tags.length"
				:tag-list="tagArray"
				tag-size="small"
				class="description__tags"
			/>
		</div>
	</NuxtLink>
</template>

<style scoped lang="less">
.card {
	display: flex;
	width: 100%;
	align-items: center;
	background-color: var(--color-background-secondary);
	border: 1px solid var(--color-background-secondary);
	border-radius: 8px;
	padding: 8px;
	margin-bottom: 12px;

	@media (min-width: 768px) {
		padding: 16px 12px;
	}

	transition-property: background-color, border-color;
	transition-duration: 0.3s;
	transition-timing-function: ease;

	&:hover,
	&:focus {
		border-color: var(--color-accent-green-main-30);
	}

	&:active {
		background-color: var(--color-accent-green-main-10);
		border-color: var(--color-accent-green-main-10);
	}

	&--expired {
		opacity: 0.5;
	}

	&__image-container {
		display: flex;
		width: 94px;
		min-width: 94px;
		height: 74px;
		position: relative;
		background-color: var(--color-input-field);
		background-size: cover;
		border-radius: 4px;
		line-height: 0;
		margin-right: 8px;

		@media (min-width: 768px) {
			width: 248px;
			height: 108px;
			margin-right: 12px;
		}

		&--background {
			background-image: url('@/assets/img/event/event-small-preview-mobile@1x.png');
			background-size: cover;

			@media (min-width: 768px) {
				background-image: url('@/assets/img/event/event-small-preview-desktop@1x.png');
			}

			@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
				background-image: url('@/assets/img/event/event-small-preview-mobile@2x.png');

				@media (min-width: 768px) {
					background-image: url('@/assets/img/event/event-small-preview-desktop@2x.png');
				}
			}
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

	&__online-tag {
		position: absolute;
		top: 2px;
		left: 2px;

		@media (min-width: 768px) {
			top: 7px;
			left: 5px;
		}
	}
}

.description {
	display: flex;
	flex-direction: column;
	overflow: hidden;

	&__info {
		display: flex;
		width: 100%;
		flex-direction: column;
		margin-bottom: 8px;

		@media (min-width: 768px) {
			margin-bottom: 12px;
		}
	}

	&__title {
		display: inline-block;
		font-size: var(--font-size-S);
		line-height: 20px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		margin-bottom: 6px;

		@media (min-width: 768px) {
			font-size: 14px;
			line-height: 20px;
			margin-bottom: 12px;
		}
	}

	&__date {
		font-size: var(--font-size-XS);
		line-height: 16px;

		@media (min-width: 768px) {
			font-size: 12px;
		}
	}
}
</style>
