<script setup lang="ts">
import eventScreen from '../assets/img/event-screen@2x.png';
import { SeoItempropAboutEnum, SeoItemTypeEnum } from '../constants/enums/seo';
import { RouteNameEnum } from '../constants/enums/route';
import {REPO_URL, SocialLinks} from '../constants/url';

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
		<h1 class="about__title">{{ $t('about.title') }}</h1>
		<img
			:src="eventScreen"
			class="about__img"
			:alt="$t('about.alt')"
			:itemprop="SeoItempropAboutEnum.IMAGE"
		/>
		<div
			class="about__description"
			:itemprop="SeoItempropAboutEnum.MAIN_CONTENT"
		>
			<p class="about__paragraph">{{ $t('about.idea') }}</p>
			<p class="about__paragraph">{{ $t('about.functionality') }}</p>
			<p class="about__paragraph">{{ $t('about.perspectives') }}</p>
			<p class="about__paragraph">
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
		<div class="about__social-links social-links">
			<h2 class="social-links__title">
				{{ $t('about.social.title') }}
			</h2>
			<ul class="social-links__list">
				<li
					v-for="(link, key) in SocialLinks"
					:key="link"
					class="social-links__item"
				>
					<NuxtLink
						:to="link"
						target="_blank"
						class="social-links__link"
						:style="`backgroundColor: var(--color-social-${key})`"
						:aria-label="`${$t('about.social.alt')} ${key}`"
						:itemprop="SeoItempropAboutEnum.SOCIAL_LINK"
					>
						<CommonIcon
							:name="`social/${key}`"
							width="40px"
              height="40px"
						/>
					</NuxtLink>
				</li>
			</ul>
		</div>
	</section>
</template>

<style lang="less" scoped>
.about {
	padding-left: var(--padding-side);
	padding-right: var(--padding-side);
	padding-top: var(--padding-vertical);
	padding-bottom: var(--padding-vertical);

	&__title {
		font-size: var(--font-size-XXL);
		line-height: var(--line-height-XXL);
		font-weight: var(--font-weight-bold);
	}

	&__img {
		width: 100%;
		min-width: 100%;
		max-width: 100%;
		height: 100%;
		margin-top: var(--space-unrelated-items);
		margin-bottom: var(--space-related-items);
		border-radius: 4px;
	}

	&__description {
		margin-bottom: var(--space-subsections);
	}

	&__paragraph {
		font-size: var(--font-size-S);
		line-height: 20px;
		margin-bottom: var(--space-unrelated-items);
	}

	&__link {
		color: var(--color-link);
		text-decoration: underline;
		font-weight: var(--font-weight-bold);
	}
}

.social-links {
	&__title {
		font-size: var(--font-size-L);
		line-height: 24px;
		margin-bottom: var(--space-unrelated-items);
	}

	&__list {
		display: flex;
	}

	&__item {
		display: flex;
		width: 48px;
		height: 48px;
		justify-content: center;
		align-items: center;
		margin-right: 10px;
	}

	&__link {
		display: flex;
		width: 40px;
		height: 40px;
		justify-content: center;
		align-items: center;
		border-radius: 50%;
	}
}
</style>
