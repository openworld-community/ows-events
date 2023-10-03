<script setup lang="ts">
import { useUserStore } from '~/stores/user.store';
import { getUserName } from '~/utils/user';
import { RoutePathEnum } from '~/constants/enums/route';
import { SeoItempropGlobalEnum, SeoItempropUserEnum, SeoItemTypeEnum } from '~/constants/enums/seo';
import { CookieNameEnum } from '~/constants/enums/common';

const { t } = useI18n();
const localePath = useLocalePath();
const mobile = inject('mobile');

getMeta({
	title: t('meta.user.info.title'),
	description: t('meta.user.info.description')
});

const userStore = useUserStore();
const tokenCookie = useCookie<string | null>(CookieNameEnum.TOKEN);
const userCookie = useCookie(CookieNameEnum.TG_USER);

const userData = computed(() => userStore.userInfo);

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
	<div class="root">
		<HeaderCommon v-if="mobile || userStore.isAuthorized" />
		<main
			v-if="userStore.isAuthorized"
			class="user-page"
			itemscope
			:itemtype="SeoItemTypeEnum.USER"
		>
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
		</main>
		<UserUnauthorized v-else />

		<ModalEditProfile
			v-if="userStore.showEditModal"
			:data-for-edit="userData"
		/>

		<FooterCommon v-if="!mobile && userStore.isAuthorized" />
	</div>
</template>

<style scoped lang="less">
.user-page {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100%;
	min-height: calc(100vh - var(--header-height));
	padding-left: var(--padding-side);
	padding-right: var(--padding-side);
	padding-bottom: 30px;
	margin-bottom: auto;

	//Для адаптивной height на iOs
	@supports (-webkit-touch-callout: none) {
		min-height: -webkit-fill-available;
	}

	@media (min-width: 768px) {
		min-height: 100%;
		margin-bottom: unset;
	}

	&__title {
		padding-top: 100px;
		font-size: var(--font-size-L);
		font-weight: var(--font-weight-regular);
	}

	&__button {
		margin-top: auto;
		width: 100%;
	}
}

.user-info {
	display: flex;
	width: 100%;
	flex-direction: column;
	align-items: center;
	margin-top: 24px;
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
		border: 1px solid var(--color-background-secondary);
		border-radius: 8px;

		transition-property: background-color, border-color;
		transition-duration: 0.3s;
		transition-timing-function: ease;

		&:not(:last-child) {
			margin-right: var(--padding-side);
		}

		&:hover,
		&:focus {
			border-color: var(--color-accent-green-main-30);
		}

		&:active {
			background-color: var(--color-accent-green-main-10);
			border-color: var(--color-accent-green-main-10);
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
</style>
