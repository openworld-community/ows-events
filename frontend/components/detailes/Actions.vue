<script setup lang="ts">
import { useModal, type UseModalOptions, VueFinalModal } from 'vue-final-modal';
import DeleteEvent from '@/components/modal/DeleteEvent.vue';
const emit = defineEmits(['deleteClick', 'editClick']);
defineProps({
	creatorId: {
		type: String,
		default: ''
	}
});

const deleteActionClick = async () => {
	emit('deleteClick');
	await closeDeleteEventModal();
};

const {
	open: openDeleteEventModal,
	close: closeDeleteEventModal,
	patchOptions: patchDeleteEventModal
} = useModal({ component: DeleteEvent } as UseModalOptions<
	InstanceType<typeof VueFinalModal>['$props']
>);
patchDeleteEventModal({
	attrs: {
		closeDeleteEventModal,
		removeEvent: deleteActionClick
	}
});
</script>
<template>
	<div class="event-info-actions">
		<CommonButton
			v-if="validateEventRole(creatorId, 'delete')"
			class="event-info-actions__button-admin"
			button-kind="warning"
			:button-text="$t('global.button.delete')"
			icon-name="trash"
			icon-width="20px"
			icon-height="20px"
			@click="openDeleteEventModal"
		/>
		<CommonButton
			v-if="validateEventRole(creatorId, 'edit')"
			class="event-info-actions__button-admin"
			button-kind="ordinary"
			:button-text="$t('global.button.edit')"
			icon-name="edit"
			icon-width="20px"
			icon-height="20px"
			@click="emit('editClick')"
		/>
	</div>
</template>

<style lang="less" scoped>
.event-info-actions {
	display: flex;
	width: 100%;
	flex-direction: row;
	justify-content: space-between;
	gap: 10px;
	margin-top: 20px;

	@media (min-width: 768px) {
		flex-direction: column-reverse;
		justify-content: flex-end;
		align-items: flex-start;
		padding-left: 30px;
		width: 34%;
		margin-top: 0;
	}

	@media (min-width: 1440px) {
		flex-direction: row;
		width: 167px;
	}

	&__button-admin {
		min-width: 165px;
		width: 100%;
		height: 40px;

		@media (min-width: 768px) {
			margin-bottom: 15px;
		}

		&:not(:last-child) {
			margin-right: 17px;
		}
	}
}
</style>
