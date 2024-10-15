<script setup lang="ts">
import type { PropType } from 'vue';
import type { EventOnPoster } from '../../../common/types';
import { PEREDELANO_CREATOR_ID } from '../../../common/const/eventTypes';
import { SeoItempropEventEnum } from '../../constants/enums/seo';

const mobile = inject<boolean>('mobile');

defineEmits(['toggleFavourites', 'onClickRedirect']);
defineProps({
	posterEvent: {
		type: Object as PropType<EventOnPoster>,
		default: null
	},
	isInFavourites: {
		type: Boolean,
		default: false
	},
	isShowFavourites: {
		type: Boolean,
		default: false
	},
	isOwner: {
		type: Boolean,
		default: false
	}
});
</script>

<template>
	<div class="event-summary">
		<div class="event-summary__header">
			<DetailesItemsOrganizer
				v-if="posterEvent.organizer"
				:organizer="posterEvent.organizer"
			/>
			<DetailesItemsTitle
				:title="posterEvent.title"
				:is-show-favourites="isShowFavourites"
				:is-in-favourites="isInFavourites"
				@toggle-favourites="$emit('toggleFavourites')"
			/>
		</div>
		<CommonEventDetails
			class="event-summary__details"
			:price="posterEvent.price"
			:date="posterEvent.date"
			:duration="posterEvent.durationInSeconds"
			:is-online="posterEvent.isOnline"
			:location="posterEvent.location"
			:timezone="posterEvent.timezone"
			has-link-to-g-maps
			size="big"
		/>
		<div class="container">
			<div class="description">
				<h4
					v-if="!mobile && posterEvent.creatorId !== PEREDELANO_CREATOR_ID"
					class="event-summary__description-title"
				>
					{{ $t('event.description_title') }}
				</h4>
				<p
					v-if="posterEvent.creatorId !== PEREDELANO_CREATOR_ID"
					class="event-summary__description text3"
					:itemprop="SeoItempropEventEnum.DESCRIPTION"
				>
					{{ posterEvent.description }}
				</p>
				<div
					v-if="posterEvent.creatorId === PEREDELANO_CREATOR_ID"
					class="event-summary__html-description"
					:itemprop="SeoItempropEventEnum.DESCRIPTION"
					v-html="useSanitizer(posterEvent.description)"
				/>
				<CommonButton
					v-if="posterEvent.url"
					class="event-summary__button-contact"
					:button-kind="isOwner ? 'dark' : 'success'"
					:button-text="$t('global.button.contact')"
					:link="posterEvent.url"
					is-external-link
					:@click="$emit('onClickRedirect')"
				/>
			</div>

			<div class="card-event">
				<h5 class="card-event__title">{{ $t('event.create_title') }}</h5>
				<p class="text3">{{ $t('event.click_button') }}</p>

				<div class="card-event__button-info">
					<div class="card-event__button">{{ $t('global.button.create_event') }}</div>
					<p>{{ $t('event.button') }}</p>
				</div>

				<div class="card-event__button-info">
					<CommonButton
						class="card-event__button-plus"
						is-round
						icon-name="plus"
						icon-color="var(--color-white)"
						:alt="$t('home.button.add_event_aria')"
						:title="$t('home.button.add_event_aria')"
						aria-haspopup="true"
					/>
					<p class="card-event__plus-text">{{ $t('event.button_plus') }}</p>
					<!--
					<CommonButton
						:button-text="$t('global.button.more')"
						class="button__success--filled isRound"
						button-kind="success"
					/>
					-->
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="less" scoped>
.container {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;

	@media (min-width: 768px) {
		flex-direction: row;
	}
}
.description {
	@media (min-width: 768px) {
		flex: 1;
	}
}
.card-event {
	border-radius: 20px;
	width: 350px;
	height: 225px;
	margin-top: 24px;
	padding: 20px;
	background-image: url(/img/event/background.svg);
	background-repeat: no-repeat;
	background-size: cover;

	@media (min-width: 768px) {
		margin-left: 20px;
	}

	@media (min-width: 1440px) {
		width: 400px;
	}
	&__title {
		text-align: center;
		font-size: 14px;
		margin: 18px 0;
	}
	&__button-info {
		margin: 10px 0;
		display: flex;
		align-items: center;
		font-size: 12px;
	}
	&__button {
		margin-right: 14px;
		border-radius: 8px;
		line-height: 18px;
		padding: 4px 10px;
		color: var(--color-white);
		background-color: var(--color-accent-green-main);
		border: 1px solid var(--color-accent-green-main);
		cursor: default;
	}
	&__button-plus {
		width: 38px;
		height: 38px;
		cursor: default;
		background-color: var(--color-accent-green-main);
		border: 1px solid var(--color-accent-green-main);
	}

	&__plus-text {
		margin-left: 13px;
		margin-right: 70px;
	}
}
.event-summary {
	display: flex;
	//width: 100%;
	flex-grow: 1;
	overflow: hidden;
	height: 100%;
	flex-direction: column;
	//	overflow: hidden;

	@media (min-width: 768px) {
		width: 66%;
		//max-width: 820px;
		flex: 1;
	}
	&__header {
		display: flex;
		width: 100%;
		flex-direction: column;
		margin-bottom: var(--space-related-items);

		@media (min-width: 768px) {
			flex-direction: column-reverse;
			margin-bottom: 24px;
		}
	}

	&__details {
		display: flex;
		width: 100%;
		flex-direction: column;
		margin-bottom: var(--space-unrelated-items);

		@media (min-width: 768px) {
			padding-top: 24px;
			border-top: 1px solid var(--color-input-field);
		}
	}

	&__description-title {
		@media (min-width: 768px) {
			display: flex;
			width: 100%;
			padding-top: 24px;
			border-top: 1px solid var(--color-input-field);
			margin-bottom: 24px;
		}
	}

	&__description {
		word-wrap: break-word;
		white-space: pre-line;
		margin-bottom: 24px;
	}

	&__html-description {
		word-wrap: break-word;
		white-space: pre-line;
		font-size: var(--font-size-S);
		line-height: 20px;
		margin-bottom: 24px;
		padding-top: 8px;

		&:deep(h1),
		&:deep(h2),
		&:deep(h3),
		&:deep(h4),
		&:deep(h5) {
			line-height: normal;
			font-size: var(--font-size-S);
		}

		&:deep(h2) {
			font-size: var(--font-size-L);
			border-top: 1px solid var(--color-input-field);
			padding-top: 24px;

			@media (min-width: 768px) {
				font-size: var(--font-size-ML);
			}

			@media (min-width: 1440px) {
				margin-bottom: 14px;
			}
		}

		&:deep(a) {
			text-decoration: underline;
			text-underline-offset: 0.2rem;
		}

		&:deep(img) {
			min-width: 0 !important;
			max-width: 100% !important;
			box-sizing: content-box;
		}

		&:deep(blockquote) {
			padding: 0 1em;
			border-left: 0.25em solid var(--color-input-icons);
		}

		&:deep(table) {
			width: max-content;
			max-width: 100%;
			overflow: auto;
			margin-top: 0;
			margin-bottom: 16px;
			border-collapse: collapse;
			border-spacing: 0;
		}

		&:deep(tr) {
			border-top: 1px solid var(--color-input-icons);
		}

		&:deep(th),
		&:deep(td) {
			padding: 6px 13px;
			border: 1px solid var(--color-input-icons);
		}

		&:deep(th) {
			font-weight: var(--font-weight-bold);
		}

		&:deep(hr) {
			border-style: none;
			border-top: 1px solid var(--color-input-field);
		}
	}

	&__button-contact {
		margin-top: auto;

		@media (min-width: 768px) {
			margin-top: 0;
			max-width: 60%;
		}

		@media (min-width: 1440px) {
			max-width: 43%;
		}
	}
}
</style>
