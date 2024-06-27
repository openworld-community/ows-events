<script setup lang="ts">
import { SeoItempropAboutEnum, SeoItemTypeEnum } from '~/constants/enums/seo';

import { REPO_URL, SocialLinks } from '~/constants/url';
import { RoutePathEnum } from '../constants/enums/route';

const { t } = useI18n();
getMeta({
	title: t('meta.about_us.title'),
	description: t('meta.about_us.description')
});
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
			<div class="about-wrapper">
				<img
					class="about-wrapper__image"
					src="@/public/img/about/about-info.png"
					:itemprop="SeoItempropAboutEnum.IMAGE"
				/>
				<p class="about-wrapper__text-img">{{ $t('about.title') }}</p>
			</div>
			<p class="about__text">{{ $t('about.idea') }}</p>
		</div>

		<h3 class="about__values-header">{{ $t('about.values.title') }}</h3>

		<AboutValues />

		<div class="about-navigation">
			<div class="about-navigation__paragraph">
				<p>{{ $t('about.github') }}</p>
				<CommonNavLink
					:href="REPO_URL"
					class="about-navigation__link"
					is-external-link
					rel="noopener noreferrer"
					:itemprop="SeoItempropAboutEnum.SIGNIFICANT_LINK"
				>
					Repo
				</CommonNavLink>
			</div>

			<div class="about-navigation__paragraph">
				<p>{{ $t('about.website') }}</p>
				<CommonNavLink
					:to="RoutePathEnum.HOME"
					class="about-navigation__link"
					:itemprop="SeoItempropAboutEnum.RELATED_LINK"
				>
					https://afisha.peredelano.com/
				</CommonNavLink>
			</div>

			<div class="social-links">
				<h3 class="social-links__title">
					{{ $t('about.social.title') }}
				</h3>
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

	&__text {
		line-height: 20px;
		font-size: var(--font-size-S);
		text-align: justify;

		@media (min-width: 768px) {
			padding-left: 5px;
			//line-height: 17px;

			flex-basis: 70%;
			//max-width: 506px;
		}
		@media (min-width: 1440px) {
			font-size: var(--font-size-L);
			line-height: 30px;
			align-self: flex-start;
		}
	}

	&__values-header {
		text-align: center;
		font-weight: 600;
		line-height: 25px;
		margin: 25px;

		@media (min-width: 768px) {
			font-size: var(--font-size-ML);
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
.about-wrapper {
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
	margin-top: 28px;
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
		color: var(--color-link);
		text-decoration: underline;
		font-weight: 600px;
	}
}

// Социальные сети
.social-links {
	&__title {
		line-height: 28px;
	}

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
