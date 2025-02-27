<script setup lang="ts">
import { ValuesDonate, ValuesDonateCrypto } from '../components/donate/DonateData';
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
			<div class="donate-logo__wrapper-image">
				<img
					class="donate-logo__image"
					src="/img/help-afisha/logo.png"
					:itemprop="SeoItempropGlobalEnum.IMAGE"
				/>
			</div>

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

		<div class="cards">
			<h3
				class="cards__title"
				:itemprop="SeoItempropGlobalEnum.TITLE"
			>
				{{ $t('donate.title_card') }}
			</h3>
			<ul
				class="cards__list"
				itemscope
				:itemtype="SeoItemTypeEnum.DONATE"
				:itemprop="SeoItempropDonateEnum.GROUP_ITEMPROP"
			>
				<DonateCard
					v-for="(item, key) in ValuesDonate"
					v-bind="item"
					:key="item.method"
					:method="item.method"
					:icon="key as string"
					:color="item.color"
					:link="item?.link"
				/>
			</ul>
		</div>

		<div class="cards-crypto">
			<h3
				class="cards-crypto__title"
				:itemprop="SeoItempropGlobalEnum.TITLE"
			>
				{{ $t('donate.title_card_crypto') }}
			</h3>
			<ul
				class="cards-crypto__list"
				itemscope
				:itemtype="SeoItemTypeEnum.DONATE"
				:itemprop="SeoItempropDonateEnum.GROUP_ITEMPROP"
			>
				<DonateCardCrypto
					v-for="item in ValuesDonateCrypto"
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
	max-width: 1440px;
	align-self: center;
	padding: 80px 15px 0 15px;
	@media (min-width: 768px) {
		padding: 0 43px;
	}
	@media (min-width: 1440px) {
		padding: 0 100px;
	}

	&__title {
		text-align: center;
		@media (min-width: 768px) {
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

	@media (min-width: 768px) {
		display: flex;
		justify-content: space-between;
	}
	@media (min-width: 1440px) {
		margin-top: 0px;
	}

	&__text {
		text-align: justify;
		max-width: 750px;
		margin-right: 30px;
	}
	&__wrapper-image {
		display: flex;
		justify-content: center;
	}
	&__image {
		margin: 40px 0 20px 0;

		@media (min-width: 768px) {
			min-width: 253px;
			margin: 0;
		}
		@media (min-width: 1100px) {
			min-width: 315px;
		}
		@media (min-width: 1440px) {
			min-width: 350px;
		}
	}
}
.cards {
	margin-bottom: 41px;
	@media (min-width: 768px) {
		margin-bottom: 50px;
	}

	&__title {
		text-align: center;
		line-height: 110px;
		@media (min-width: 1440px) {
			text-align: start;
		}
	}

	&__list {
		display: flex;
		flex-direction: column;
		gap: 50px;
		@media (min-width: 768px) {
			flex-direction: row;
			align-items: center;
			justify-content: center;
			flex-wrap: wrap;
			gap: 40px;
		}
		@media (min-width: 1440px) {
			flex-direction: row;
			align-items: center;
			justify-content: flex-start;
			flex-wrap: wrap;
			gap: 40px;
		}
	}
}
.cards-crypto {
	margin-bottom: 70px;
	@media (min-width: 1440px) {
		margin-bottom: 130px;
	}

	&__title {
		margin-bottom: 26px;
		@media (max-width: 1440px) {
			text-align: center;
		}
	}
	&__list {
		display: flex;
		flex-direction: column;
		gap: 30px;

		@media (min-width: 1440px) {
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
			flex-wrap: wrap;
		}
	}
}
</style>
