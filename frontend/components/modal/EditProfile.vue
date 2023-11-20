<script setup lang="ts">
import type { UserInfo } from '../../../common/types/user';
import { useUserStore } from '../../stores/user.store';
import { apiRouter } from '../../composables/useApiRouter';

type Props = {
	dataForEdit?: UserInfo | null | undefined;
};

const userStore = useUserStore();
const props = defineProps<Props>();

const userData = ref({
	first_name: props.dataForEdit?.first_name ?? '',
	last_name: props.dataForEdit?.last_name ?? '',
	nickname: props.dataForEdit?.nickname ?? '',
	company: props.dataForEdit?.company ?? '',
	email: '',
	phone: ''
});

const closeEditProfileModal = () => {
	userStore.$patch({ showEditModal: false });
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
		closeEditProfileModal();
	}
	isLoading.value = false;
};
</script>

<template>
	<CommonModalWrapper
		v-model="userStore.showEditModal"
		:title="$t('modal.edit_profile.title')"
		has-close-button
		@close-modal="closeEditProfileModal"
	>
		<template #form>
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
		</template>
		<template #footer>
			<CommonButton
				class="edit-profile__button"
				button-kind="ordinary"
				:button-text="$t('global.button.cancel')"
				@click="closeEditProfileModal"
			/>
			<CommonButton
				class="edit-profile__button"
				button-kind="success"
				:button-text="$t('global.button.save')"
				:is-disabled="!checkFormFilling"
				:is-loading="isLoading"
				@click="updateUserData"
			/>
		</template>
	</CommonModalWrapper>
</template>

<style scoped lang="less">
.edit-profile {
	&__fields {
		width: 100%;

		@media (min-width: 768px) {
			max-width: 540px;
		}
	}

	&__button {
		width: 25%;
		min-width: max-content;
	}
}
</style>
