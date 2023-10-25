<script setup lang="ts">
import { SeoItempropGlobalEnum } from '~/constants/enums/seo';
import { RoutePathEnum } from '~/constants/enums/route';
import donateImgDesktop2x from '@/assets/img/user/donate/donate-screen-desktop@2x.png';
import donateImg2x from '@/assets/img/user/donate/donate-screen@2x.jpg';
import donateImgDesktop1x from '@/assets/img/user/donate/donate-screen-desktop@1x.png';
import donateImg1x from '@/assets/img/user/donate/donate-screen@1x.jpg';

const desktop = inject('desktop');
const localePath = useLocalePath();
</script>

<template>
	<div class="donate">
		<img
			:srcset="desktop ? `${donateImgDesktop2x} 2x` : `${donateImg2x} 2x`"
			:src="desktop ? donateImgDesktop1x : donateImg1x"
			:width="desktop ? '370' : '351'"
			:height="desktop ? '372' : '116'"
			alt=""
			class="donate__image"
			:itemprop="SeoItempropGlobalEnum.IMAGE"
		/>
		<div class="donate__content">
			<h2 class="donate__title">{{ $t('user.donate.title') }}</h2>
			<p
				v-if="desktop"
				class="donate__text"
			>
				{{ $t('user.donate.text') }}
			</p>
			<CommonButton
				class="donate__button"
				button-kind="success"
				:button-text="$t('user.donate.button')"
				icon-name="donate"
				:link="localePath(RoutePathEnum.DONATION)"
			/>
		</div>
	</div>
</template>

<style scoped lang="less">
.donate {
	display: flex;
	width: 100%;
	min-height: 232px;
	flex-direction: column;
	align-items: center;
	background-color: var(--color-background-secondary);
	border-radius: 8px;
	padding-bottom: 20px;
	margin-bottom: var(--space-sections);

	@media (min-width: 768px) {
		width: 60%;
		margin-top: 24px;
	}

	@media (min-width: 1440px) {
		flex-direction: row-reverse;
		justify-content: flex-end;
		width: 67%;
		position: relative;
		background-color: var(--color-accent-green-main-30);
		padding: 42px 40px;
		margin-top: 44px;
		margin-bottom: 92px;
	}

	&__image {
		width: 100%;
		min-width: 100%;
		max-width: 100%;
		height: 100%;
		border-bottom-left-radius: 8px;
		margin-bottom: var(--space-unrelated-items);

		@media (min-width: 1440px) {
			width: unset;
			min-width: unset;
			max-width: unset;
			height: unset;
			position: absolute;
			right: 20px;
			top: 50%;
			transform: translateY(-50%);
		}
	}

	&__content {
		display: flex;
		width: 100%;
		flex-direction: column;
		align-items: center;

		@media (min-width: 1440px) {
			width: 47%;
			align-items: flex-start;
		}
	}

	&__title {
		font-size: var(--font-size-L);
		font-weight: var(--font-weight-regular);
		line-height: 24px;
		margin-bottom: var(--space-unrelated-items);

		@media (min-width: 1440px) {
			font-size: var(--font-size-XXL);
			line-height: 40px;
			margin-bottom: 20px;
		}
	}

	&__text {
		@media (min-width: 1440px) {
			font-size: var(--font-size-XS);
			line-height: 20px;
			margin-bottom: 22px;
		}
	}

	&__button {
		@media (min-width: 1440px) {
			width: 80%;
		}
	}
}
</style>