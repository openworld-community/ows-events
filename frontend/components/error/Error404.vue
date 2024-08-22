<script setup>
defineProps({
	message: {
		type: String,
		default: ''
	}
});
</script>

<template>
	<div class="error-page">
		<div class="error-page__hero">
			<div class="error-page__heading">
				<div class="error-page__heading-text">{{ $t('errors.ERROR_PAGE_PAGE') }}</div>
				<div class="error-page__heading-text">{{ $t('errors.ERROR_PAGE_NOT_FOUND') }}</div>
			</div>

			<div class="error-page__image"></div>
		</div>

		<div class="error-page__default-text">
			{{ $t('errors.ERROR_DEFAULT_MESSAGE') }}
		</div>
		<!-- <div
			v-if="Boolean(JSON.parse(message)?.message)"
			class="error-page__message"
		>
			{{ JSON.parse(message)?.message }}
		</div> -->
	</div>
</template>
<style scoped lang="less">
.error-page {
	width: 550px;
	height: fit-content;
	overflow: hidden;
	@media (max-width: 768px) {
		width: 340px;
		height: 250px;
	}

	&__hero {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 410px;

		@media (max-width: 768px) {
			height: 250px;
		}
	}

	&__heading {
		position: fixed;
		width: 550px;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding: 10px;
		margin-bottom: 205px;
		@media (max-width: 768px) {
			width: 340px;
			margin-bottom: 130px;
		}
	}
	&__heading-text {
		font-family: var(--font-family-error);
		font-size: 32px;
		@media (max-width: 768px) {
			font-size: 22px;
			font-weight: 600;
		}
	}

	&__image {
		width: 550px;
		height: 410px;
		background-image: url(/img/error/404.webp);
		background-size: contain; /* изображение будет масштабироваться, чтобы покрыть всю область фона блока */
		background-repeat: no-repeat;
		@media (max-width: 768px) {
			width: 340px;
			height: 250px;
		}
	}
	&__default-text {
		/* --font-family-error импортируется в nuxt.config.ts в самом низу ориентир rel:stylesheet */
		font-family: var(--font-family-error);
		font-size: 32px;
		display: block;
		text-align: center;
		padding-top: 10px;

		@media (max-width: 768px) {
			font-size: 22px;
			font-weight: 600;
		}
	}
	&__message {
		/* --font-family-error импортируется в nuxt.config.ts в самом низу ориентир rel:stylesheet */
		font-family: var(--font-family-error);
		font-size: 18px;
		display: block;
		text-align: center;
		padding-top: 10px;

		@media (max-width: 768px) {
			font-size: 12px;
			font-weight: 600;
		}
	}
}
</style>
