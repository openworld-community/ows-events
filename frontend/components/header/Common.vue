<script setup lang="ts">
import { SeoItempropNavEnum, SeoItemTypeEnum } from '../../constants/enums/seo';
import { RoutePathEnum } from '../../constants/enums/route';

const route = useRoute();
const router = useRouter();
const localePath = useLocalePath();
const previousPage = router.options.history.state.back;

const pagesHasBackButton: string[] = [
	'event-id',
	'user-favourites',
	'user-my_events'
	// RoutePathEnum.EVENT,
	// RoutePathEnum.USER_MY_EVENTS,
	// RoutePathEnum.USER_FAVOURITES
];

const isNavbarOpen = ref<boolean>(false);
const navbarToggle = () => {
	isNavbarOpen.value = !isNavbarOpen.value;
};

const sidebar = ref(null);
const navigationBurger = ref(null);

onClickOutside(sidebar, () => navbarToggle(), { ignore: [navigationBurger] });

const isAtHome = computed(() => route.path === RoutePathEnum.HOME);
const logoComponentIs = computed(() => {
	if (isAtHome.value) return 'button';
	else return defineNuxtLink({});
});
const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

const goBack = () => {
	if (previousPage) {
		console.log(previousPage.slice(3));
		navigateTo(localePath({ path: previousPage.slice(3) }));
	} else if (
		route.path.slice(3).includes(RoutePathEnum.USER_FAVOURITES) ||
		route.path.slice(3).includes(RoutePathEnum.USER_MY_EVENTS)
	) {
		navigateTo(localePath({ path: RoutePathEnum.USER_PAGE }));
	} else navigateTo(localePath({ path: RoutePathEnum.HOME }));
};

const showBackButton = computed(() => {
	return (
		pagesHasBackButton.findIndex((pageName: string) => {
			return pageName === (route.name as string).split('___')[0];
		}) > -1
	);
});
</script>

<template>
	<header
		class="header"
		itemscope
		:itemtype="SeoItemTypeEnum.HEADER"
	>
		<div class="header__container">
			<div
				class="header__left"
				itemscope
				:itemtype="SeoItemTypeEnum.NAV"
			>
				<CommonButton
					v-if="showBackButton"
					is-icon
					icon-name="back"
					button-kind="ordinary"
					:alt="$t('global.button.back')"
					@click="goBack"
				/>
				<component
					:is="logoComponentIs"
					v-else
					class="header__navigation-link"
					:aria-label="
						$t(isAtHome ? 'header.logo.at_home_aria' : 'header.logo.other_page_aria')
					"
					:to="!isAtHome ? localePath(RoutePathEnum.HOME) : undefined"
					:itemprop="SeoItempropNavEnum.URL"
					@click="isAtHome && scrollToTop()"
				>
					<CommonIcon
						name="peredelano-afisha"
						width="86"
						height="40"
						alt="Peredelano Афиша"
					/>
				</component>
			</div>
			<div class="header__right">
				<HeaderLanguageSelector class="header__language-selector" />
				<HeaderNavigationBurger
					ref="navigationBurger"
					:is-cross="isNavbarOpen"
					:aria-label="$t(isNavbarOpen ? 'header.burger.close' : 'header.burger.open')"
					@click="navbarToggle"
				/>
				<HeaderNavigationSidebar
					v-if="isNavbarOpen"
					ref="sidebar"
					@close="navbarToggle"
				/>
			</div>
		</div>
	</header>
</template>

<style scoped lang="less">
.header {
	width: 100%;
	height: var(--header-height);
	position: fixed;
	top: 0;
	left: 0;
	//TODO разобраться с z-индексами
	z-index: 3;

	&__container {
		display: flex;
		align-items: center;
		justify-content: space-between;
		min-width: var(--width-mobile);
		height: var(--header-height);
		//TODO: пока верстка только мобилки
		max-width: 480px;
		background-color: var(--color-white);
		padding-left: var(--padding-side);
		padding-right: var(--padding-side);
		margin-left: auto;
		margin-right: auto;

		@media (min-width: 1440px) {
			max-width: 600px;
		}
	}

	&__left {
		display: flex;
		height: 100%;
		align-items: center;
		margin-right: auto;
	}

	&__right {
		display: flex;
		justify-content: flex-end;
		text-align: center;
		position: relative;
	}

	&__navigation-link {
		height: 100%;
		align-items: center;
		display: flex;
	}

	&__language-selector {
		margin-right: var(--space-inner);
	}
}
</style>