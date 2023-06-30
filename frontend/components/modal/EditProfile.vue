<script setup lang="ts">
type Props = {
	closeEditProfileModal: () => void;
	saveProfile: () => void;
};

const props = defineProps<Props>();
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
			</header>
			<form></form>
			<footer class="modal-card__foot">
				<CommonButton
					class="modal-card__button--edit"
					button-kind="ordinary"
					:button-text="$t('component.edit_profile_modal.button.cancel')"
					@click="props.closeEditProfileModal"
				/>
				<CommonButton
					button-kind="success"
					:button-text="$t('component.edit_profile_modal.button.submit')"
					@click="props.saveProfile"
				/>
			</footer>
		</div>
	</CommonModalWrapper>
</template>

<style scoped lang="less">
.modal {
	//TODO: пока верстка только мобилки
	max-width: 350px;
	overflow: hidden;
	border-radius: 10px;
	margin: 40vh auto auto;
}

.modal-card {
	&__head {
		height: max-content;
		justify-content: flex-start;
	}

	&__foot {
		padding: 20px;
		justify-content: flex-start;
	}
}

.modal-card__button--edit {
	margin-right: var(--space-related-items);
}
</style>
