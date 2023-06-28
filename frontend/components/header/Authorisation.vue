<script setup lang="ts">
import type { UserInfo } from '../../../common/types/user';
import ModalAuthorisation from '@/components/modal/Authorisation.vue';
import { useModal } from 'vue-final-modal';

const tokenCookie = useCookie<string | null>('token');
const isAuthorized = computed(() => !!tokenCookie.value);

const deauthorize = () => {
	useCookie<UserInfo | null>('user').value = null;
	useCookie('token').value = null;
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
	<HeaderNavigationNavItem
		:text="
			$t(
				isAuthorized
					? 'component.header.authorization.deauthorize'
					: 'component.header.authorization.authorize'
			)
		"
		:icon-name="isAuthorized ? 'logout' : 'login'"
		:item-kind="isAuthorized ? 'warning' : ''"
		@click="openAuthModal"
	/>
</template>

<style scoped lang="less"></style>
