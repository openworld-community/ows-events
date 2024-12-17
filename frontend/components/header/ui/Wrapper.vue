<script setup lang="ts">
import { SeoItemTypeEnum } from '../../../constants/enums/seo';
</script>

<template>
	<header
		class="header"
		itemscope
		:itemtype="SeoItemTypeEnum.HEADER"
	>
		<nav
			class="header__container"
			itemscope
			:itemtype="SeoItemTypeEnum.NAV"
		>
			<div class="header__left"><slot name="left" /></div>
			<slot name="center" />
			<div class="header__right"><slot name="right" /></div>
		</nav>
	</header>
</template>

<style scoped lang="less">
.header {
	width: 100%;
	height: var(--header-height);
	position: fixed;
	top: 0;
	left: 0;

	//TODO разобраться с z-индексами
	z-index: 3;

	@media (min-width: 768px) {
		position: static;
		height: unset;
		background-color: transparent;
	}

	&__container {
		display: flex;
		align-items: center;
		justify-content: space-between;
		min-width: var(--width-mobile);
		height: var(--header-height);
		background-color: var(--color-white);
		padding-left: var(--padding-side);
		padding-right: var(--padding-side);
		margin-left: auto;
		margin-right: auto;

		@media (min-width: 768px) {
			height: unset;
			padding-top: 32px;
			padding-bottom: 20px;
			background-color: transparent;
		}
	}
	&__left {
		display: flex;
		height: 100%;
		align-items: center;

		@media (min-width: 768px) {
			width: auto;
			justify-content: start;
		}
	}

	&__right {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		position: relative;
		gap: var(--space-inner);
	}
}
</style>
