<script setup lang="ts">
import { useUserStore } from '../../../stores/user.store';
import { useModal } from 'vue-final-modal';
import NeedAuthorize from '@/components/modal/NeedAuthorize.vue';
import { RoutePathEnum } from '~/constants/enums/route';

const localePath = useLocalePath();
const userStore = useUserStore();

defineProps({
	hasBackButton: {
		type: Boolean,
		default: false
	}
});
const {
	open: openNeedAuthorizeModal,
	close: closeNeedAuthorizeModal,
	patchOptions: needAuthorizeModalPatch
} = useModal({ component: NeedAuthorize });
needAuthorizeModalPatch({ attrs: { closeNeedAuthorizeModal } });

const onButtonClick = async () => {
	if (userStore.isAuthorized) {
		await navigateTo(localePath(`${RoutePathEnum.EVENT_EDIT}new`));
	} else {
		await openNeedAuthorizeModal();
	}
};
</script>

<template>
	<CommonButton
		:button-text="$t('global.button.create_event')"
		class="button__success--filled"
		button-kind="success"
		@click="onButtonClick"
	/>
</template>
