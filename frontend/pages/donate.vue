<script setup lang="ts">
import { ValuesSupport } from '../components/donate/DonateData';
import { ValuesSupportKripta } from '../components/donate/DonateData';

const { t } = useI18n();
const mobile = inject('mobile');
getMeta({
	title: t('meta.about_us.title'),
	description: t('meta.about_us.description')
});
import { SeoItempropAboutEnum, SeoItemTypeEnum } from '~/constants/enums/seo';
</script>

<template>
	<main
		class="donate"
		itemscope
	>
		<h2 class="donate-info__title">{{ $t('donate.title') }}</h2>
		<div class="donate-info">
			<div class="donate-logo">
				<div>
					<p class="donate-logo__title">{{ $t('donate.description') }}</p>
					<div
						v-if="!mobile"
						class="donate-logo__text"
					>
						<p>{{ $t('donate.gratitude') }}</p>
						<p>{{ $t('donate.subscription') }}</p>
					</div>
				</div>

				<img
					class="donate-logo__image"
					src="@/public/img/help-Afisha/logo.png"
					:itemprop="SeoItempropAboutEnum.IMAGE"
				/>
				<div
					v-if="mobile"
					class="donate-logo__text"
				>
					<p>{{ $t('donate.gratitude') }}</p>
					<p>{{ $t('donate.subscription') }}</p>
				</div>
			</div>
		</div>

		<div class="donate-support">
			<h3 class="donate-support__title">{{ $t('donate.support') }}</h3>
			<ul class="donate-support__support">
				<DonateValuesSupport
					v-for="(item, key) in ValuesSupport"
					v-bind="item"
					:key="item.name"
					:method="item.name"
					:icon="key as string"
					:color="`var(--color-donate-${key as string})`"
					:link="item?.link"
				/>
			</ul>
		</div>

		<div class="donate-kripta">
			<h3>{{ $t('donate.support_cripta') }}</h3>
			<ul>
				<DonateValuesSupportKripta
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
