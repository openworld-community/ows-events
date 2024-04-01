<template>
	<div>
		<div class="error-page">
			<div class="error-page-not-found">
				<div class="error-page-not-found--styling">
					<div class="error-message-text">{{ $t('errors.ERROR_PAGE_PAGE') }}</div>
					<div class="error-message-text">{{ $t('errors.ERROR_PAGE_NOT_FOUND') }}</div>
				</div>
			</div>

			<div class="error-image"></div>
		</div>
		<div class="error-message-text error-message-text--padding">
			{{ $t('errors.ERROR_PAGE_ERROR') }}
		</div>
	</div>
</template>
<style scoped lang="less">
.error-message-text {
	/* --font-family-error импортируется в nuxt.config.ts в самом низу ориентир rel:stylesheet */
	font-family: var(--font-family-error);
	font-size: 30px;
	@media (max-width: 768px) {
		font-size: 20px;
		font-weight: 600;
	}
	&--padding {
		display: block;
		text-align: center;
		padding-top: 10px;
	}
}
.error-page {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 550px;
	height: 410px;
	@media (max-width: 768px) {
		width: 340px;
		height: 250px;
	}
}
.error-image {
	width: 550px;
	height: 410px;
	background-image: url(@/assets/img/error/404.webp);
	background-size: contain; /* изображение будет масштабироваться, чтобы покрыть всю область фона блока */
	background-repeat: no-repeat;
	@media (max-width: 768px) {
		width: 340px;
		height: 250px;
	}
}
.error-page-not-found {
	position: fixed;
	margin-bottom: 205px;
	@media (max-width: 768px) {
		margin-bottom: 130px;
	}
	&--styling {
		width: 550px;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding: 10px;
		@media (max-width: 768px) {
			width: 340px;
		}
	}
}
</style>
