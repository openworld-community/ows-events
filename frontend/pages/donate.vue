<script setup lang="ts">
import { RouteNameEnum } from '../constants/enums/route';
import { BASE_URL, DONATE_PATREON_URL } from '../constants/url';
import { CryptoWalletEnum } from '../constants/enums/crypto-wallets';
import {
	SeoItempropDonateEnum,
	SeoItempropGlobalEnum,
	SeoItemTypeEnum
} from '../constants/enums/seo';

const { t } = useI18n();
useHead({ titleTemplate: `%s / ${t('meta.donate.title')}` });
definePageMeta({ name: RouteNameEnum.DONATION });

useSeoMeta({
	// для реактивных тегов используем () => value
	ogSiteName: () => t('meta.site_name'),
	ogType: 'website',
	ogTitle: () => `${t('meta.donate.title')} ${t('meta.site_name')}`,
	description: () => t('meta.donate.description'),
	ogDescription: () => t('meta.donate.description'),
	ogUrl: () => `${BASE_URL}/${RouteNameEnum.DONATION}`
});

type DonationMethod = {
	method: string;
	link?: string;
	account?: string;
};

const DONATE_METHODS: { [key: string]: DonationMethod } = {
	patreon: {
		method: t('donate.method.patreon'),
		link: DONATE_PATREON_URL
	},
	bitcoin: {
		method: t('donate.method.bitcoin'),
		account: CryptoWalletEnum.BITCOIN
	},
	ethereum: {
		method: t('donate.method.ethereum'),
		account: CryptoWalletEnum.ETHEREUM
	},
	usdt: {
		method: t('donate.method.usdt'),
		account: CryptoWalletEnum.USDT
	},
	usdc: {
		method: t('donate.method.usdc'),
		account: CryptoWalletEnum.USDC
	}
};
</script>

<template>
	<div
		class="donate"
		itemscope
		:itemtype="SeoItemTypeEnum.DONATE"
	>
		<h1
			class="donate__title"
			:itemprop="SeoItempropGlobalEnum.TITLE"
		>
			{{ $t('donate.title') }}
		</h1>
		<p
			class="donate__description"
			:itemprop="SeoItempropGlobalEnum.DESCRIPTION"
		>
			{{ $t('donate.description') }}
		</p>
		<p class="donate__description">
			{{ $t('donate.gratitude') }} <br />
			{{ $t('donate.subscription') }}
		</p>

		<h2
			class="donate__method donate-method__title"
			:itemprop="SeoItempropGlobalEnum.TITLE"
		>
			{{ $t('donate.method.title') }}
		</h2>
		<ul
			itemscope
			:itemtype="SeoItemTypeEnum.DONATE"
			:itemprop="SeoItempropDonateEnum.GROUP_ITEMPROP"
		>
			<DonateMethodItem
				v-for="(item, key) in DONATE_METHODS"
				:key="item.method"
				:method="item.method"
				:icon="key as string"
				:color="`var(--color-donate-${key as string})`"
				:link="item?.link"
				:copy-data="item?.account"
			/>
		</ul>
	</div>
</template>

<style lang="less" scoped>
.donate {
	display: flex;
	flex-direction: column;
	padding: var(--padding-vertical) var(--padding-side);

	&__title {
		font-size: var(--font-size-XXL);
		font-weight: var(--font-weight-bold);
		line-height: 40px;
		margin-bottom: var(--space-unrelated-items);
	}

	&__description {
		font-size: var(--font-size-S);
		line-height: 20px;
		margin-bottom: var(--space-subsections);
	}
}

.donate-method {
	&__title {
		font-size: var(--font-size-L);
		line-height: 24px;
		margin-bottom: var(--space-related-items);
	}
}
</style>
