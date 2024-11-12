<script setup lang="ts">
import { SeoItempropNavEnum } from '../../../constants/enums/seo';
import { RouteNameEnum, RoutePathEnum } from '../../../constants/enums/route';
const localePath = useLocalePath();

const route = useRoute();

const CommonNavLink = resolveComponent('CommonNavLink');
const isAtHome = computed(() => getRouteName(route.name as string) === RouteNameEnum.HOME);

const logoComponentIs = computed(() => {
	if (isAtHome.value) return 'button';
	else return CommonNavLink;
});
const clickOnLogo = () => {
	navigateTo(localePath(RoutePathEnum.HOME));
};
const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
</script>

<template>
	<component
		:is="logoComponentIs"
		class="logo"
		:title="$t(isAtHome ? 'header.logo.at_home_aria' : 'header.logo.other_page_aria')"
		:aria-label="$t(isAtHome ? 'header.logo.at_home_aria' : 'header.logo.other_page_aria')"
		:to="!isAtHome ? RoutePathEnum.HOME : undefined"
		:itemprop="SeoItempropNavEnum.URL"
		@click="
			isAtHome && scrollToTop();
			clickOnLogo();
		"
	>
		<CommonIcon
			name="afisha-logo-light"
			width="86"
			height="40"
			color="var(--color-accent-green-main)"
		/>
	</component>
</template>

<style scoped lang="less">
.logo {
	display: flex;
	height: 100%;
	align-items: center;
	border-radius: 6px;

	&:deep(svg) {
		transition: color 0.3s ease;
	}

	&:hover,
	&:focus,
	&:active {
		&:deep(svg) {
			color: var(--color-accent-green-dark);
		}
	}
}
</style>
