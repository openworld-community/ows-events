<script setup lang="ts"></script>

<template>
	<section class="user-page">
		<form class="user-page__form">
			<fieldset class="user-page__fieldset">
				<h2 class="user-page__title">Профиль</h2>
				<label
					class="user-page__label"
					for="form-nickname"
				>
					<span>Никнейм</span>
					<input
						id="form-nickname"
						class="user-page__input"
						type="text"
					/>
				</label>
				<label
					class="user-page__label"
					for="form-name"
				>
					<span>Имя</span>
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
					<span>Фамилия</span>
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
					<span>Компания</span>
					<input
						id="form-affiliation"
						class="user-page__input"
						type="text"
					/>
				</label>
			</fieldset>

			<fieldset class="user-page__fieldset">
				<h2 class="user-page__title">Контакты</h2>
				<label
					class="user-page__label"
					for="form-email"
				>
					<span>E-mail</span>
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
					<span>Номер телефона</span>
					<input
						id="form-phone"
						class="user-page__input"
						type="text"
					/>
				</label>
			</fieldset>
			<CommonButton
				button-kind="ordinary"
				:button-text="translate('component.need_authorize_modal.button.close')"
				@click="props.closeNeedAuthorizeModal"
			/>
		</form>
	</section>
</template>

<style scoped lang="less">
.user-page {
	margin-top: var(--space-related-items);
	width: 100%;
}
.user-page__fieldset {
	border: none;
	padding-left: var(--padding-side);
	padding-right: var(--padding-side);
	margin-bottom: var(--space-sections);
}

.user-page__title {
	font-size: var(--font-size-L);
	font-weight: var(--font-weight-regular);
	line-height: 24px;
	margin-bottom: var(--space-unrelated-items);
}
.user-page__label {
	display: flex;
	flex-direction: column;
	position: relative;
	color: var(--color-text-secondary);
	font-size: 12px;
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
	box-shadow: 0px 1px 6px 0px rgba(78, 78, 78, 0.15);
	color: var(--main-text, #4e4e4e);
	font-size: 16px;
	font-family: Inter;
	line-height: 150%;
}
</style>
