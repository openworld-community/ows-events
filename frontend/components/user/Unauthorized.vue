<script setup lang="ts">
import { SeoItempropGlobalEnum } from '@/constants/enums/seo';
import { RoutePathEnum } from '@/constants/enums/route';
import { useUserStore } from '@/stores/user.store';
import { TELEGRAM_AUTH_BOT_NAME } from '@/constants/url';
import { BASE_URL } from '@/constants/url';
import { CookieNameEnum } from '@/constants/enums/common';
import unauthorizedImg1x from '@/assets/img/user/unauthorized-img@1x.jpg';
import unauthorizedImg2x from '@/assets/img/user/unauthorized-img@2x.jpg';

type TFormType = 'login' | 'signup'

const userStore = useUserStore();
const mobile = inject('mobile');
const localePath = useLocalePath();
const tokenCookie = useCookie<string | null>(CookieNameEnum.TOKEN);

const login = ref<TFormType>('login')

const changeFormType = () => {
	login.value === 'login' ? login.value = 'signup' : login.value = 'login'
}

const telegram = ref<HTMLElement | null>(null);

export interface TelegramUser {
	id: number
	first_name: string
	username: string
	photo_url: string
	auth_date: number
	hash: string
}

// declare global {
// 	interface Window {
//     Telegram: {
//     //   dataOnauth: (user: TelegramUser) => void
//     }
//   }
// }

const initTGButton = () => {
	const script = document.createElement('script');
	script.async = false;
	script.defer = true;
	script.src = 'https://telegram.org/js/telegram-widget.js?22';

	script.setAttribute('data-size', 'large');
	script.setAttribute('data-userpic', 'false');
	script.setAttribute('data-telegram-login', TELEGRAM_AUTH_BOT_NAME);
	script.setAttribute('data-radius', '8');
	script.setAttribute('data-request-access', 'write');
	script.setAttribute('data-auth-url', `${BASE_URL}/api/auth/telegram`);
	telegram.value?.appendChild(script);
};

const tgFrame = ref(null)

onMounted(() => {
	console.log(parseInt(TELEGRAM_AUTH_BOT_NAME));

	if (!userStore.isAuthorized) {
		initTGButton();
		tgFrame.value = window.frames;
		console.log('onMounted', tgFrame.value);
	}
});

const auth = () => {
	tgFrame.value.Telegram.Login.auth(
		// bot_id can't be replaced with bot_name for now  
		// tg somehow change exchange bot_name with bot_id under the hood
		{ bot_id: 'SOME NUMBER', request_access: true, telegram_login: TELEGRAM_AUTH_BOT_NAME, auth_url: `${BASE_URL}/api/auth/telegram` },
		(data) => {
			if (!data) {
				console.log('nodata?', data)
			}

			console.log(data);

			// Here you would want to validate data like described there https://core.telegram.org/widgets/login#checking-authorization
			// doWhateverYouWantWithData(data);
		}
	)
	useTrackEvent('login', {
		method: 'Telegram'
	})
}

// TWidgetLogin.init('widget_login', 6005864382, {"origin":"http:\/\/127.0.0.1","embed":1,"request_access":"write","return_to":"http:\/\/127.0.0.1\/ru\/user"}, false);

watch(
	() => [userStore.isAuthorized, tokenCookie.value],
	async ([auth, token]) => {
		if (!auth || !token) {
			await nextTick();
			initTGButton();
		}
	}
);
</script>

