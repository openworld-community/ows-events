<script setup lang="ts">
import { ValuesSupport } from '../components/donate/DonateData';

const { t } = useI18n();
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
		<div class="donate-info">
			<h2 class="donate-info__title">{{ $t('donate.title') }}</h2>
			<div class="donate-logo">
				<p class="donate-logo__text">{{ $t('donate.description') }}</p>
				<img
					class="donate-logo__image"
					src="@/public/img/help-Afisha/logo.png"
					:itemprop="SeoItempropAboutEnum.IMAGE"
				/>
				<p>{{ $t('donate.gratitude') }}</p>
				<p>{{ $t('donate.subscription') }}</p>
			</div>
		</div>
		<div class="donate-support">
			<h3>{{ $t('donate.support') }}</h3>
			<ul>
				<DonateValuesSupport
					v-for="(item, key) in ValuesSupport"
					v-bind="item"
					:key="item.method"
					:method="item.method"
					:icon="key as string"
					:color="`var(--color-donate-${key as string})`"
				/>
			</ul>
		</div>
		<div class="donate-cripta">
			<h3>{{ $t('donate.support_cripta') }}</h3>
		</div>
	</main>
</template>

<style lang="less" scoped>
.donate {
	width: 100%;
	padding: 4%;
	@media (max-width: 767px) {
		padding-top: 80px;
	}

	&__title {
	}
}
.donate-logo {
	&__text {
		text-align: justify;
	}
}
</style>
