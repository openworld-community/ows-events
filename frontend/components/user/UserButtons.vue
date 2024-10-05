<script setup lang="ts">
import { RoutePathEnum } from '../../constants/enums/route';
import { defineEmits, defineProps } from 'vue';
import type { EventOnPoster } from '../../../common/types';

const props = defineProps<{ event: EventOnPoster; showEditDeleteButtons: boolean }>();
const emit = defineEmits(['delete', 'edit', 'favorite']);

const onEditButtonClick = () => {
	emit('edit', props.event.id);
};

const onDeleteButtonClick = () => {
	emit('delete', props.event.id);
};

const onFavoriteButtonClick = () => {
	emit('favorite', props.event.id);
};
</script>

<template>
	<div class="user-buttons__button">
		<CommonButton
			:link="RoutePathEnum.USER_MY_EVENTS"
			icon-name="edit"
			button-kind="text"
			no-border
			:class="[
				'user-buttons__button--edit',
				{ 'user-buttons__button--edit--expired': props.event.date < Date.now() }
			]"
			@click="onEditButtonClick"
		/>
		<LibraryAlert
			:title="$t('modal.delete_event_modal.title')"
			:description-text="$t('modal.delete_event_modal.text')"
			confirm-button-text="global.button.confirm"
			@on-confirm="onDeleteButtonClick"
		>
			<CommonButton
				:link="RoutePathEnum.USER_MY_EVENTS"
				icon-name="trash"
				button-kind="warning"
				no-border
				:class="[
					'user-buttons__button--delete',
					{ 'user-buttons__button--delete--expired': props.event.date < Date.now() }
				]"
			/>
		</LibraryAlert>

		<CommonButton
			:link="RoutePathEnum.USER_MY_EVENTS"
			icon-name="heart"
			button-kind="success"
			no-border
			:class="[
				'user-buttons__button--delete',
				{ 'user-buttons__button--favorite--expired': props.event.date < Date.now() }
			]"
			@click="onFavoriteButtonClick"
		/>
		<!-- чуть переписать визуал избранного -->
	</div>
</template>
<style scoped lang="less">
.user-buttons {
	&__button {
		height: 100%;
		display: flex;
		flex-direction: row;
		padding: 0px;
		color: black;
		z-index: 1;
		gap: 5px;
		user-select: none;
		right: 0;
		align-items: flex-start;
		justify-content: center;
		pointer-events: none;
		transition: all 0.7s ease-in-out;

		@media (min-width: 1440px) {
			align-items: center;
			padding: 5px 7px 5px 5px;
		}

		&--edit {
			width: 30px;
			height: 24px;
			background-color: var(--color-background-secondary);
			pointer-events: auto;
			@media (min-width: 1440px) {
				width: 40px;
				height: 40px;
			}

			&--expired {
				display: none;
			}
		}

		&--edit :deep(svg) {
			color: var(--color-accent-green-main);
		}

		&--delete {
			width: 30px;
			height: 24px;
			background-color: var(--color-background-secondary);
			pointer-events: auto;
			@media (min-width: 1440px) {
				width: 40px;
				height: 40px;
			}

			&--expired {
				background-color: rgba(250, 250, 250, 0.5);
			}
		}

		&--delete :deep(svg) {
			color: var(--color-accent-green-main);
		}

		&--delete :hover :deep(svg) {
			color: var(--color-accent-red);
		}
	}
}
</style>
