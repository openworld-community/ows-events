<script setup lang="ts"></script>

<template>
	<div class="info-poster">
		<h3 class="info-poster__title">{{ $t('event.create_title') }}</h3>
		<p class="info-poster__text font-size">{{ $t('event.click_button') }}</p>
		<p class="info-poster__text-btn font-size">{{ $t('event.button') }}</p>

		<div class="info-poster__plus">
			<p class="info-poster__text-plus font-size">{{ $t('event.button_plus') }}</p>
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
	border-radius: 20px;
	width: 350px;
	height: 225px;
	margin-top: 24px;
	padding: 38px 12px 17px 12px;
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
		font-size: 14px;
		font-weight: bold;

		@media (min-width: 1440px) {
			font-size: 16px;
		}
	}
	&__text {
		margin-top: 19px;
		margin-bottom: 21px;
		@media (min-width: 768px) {
			margin-bottom: 13px;
		}
		@media (min-width: 1440px) {
			margin-bottom: 26px;
		}
	}

	&__text-btn {
		margin-left: 140px;
		//margin-bottom: 18px; когда вставим кнопку "подробнее"
		margin-bottom: 27px;
		@media (min-width: 1440px) {
			margin-left: 170px;
			margin-bottom: 30px;
		}
	}

	&__plus {
		display: flex;
		align-items: center;
	}

	&__text-plus {
		margin-left: 50px;
		margin-right: 91px;
		@media (min-width: 1440px) {
			margin-left: 60px;
		}
	}

	.font-size {
		font-size: 12px;
		font-weight: bold;

		@media (min-width: 1440px) {
			font-size: 16px;
		}
	}
}
</style>
