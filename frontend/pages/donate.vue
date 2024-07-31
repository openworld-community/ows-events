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
			class="donate-info__title"
			:itemprop="SeoItempropGlobalEnum.TITLE"
		>
			{{ $t('donate.title') }}
		</h2>
		<div class="donate-info">
			<div class="donate-logo">
				<div>
					<p
						class="donate-logo__title"
						:itemprop="SeoItempropGlobalEnum.DESCRIPTION"
					>
						{{ $t('donate.description') }}
					</p>
					<div
						v-if="!mobile"
						class="donate-logo__text"
					>
						<p :itemprop="SeoItempropGlobalEnum.DESCRIPTION">
							{{ $t('donate.gratitude') }}
						</p>
						<p :itemprop="SeoItempropGlobalEnum.DESCRIPTION">
							{{ $t('donate.subscription') }}
						</p>
					</div>
				</div>

				<img
					class="donate-logo__image"
					src="@/public/img/help-Afisha/logo.png"
					:itemprop="SeoItempropGlobalEnum.IMAGE"
				/>
				<div
					v-if="mobile"
					class="donate-logo__text"
				>
					<p :itemprop="SeoItempropGlobalEnum.DESCRIPTION">
						{{ $t('donate.gratitude') }}
					</p>
					<p :itemprop="SeoItempropGlobalEnum.DESCRIPTION">
						{{ $t('donate.subscription') }}
					</p>
				</div>
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
					:color="`var(--color-donate-${key as string})`"
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
	}
}
.donate-info {
	&__title {
		text-align: center;
	}
}
.donate-logo {
	@media (min-width: 765px) {
		display: flex;
		gap: 30px;
	}

	&__title {
		text-align: justify;
	}
	&__image {
		width: 100%;
		@media (min-width: 765px) {
			min-width: 253px;
		}
	}
}
.donate-support {
	&__title {
		text-align: center;
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
</style>
