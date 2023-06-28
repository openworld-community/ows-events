<script setup lang="ts">
type Props = {
	editProfile: () => void;
	logout: () => void;
};

const props = defineProps<Props>();
</script>

<template>
	<section class="user-page">
		<form class="user-page__form">
			<fieldset class="user-page__fieldset">
				<h2 class="user-page__title">{{ $t('user.title_profile') }}</h2>
				<label
					class="user-page__label"
					for="form-nickname"
				>
					<span>{{ $t('user.nickname') }}</span>
					<input
						id="form-nickname"
						class="user-page__input"
						type="text"
						placeholder="Random Name"
					/>
				</label>
				<label
					class="user-page__label"
					for="form-name"
				>
					<span>{{ $t('user.name') }}</span>
					<input
						id="form-name"
						class="user-page__input"
						type="text"
					/>
				</label>
				<label
					class="user-page__label"
					for="form-surname"
				>
					<span>{{ $t('user.surname') }}</span>
					<input
						id="form-surname"
						class="user-page__input"
						type="text"
					/>
				</label>
				<label
					class="user-page__label"
					for="form-affiliation"
				>
					<span>{{ $t('user.affiliation') }}</span>
					<input
						id="form-affiliation"
						class="user-page__input"
						type="text"
					/>
				</label>
			</fieldset>

			<fieldset class="user-page__fieldset">
				<h2 class="user-page__title">{{ $t('user.title_contacts') }}</h2>
				<label
					class="user-page__label"
					for="form-email"
				>
					<span>{{ $t('user.email') }}</span>
					<input
						id="form-email"
						class="user-page__input"
						type="text"
					/>
				</label>
				<label
					class="user-page__label"
					for="form-phone"
				>
					<span>{{ $t('user.phone') }}</span>
					<input
						id="form-phone"
						class="user-page__input"
						type="text"
					/>
				</label>
			</fieldset>
			<CommonButton
				class="user-page__form-button user-page__form-button--edit"
				button-kind="ordinary"
				:button-text="$t('user.buttons.edit')"
				icon-name="edit"
				@click="props.editProfile"
			/>
			<CommonButton
				class="user-page__form-button"
				button-kind="warning"
				:button-text="$t('user.buttons.logout')"
				icon-name="logout"
				@click="props.logout"
			/>
		</form>
	</section>
</template>

<style scoped lang="less">
.user-page {
	margin-top: var(--space-related-items);
	width: 100%;

	&__form {
		padding-left: var(--padding-side);
		padding-right: var(--padding-side);
	}

	&__form-button {
		width: 100%;
		height: 40px;

		&--edit {
			margin-bottom: var(--space-unrelated-items);
		}
	}
}
.user-page__fieldset {
	border: none;
	margin-bottom: var(--space-sections);
}

.user-page__title {
	font-size: var(--font-size-L);
	font-weight: var(--font-weight-regular);
	margin-bottom: var(--space-unrelated-items);
}
.user-page__label {
	display: flex;
	flex-direction: column;
	position: relative;
	color: var(--color-text-secondary);
	font-size: var(--font-size-XS);
	margin-bottom: var(--space-related-items);
}
.user-page__label span {
	position: absolute;
	top: 8px;
	left: 12px;
}

.user-page__input {
	padding: 8px 12px;
	padding-top: 26px;
	border: solid 0.5px;
	border-color: var(--color-input-field);
	border-radius: 12px;
	box-shadow: var(--shadow-sidebar);
	//box-shadow: 0px 1px 6px 0px rgba(78, 78, 78, 0.15);  <--Изначальный вариант тени, т.к. мне кажется, что в итоге получилось темнее, чем на макете
	color: var(--main-text, #4e4e4e);
	font-size: 16px;
	font-family: Inter;
	line-height: 150%;
}

.user-page__input::placeholder {
	color: var(--color-text-main);
}
</style>
