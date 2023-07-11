<script setup lang="ts">
import donateScreen from '../assets/img/donate-screen@2x.jpg';
import { RouteNameEnum } from '../constants/enums/route';
import { BASE_URL, DONATE_PATREON_URL } from '../constants/url';
import { CryptoWalletEnum } from '../constants/enums/crypto-wallets';
import Button from '../components/common/Button.vue';
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
	ogSiteName: () => t('meta.title'),
	ogType: 'website',
	// title: () => `${t('meta.title')} / ${t('meta.donate.title')}`,
	ogTitle: () => `${t('meta.title')} / ${t('meta.donate.title')}`,
	description: () => t('meta.donate.description'),
	ogDescription: () => t('meta.donate.description'),
	ogUrl: () => BASE_URL + RouteNameEnum.DONATION
});

const CRYPTO_WALLETS = {
	bitcoin: {
		title: t('donate.method.bitcoin'),
		account: CryptoWalletEnum.BITCOIN
	},
	ethereum: {
		title: t('donate.method.ethereum'),
		account: CryptoWalletEnum.ETHEREUM
	},
	usdt: {
		title: t('donate.method.usdt'),
		account: CryptoWalletEnum.USDT
	},
	usdc: {
		title: t('donate.method.usdc'),
		account: CryptoWalletEnum.USDC
	}
};

const copy = (text: string) => {
	alert('Ссылка скопирована в буфер обмена');
	navigator.clipboard.writeText(text);
};
</script>

<template>
	<div
		class="donate"
		itemscope
		:itemtype="SeoItemTypeEnum.DONATE"
	>
		<h1 class="donate__title">{{ $t('donate.title') }}</h1>
		<div class="donate__image-wrapper">
			<img
				class="donate__img"
				:src="donateScreen"
				:alt="$t('donate.alt')"
				:itemprop="SeoItempropGlobalEnum.IMAGE"
			/>
		</div>
		<div class="donate__description-wrapper">
			<p class="donate__description">
				{{ $t('donate.description') }}
			</p>
			<p class="donate__subscription">
				{{ $t('donate.gratitude') }}
			</p>
			<p class="donate__subscription">{{ $t('donate.subscription') }}</p>
		</div>
		<h2 class="donate__subscription">{{ $t('donate.method.title') }}</h2>

		<ul
			class="donate__method donate-method"
			itemscope
			:itemtype="SeoItemTypeEnum.DONATE"
      :itemprop="SeoItempropDonateEnum.GROUP_ITEMPROP"
		>
			<li
				class="donate-method__item"
        itemscope
        :itemtype="SeoItemTypeEnum.DONATE_METHOD"
        :itemprop="SeoItempropDonateEnum.METHOD"
			>
        <div class="donate-method__icon-wrapper">
				<CommonIcon
					name="patreon"
					class="donate-item__icon"
					color="var(--color-text-main)"
				/>
        </div>
        <h3>{{ $t('donate.method.patreon') }}</h3>
				<NuxtLink
					class="donate__link"
					:to="DONATE_PATREON_URL"
					target="_blank"
          :itemprop="SeoItempropDonateEnum.LINK"
				>
					{{ $t('global.button.follow') }}
				</NuxtLink>
			</li>
			<li
				v-for="wallet in CRYPTO_WALLETS"
				:key="wallet.title"
				class="donate-method__item"
			>
				<h3 class="wallet__name">{{ wallet.title }}</h3>
				<button
					class="wallet__account"
					@click="copy(wallet.account)"
				>
					<CommonIcon
						class="wallet__button"
						name="copy"
						color="var(--color-text-main)"
					/>
				</button>
			</li>
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
		margin-bottom: var(--space-subsections);
	}

	&__image-wrapper {
		display: flex;
		width: 100%;
		min-height: 136px;
		height: 100%;
		background-color: var(--color-background-secondary);
		border-radius: 4px;
		margin-bottom: var(--space-subsections);
	}

	&__img {
		width: 100%;
		min-width: 100%;
		max-width: 100%;
		height: 100%;
	}

	&__description-wrapper {
		display: flex;
		flex-direction: column;
		margin-bottom: var(--space-unrelated-items);
	}

	&__description {
		font-size: var(--font-size-S);
		line-height: 20px;
		margin-bottom: var(--space-subsections);
	}

	&__subscription {
		font-size: var(--font-size-S);
		font-weight: var(--font-weight-regular);
		line-height: 20px;
		margin-bottom: var(--space-related-items);
	}
}

.donate-method {
	&__item {
		display: flex;
		width: 100%;
    justify-content: space-between;
		margin-bottom: var(--space-unrelated-items);

    &:not(:last-child) {
      border-bottom: 1px solid var(--color-input-field);
    }
	}

  &__icon-wrapper {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: #00dc82;
  }

	&__name {
		font-size: var(--font-size-S);
		font-weight: var(--font-weight-regular);
		margin-bottom: var(--space-related-items);
	}

	&__account {
		display: flex;
	}

	&__button {
		margin-right: var(--space-related-items);
	}

	&__text {
		font-size: var(--font-size-XS);
	}
}
</style>
