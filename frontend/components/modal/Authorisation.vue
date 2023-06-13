<script setup lang="ts">
import type { UserInfo } from '../../../common/types/user';

type Props = {
	close: () => void;
	isAuthorized: boolean;
	deauthorize: () => void;
};

const props = defineProps<Props>();
const userCookie = useCookie<UserInfo | null>('user');

const username =
	userCookie.value?.userNickName ||
	(userCookie.value?.firstNickName || userCookie.value?.lastNickName
		? userCookie.value?.firstNickName + ' ' + userCookie.value?.lastNickName
		: null);

// const temporaryId = v4();
// const authLink: string = `${AUTH_SERVER_URL}/auth/${temporaryId}?encodede_backurl=${encodeURIComponent(
// 	`${SERVER_URL}/postauth/${temporaryId}`
// )}`;

const onTelegramAuth = (user: any) => {
  alert('Logged in as ' + user.first_name + ' ' + user.last_name + ' (' + user.id + (user.username ? ', @' + user.username : '') + ')');
}
const telegram = ref(new HTMLElement());
onMounted(() => {
  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://telegram.org/js/telegram-widget.js?22';

  script.setAttribute('data-size', 'large');
  // script.setAttribute('data-userpic', props.userpic);
  script.setAttribute('data-telegram-login', 'standart_oauth_test1_bot');
  script.setAttribute('data-request-access', 'write');

    script.setAttribute('data-auth-url','https:');
  telegram.value?.appendChild(script);
});

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
		<div>
      <div ref="telegram"></div>
			<NuxtLink
				v-if="isAuthorized"
				class="authorisation-button"
				@click="props.deauthorize()"
			>
				<p class="authorisation-button__user">
					{{ username }}
				</p>
				<div class="authorisation-button__container">
					<p class="authorisation-button__text">Выйти</p>
					<CommonIcon
						class="authorisation-button__icon"
						name="sign-out"
						width="20"
						height="20"
					/>
				</div>
			</NuxtLink>
			<div
				v-else
        @click="onTelegramAuth"
				class="authorisation-button"
			>
				<div class="authorisation-button__container">
					<p class="authorisation-button__text">Войти</p>
					<CommonIcon
						class="authorisation-button__icon"
						name="sign-in"
						width="20"
						height="20"
					/>
				</div>
			</div>
		</div>
	</CommonModalWrapper>
</template>

<style scoped lang="less">
.authorisation-button {
	display: flex;
	flex-direction: column;
	width: max-content;
	justify-content: center;
	align-items: center;
	position: absolute;
	top: var(--header-height);
	right: var(--padding-side);
	background-color: var(--color-white);
	box-shadow: 0 8px 16px -2px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.02);
	border-radius: 6px;
	padding: 8px 16px;

	&__container {
		display: flex;
	}

	&__text {
		margin-right: 9px;
	}

	&__user {
		font-size: var(--font-size-XS);
		color: var(--color-text-secondary);
	}

	&__icon {
		color: var(--color-input-field);
	}
}
</style>
