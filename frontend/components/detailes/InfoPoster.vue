<script setup lang="ts"></script>

<template>
	<div class="info-poster">
		<h3 class="info-poster__title">{{ $t('event.poster.create_title') }}</h3>
		<p class="info-poster__text">{{ $t('event.poster.click_button') }}</p>
		<p class="info-poster__text-btn">{{ $t('event.poster.button') }}</p>

		<div class="info-poster__plus">
			<p class="info-poster__text-plus">{{ $t('event.poster.button_plus') }}</p>
			<!-- 
			<CommonButton
				:button-text="$t('global.button.more')"
				button-kind="success"
			/>
			-->
		</div>
	</div>
</template>

<style lang="less" scoped>
.info-poster {
	position: relative;
	border-radius: 20px;
	width: 350px;
	height: 225px;
	margin-top: 24px;
	padding: 38px 15px 17px 15px;
	background-image: url(/img/event/background.svg);
	background-repeat: no-repeat;
	background-size: cover;

	@media (min-width: 768px) {
		margin-left: 20px;
	}

	@media (min-width: 1440px) {
		width: 400px;
		height: 280px;
	}
	&__title {
		text-align: center;
		font-size: 1.4rem;
		font-weight: bold;

		@media (min-width: 1440px) {
			font-size: 1.6rem;
		}
	}
	&__text {
		margin-top: 19px;
		margin-bottom: 21px;
		font-size: 1.2rem;
		font-weight: bold;
		@media (min-width: 768px) {
			margin-bottom: 13px;
		}
		@media (min-width: 1440px) {
			margin-bottom: 26px;
			font-size: 1.6rem;
		}
	}

	&__text-btn {
		position: absolute;
		left: 160px;
		//margin-bottom: 18px; когда вставим кнопку "подробнее"

		font-size: 1.2rem;
		font-weight: bold;
		@media (min-width: 1440px) {
			left: 174px;

			font-size: 1.6rem;
		}
	}

	&__plus {
		display: flex;
		align-items: center;
	}

	&__text-plus {
		position: absolute;
		bottom: 29px;
		left: 71px;
		font-size: 1.2rem;
		font-weight: bold;
		@media (min-width: 1440px) {
			left: 72px;
			bottom: 55px;
			font-size: 1.6rem;
		}
	}
}
</style>