<template>
	<main class="unauthorized">
		<!-- <div
			v-if="mobile"
			class="unauthorized__image-container"
		>
			<img
				:srcset="`${unauthorizedImg2x} 2x`"
				:src="unauthorizedImg1x"
				width="351"
				height="264"
				alt=""
				class="unauthorized__image"
				:itemprop="SeoItempropGlobalEnum.IMAGE"
			/>
		</div> -->
		<button @click="auth">Tg test</button>
		<div class="unauthorized__content-container">
			<CommonIcon
				v-if="!mobile"
				class="unauthorized__logo"
				name="afisha-logo-light"
				width="86"
				height="40"
				color="var(--color-accent-green-main)"
			/>
			<h1
				v-if="!mobile"
				class="unauthorized__title"
			>
				{{ $t('user.unauthorized.title') }}
			</h1>
			<p class="unauthorized__text">
				{{ $t('user.unauthorized.text') }}
			</p>

			<UserLogin v-if="login === 'login'" />

			<UserSignUp v-else />

			<div class="unauthorized__buttons">
				<div
					ref="telegram"
					class="unauthorized__telegram-button"
					@click="
						useTrackEvent('login', {
							method: 'Telegram'
						})
						"
				></div>
				<CommonButton
					:button-text="login === 'login' ? $t('user.unauthorized.signup') : $t('user.unauthorized.login')"
					@click="changeFormType"
				/>
				<NuxtLink
					:to="localePath(RoutePathEnum.HOME)"
					class="unauthorized__continue"
				>
					{{ $t('user.unauthorized.continue') }}
				</NuxtLink>
			</div>
		</div>
		<p
			v-if="!mobile"
			class="unauthorized__copyright"
		>
			© Peredelano Startups {{ new Date().getFullYear() }}
		</p>
	</main>
</template>

<style scoped lang="less">
.unauthorized {
	display: flex;
	width: 100%;
	height: 100%;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding-left: var(--padding-side);
	padding-right: var(--padding-side);
	padding-bottom: 30px;

	@media (min-width: 768px) {
		padding: 0;
		position: relative;
		background: url(@/assets/img/user/unauthorized-background@1x.png) 0 0 no-repeat;
		background-size: cover;

		@media (-webkit-min-device-pixel-ratio: 2),
		(min-resolution: 192dpi) {
			background-image: url(@/assets/img/user/unauthorized-background@2x.png);
		}
	}

	&__image-container {
		display: flex;
		width: 100%;
		aspect-ratio: 9 / 6.75;
		height: auto;
		line-height: 0;
		background-color: var(--color-input-field);
		margin-top: 34px;
		margin-bottom: 44px;
	}

	&__image {
		width: 100%;
		min-width: 100%;
		max-width: 100%;
		aspect-ratio: 9 / 6.75;
		height: auto;
	}

	&__content-container {
		display: flex;
		width: 100%;
		height: 100%;
		flex-direction: column;

		@media (min-width: 768px) {
			width: 55%;
			height: unset;
			align-items: center;
			background-color: var(--color-white);
			border-radius: 8px;
			padding: 40px;
			margin-top: 80px;
			margin-bottom: 80px;
		}

		@media (min-width: 1440px) {
			width: 35%;
			padding: 40px;
		}
	}

	&__logo {
		@media (min-width: 768px) {
			margin-bottom: 32px;
		}
	}

	&__title {
		@media (min-width: 768px) {
			font-size: var(--font-size-ML);
			line-height: 32px;
			text-align: center;
			margin-bottom: 20px;
		}
	}

	&__text {
		font-size: var(--font-size-S);
		font-weight: var(--font-weight-regular);
		line-height: 20px;
		text-align: center;
		margin-bottom: 32px;
	}

	&__buttons {
		display: flex;
		width: 100%;
		flex-direction: column;
		margin-top: auto;
	}

	&__telegram-button {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-bottom: var(--space-subsections);

		@media (min-width: 768px) {
			margin-bottom: 24px;
		}
	}

	&__continue {
		text-align: center;
		font-size: var(--font-size-M);
		line-height: 24px;
		color: var(--color-input-icons);
		padding: var(--space-inner) var(--space-related-items);
		margin: 0 auto;

		transition: color 0.3s ease;

		&:hover,
		&:focus {
			color: var(--color-text-secondary);
		}

		&:active {
			color: var(--color-text);
		}
	}

	&__copyright {
		position: absolute;
		bottom: 20px;
		right: var(--padding-side);
		font-size: var(--font-size-S);
		color: var(--color-white);
		opacity: 0.5;
	}
}
</style>
