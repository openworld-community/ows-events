<script setup lang="ts">
import type { UserInfo } from '../../../common/types/user';
import { useUserStore } from '../../stores/user.store';

import { apiRouter } from '../../composables/useApiRouter';

import { RoutePathEnum } from '~/constants/enums/route';
import { CookieNameEnum } from '~/constants/enums/common';

definePageMeta({
	layout: 'profile'
});

const localePath = useLocalePath();
const userStore = useUserStore();
const dataForEdit = userStore.userInfo;

const userData = ref<UserInfo | null | undefined>({
	first_name: dataForEdit?.first_name ?? '',
	last_name: dataForEdit?.last_name ?? '',
	nickname: dataForEdit?.nickname ?? '',
	company: dataForEdit?.company ?? '',
	email: '',
	phone: ''
});

const closeEditProfileModal = async () => {
	await navigateTo(localePath(`${RoutePathEnum.USER_PAGE}`));
};

const checkFormFilling = computed(() => {
	return !!userData.value?.nickname;
});

const isLoading = ref(false);

const updateUserData = async () => {
	isLoading.value = true;
	// если запрос проходит, то ничего не приходит, т.е. может придти только error
	const { error } = await apiRouter.user.update.useMutation({
		data: { userInfo: userData.value }
	});
	if (!error.value) {
		await userStore.getUserInfo();

		await navigateTo(localePath(`${RoutePathEnum.USER_PAGE}`));
	}
	isLoading.value = false;
};
</script>

<template>
	<div class="edit-profile">
		<div class="edit-profile__fields">
			<ModalUiModalSection
				:label="$t('modal.edit_profile.fields.name')"
				:type="'column'"
			>
				<template #child>
					<CommonUiBaseInput
						v-model="userData.first_name"
						name="name"
						:placeholder="$t('modal.edit_profile.fields.name_placeholder')"
					/>
					<CommonUiBaseInput
						v-model="userData.last_name"
						name="surname"
						:placeholder="$t('modal.edit_profile.fields.surname_placeholder')"
					/>
				</template>
			</ModalUiModalSection>
			<ModalUiModalSection :label="$t('modal.edit_profile.fields.nickname')">
				<template #child>
					<CommonUiBaseInput
						v-model="userData.nickname"
						name="nickname"
						:placeholder="$t('modal.edit_profile.fields.nickname_placeholder')"
						required
					/>
				</template>
			</ModalUiModalSection>
			<ModalUiModalSection :label="$t('modal.edit_profile.fields.organizer')">
				<template #child>
					<CommonUiBaseInput
						v-model="userData.company"
						name="organizer"
						:placeholder="$t('modal.edit_profile.fields.organizer_placeholder')"
					/>
				</template>
			</ModalUiModalSection>
		</div>
		<div class="edit-profile__buttons">
			<CommonButton
				class="edit-profile__button"
				button-kind="ordinary"
				:button-text="$t('global.button.cancel')"
				@click="closeEditProfileModal"
			/>
			<CommonButton
				class="edit-profile__button"
				button-kind="dark"
				:button-text="$t('global.button.save')"
				:is-disabled="!checkFormFilling"
				:is-loading="isLoading"
				@click="updateUserData"
			/>
		</div>
	</div>
</template>

<style scoped lang="less">
.edit-profile {
	width: 100%;
	height: 100%;
	padding-left: var(--padding-side);
	padding-right: var(--padding-side);
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-top: 20px;
	&__fields {
		width: 100%;

		@media (min-width: 768px) {
			max-width: 540px;
		}
	}
	&__buttons {
		width: 100%;
		display: flex;
		justify-content: space-between;
		gap: 10px;

		@media (min-width: 768px) {
			max-width: 540px;
		}
	}

	&__button {
		width: calc(50% - 10px);
	}
}
</style>
