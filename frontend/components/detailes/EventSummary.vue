<script setup lang="ts">
import type { PropType } from 'vue';
import type { EventOnPoster } from '../../../common/types';

defineEmits(['toggleFavourites', 'deleteCard', 'editClick']);
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
	},
	isActiveButtons: {
		type: Boolean,
		default: false
	}
});
</script>
<template>
	<div class="event-summary">
		<div class="event-summary__wrapper">
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
		</div>
		<DetailesActions
			v-if="isActiveButtons"
			:creator-id="posterEvent.creatorId"
			@edit-click="$emit('editClick')"
			@delete-click="$emit('deleteCard')"
		/>
	</div>
</template>
<style scoped lang="less">
.event-summary {
	display: flex;
	width: 100%;
	overflow: hidden;
	flex-direction: column;

	@media (min-width: 768px) {
		flex-direction: row;
	}

	&__wrapper {
		@media (min-width: 768px) {
			flex-grow: 1;
		}

		@media (min-width: 1440px) {
			width: 50%;
		}
	}
	&__header {
		display: flex;
		width: 100%;
		flex-direction: column;
		margin-bottom: 10px;

		@media (min-width: 768px) {
			flex-direction: column-reverse;
			margin-bottom: 30px;
		}
	}

	&__details {
		display: flex;
		width: 100%;
		flex-direction: column;

		@media (min-width: 768px) {
			padding-top: 24px;
			border-top: 1px solid var(--color-input-field);
			padding-bottom: 24px;
		}
	}
}
</style>
