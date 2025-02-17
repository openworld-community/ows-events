<script setup lang="ts">
import { SeoItempropGlobalEnum } from '~/constants/enums/seo';
import { RoutePathEnum } from '~/constants/enums/route';

const desktop = inject('desktop');
</script>

<template>
	<div class="additional-block">
		<div class="additional-block__wrapper">
			<img
				:srcset="
					desktop
						? `/img/user/additionalBlock/donate-img-desktop@2x.png 2x`
						: `/img/user/additionalBlock/new-event-img@2x.jpg 2x`
				"
				:src="
					desktop
						? `/img/user/additionalBlock/donate-img-desktop@1x.png`
						: `/img/user/additionalBlock/new-event-img@1x.jpg`
				"
				:width="desktop ? '370' : '351'"
				:height="desktop ? '372' : '116'"
				alt=""
				class="additional-block__image"
				:itemprop="SeoItempropGlobalEnum.IMAGE"
			/>
			<div class="additional-block__content">
				<h2 class="additional-block__title">
					{{ $t(desktop ? 'user.donate.title' : 'user.new_event.title') }}
				</h2>
				<p
					v-if="desktop"
					class="additional-block__text"
				>
					{{ $t('user.donate.text') }}
				</p>
				<CommonButton
					class="additional-block__button"
					:button-kind="desktop ? 'ordinary' : 'success'"
					:button-text="$t(desktop ? 'user.donate.button' : 'global.button.new_event')"
					:icon-name="desktop ? 'donate' : ''"
					icon-color="var(--color-text-secondary)"
					:link="desktop ? RoutePathEnum.DONATION : `${RoutePathEnum.EVENT_EDIT}new`"
				/>
			</div>
		</div>
		<CommonButton
			v-if="desktop"
			class="additional-block__button"
			button-kind="success"
			:button-text="$t('global.button.new_event')"
			:link="`${RoutePathEnum.EVENT_EDIT}new`"
		/>
	</div>
</template>

<style scoped lang="less">
.additional-block {
	display: flex;
	width: 100%;
	flex-direction: column;

	@media (min-width: 768px) {
		width: 96%;
	}
	@media (min-width: 1000px) {
		width: 80%;
	}

	@media (min-width: 1440px) {
		width: 80%;
	}

	&__wrapper {
		display: flex;
		width: 100%;
		min-height: 218px;
		flex-direction: column;
		align-items: center;
		background-color: var(--color-background-secondary);
		border-radius: 8px;
		padding-bottom: 16px;
		margin-bottom: 24px;

		@media (min-width: 768px) {
			margin-top: 24px;
		}

		@media (min-width: 1440px) {
			flex-direction: row-reverse;
			justify-content: flex-end;
			position: relative;
			background-color: var(--color-accent-green-main-30);
			padding: 42px 40px;
			margin-top: 44px;
			margin-bottom: 48px;
		}
	}

	&__image {
		width: 100%;
		min-width: 100%;
		max-width: 100%;
		border-radius: 8px;
		margin-bottom: 12px;

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
		font-size: var(--font-size-M);
		font-weight: var(--font-weight-regular);
		line-height: 24px;
		margin-bottom: 12px;

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
			width: max-content;
		}
	}
}
</style>
