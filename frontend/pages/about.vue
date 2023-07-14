<script setup lang="ts">
import eventScreen from '@/assets/img/event-screen@2x.png';
import { REPO_URL } from '@/constants/url';
import { SeoItempropAboutEnum, SeoItemTypeEnum } from '@/constants/enums/seo';
import { RouteNameEnum } from '../constants/enums/route';

const { t } = useI18n();

definePageMeta({ name: RouteNameEnum.ABOUT });
getMeta({
	title: t('meta.about_us.title')
});
</script>

<template>
	<section
		class="about"
		itemscope
		:itemtype="SeoItemTypeEnum.ABOUT"
	>
		<h1 class="title">{{ $t('about.title') }}</h1>
		<img
			:src="eventScreen"
			class="about__img"
			:alt="$t('about.alt')"
			:itemprop="SeoItempropAboutEnum.IMAGE"
		/>
		<div :itemprop="SeoItempropAboutEnum.MAIN_CONTENT">
			<p>{{ $t('about.idea') }}</p>
			<br />
			<p>{{ $t('about.functionality') }}</p>
			<br />
			<p>{{ $t('about.perspectives') }}</p>
			<br />
			<p>
				{{ $t('about.github') }}:
				<NuxtLink
					:href="REPO_URL"
					class="about__link"
					target="_blank"
					rel="noopener noreferrer"
					:itemprop="SeoItempropAboutEnum.SIGNIFICANT_LINK"
				>
					Repo
				</NuxtLink>
			</p>
		</div>
	</section>
</template>

<style lang="less" scoped>
.about {
  max-width: 480px;
  padding-left: var(--padding-side);
  padding-right: var(--padding-side);
  padding-top: var(--padding-vertical);
  padding-bottom: var(--padding-vertical);
  margin-right: auto;
  margin-left: auto;
}

.about p {
	font-size: var(--font-size-S);
	line-height: 20px;
}

.title {
	font-size: var(--font-size-XXL);
	line-height: var(--line-height-XXL);
	font-weight: var(--font-weight-bold);
}

.about__img {
	width: 100%;
	min-width: 100%;
	max-width: 100%;
	height: 100%;
	margin-top: var(--space-unrelated-items);
	margin-bottom: var(--space-related-items);
	border-radius: 4px;
}

.about__link {
	color: var(--color-link);
	text-decoration: underline;
	font-weight: var(--font-weight-bold);
}
</style>
