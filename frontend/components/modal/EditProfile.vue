<script setup lang="ts">
import type { UserInfo } from '../../../common/types/user';
import { useUserStore } from '../../stores/user.store';

type Props = {
	dataForEdit?: UserInfo | null;
};

const userStore = useUserStore();
const props = defineProps<Props>();

const userData = ref({
	name: props.dataForEdit?.first_name ?? '',
	surname: props.dataForEdit?.last_name ?? '',
	nickname: props.dataForEdit?.nickname ?? '',
	company: props.dataForEdit?.company ?? ''
});

const closeEditProfileModal = () => {
	userStore.$patch({ showEditModal: false });
};

const checkFormFilling = computed(() => {
	return !!(userData.value.name || userData.value.company);
});

const updateUserData = () => {
	closeEditProfileModal();
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
			<ModalUiModalSection :label="$t('modal.edit_profile.fields.name')">
				<template #child>
					<CommonUiBaseInput
						v-model="userData.name"
						name="name"
						:placeholder="$t('modal.edit_profile.fields.name_placeholder')"
					/>
					<CommonUiBaseInput
						v-model="userData.surname"
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
		</template>
		<template #footer>
			<CommonButton
				class="modal-card__button modal-card__button--edit"
				button-kind="ordinary"
				:button-text="$t('global.button.cancel')"
				@click="closeEditProfileModal"
			/>
			<CommonButton
				class="modal-card__button modal-card__button--save"
				button-kind="success"
				:button-text="$t('global.button.save')"
				:is-disabled="!checkFormFilling"
				@click="updateUserData"
			/>
		</template>
	</CommonModalWrapper>
</template>

<style scoped lang="less">
</style>
