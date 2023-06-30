<script setup lang="ts">
type MockProfileInfo = {
	name: string;
	company: string;
};

type Props = {
	closeEditProfileModal: () => void;
	dataForEdit?: MockProfileInfo;
};

const props = defineProps<Props>();

const inputValues = ref({
	name: props.dataForEdit?.name ?? '',
	company: props.dataForEdit?.company ?? ''
});

const checkProfileFilling = computed(() => {
	return !!(inputValues.value.name || inputValues.value.company);
});
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
					{{ $t('component.edit_profile_modal.title') }}
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
				<ModalUiModalSection :label="$t('component.edit_profile_modal.fields.name')">
					<template #child>
						<CommonUiBaseInput
							v-model="inputValues.name"
							name="username"
							:placeholder="
								$t('component.edit_profile_modal.fields.name_placeholder')
							"
						/>
					</template>
				</ModalUiModalSection>
				<ModalUiModalSection :label="$t('component.edit_profile_modal.fields.organizer')">
					<template #child>
						<CommonUiBaseInput
							v-model="inputValues.company"
							name="organizer"
							:placeholder="
								$t('component.edit_profile_modal.fields.organizer_placeholder')
							"
						/>
					</template>
				</ModalUiModalSection>
			</form>
			<footer class="modal-card__foot">
				<CommonButton
					class="modal-card__button modal-card__button--edit"
					button-kind="ordinary"
					:button-text="$t('component.edit_profile_modal.button.cancel')"
					@click="props.closeEditProfileModal"
				/>
				<CommonButton
					class="modal-card__button modal-card__button--save"
					button-kind="success"
					:button-text="$t('component.edit_profile_modal.button.submit')"
					:is-disabled="!checkProfileFilling"
					@click="props.closeEditProfileModal"
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
