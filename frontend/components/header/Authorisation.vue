<script setup lang="ts">
import { useModal } from 'vue-final-modal';
import { ModalAuthorisation } from '#components';
import { v4 } from 'uuid';
import { AUTH_SERVER_URL, SERVER_URL } from '~/constants/url';

const tokenCookie = useCookie<string | null>('token');

const isAuthorized = computed(() => !!tokenCookie.value);

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
	<!--TODO: Вставить компонент button как будет готов  -->
	<div
		class="authorisation"
		@click="openAuthModal"
	>
		<CommonIcon
			name="user"
			:class="['authorisation__icon', { 'authorisation__icon--success': isAuthorized }]"
			:alt="isAuthorized ? 'Выйти из личного кабинета' : 'Авторизоваться с помощью Telegram'"
		/>
	</div>
</template>

<style scoped lang="less">
.authorisation {
	cursor: pointer;

	&__icon {
		color: var(--color-text-main);

		&--success {
			color: var(--color-accent-green-main);
		}
	}
}
</style>
