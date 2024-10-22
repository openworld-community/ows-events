<script setup lang="ts"></script>

<template>
	<div class="info-poster">
		<h3 class="info-poster__title">{{ $t('event.poster.create_title') }}</h3>
		<p class="info-poster__text">{{ $t('event.poster.click_button') }}</p>

		<div class="info-poster__button-info">
			<div class="info-poster__button">{{ $t('global.button.create_event') }}</div>
			<p class="info-poster__text">{{ $t('event.poster.button') }}</p>
		</div>

		<div class="info-poster__button-info">
			<CommonButton
				class="info-poster__button-plus"
				is-round
				icon-name="plus"
				icon-color="var(--color-white)"
			/>
			<p class="info-poster__text">{{ $t('event.poster.button_plus') }}</p>
			<!--
			<CommonButton
				:button-text="$t('global.button.more')"
				class="button__success--filled isRound info-poster__more"
				button-kind="success"
			/>
			-->
		</div>
	</div>
</template>

<style lang="less" scoped>
.info-poster {
	border-radius: 20px;
	width: 350px;
	height: 225px;
	margin-top: 24px;
	padding: 38px 12px 10px 12px;
	background-image: url(/img/event/background.svg);
	background-repeat: no-repeat;
	background-size: cover;

	@media (min-width: 768px) {
		margin-left: 20px;
	}

	@media (min-width: 1440px) {
		width: 400px;
		height: 250px;
	}
	&__title {
		text-align: center;
		margin-bottom: 18px;
		font-size: 1.4rem;
		font-weight: bold;

		@media (min-width: 1440px) {
			font-size: 1.6rem;
		}
	}
	&__text {
		font-size: 1.2rem;
		font-weight: bold;

		@media (min-width: 1440px) {
			font-size: 1.6rem;
		}
	}

	&__button-info {
		margin-top: 16px;
		display: flex;
		align-items: center;
	}
	&__button {
		margin-right: 14px;
		border-radius: 8px;
		line-height: 18px;
		padding: 4px 10px;
		color: var(--color-white);
		background-color: var(--color-accent-green-main);
		border: 1px solid var(--color-accent-green-main);
		cursor: default;
		font-size: 1.2rem;
	}

	&__button-plus {
		width: 38px;
		height: 38px;
		cursor: default;
		background-color: var(--color-accent-green-main);
		border: 1px solid var(--color-accent-green-main);
		margin-right: 13px;
	}

	&__more {
		margin-left: 91px;
	}
}
</style>
