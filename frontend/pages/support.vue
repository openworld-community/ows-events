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
					<h5 class="support__navigation-hi">{{ $t('support.title.hi') }}</h5>
					<h5 :itemprop="SeoItempropGlobalEnum.TITLE">{{ $t('support.title.main') }}</h5>
				</div>
				<h5
					itemprop="suggestedAnswer"
					itemscope
					:itemtype="SeoItemTypeEnum.ANSWER"
				>
					{{ $t('support.message') }}
				</h5>
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
				<h5 class="support__design-question">{{ $t('support.question') }}</h5>
			</div>

			<div class="support__navigation-buttons">
				<CommonButton
					:link="SUPPORT_EMAIL_URL"
					icon-name="email"
					icon-color="'(--color-white)'"
					:button-text="SUPORT_EMAIL_NAME"
					class="button__success--filled"
					button-kind="success"
					:itemprop="SeoItempropGlobalEnum.URL"
				/>
				<CommonButton
					is-external-link
					:link="SUPPORT_TG_URL"
					icon-name="telegram"
					icon-color="'(--color-white)'"
					:button-text="SUPORT_TG_BOT_NAME"
					class="button__success--filled"
					button-kind="success"
					:itemprop="SeoItempropGlobalEnum.URL"
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
			<h5 class="support__design-question">{{ $t('support.question') }}</h5>
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

		&-text {
			display: flex;
			flex-direction: column;

			padding-top: 100px;
			@media (min-width: 768px) {
				gap: 30px;
			}
			@media (max-width: 768px) {
				padding-top: 15px;
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
		@media (max-width: 1440px) {
			padding: 120px 0px 0px 60px;
		}
		@media (max-width: 1000px) {
			padding: 120px 0px 0px 0px;
			align-items: center;
			justify-content: center;
		}
		@media (max-width: 768px) {
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
			align-self: flex-end;
			position: absolute;
			padding-top: 220px;
			padding-left: 220px;
			font-size: var(--font-size-L);
			font-family: var(--font-family-error);
			font-weight: 600;

			@media (min-width: 1000px) {
				padding-left: 180px;
				font-size: var(--font-size-XL);
			}

			@media (min-width: 1440px) {
				font-size: 40px;
			}
		}
	}
}
</style>
