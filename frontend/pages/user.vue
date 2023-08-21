<script setup lang="ts">
import { useModal, type UseModalOptions, VueFinalModal } from 'vue-final-modal';
import EditProfile from '@/components/modal/EditProfile.vue';
import { TELEGRAM_AUTH_BOT_NAME, BASE_URL } from '../../frontend/constants/url';
import { useUserStore } from '../stores/user.store';
import { getUserName } from '../utils/user';

const userStore = useUserStore();
const tokenCookie = useCookie<string | null>('token');

const userData = computed(() => userStore.userInfo);

const {
	open: openEditProfileModal,
	close: closeEditProfileModal,
	patchOptions: patchEditProfileModal
} = useModal({ component: EditProfile } as UseModalOptions<
	InstanceType<typeof VueFinalModal>['$props']
>);
patchEditProfileModal({
	attrs: {
		closeEditProfileModal,
		dataForEdit: userData.value
	}
});

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

watch(
	() => userStore.isAuthorized,
	async (e) => {
		if (!e) {
			await nextTick();
			initTGButton();
		}
	}
);

onMounted(async () => {
	await userStore.getUserInfo();

	if (!userStore.isAuthorized) {
		initTGButton();
	}
});

const logout = () => {
	tokenCookie.value = null;
	userStore.$patch({ userInfo: null });
};
</script>

<template>
	<div class="user-page">
		<template v-if="userStore.isAuthorized">
			<div class="user-page__info user-info">
				<div class="user-info__wrapper">
					<p class="user-info__name">
						{{ `${$t('user.greeting')}, ${getUserName()}!` }}
					</p>
					<p class="user-info__nickname">{{ `@${userData?.nickname}` }}</p>
					<p
						v-if="userData?.company"
						class="user-info__organizer"
					>
						{{ userData?.company }}
					</p>
				</div>
				<CommonButton
					class="user-info__edit-button"
					button-kind="ordinary"
					:button-text="$t('global.button.edit_profile')"
					icon-name="edit"
					@click="openEditProfileModal"
				/>
			</div>
			<div class="user-page__link link">
				<NuxtLink
					to="#"
					class="link__item"
				>
					<CommonIcon
						name="notebook"
						width="32"
						height="32"
						color="var(--color-accent-green-main)"
					/>
					<span>{{ $t('user.links.my_events') }}</span>
				</NuxtLink>
				<NuxtLink
					to="#"
					class="link__item"
				>
					<CommonIcon
						class="link__icon"
						name="heart"
						width="32"
						height="32"
						color="var(--color-accent-green-main)"
					/>
					<span class="link__text">{{ $t('user.links.favourites') }}</span>
				</NuxtLink>
			</div>
			<CommonButton
				class="user-page__button"
				button-kind="warning"
				:button-text="$t('global.button.logout')"
				icon-name="logout"
				@click="logout()"
			/>
		</template>
		<template v-else>
			<h2 class="user-page__title">
				{{ $t('user.title_unauthorized') }}
			</h2>
			<div
				ref="telegram"
				:class="'user-page__telegram-button'"
				:aria-label="$t('user.login')"
			/>
		</template>
	</div>
</template>

<style scoped lang="less">
.user-page {
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
	padding: var(--space-sections) var(--padding-side) 30px;
	margin-bottom: auto;

	&__title {
		padding-top: 100px;
		font-size: var(--font-size-L);
		font-weight: var(--font-weight-regular);
	}

	&__telegram-button {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		padding-top: 50%;
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
	overflow-y: auto;

	&__wrapper {
		display: flex;
		width: 100%;
		flex-direction: column;
		margin-bottom: var(--space-subsections);
	}

	&__name {
		font-size: var(--font-size-ML);
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
</style>
