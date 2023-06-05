<script setup lang="ts">
import { UserInfo } from '../../../common/types/user';

import { useModal } from 'vue-final-modal';
import { ModalAuthorisation } from '#components';
import { v4 } from 'uuid';
import { AUTH_SERVER_URL, SERVER_URL } from '~/constants/url';

const tokenCookie = useCookie<string | null>('token');

const isAuthorized = computed(() => !!tokenCookie.value);
const user = useCookie<UserInfo | null>('user');

const authorize = () => {
	const temporaryId = v4();
	const authLink: string = `${AUTH_SERVER_URL}/auth/${temporaryId}?encodede_backurl=${encodeURIComponent(
		`${SERVER_URL}/postauth/${temporaryId}`
	)}`;
	window.open(authLink, '_blank');
	setTimeout(() => close(), 300);
	updateModalData();
};

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
			authorize: authorize,
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
		:alt="isAuthorized ? $translate('component.header.authorization.deauthorize')	: $translate('component.header.authorization.authorize')"
		@click="openAuthModal"
	/>
</template>

<style scoped lang="less"></style>
