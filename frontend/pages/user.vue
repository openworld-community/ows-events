<script setup lang="ts">
import { useModal, type UseModalOptions, VueFinalModal } from 'vue-final-modal';
import EditProfile from '@/components/modal/EditProfile.vue';

const {
	open: openEditProfileModal,
	close: closeEditProfileModal,
	patchOptions: patchEditProfileModal
} = useModal({ component: EditProfile } as UseModalOptions<
	InstanceType<typeof VueFinalModal>['$props']
>);
patchEditProfileModal({
	attrs: {
		closeEditProfileModal
	}
});

type Props = {
	logout: () => void;
};

const props = defineProps<Props>();
</script>

<template>
	<section class="user-page">
		<div class="user-page__fieldset">
			<h2 class="user-page__title">{{ $t('user.title_profile') }}</h2>
			<div class="user-page__field">
				<p class="user-page__field-name">{{ $t('user.nickname') }}</p>
				<p class="user-page__field-value">{{ nickname }}</p>
			</div>
			<div class="user-page__field">
				<p class="user-page__field-name">{{ $t('user.name') }}</p>
				<p class="user-page__field-value">{{ name }}</p>
			</div>
			<div class="user-page__field">
				<p class="user-page__field-name">{{ $t('user.affiliation') }}</p>
				<p class="user-page__field-value">{{ affiliation }}</p>
			</div>
		</div>
		<div class="user-page__actions">
			<CommonButton
				class="user-page__form-button user-page__form-button--edit"
				button-kind="ordinary"
				:button-text="$t('user.buttons.edit')"
				icon-name="edit"
				@click="openEditProfileModal"
			/>
			<CommonButton
				class="user-page__form-button"
				button-kind="warning"
				:button-text="$t('user.buttons.logout')"
				icon-name="logout"
				@click="props.logout"
			/>
		</div>
	</section>
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

	&__fieldset {
		display: flex;
		flex-direction: column;
		width: 100%;
		padding-inline: 0;
		margin-bottom: var(--space-sections);
	}

	&__field {
		width: 100%;
		min-height: 60px;
		border-color: var(--color-input-field);
		border-radius: 12px;
		box-shadow: var(--shadow-sidebar);
		padding: 8px 12px;
		border: solid 0.5px;
		border-color: var(--color-input-field);
		//box-shadow: 0px 1px 6px 0px rgba(78, 78, 78, 0.15);
	}

	&__title {
		font-size: var(--font-size-L);
		font-weight: var(--font-weight-regular);
		margin-bottom: var(--space-unrelated-items);
	}

	&__field p {
		margin: 0;
		padding: 0;
	}

	&__field:not(:last-child) {
		margin-bottom: var(--space-related-items);
	}

	&__field-name {
		color: var(--color-text-secondary);
		font-size: var(--font-size-XS);
		margin-bottom: var(--space-related-items);
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
}
</style>
