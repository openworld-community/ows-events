<script setup lang="ts">
import {
	SUPPORT_TG_URL,
	SUPPORT_EMAIL_URL,
	SUPORT_TG_BOT_NAME,
	SUPORT_EMAIL_NAME
} from '~/constants/url';

const mobile = inject('mobile');
</script>

<template>
	<main class="support">
		<div class="support__navigation">
			<div class="support__navigation-text">
				<div>
					<div>{{ $t('support.title.hi') }}</div>
					<div>{{ $t('support.title.main') }}</div>
				</div>
				<div>{{ $t('support.message') }}</div>
			</div>

			<div
				v-if="mobile"
				class="support__design"
			>
				<img
					class="support__design-image"
					src="../assets/img/support/help.webp"
				/>
				<div class="support__design-question">{{ $t('support.question') }}</div>
			</div>

			<div class="support__navigation-buttons">
				<CommonButton
					:link="SUPPORT_EMAIL_URL"
					icon-name="email"
					:button-text="SUPORT_EMAIL_NAME"
					class="button__success--filled"
					button-kind="success"
				/>
				<CommonButton
					is-external-link
					:link="SUPPORT_TG_URL"
					icon-name="telegram"
					:button-text="SUPORT_TG_BOT_NAME"
					class="button__success--filled"
					button-kind="success"
				/>
			</div>
		</div>
		<div
			v-if="!mobile"
			class="support__design"
		>
			<img
				class="support__design-image"
				src="../assets/img/support/help.webp"
			/>
			<div class="support__design-question">{{ $t('support.question') }}</div>
		</div>
	</main>
</template>

<style scoped lang="less">
.support {
	width: 100%;

	max-width: var(--width-desktop);
	padding-left: 50px;
	padding-right: 50px;
	display: flex;
	align-self: center;
	align-items: center;
	@media (max-width: 768px) {
		flex-direction: column;
	}
	&__navigation {
		display: flex;
		flex-direction: column;
		width: 500px;
		@media (max-width: 900px) {
			width: 400px;
		}
		@media (max-width: 768px) {
			width: 340px;
			align-items: center;
		}
		&-text {
			display: flex;
			flex-direction: column;
			gap: 30px;
			font-size: var(--font-size-ML);
			font-weight: 600;
			line-height: 25px;
			padding-top: 30px;
			@media (max-width: 900px) {
				font-size: var(--font-size-L);

				gap: 30px;
			}
		}
		&-buttons {
			padding-top: 60px;
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

		&-image {
			height: 385px;
			@media (max-width: 1000px) {
				height: 28vw;
			}
			@media (max-width: 768px) {
				margin-right: 25vw;
				height: 269px;
			}
		}
		&-question {
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
