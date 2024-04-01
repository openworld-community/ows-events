<script setup>
import { SeoItempropUserEnum, SeoItemTypeEnum } from '~/constants/enums/seo';
const mobile = inject('mobile');
</script>

<template>
	<div class="root">
		<HeaderCommon :has-back-button="mobile" />

		<slot />

		<FooterCommon v-if="!mobile" />
	</div>
</template>
<style scoped lang="less">
.user-page {
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
	min-height: calc(100vh - var(--header-height));
	padding-left: var(--padding-side);
	padding-right: var(--padding-side);
	padding-bottom: 30px;
	margin-bottom: auto;

	//Для адаптивной height на iOs
	@supports (-webkit-touch-callout: none) {
		min-height: -webkit-fill-available;
	}

	@media (min-width: 768px) {
		display: grid;
		grid-template-columns: 1fr 2fr;
		width: 100%;
		margin-right: 30px;
		min-height: unset;
	}

	@media (min-width: 1440px) {
		display: grid;
		grid-template-columns: 1fr 2fr;
		width: 100%;
		padding-top: 44px;
		justify-content: flex-start;
		align-items: flex-start;
	}
}
</style>
