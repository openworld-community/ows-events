<script setup lang="ts">
import { RoutePathEnum } from '@/constants/enums/route';
import { useUserStore } from '@/stores/user.store';
import { TELEGRAM_AUTH_BOT_NAME } from '@/constants/url';
import { BASE_URL } from '@/constants/url';
import { CookieNameEnum } from '@/constants/enums/common';
import { GoogleSignInButton } from 'vue3-google-signin';
import { GOOGLE_OAUTH_URL } from '@/constants/url';

type TFormType = 'login' | 'signup';

const userStore = useUserStore();
const mobile = inject('mobile');
// const desktop = inject('desktop');
const localePath = useLocalePath();
const tokenCookie = useCookie<string | null>(CookieNameEnum.TOKEN);

const login = ref<TFormType>('login');

const changeFormType = () => {
	login.value === 'login' ? (login.value = 'signup') : (login.value = 'login');
};

const telegram = ref<HTMLElement | null>(null);

const initTGButton = () => {
	const script = document.createElement('script');
	script.async = true;
	script.src = 'https://telegram.org/js/telegram-widget.js?22';

	script.setAttribute('data-size', 'large');
	script.setAttribute('data-userpic', 'false');
	script.setAttribute('data-telegram-login', TELEGRAM_AUTH_BOT_NAME);
	script.setAttribute('data-radius', '8');
	script.setAttribute('data-request-access', 'write');
	script.setAttribute('data-auth-url', `${BASE_URL}/api/auth/telegram`);
	script.addEventListener('load', () => {
		// после загрузки скрипта меняем цвет кнопки на активный
		const tgicon = document.getElementById('tgicon');
		tgicon.classList.add('tgicon_active');
	});

	const tgauth = document.getElementById('tgauth');
	tgauth.appendChild(script);
};

onMounted(() => {
	if (!userStore.isAuthorized) {
		initTGButton();
	}
});

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
				{{
					login === 'login'
						? $t('user.unauthorized.loginText')
						: $t('user.unauthorized.signupText')
				}}
			</p>

			<UserLogin v-if="login === 'login'" />

			<UserSignUp v-else />

			<CommonButton
				:button-text="
					login === 'login'
						? $t('user.unauthorized.signup')
						: $t('user.unauthorized.login')
				"
				@click="changeFormType"
			/>

			<div class="unauthorized__buttons">
				<div class="unauthorized__wrapper">
					<GoogleSignInButton
						:login-uri="GOOGLE_OAUTH_URL"
						ux-mode="redirect"
						type="icon"
						logo_alignment="center"
					/>

					<div
						ref="telegram"
						class="unauthorized__telegram-button"
						@click="
							useTrackEvent('login', {
								method: 'Telegram'
							})
						"
					>
						<div
							id="tgauth"
							class="unauthorized__tgauth"
						>
							<div
								id="tgicon"
								class="unauthorized__tgicon"
							></div>
						</div>
					</div>
				</div>
			</div>

			<NuxtLink
				:to="localePath(RoutePathEnum.HOME)"
				class="unauthorized__continue"
			>
				<CommonButton
					v-if="!mobile"
					:is-icon="true"
					icon-name="close"
					:icon-color="'var(--color-icons)'"
					:alt="$t('form.global.close')"
				/>
			</NuxtLink>
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
		background: url(@/assets/img/user/unauthorized-background.svg) 0 0 no-repeat;
		background-size: cover;

		// @media (-webkit-min-device-pixel-ratio: 2),
		// (min-resolution: 192dpi) {
		// 	background-image: url(@/assets/img/user/unauthorized-background.svg);
		// }
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
		position: relative;

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
		height: 40px !important;
		width: 40px !important;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		// margin-bottom: var(--space-subsections);

		// @media (min-width: 768px) {
		// 	margin-bottom: 24px;
		// }
	}

	&__continue {
		position: absolute;
		top: 0;
		right: 0;

		text-align: center;
		font-size: var(--font-size-M);
		line-height: 24px;
		// padding: 10px 0;
		padding: var(--space-related-items);
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

	&__wrapper {
		align-self: center;
		margin: 10px;
		display: flex;
		gap: 10px;
	}

	&__tgauth {
		overflow: hidden;
		border-radius: 4px;
		height: 38px !important;
		width: 38px !important;
		position: absolute;
	}

	&__tgicon {
		overflow: hidden;
		border-radius: 4px;
		height: 38px !important;
		width: 38px !important;
		position: absolute;
		background-image: url('@/assets/icon/social/telegram_icon_48x48.png');
		background-size: cover;
		pointer-events: none;
		filter: grayscale(100%);
	}
}

.tgicon_active {
	filter: grayscale(0%);
}
</style>
