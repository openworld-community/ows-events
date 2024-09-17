<script setup lang="ts">
import { RoutePathEnum } from '../../constants/enums/route';
defineEmits(['delete', 'edit', 'favorite']);
defineProps({
	id: {
		type: String,
		default: ''
	},
	isExpired: {
		type: Boolean,
		default: false
	}
});
</script>
<template>
	<div style="z-index: 2">
		<LibraryPopover
			variant="custom"
			align="end"
		>
			<template #trigger>
				<CommonButton :link="RoutePathEnum.USER_MY_EVENTS">
					<CommonIcon name="dots-three-vertical" />
				</CommonButton>
			</template>
			<template #content>
				<CommonButton
					:link="RoutePathEnum.USER_MY_EVENTS"
					icon-name="edit"
					button-kind="text"
					:button-text="$t('user.my_events.buttons.edit')"
					no-border
					:class="[
						'user-buttons__button--edit',
						{ 'user-buttons__button--edit--expired': isExpired }
					]"
					@click="$emit('edit', id)"
				/>
				<LibraryAlert
					:title="$t('modal.delete_event_modal.title')"
					:description-text="$t('modal.delete_event_modal.text')"
					confirm-button-text="global.button.confirm"
					@on-confirm="$emit('delete', id)"
				>
					<CommonButton
						:link="RoutePathEnum.USER_MY_EVENTS"
						icon-name="trash"
						:button-text="$t('user.my_events.buttons.delete')"
						button-kind="warning"
						no-border
						:class="[
							'user-buttons__button--delete',
							{
								'user-buttons__button--delete--expired': isExpired
							}
						]"
					/>
				</LibraryAlert>
			</template>
		</LibraryPopover>
	</div>
</template>
