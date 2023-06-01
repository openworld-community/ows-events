<script setup lang="ts">
import { v4 } from 'uuid';
import { ref } from 'vue';
import { AUTH_SERVER_URL, SERVER_URL } from '@/constants/url';
import { UserInfo } from '../../../common/types/user';

type Props = {
	close: () => void;
};

const props = defineProps<Props>();
const userCookie = useCookie<UserInfo | null>('user');

const authorize = (url: string) => {
	window.open(url, '_blank');
	setTimeout(() => props.close(), 300);
};

const temporaryId = v4();

const authLink = ref<string>(
	`${AUTH_SERVER_URL}/auth/${temporaryId}?encodede_backurl=${encodeURIComponent(
		`${SERVER_URL}/postauth/${temporaryId}`
	)}`
);

const isAuthorized = computed(() => !!userCookie.value);
</script>

<template>
	<!--  TODO костылище, пока у нас нет финального макета-->
	<CommonModalWrapper
		:hide-overlay="true"
		overlay-transition="vfm-fade"
		overlay-transition-duration="2600"
		content-transition="vfm-fade"
		:click-to-close="true"
		:esc-to-close="true"
		:lock-scroll="false"
	>
		<NuxtLink
			@click.prevent="authorize(authLink)"
			class="authorisation-button"
		>
			<p class="authorisation-button__text">
				{{ isAuthorized ? 'Выйти' : 'Войти' }}
			</p>
			<CommonIcon
				class="authorisation-button__icon"
				:name="isAuthorized ? 'sign-out' : 'sign-in'"
				width="20"
				height="20"
			/>
		</NuxtLink>
	</CommonModalWrapper>
</template>

<style scoped lang="less">
.authorisation-button {
	display: flex;
	width: max-content;
	justify-content: center;
	align-items: center;
	position: absolute;
	top: var(--header-height);
	right: var(--padding-side);
	background-color: var(--color-white);
	box-shadow: 0px 8px 16px -2px rgba(0, 0, 0, 0.1), 0px 0px 0px 1px rgba(0, 0, 0, 0.02);
	border-radius: 6px;
	padding: 8px 16px;

	&__text {
		margin-right: 9px;
	}

	&__icon {
		color: var(--color-input-field);
	}
}
</style>
