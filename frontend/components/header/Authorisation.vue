<script setup lang="ts">
import { useRoute } from 'vue-router';
import { UserInfo } from '../../../common/types/user';
import { useModal } from 'vue-final-modal';
import { ModalAuthorisation } from '#components';

const route = useRoute();
const userCookie = useCookie<UserInfo | null>('user');

// const username =
// 	userCookie.value?.userNickName ||
// 	(userCookie.value?.firstNickName || userCookie.value?.lastNickName
// 		? userCookie.value?.firstNickName + ' ' + userCookie.value?.lastNickName
// 		: null);

const { open: openAuthModal, close, patchOptions } = useModal({ component: ModalAuthorisation });
patchOptions({ attrs: { close: close } });

const isAuthorized = computed(() => !!userCookie.value);
</script>

<template>
	<div
		class="authorisation"
		@click.prevent="openAuthModal"
	>
		<CommonIcon
			name="user"
			:class="['authorisation__icon', { 'authorisation__icon--success': isAuthorized }]"
			:alt="isAuthorized ? 'Выйти из личного кабинета' : 'Авторизоваться с помощью Telegram'"
		/>
		<!--  <div v-if="username">-->
		<!--    {{ username }}-->
		<!--    <a href="/logout">Выйти</a>-->
		<!--  </div>-->
		<!--  <a-->
		<!--    v-else-->
		<!--    :href="authLink"-->
		<!--  ></a>-->
	</div>
</template>

<style scoped lang="less">
.authorisation {
	&__icon {
		color: var(--color-text-main);

		&--success {
			color: var(--color-accent-green-main);
		}
	}
}
</style>
