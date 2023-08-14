<script setup lang="ts">
import { type ProfileInfo } from '@/pages/user.vue';

type Props = {
	closeEditProfileModal: () => void;
	dataForEdit?: ProfileInfo;
};

const props = defineProps<Props>();

const userData = ref({
	name: props.dataForEdit?.name ?? '',
	company: props.dataForEdit?.company ?? ''
});

const checkProfileFilling = computed(() => {
	return !!(userData.value.name || userData.value.company);
});

const updateUserData = () => {
	console.log('Здесь должен обновляться отредактированный профиль юзера');
	props.closeEditProfileModal;
};
</script>

<template>
	<CommonModalWrapper
		:hide-overlay="false"
		overlay-transition="vfm-fade"
		overlay-transition-duration="2600"
		content-transition="vfm-fade"
		:click-to-close="true"
		:esc-to-close="true"
		:lock-scroll="false"
	>
		<div class="modal">
			<header class="modal-card__head">
				<h2 class="modal-card__title">
					{{ $t('modal.edit_profile.title') }}
				</h2>
				<CommonButton
					class="modal-card__button"
					is-icon
					button-kind="ordinary"
					icon-name="close"
					@click="props.closeEditProfileModal"
				/>
			</header>
			<form
				class="modal-card__body body"
				@submit.prevent="() => void 0"
			>
				<ModalUiModalSection :label="$t('modal.edit_profile.fields.name')">
					<template #child>
						<CommonUiBaseInput
							v-model="userData.name"
							name="username"
							:placeholder="$t('modal.edit_profile.fields.name_placeholder')"
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
			</form>
			<footer class="modal-card__foot">
				<CommonButton
					class="modal-card__button modal-card__button--edit"
					button-kind="ordinary"
					:button-text="$t('global.button.cancel')"
					@click="props.closeEditProfileModal"
				/>
				<CommonButton
					class="modal-card__button modal-card__button--save"
					button-kind="success"
					:button-text="$t('global.button.save')"
					:is-disabled="!checkProfileFilling"
					@click="updateUserData"
				/>
			</footer>
		</div>
	</CommonModalWrapper>
</template>

<style scoped lang="less">
.modal {
	max-width: 350px;
	overflow: hidden;
	border-radius: 10px;
	margin: 20vh auto auto;
}

.modal-card {
	&__head {
		height: max-content;
		justify-content: space-between;
	}

	&__foot {
		padding: 20px;
		justify-content: flex-start;
	}
}

.modal-card__button {
	&--edit {
		margin-right: var(--space-related-items);
	}
}
</style>
