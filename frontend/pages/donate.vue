<script setup lang="ts">
import { ValuesSupport, ValuesSupportKripta } from '../components/donate/DonateData';
import {
	SeoItempropDonateEnum,
	SeoItempropGlobalEnum,
	SeoItemTypeEnum
} from '../constants/enums/seo';

const { t } = useI18n();
const mobile = inject('mobile');
getMeta({
	title: t('meta.donate.title'),
	description: t('meta.donate.description')
});
</script>

<template>
	<main
		class="donate"
		itemscope
		:itemtype="SeoItemTypeEnum.DONATE"
	>
		<h2
			class="donate__title"
			:itemprop="SeoItempropGlobalEnum.TITLE"
		>
			{{ $t('donate.title') }}
		</h2>
		<div class="donate-logo">
			<div>
				<p
					class="donate-logo__text text1"
					:itemprop="SeoItempropGlobalEnum.DESCRIPTION"
				>
					{{ $t('donate.description') }}
				</p>
				<div
					v-if="!mobile"
					class="donate-logo__text text1"
				>
					<p
						class="text1"
						:itemprop="SeoItempropGlobalEnum.DESCRIPTION"
					>
						{{ $t('donate.gratitude') }}
					</p>
					<p
						class="text1"
						:itemprop="SeoItempropGlobalEnum.DESCRIPTION"
					>
						{{ $t('donate.subscription') }}
					</p>
				</div>
			</div>

			<img
				class="donate-logo__image"
				src="@/public/img/help-Afisha/logo.png"
				:itemprop="SeoItempropGlobalEnum.IMAGE"
			/>
			<!-- При десктопной версии текст находится в другом месте-->
			<div
				v-if="mobile"
				class="donate-logo__text text1"
			>
				<p
					class="text1"
					:itemprop="SeoItempropGlobalEnum.DESCRIPTION"
				>
					{{ $t('donate.gratitude') }}
				</p>
				<p
					class="text1"
					:itemprop="SeoItempropGlobalEnum.DESCRIPTION"
				>
					{{ $t('donate.subscription') }}
				</p>
			</div>
		</div>

		<div class="donate-support">
			<h3
				class="donate-support__title"
				:itemprop="SeoItempropGlobalEnum.TITLE"
			>
				{{ $t('donate.support') }}
			</h3>
			<ul
				class="donate-support__support"
				itemscope
				:itemtype="SeoItemTypeEnum.DONATE"
				:itemprop="SeoItempropDonateEnum.GROUP_ITEMPROP"
			>
				<DonateCardSupport
					v-for="(item, key) in ValuesSupport"
					v-bind="item"
					:key="item.method"
					:method="item.method"
					:icon="key as string"
					:color="item.color"
					:link="item?.link"
				/>
			</ul>
		</div>

		<div class="donate-kripta">
			<h3
				class="donate-kripta__title"
				:itemprop="SeoItempropGlobalEnum.TITLE"
			>
				{{ $t('donate.support_cripta') }}
			</h3>
			<ul
				class="donate-kripta__kripta"
				itemscope
				:itemtype="SeoItemTypeEnum.DONATE"
				:itemprop="SeoItempropDonateEnum.GROUP_ITEMPROP"
			>
				<DonateCardSupportKripta
					v-for="item in ValuesSupportKripta"
					v-bind="item"
					:key="item.icon"
				/>
			</ul>
		</div>
	</main>
</template>

<style lang="less" scoped>
.donate {
	width: 100%;
	padding: 80px 15px 0 15px;
	@media (min-width: 765px) {
		padding: 0 43px;
	}
	@media (min-width: 1440px) {
		padding: 0 100px;
	}

	&__title {
		text-align: center;
		@media (min-width: 765px) {
			margin-top: 50px;
		}
		@media (min-width: 1440px) {
			text-align: start;
			margin-top: 75px;
			margin-bottom: 20px;
		}
	}
}

.donate-logo {
	margin-top: 45px;

	@media (min-width: 765px) {
		display: flex;
		gap: 30px;
	}
	@media (min-width: 1440px) {
		margin-top: 0px;
	}

	&__text {
		text-align: justify;
	}
	&__image {
		width: 100%;
		margin: 40px 0 20px 0;
		@media (min-width: 765px) {
			min-width: 253px;
			margin: 0;
		}
	}
}
.donate-support {
	&__title {
		text-align: center;
		line-height: 110px;
		@media (min-width: 1440px) {
			text-align: start;
		}
	}

	&__support {
		@media (min-width: 765px) {
			display: flex;
			align-items: center;
			justify-content: space-between;

			flex-wrap: wrap;
		}
	}
}
.donate-kripta {
	&__title {
		margin-bottom: 40px;
	}
	&__kripta {
		@media (min-width: 1440px) {
			display: flex;
			align-items: center;
			justify-content: space-between;

			flex-wrap: wrap;
		}
	}
}
</style>
