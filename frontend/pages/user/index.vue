<script setup lang="ts">
import { useUserStore } from '~/stores/user.store';
import { getUserName } from '~/utils/user';
import { RoutePathEnum } from '~/constants/enums/route';
import { SeoItempropUserEnum, SeoItemTypeEnum } from '~/constants/enums/seo';
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
			<div class="user-page__wrapper">
				<div class="user-page__info user-info">
					<div class="user-info__wrapper">
						<h1 class="user-info__name">
							{{ $t('user.greeting') }},
							<span :itemprop="SeoItempropUserEnum.name">{{
								`${getUserName()}!`
							}}</span>
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
							:width="mobile ? '32' : '24'"
							:height="mobile ? '32' : '24'"
							:color="
								mobile ? 'var(--color-accent-green-main)' : 'var(--color-text-main)'
							"
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
							:width="mobile ? '32' : '24'"
							:height="mobile ? '32' : '24'"
							:color="
								mobile ? 'var(--color-accent-green-main)' : 'var(--color-text-main)'
							"
						/>
						<span class="link__text">{{ $t('user.favourites.title') }}</span>
					</NuxtLink>
				</div>
				<UserAdditionalBlock v-if="userData && mobile" />
				<CommonButton
					class="user-page__logout-button"
					button-kind="warning"
					:button-text="$t('global.button.logout')"
					icon-name="logout"
					@click="logout()"
				/>
			</div>
			<UserAdditionalBlock v-if="userData && !mobile" />
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
		min-height: unset;
		flex-direction: row;
		align-items: flex-start;
		margin-bottom: unset;
	}

	&__wrapper {
		display: flex;
		width: 100%;
		height: 100%;
		flex-direction: column;
		padding-top: 18px;

		@media (min-width: 768px) {
			width: 40%;
			margin-right: 30px;
		}

		@media (min-width: 1440px) {
			width: 32%;
			padding-top: 44px;
			padding-left: 18px;
		}
	}

	&__title {
		padding-top: 100px;
		font-size: var(--font-size-L);
		font-weight: var(--font-weight-regular);
	}

	&__logout-button {
		width: 100%;
		margin-top: auto;

		@media (min-width: 768px) {
			width: max-content;
			margin-top: unset;
		}
	}
}

.user-info {
	display: flex;
	width: 100%;
	flex-direction: column;
	align-items: center;
	margin-bottom: 24px;

	@media (min-width: 768px) {
		align-items: flex-start;
		margin-bottom: 4px;
	}

	&__wrapper {
		display: flex;
		width: 100%;
		flex-direction: column;
		margin-bottom: 18px;

		@media (min-width: 768px) {
			margin-bottom: 12px;
		}
	}

	&__name {
		font-size: var(--font-size-ML);
		font-weight: var(--font-weight-regular);
		line-height: 24px;
		margin-bottom: 6px;

		@media (min-width: 768px) {
			font-size: var(--font-size-L);
			margin-bottom: 8px;
		}
	}

	&__nickname {
		font-size: var(--font-size-S);
		line-height: 20px;
		color: var(--color-text-secondary);

		&:not(:last-child) {
			margin-bottom: 6px;
		}

		@media (min-width: 1440px) {
			font-size: var(--font-size-XS);
			line-height: 20px;
			margin-bottom: 8px;
		}
	}

	&__organizer {
		font-size: var(--font-size-S);
		line-height: 16px;

		@media (min-width: 1440px) {
			font-size: var(--font-size-XS);
			line-height: 16px;
		}
	}

	&__edit-button {
		width: 100%;

		@media (min-width: 768px) {
			width: max-content;
		}
	}
}

.link {
	display: flex;
	width: 100%;
	margin-bottom: 24px;

	@media (min-width: 768px) {
		width: max-content;
		flex-direction: column;
		margin-bottom: 0;
	}

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

		@media (min-width: 768px) {
			flex-direction: row;
			justify-content: flex-start;
			height: 40px;
			background-color: unset;
			border-color: var(--color-white);
			font-size: var(--font-size-S);
			margin-bottom: 4px;
		}

		&:not(:last-child) {
			margin-right: var(--padding-side);

			@media (min-width: 768px) {
				margin-right: 0;
			}
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

		@media (min-width: 768px) {
			margin-bottom: 0;
			margin-right: 5px;
		}
	}
}
</style>
