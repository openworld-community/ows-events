<script setup lang="ts">
import {
	SUPPORT_TG_URL,
	SUPPORT_EMAIL_URL,
	SUPORT_TG_BOT_NAME,
	SUPORT_EMAIL_NAME
} from '~/constants/url';
import { SeoItemTypeEnum, SeoItempropGlobalEnum } from '~/constants/enums/seo';
const { t } = useI18n();
const mobile = inject('mobile');
const imgLink = '/img/support/support.webp';

getMeta({
	title: t('meta.support.title'),
	description: t('meta.support.description')
});
</script>

<template>
	<main
		class="support"
		itemscope
		:itemtype="SeoItemTypeEnum.QA_PAGE"
	>
		<div
			class="support__navigation"
			itemprop="mainEntity"
			itemscope
			:itemtype="SeoItemTypeEnum.QUESTION"
		>
			<div class="support__navigation-text">
				<div>
					<p class="support__navigation-hi">{{ $t('support.title.hi') }}</p>
					<p :itemprop="SeoItempropGlobalEnum.TITLE">{{ $t('support.title.main') }}</p>
				</div>
				<p
					itemprop="suggestedAnswer"
					itemscope
					:itemtype="SeoItemTypeEnum.ANSWER"
				>
					{{ $t('support.message') }}
				</p>
			</div>

			<div
				v-if="mobile"
				class="support__design"
			>
				<img
					class="support__design-image"
					:src="imgLink"
					:itemprop="SeoItempropGlobalEnum.IMAGE"
				/>
				<p class="support__design-question">{{ $t('support.question') }}</p>
			</div>

			<div class="support__navigation-buttons">
				<CommonButton
					:link="SUPPORT_EMAIL_URL"
					icon-name="email"
					:button-text="SUPORT_EMAIL_NAME"
					class="button__success--filled"
					button-kind="success"
					:itemprop="SeoItempropGlobalEnum.URL"
				/>
				<CommonButton
					is-external-link
					:link="SUPPORT_TG_URL"
					icon-name="telegram"
					:button-text="SUPORT_TG_BOT_NAME"
					class="button__success--filled"
					button-kind="success"
					:itemprop="SeoItempropGlobalEnum.URL"
					font-size="10px"
				/>
			</div>
		</div>
		<div
			v-if="!mobile"
			class="support__design"
		>
			<img
				class="support__design-image"
				:src="imgLink"
				:itemprop="SeoItempropGlobalEnum.IMAGE"
			/>
			<p class="support__design-question">{{ $t('support.question') }}</p>
		</div>
	</main>
</template>

<style scoped lang="less">
.support {
	width: 100%;
	max-width: var(--width-desktop);
	padding-left: 7vw;
	padding-right: 7vw;
	display: flex;
	align-self: center;
	align-items: flex-start;
	padding-bottom: 30px;
	@media (max-width: 768px) {
		padding-left: 45px;
		padding-right: 45px;
		flex-direction: column;
		padding-bottom: 30px;
		align-items: center;
	}
	@media (max-width: 375px) {
		padding-top: 30px;
		padding-left: 18px;
	}

	&__navigation {
		display: flex;
		flex-direction: column;
		width: 500px;
		@media (max-width: 900px) {
			width: 400px;
		}
		@media (max-width: 768px) {
			width: 100%;
			align-items: center;
			padding-top: 50px;
		}
		&-hi {
			@media (max-width: 768px) {
				padding-bottom: 5px;
			}
		}
		&-text {
			display: flex;
			flex-direction: column;
			gap: 20px;
			font-size: var(--font-size-L);
			font-weight: 600;
			line-height: 1;
			padding-top: 100px;
			@media (max-width: 900px) {
				gap: 30px;
			}
			@media (max-width: 768px) {
				padding-top: 15px;
				gap: 30px;
			}
			@media (max-width: 375px) {
				font-size: var(--font-size-S);
				font-weight: 600;
				gap: 20px;
				line-height: 1.2;
			}
		}
		&-buttons {
			padding-top: 130px;
			display: flex;
			flex-direction: column;
			gap: 15px;
			width: 100%;
			max-width: 280px;
			@media (max-width: 768px) {
				padding-top: 45px;
			}
			@media (max-width: 375px) {
				padding-top: 80px;
			}
		}
	}

	&__design {
		display: flex;
		flex-direction: row;
		gap: 20px;
		padding: 125px 0px 30px 170px;
		@media (max-width: 1000px) {
			padding: 120px 0px 0px 0px;
			align-items: center;
			justify-content: center;
		}
		@media (max-width: 768px) {
			margin-left: 25vw;
			padding-top: 30px;
			gap: 0px;
		}
		@media (max-width: 375px) {
			margin-left: 0;
			padding-top: 65px;
		}

		&-image {
			height: 350px;
			width: auto;
			@media (max-width: 1000px) {
				height: 28vw;
			}
			@media (max-width: 768px) {
				height: 250px;
			}
			@media (max-width: 375px) {
				height: 180px;
			}
		}
		&-question {
			margin-left: 1vw;
			align-self: flex-end;
			font-family: var(--font-family-error);
			font-size: 40px;
			font-weight: 600;
			line-height: 1.5;
			@media (max-width: 1000px) {
				font-size: var(--font-size-XL);
			}
			@media (max-width: 768px) {
				padding-top: 200px;
				align-self: center;
				font-size: var(--font-size-XL);
			}
			@media (max-width: 375px) {
				position: absolute;
				padding-top: 150px;
				padding-left: 190px;
				font-size: var(--font-size-L);
			}
		}
	}
}
</style>
