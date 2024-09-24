<script setup lang="ts">
import { useModal } from 'vue-final-modal';
import { RoutePathEnum } from '~/constants/enums/route';
import NeedAuthorize from '@/components/modal/NeedAuthorize.vue';
const localePath = useLocalePath();
const props = defineProps({
	isAuthorized: {
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
	if (props.isAuthorized) {
		await navigateTo(localePath(`${RoutePathEnum.EVENT_EDIT}new`));
	} else {
		await openNeedAuthorizeModal();
	}
};
</script>
<template>
	<CommonButton
		class="add-event-button"
		button-kind="success"
		is-round
		icon-name="plus"
		icon-color="var(--color-white)"
		:alt="$t('home.button.add_event_aria')"
		:title="$t('home.button.add_event_aria')"
		aria-haspopup="true"
		@click="onButtonClick"
	/>
</template>
