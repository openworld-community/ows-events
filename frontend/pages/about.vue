<script setup lang="ts">
import { SeoItempropAboutEnum, SeoItemTypeEnum } from '~/constants/enums/seo';
import { REPO_URL, SocialLinks } from '~/constants/url';

const { t } = useI18n();
const mobile = inject('mobile');

getMeta({
	title: t('meta.about_us.title'),
	description: t('meta.about_us.description')
});
</script>

<template>
	<div class="root">
		<HeaderCommon />
		<main
			class="about"
			itemscope
			:itemtype="SeoItemTypeEnum.ABOUT"
		>
			<h1 class="about__title">{{ $t('about.title') }}</h1>
			<div class="about__image-container">
				<img
					srcset="@/assets/img/about/about-screen@2x.png 2x"
					src="@/assets/img/about/about-screen@1x.png"
					width="351"
					height="232"
					class="about__img"
					alt=""
					:itemprop="SeoItempropAboutEnum.IMAGE"
				/>
			</div>
			<div
				class="about__description"
				:itemprop="SeoItempropAboutEnum.MAIN_CONTENT"
			>
				<p class="about__paragraph about__paragraph--separated">{{ $t('about.idea') }}</p>
				<p class="about__paragraph">{{ $t('about.mission') }}</p>
				<p class="about__paragraph about__paragraph--separated">
					{{ $t('about.functionality') }}
				</p>
				<p class="about__paragraph about__paragraph--separated">{{ $t('about.team') }}</p>
				<h2 class="about__list-title">{{ $t('about.values.title') }}</h2>
				<ul class="about__list">
					<li class="about__list-item">
						{{ $t('about.values.openness') }}
					</li>
					<li class="about__list-item">
						{{ $t('about.values.innovation') }}
					</li>
					<li class="about__list-item">
						{{ $t('about.values.community') }}
					</li>
					<li class="about__list-item">
						{{ $t('about.values.accessibility') }}
					</li>
					<li class="about__list-item">
						{{ $t('about.values.quality') }}
					</li>
				</ul>
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
								:name="`social/${key}-round`"
								width="40px"
								height="40px"
							/>
						</NuxtLink>
					</li>
				</ul>
			</div>
		</main>
		<FooterCommon v-if="!mobile" />
	</div>
</template>

<style lang="less" scoped>
.about {
	padding-left: var(--padding-side);
	padding-right: var(--padding-side);
	padding-bottom: var(--padding-vertical);

	&__title {
		margin-top: var(--padding-vertical);
		font-size: var(--font-size-XXL);
		line-height: var(--line-height-XXL);
		font-weight: var(--font-weight-bold);
	}

	&__image-container {
		display: flex;
		width: 100%;
		min-height: 232px;
		line-height: 0;
		background-color: var(--color-input-field);
		border-radius: 4px;
		margin-top: var(--space-unrelated-items);
		margin-bottom: var(--space-related-items);
	}

	&__img {
		width: 100%;
		min-width: 100%;
		max-width: 100%;
		height: 100%;
		border-radius: 4px;
	}

	&__description {
		margin-bottom: var(--space-subsections);
	}

	&__list-title {
		font-size: var(--font-size-S);
		line-height: 20px;
		margin-bottom: var(--space-related-items);
	}

	&__list {
		margin-bottom: var(--space-unrelated-items);
	}

	&__list-item {
		list-style-type: disc;
		list-style-position: inside;
		font-size: var(--font-size-S);
		line-height: 20px;
	}

	&__paragraph {
		font-size: var(--font-size-S);
		line-height: 20px;

		&--separated {
			margin-bottom: var(--space-unrelated-items);
		}
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
