<script setup lang="ts">
import { useUserStore } from '~/stores/user.store';
import { getUserName } from '~/utils/user';
import { RoutePathEnum } from '~/constants/enums/route';
import { BASE_URL, TELEGRAM_AUTH_BOT_NAME } from '~/constants/url';
import { SeoItempropGlobalEnum, SeoItempropUserEnum, SeoItemTypeEnum } from '~/constants/enums/seo';
import { CookieNameEnum } from '~/constants/enums/common';

const { t } = useI18n();
const localePath = useLocalePath();

getMeta({
	title: t('meta.user.info.title'),
	description: t('meta.user.info.description')
});

const userStore = useUserStore();
const tokenCookie = useCookie<string | null>(CookieNameEnum.TOKEN);
const userCookie = useCookie('user');

const userData = computed(() => userStore.userInfo);

const telegram = ref<HTMLElement | null>(null);

const initTGButton = () => {
	const script = document.createElement('script');
	script.async = true;
	script.src = 'https://telegram.org/js/telegram-widget.js?22';

	script.setAttribute('data-size', 'large');
	script.setAttribute('data-userpic', 'false');
	script.setAttribute('data-telegram-login', TELEGRAM_AUTH_BOT_NAME);
	script.setAttribute('data-request-access', 'write');
	script.setAttribute('data-auth-url', `${BASE_URL}/api/auth/telegram`);
	telegram.value?.appendChild(script);
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

const openEditProfileModal = () => {
	userStore.$patch({ showEditModal: true });
};

const logout = () => {
	tokenCookie.value = null;
	userCookie.value = null;
	userStore.$patch({ userInfo: null });
};
</script>

<template>
	<div
		class="user-page"
		itemscope
		:itemtype="SeoItemTypeEnum.USER"
	>
		<template v-if="tokenCookie">
			<div class="user-page__info user-info">
				<div class="user-info__wrapper">
					<h1 class="user-info__name">
						{{ $t('user.greeting') }},
						<span :itemprop="SeoItempropUserEnum.name">{{ `${getUserName()}!` }}</span>
					</h1>
					<p
						v-if="userData?.nickname"
						class="user-info__nickname"
						:itemprop="SeoItempropUserEnum.nickname"
					>
						{{ `@${userData?.nickname}` }}
					</p>
					<p
						v-if="userData?.company"
						class="user-info__organizer"
						:itemprop="SeoItempropUserEnum.company"
					>
						{{ userData?.company }}
					</p>
				</div>
				<CommonButton
					v-if="userData"
					class="user-info__edit-button"
					button-kind="ordinary"
					:button-text="$t('global.button.edit_profile')"
					icon-name="edit"
					@click="openEditProfileModal"
				/>
			</div>
			<div
				v-if="userData"
				class="user-page__link link"
			>
				<NuxtLink
					:to="localePath(RoutePathEnum.USER_MY_EVENTS)"
					class="link__item"
				>
					<CommonIcon
						class="link__icon"
						name="notebook"
						width="32"
						height="32"
						color="var(--color-accent-green-main)"
					/>
					<span>{{ $t('user.my_events.title') }}</span>
				</NuxtLink>
				<NuxtLink
					:to="localePath(RoutePathEnum.USER_FAVOURITES)"
					class="link__item"
				>
					<CommonIcon
						class="link__icon"
						name="heart"
						width="32"
						height="32"
						color="var(--color-accent-green-main)"
					/>
					<span class="link__text">{{ $t('user.favourites.title') }}</span>
				</NuxtLink>
			</div>
			<div
				v-if="userData"
				class="my-events__donate donate"
			>
				<img
					srcset="@/assets/img/user/donate-screen@2x.jpg 2x"
					src="@/assets/img/user/donate-screen@1x.jpg"
					width="351"
					height="116"
					alt=""
					class="donate__image"
					:itemprop="SeoItempropGlobalEnum.IMAGE"
				/>
				<p class="donate__text">{{ $t('user.donate.text') }}</p>
				<CommonButton
					button-kind="success"
					:button-text="$t('user.donate.button')"
					icon-name="donate"
					:link="localePath(RoutePathEnum.DONATION)"
				/>
			</div>
			<CommonButton
				class="user-page__button"
				button-kind="warning"
				:button-text="$t('global.button.logout')"
				icon-name="logout"
				@click="logout()"
			/>
		</template>
		<template v-else-if="!userStore.isAuthorized">
			<div class="unauthorized__image-container">
				<img
					srcset="@/assets/img/user/unauthorized-screen@2x.jpg 2x"
					src="@/assets/img/user/unauthorized-screen@1x.jpg"
					width="351"
					height="264"
					alt=""
					class="unauthorized__image"
					:itemprop="SeoItempropGlobalEnum.IMAGE"
				/>
			</div>
			<h1 class="unauthorized__title">
				{{ $t('user.unauthorized.title') }}
			</h1>
			<div class="unauthorized__buttons">
				<div
					v-if="!userStore.isAuthorized"
					ref="telegram"
					class="unauthorized__telegram-button"
				/>
				<NuxtLink
					:to="localePath(RoutePathEnum.HOME)"
					class="unauthorized__continue"
				>
					{{ $t('user.unauthorized.continue') }}
				</NuxtLink>
			</div>
		</template>

		<ModalEditProfile
			v-if="userStore.showEditModal"
			:data-for-edit="userData"
		/>
	</div>
</template>

<style scoped lang="less">
.user-page {
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
	min-height: calc(100vh - var(--header-height));
	padding: var(--space-sections) var(--padding-side) 30px;
	margin-bottom: auto;

	// Для адаптивной height на iOs
	@supports (-webkit-touch-callout: none) {
		min-height: -webkit-fill-available;
	}

	&__title {
		padding-top: 100px;
		font-size: var(--font-size-L);
		font-weight: var(--font-weight-regular);
	}

	&__button {
		margin-top: auto;
	}
}

.user-info {
	display: flex;
	width: 100%;
	flex-direction: column;
	align-items: center;
	margin-bottom: var(--space-sections);

	&__wrapper {
		display: flex;
		width: 100%;
		flex-direction: column;
		margin-bottom: var(--space-subsections);
	}

	&__name {
		font-size: var(--font-size-ML);
		font-weight: var(--font-weight-regular);
		line-height: 24px;
		margin-bottom: var(--space-related-items);
	}

	&__nickname {
		font-size: var(--font-size-S);
		line-height: 20px;
		color: var(--color-text-secondary);

		&:not(:last-child) {
			margin-bottom: var(--space-inner);
		}
	}

	&__organizer {
		font-size: var(--font-size-S);
		line-height: 20px;
	}

	&__edit-button {
		width: 100%;
	}
}

.link {
	display: flex;
	width: 100%;
	margin-bottom: var(--space-sections);

	&__item {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 108px;
		background-color: var(--color-background-secondary);
		border-radius: 8px;

		&:not(:last-child) {
			margin-right: var(--padding-side);
		}
	}

	&__icon {
		margin-bottom: var(--space-related-items);
	}
}

.donate {
	display: flex;
	width: 100%;
	min-height: 232px;
	flex-direction: column;
	align-items: center;
	background-color: var(--color-background-secondary);
	border-radius: 8px;
	padding-bottom: 20px;
	margin-bottom: var(--space-sections);

	&__image {
		width: 100%;
		min-width: 100%;
		max-width: 100%;
		height: 100%;
		margin-bottom: var(--space-unrelated-items);
	}

	&__text {
		font-size: var(--font-size-L);
		line-height: 24px;
		margin-bottom: var(--space-unrelated-items);
	}
}

.unauthorized {
	&__image-container {
		display: flex;
		width: 100%;
		min-height: 264px;
		line-height: 0;
		background-color: var(--color-input-field);
		margin-top: 34px;
		margin-bottom: 64px;
	}

	&__image {
		width: 100%;
		min-width: 100%;
		max-width: 100%;
		height: 100%;
	}

	&__title {
		font-size: var(--font-size-S);
		font-weight: var(--font-weight-regular);
		line-height: 20px;
		text-align: center;
		margin-bottom: var(--space-sections);
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
	}

	&__continue {
		text-align: center;
		font-size: var(--font-size-M);
		font-weight: var(--font-weight-bold);
		line-height: 24px;
		color: var(--color-text-secondary);
		padding: var(--space-inner) var(--space-related-items);
		margin: 0 auto;
	}
}
</style>
