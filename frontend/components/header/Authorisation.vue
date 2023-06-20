<script setup lang="ts">
import type { UserInfo } from '../../../common/types/user';
import { useModal } from 'vue-final-modal';
import { ModalAuthorisation } from '#components';

const { translate } = useTranslation();
const tokenCookie = useCookie<string | null>('token');

const isAuthorized = computed(() => !!tokenCookie.value);
const user = useCookie<UserInfo | null>('user');

const deauthorize = () => {
	user.value = null;
	tokenCookie.value = null;
	setTimeout(() => close(), 300);
	updateModalData();
};

const updateModalData = () => {
	patchOptions({
		attrs: {
			close: close,
			deauthorize: deauthorize,
			isAuthorized: isAuthorized.value
		}
	});
};
const { open: openAuthModal, close, patchOptions } = useModal({ component: ModalAuthorisation });
updateModalData();
</script>

<template>
	<CommonButton
		is-icon
		icon-name="user"
		:button-kind="isAuthorized ? 'success' : 'ordinary'"
		:alt="
			isAuthorized
				? translate('component.header.authorization.deauthorize')
				: translate('component.header.authorization.authorize')
		"
		@click="openAuthModal"
	/>
</template>

<style scoped lang="less"></style>
