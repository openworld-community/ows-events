<script setup lang="ts">
import { SeoItempropAboutEnum, SeoItemTypeEnum } from '~/constants/enums/seo';

import { REPO_URL, SocialLinks } from '~/constants/url';
import { RoutePathEnum } from '../constants/enums/route';

const { t } = useI18n();
getMeta({
	title: t('meta.about_us.title'),
	description: t('meta.about_us.description')
});

const urlAfisha = 'https://afisha.peredelano.com/';
</script>

<template>
	<main
		class="about"
		itemscope
		:itemtype="SeoItemTypeEnum.ABOUT"
	>
		<div
			class="about-info"
			:itemprop="SeoItempropAboutEnum.MAIN_CONTENT"
		>
			<div class="about-logo">
				<img
					class="about-logo__image"
					src="/img/about/about-info.png"
					:itemprop="SeoItempropAboutEnum.IMAGE"
				/>
				<p class="about-logo__text-img">{{ $t('about.title') }}</p>
			</div>
			<p class="about__text text1">{{ $t('about.idea') }}</p>
		</div>

		<h3 class="about__values-header">{{ $t('about.values.title') }}</h3>

		<AboutValues />

		<div class="about-navigation">
			<div class="about-navigation__paragraph">
				<p class="text2">{{ $t('about.github') }}</p>
				<CommonNavLink
					:href="REPO_URL"
					class="about-navigation__link text2"
					is-external-link
					rel="noopener noreferrer"
					:itemprop="SeoItempropAboutEnum.SIGNIFICANT_LINK"
				>
					Repo
				</CommonNavLink>
			</div>

			<div class="about-navigation__paragraph">
				<p class="text2">{{ $t('about.website') }}</p>
				<CommonNavLink
					:to="RoutePathEnum.HOME"
					class="about-navigation__link text2"
					:itemprop="SeoItempropAboutEnum.RELATED_LINK"
				>
					{{ urlAfisha }}
				</CommonNavLink>
			</div>

			<div class="social-links">
				<h5>
					{{ $t('about.social.title') }}
				</h5>
				<ul class="social-links__list">
					<li
						v-for="(link, key) in SocialLinks"
						:key="link"
						class="social-links__item"
					>
						<CommonNavLink
							:to="link"
							is-external-link
							class="social-links__link"
							:style="`backgroundColor: var(--color-social-${key})`"
							:title="$t(`about.social_title.${key}`)"
							:aria-label="$t(`about.social_title.${key}`)"
							:itemprop="SeoItempropAboutEnum.SOCIAL_LINK"
						>
							<CommonIcon
								:name="`social/${key}-round`"
								width="48px"
								height="48px"
							/>
						</CommonNavLink>
					</li>
				</ul>
			</div>
		</div>
	</main>
</template>

<style lang="less" scoped>
.about {
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	padding: 5%;

	@media (max-width: 767px) {
		padding-top: 80px;
	}

	&__text {
		text-align: justify;

		@media (min-width: 768px) {
			padding-left: 5px;
			flex-basis: 70%;
		}
	}

	&__values-header {
		text-align: center;
		margin: 25px;

		@media (min-width: 768px) {
			margin: 70px 0;
		}
	}
}

.about-info {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 20px;

	@media (min-width: 768px) {
		flex-direction: row;
	}
	@media (min-width: 1440px) {
		width: 1189px;
	}
}

// Обертка для картинки с текстом внутри
.about-logo {
	display: flex;
	justify-content: center;
	align-items: center;

	@media (min-width: 768px) {
		max-width: 163px;
	}
	@media (min-width: 1440px) {
		max-width: 351px;
	}
	&__image {
		width: 100%;

		@media (max-width: 767px) {
			min-width: 351px;
		}
	}

	&__text-img {
		position: absolute;

		font-size: 96px;

		@media (min-width: 768px) {
			font-size: 32px;
		}
		@media (min-width: 1440px) {
			font-size: 96px;
		}
	}
}

// Навигация
.about-navigation {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 15px;
	margin-top: 48px;
	font-size: var(--font-size-S);

	@media (min-width: 768px) {
		margin-top: 80px;
	}

	@media (min-width: 1440px) {
		margin-top: 150px;
	}

	&__paragraph {
		display: flex;
	}

	&__paragraph p {
		margin-right: 5px;
	}

	&__link {
		color: var(--color-text-link);
		text-decoration: underline;
	}
}

// Социальные сети
.social-links {
	&__list {
		display: flex;
		justify-content: center;
		margin-top: 20px;
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
