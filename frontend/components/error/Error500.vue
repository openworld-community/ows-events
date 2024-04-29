<template>
	<div>
		<div class="error-page">
			<div class="error-image"></div>
		</div>
		<div class="error-message-text error-message-text--padding">
			{{ $t('errors.ERROR_PAGE_SERVER_ERROR') }}
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
	width: 830px;
	height: 410px;
	@media (max-width: 768px) {
		width: 350px;
		height: 170px;
	}
}
.error-image {
	width: 830px;
	height: 410px;
	background-image: url(@/assets/img/error/500.webp);
	background-size: contain; /* изображение будет масштабироваться, чтобы покрыть всю область фона блока */
	background-repeat: no-repeat;
	@media (max-width: 768px) {
		width: 350px;
		height: 170px;
	}
}
</style>
