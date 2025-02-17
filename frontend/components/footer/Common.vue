<script setup lang="ts">
import { RoutePathEnum, RouteNameEnum } from '../../constants/enums/route';
import { SocialLinks, SUPPORT_TG_URL } from '../../constants/url';

import { SeoItempropNavEnum } from '../../constants/enums/seo';
import { getRouteName } from '../../utils';

const route = useRoute();
const CommonNavLink = resolveComponent('CommonNavLink');

const mobile = inject('mobile');

const isAtHome = computed(() => getRouteName(route.name as string) === RouteNameEnum.HOME);
const logoComponentIs = computed(() => {
	if (isAtHome.value) return 'button';
	else return CommonNavLink;
});
const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

const currentYear = new Date().getFullYear();
</script>

<template>
	<footer class="footer">
		<div class="footer__links">
			<div class="footer__logo logo">
				<component
					:is="logoComponentIs"
					class="logo__link"
					:title="
						$t(isAtHome ? 'footer.logo.at_home_aria' : 'footer.logo.other_page_aria')
					"
					:aria-label="
						$t(isAtHome ? 'footer.logo.at_home_aria' : 'footer.logo.other_page_aria')
					"
					:to="!isAtHome ? RoutePathEnum.HOME : undefined"
					:itemprop="SeoItempropNavEnum.URL"
					@click="isAtHome && scrollToTop()"
				>
					<CommonIcon
						name="afisha-logo-dark"
						width="86"
						height="40"
						color="var(--color-accent-green-main)"
					/>
				</component>
			</div>

			<div class="footer__navigation navigation">
				<ul class="navigation__item-container">
					<li class="navigation__item">
						<CommonNavLink
							:to="RoutePathEnum.ABOUT"
							class="navigation__link"
						>
							{{ $t('footer.navigation.about') }}
						</CommonNavLink>
					</li>
					<li class="navigation__item">
						<CommonNavLink
							:to="SUPPORT_TG_URL"
							is-external-link
							target="_blank"
							class="navigation__link"
						>
							{{ $t('footer.navigation.support') }}
						</CommonNavLink>
					</li>
				</ul>
				<ul class="navigation__item-container">
					<li class="navigation__item">
						<CommonNavLink
							:to="RoutePathEnum.DONATION"
							class="navigation__link"
						>
							{{ $t('footer.navigation.donate') }}
						</CommonNavLink>
					</li>
					<li class="navigation__item">
						<CommonNavLink
							:to="RoutePathEnum.LIMITATION_OF_LIABILITY"
							:prefetch="false"
							class="navigation__link"
						>
							{{ $t('footer.navigation.limitation_of_liability') }}
						</CommonNavLink>
					</li>
				</ul>
			</div>
			<div class="footer__social social">
				<ul class="social__list">
					<li
						v-for="(link, key) in SocialLinks"
						:key="link"
						class="social__item"
					>
						<NuxtLink
							:to="link"
							:title="$t(`footer.social.${key}`)"
							:aria-label="$t(`footer.social.${key}`)"
							target="_blank"
							class="social__link"
						>
							<CommonIcon
								:name="`social/${key}`"
								:color="
									mobile ? 'var(--color-accent-green-main)' : 'var(--color-white)'
								"
							/>
						</NuxtLink>
					</li>
				</ul>
			</div>
		</div>
		<p class="footer__copyright copyright">© Peredelano Startups {{ currentYear }}</p>
	</footer>
</template>

<style scoped lang="less">
.footer {
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: var(--color-dark);
	padding: var(--space-subsections) var(--padding-side);
	margin-top: auto;

	@media (min-width: 768px) {
		flex-direction: column;
		align-items: flex-start;
		padding: 0 0 var(--space-related-items) 0;
	}

	&__links {
		display: flex;
		width: 100%;
		flex-direction: column;
		align-items: center;

		@media (min-width: 768px) {
			flex-direction: row;
			align-items: flex-start;
		}
	}
}

.logo {
	display: flex;
	width: 100%;
	justify-content: center;

	@media (min-width: 768px) {
		width: 22%;
		height: 100%;
		justify-content: flex-start;
		border-right: 1px solid var(--color-white-semitransparent);
		padding-left: var(--padding-side);
		padding-top: var(--space-subsections);
		padding-bottom: var(--space-subsections);
	}

	@media (min-width: 1440px) {
		width: 27%;
	}

	&__link {
		margin-bottom: var(--space-related-items);

		@media (min-width: 768px) {
			margin-bottom: 0;
			height: max-content;
		}
	}
}

.navigation {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin-bottom: var(--space-unrelated-items);

	@media (min-width: 768px) {
		width: 56%;
		height: 100%;
		flex-direction: row;
		align-items: flex-start;
		justify-content: flex-start;
		border-right: 1px solid var(--color-white-semitransparent);
		padding: var(--space-subsections) var(--space-related-items);
		margin-bottom: 0;
	}

	@media (min-width: 1440px) {
		width: 46%;
		justify-content: space-between;
		padding-right: 72px;
	}

	&__item-container {
		display: flex;
		flex-direction: column;
		align-items: center;

		@media (min-width: 768px) {
			align-items: flex-start;

			&:not(:last-child) {
				margin-right: 18%;
			}
		}
	}

	&__item {
		margin-bottom: 3px;
	}

	&__link {
		padding: 5px;
		font-size: var(--font-size-S);
		line-height: 20px;
		color: var(--color-white);

		&:active {
			background-color: var(--color-dark);
		}
	}
}

.social {
	display: flex;
	width: 100%;
	justify-content: center;

	@media (min-width: 768px) {
		width: 22%;
		height: 100%;
		max-height: 118px;
		align-items: center;
		padding: var(--space-subsections) var(--padding-side) var(--space-subsections)
			var(--space-related-items);
		margin-bottom: 0;
	}

	@media (min-width: 1440px) {
		width: 27%;
		align-items: flex-start;
	}

	&__list {
		display: flex;
		width: 100%;
		justify-content: center;

		@media (min-width: 768px) {
			flex-wrap: wrap;
		}
		@media (min-width: 768px) and (max-width: 1440px) {
			display: grid;
			grid-template-rows: repeat(2, 1fr);
			grid-template-columns: repeat(2, 1fr);
			gap: 16px;
		}
	}

	&__item {
		&:not(:last-child) {
			margin-right: var(--space-unrelated-items);

			@media (min-width: 768px) {
				margin-right: 0;
			}
		}

		@media (min-width: 768px) and (max-width: 1440px) {
			display: flex;
			flex-direction: row;
		}

		&:nth-child(odd) {
			justify-content: flex-end;
		}

		&:nth-child(event) {
			justify-content: flex-start;
		}

		@media (min-width: 1440px) {
			height: max-content;
			margin-bottom: var(--space-related-items);
			margin-left: var(--space-related-items);
		}
	}

	&__link {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 32px;
		height: 32px;

		@media (min-width: 768px) {
			width: auto;
			height: auto;
		}
	}
}

.copyright {
	font-size: var(--font-size-S);
	line-height: 20px;
	color: var(--color-white-semitransparent);

	@media (min-width: 768px) {
		display: flex;
		width: 100%;
		justify-content: flex-end;
		border-top: 1px solid var(--color-white-semitransparent);
		padding-top: var(--space-related-items);
		padding-right: var(--padding-side);
	}
}
</style>
