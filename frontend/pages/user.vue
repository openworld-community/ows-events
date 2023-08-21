<script setup lang="ts">
import { useModal, type UseModalOptions, VueFinalModal } from 'vue-final-modal';
import EditProfile from '@/components/modal/EditProfile.vue';
import { TELEGRAM_AUTH_BOT_NAME, BASE_URL } from '../../frontend/constants/url';
import { useUserStore } from '../stores/user.store';
import { getUserName } from '../utils/user';

const userStore = useUserStore();
const tokenCookie = useCookie<string | null>('token');

export type ProfileInfo = {
	nickname: string;
	name: string;
	company: string;
};

const userData = computed(() => userStore.userInfo);

// if (tokenCookie.value && !userStore.userInfo) {
// 	const { data } = await apiRouter.user.getUserInfo.useQuery({ data: { userToken: tokenCookie.value } })
// 	userData.value = data.value
// }
//
// 	ref<ProfileInfo>({
// 	nickname: '@Gosha',
// 	name: 'Гоша',
// 	company: 'EverParty'
// });

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
			initTGButton()
		}
	}
);

onMounted(() => {
	initTGButton();
});

const logout = () => {
	tokenCookie.value = null;
	userStore.$patch({userInfo: null})
};
</script>

<template>
	<div class="user-page">
		<template v-if="userStore.isAuthorized">
			<div class="user-page__info user-info">
				<div class="user-info__wrapper">
					<p class="user-info__name">
						{{ getUserName() }}
					</p>
					<p class="user-info__nickname">{{ userData?.nickname }}</p>
					<p
						v-if="userData?.company"
						class="user-info__organizer"
					>
						{{ userData?.company }}
					</p>
				</div>
				<CommonButton
					class="info__edit-button"
					button-kind="ordinary"
					:button-text="$t('global.button.edit')"
					icon-name="edit"
					@click="openEditProfileModal"
				/>
			</div>
			<div class="user-page__actions">
				<CommonButton
					class="user-page__form-button"
					button-kind="warning"
					:button-text="$t('global.button.logout')"
					icon-name="logout"
					@click="logout()"
				/>
			</div>
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
	margin-top: var(--space-related-items);
	padding-left: var(--padding-side);
	padding-right: var(--padding-side);
	padding-bottom: 30px;
	margin-bottom: auto;
	max-height: calc(100vh - var(--header-height));

	@supports (-webkit-touch-callout: none) {
		max-height: -webkit-fill-available;
	}

	&__title {
		font-size: var(--font-size-L);
		font-weight: var(--font-weight-regular);
		margin-bottom: var(--space-unrelated-items);
	}

	&__actions {
		display: flex;
		flex-direction: column;
		background-color: var(--color-white);
		margin-top: auto;
	}

	&__form-button {
		width: 100%;
		height: 40px;

		&--edit {
			margin-bottom: var(--space-unrelated-items);
		}
	}

	&__telegram-button {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		padding-top: 50%;
	}
}

.user-info {
	display: flex;
	width: 100%;
	flex-direction: column;
	align-items: center;
	padding-inline: 0;
	margin-bottom: var(--space-sections);
	overflow-y: auto;

	&__wrapper {
		display: flex;
		width: 100%;
		flex-direction: column;
		align-items: center;
	}

	&__name {
		font-size: var(--font-size-ML);
		margin-bottom: var(--space-inner);
	}

	&__nickname {
		font-size: var(--font-size-S);
		line-height: 20px;
		color: var(--color-text-secondary);
		margin-bottom: var(--space-inner);
	}

	&__organizer {
		font-size: var(--font-size-S);
		line-height: 20px;
	}
}
</style>