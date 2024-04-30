<script setup lang="ts">
import { SUPPORT_TG_URL, SUPPORT_EMAIL_URL } from '~/constants/url';
const SUPORT_TG_BOT_NAME="@afisha_peredelano_support_bot"
const SUPORT_EMAIL_NAME="email:support@afisha.peredelano.com"
</script>

<template>
	<div class="support">
		<div class="support__navigation">
			<div class="support__navigation__text">
				<div>{{ $t('support.title') }}</div>
				<div>{{ $t('support.message') }}</div>
			</div>

			<div class="support__navigation__buttons">
				<CommonButton
					:link="SUPPORT_EMAIL_URL"
					icon-name="edit"
					:button-text="SUPORT_EMAIL_NAME"
					class="button__success--filled"
					button-kind="success"
				/>
				<CommonButton
					isExternalLink
					:link="SUPPORT_TG_URL"
					icon-name="telegram"
					:button-text="SUPORT_TG_BOT_NAME"
					class="button__success--filled"
					button-kind="success"
				/>
			</div>
		</div>
		<div class="support__design">
			<img
				class="support__design__image"
				src="../assets/img/support/help.webp"
			/>
			<div class="support__design__question">{{ $t('support.question') }}</div>
		</div>
	</div>
</template>

<style scoped lang="less">
.support {
	width: 100%;
	height: 100%;
	max-width: var(--width-desktop);
	padding-left: 50px;
	padding-right: 50px;
	display: flex;
	align-self: center;
	align-items: center;
	@media (max-width: 768px) {
		flex-direction: column;
		padding: 30px;
	}
	&__navigation {
		display: flex;
		flex-direction: column;
		width: 500px;
		@media (max-width: 900px) {
			width: 400px;
			}
		@media (max-width: 768px) {
			width: auto;
		}
		&__text {
			display: flex;
			flex-direction: column;
			gap: 15px;
			padding-bottom: 100px;
			font-size: var(--font-size-ML);
			font-weight: 600;
			line-height: 1.5;
			@media (max-width: 900px) {
				font-size: var(--font-size-L);
				padding-top: 100px;
				gap: 30px;
			}
		}
		&__buttons {
			align-self: center;
			display: flex;
			flex-direction: column;
			gap: 30px;
			width: 100%;
			max-width: 350px;
		}
	}

	&__design {
		display: flex;
		flex-direction: row;
		gap: 20px;
		padding: 30px 0px 30px 30px;
		@media (max-width: 1000px) {
			padding: 30px 0px 0px 0px;
		}

		&__image {
			height: 385px;
			@media (max-width: 1000px) {
				height: 28vw;
			}
			@media (max-width: 768px) {
				margin-right: 25vw;
				height: 269px;
			}
		}
		&__question {
			position: absolute;
			margin-left: 25vw;
			padding-bottom: 64px;
			align-self: flex-end;
			font-family: var(--font-family-error);
			font-size: var(--font-size-XXL);
			font-weight: 600;
			line-height: 1.5;
			@media (max-width: 1000px) {
				font-size: var(--font-size-XL);
			}
			@media (max-width: 768px) {
				padding-bottom: 0px;
				margin-left: 32vw;
				font-size: var(--font-size-XL);
			}
			@media (max-width: 400px) {
				padding-bottom: 0px;
				margin-left: 45vw;
				font-size: var(--font-size-L);
			}
		}
	}
}
</style>
