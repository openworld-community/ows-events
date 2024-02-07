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

// const isGoBack = computed(() => {

// }) 
</script>

<template>
	<div class="root">
		<HeaderCommon
			v-if="mobile || userStore.isAuthorized"
			:has-back-button="true"
		/>
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
						<p class="user-info__password">
							********
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
						:no-border="!mobile"
						:button-text="$t('global.button.edit_profile')"
						icon-name="edit"
						@click="openEditProfileModal"
					/>
				</div>
				<div
					v-if="userData"
					class="user-page__link link"
				>
					<CommonButton
						:link="localePath(RoutePathEnum.USER_MY_EVENTS)"
						:button-text="$t('user.my_events.title')"
						icon-name="notebook"
						button-kind="ordinary"
						no-border
						class="link__item"
					/>
					<CommonButton
						:link="localePath(RoutePathEnum.USER_FAVOURITES)"
						:button-text="$t('user.favourites.title')"
						icon-name="heart"
						button-kind="ordinary"
						no-border
						class="link__item"
					/>
				</div>
				<UserAdditionalBlock v-if="userData && mobile" />
				<CommonButton
					class="user-page__logout-button"
					button-kind="warning"
					no-border
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
			justify-content: flex-start;
			margin-top: unset;
			width: 226px;
		}

		@media (min-width: 1440px) {
			width: 250px;
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
			padding-left: 18px;
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
		flex-direction: column;
		margin-bottom: 0;
	}

	&__item {
		justify-content: flex-start;
		width: 226px;

		@media (min-width: 1440px) {
			width: 250px;
		}

		@media (max-width: 767px) {
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

			&:deep(.button__content) {
				font-size: var(--font-size-S);
			}

			&:not(:last-child) {
				margin-right: var(--padding-side);

				@media (min-width: 768px) {
					margin-right: 0;
				}
			}

			&:deep(svg) {
				color: var(--color-accent-green-main);
				width: 32px;
				height: 32px;
				margin-bottom: 8px;
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
	}
}
</style>
