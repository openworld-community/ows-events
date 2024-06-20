<script setup lang="ts">
import { SeoItempropNavEnum, SeoItemTypeEnum } from '../../constants/enums/seo';
import { RouteNameEnum, RoutePathEnum } from '../../constants/enums/route';
import { getRouteName } from '../../utils';
import { useUserStore } from '../../stores/user.store';
import { useFilterStore } from '~/stores/filter.store';
import { useModal } from 'vue-final-modal';
import NeedAuthorize from '@/components/modal/NeedAuthorize.vue';

const route = useRoute();

const localePath = useLocalePath();
const userStore = useUserStore();
const mobile = inject('mobile');
const desktop = inject('desktop');

const { t } = useI18n();

defineProps({
	hasBackButton: {
		type: Boolean,
		default: false
	}
});

const CommonNavLink = resolveComponent('CommonNavLink');

const isNavbarOpen = ref<boolean>(false);
const navbarToggle = () => {
	isNavbarOpen.value = !isNavbarOpen.value;
};

const sidebar = ref(null);
const navigationBurger = ref(null);

onClickOutside(sidebar, () => navbarToggle(), { ignore: [navigationBurger] });

const isAtHome = computed(() => getRouteName(route.name as string) === RouteNameEnum.HOME);
const logoComponentIs = computed(() => {
	if (isAtHome.value) return 'button';
	else return CommonNavLink;
});

const titleOnMobile = computed(() => {
	if (getRouteName(route.path) === RoutePathEnum.USER_FAVOURITES) {
		return t('user.favourites.title');
	}
	if (getRouteName(route.path) === RoutePathEnum.USER_MY_EVENTS) {
		return t('user.my_events.title');
	}
	if (getRouteName(route.path) === RoutePathEnum.USER_PROFILE) {
		return t('user.profile.title');
	}
	return '';
});
const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

const goBack = () => {
	// if (router.options.history.state.back) {
	// 	router.back();
	// }
	if (
		getRouteName(route.name as string).includes(RouteNameEnum.USER_FAVOURITES) ||
		getRouteName(route.name as string).includes(RouteNameEnum.USER_MY_EVENTS) ||
		getRouteName(route.name as string).includes(RouteNameEnum.USER_PROFILE)
	) {
		navigateTo(localePath({ path: RoutePathEnum.USER_PAGE }));
	} else {
		navigateTo(localePath({ path: RoutePathEnum.HOME }));
	}
};

const filterStore = useFilterStore();

const {
	open: openNeedAuthorizeModal,
	close: closeNeedAuthorizeModal,
	patchOptions: needAuthorizeModalPatch
} = useModal({ component: NeedAuthorize });
needAuthorizeModalPatch({ attrs: { closeNeedAuthorizeModal } });

const onButtonClick = async () => {
	if (userStore.isAuthorized) {
		await navigateTo(localePath(`${RoutePathEnum.EVENT_EDIT}new`));
	} else {
		await openNeedAuthorizeModal();
	}
};

const clearFilters = async () => {
	filterStore.$patch({
		filters: {
			city: '',
			//searchLine: '',
			date: [],
			tags: []
		}
	});
};
</script>

<template>
	<header
		class="header"
		itemscope
		:itemtype="SeoItemTypeEnum.HEADER"
	>
		<nav
			class="header__container"
			itemscope
			:itemtype="SeoItemTypeEnum.NAV"
		>
			<div class="header__left">
				<CommonButton
					v-if="hasBackButton && getRouteName(route.path) !== RoutePathEnum.USER_PAGE"
					is-icon
					icon-name="back"
					button-kind="ordinary"
					:alt="$t('global.button.back')"
					@click="goBack"
				/>
				<component
					:is="logoComponentIs"
					v-else
					class="header__logo"
					:title="
						$t(isAtHome ? 'header.logo.at_home_aria' : 'header.logo.other_page_aria')
					"
					:aria-label="
						$t(isAtHome ? 'header.logo.at_home_aria' : 'header.logo.other_page_aria')
					"
					:to="!isAtHome ? RoutePathEnum.HOME : undefined"
					:itemprop="SeoItempropNavEnum.URL"
					@click="
						isAtHome && scrollToTop();
						isAtHome && clearFilters();
					"
				>
					<CommonIcon
						name="afisha-logo-light"
						width="86"
						height="40"
						color="var(--color-accent-green-main)"
					/>
				</component>
			</div>
			<h1
				v-if="mobile && titleOnMobile"
				class="header__title"
			>
				{{ titleOnMobile }}
			</h1>
			<HeaderNavigationMain v-if="desktop" />

			<div class="header__right">
				<!-- v-if="!hasBackButton" -->
				<CommonButton
					v-if="!mobile"
					:button-text="$t('global.button.create_event')"
					class="button__success--filled"
					button-kind="success"
					@click="onButtonClick"
				/>

				<HeaderLanguageSelector class="header__language-selector" />
				<HeaderNavigationBurger
					v-if="!desktop"
					ref="navigationBurger"
					:is-cross="isNavbarOpen"
					:aria-label="$t(isNavbarOpen ? 'header.burger.close' : 'header.burger.open')"
					@click="navbarToggle"
				/>
				<HeaderNavigationSidebar
					v-if="!desktop && isNavbarOpen"
					ref="sidebar"
					@close="navbarToggle"
				/>
				<CommonButton
					v-if="desktop"
					:link="RoutePathEnum.USER_PAGE"
					button-kind="ordinary"
					icon-name="user"
					:button-text="
						userStore.isAuthorized
							? $t('header.navigation.user')
							: $t('header.navigation.authorize')
					"
				/>
			</div>
		</nav>
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

	@media (min-width: 768px) {
		position: static;
		height: unset;
		background-color: transparent;
	}

	&__container {
		display: flex;
		align-items: center;
		justify-content: space-between;
		min-width: var(--width-mobile);
		height: var(--header-height);
		background-color: var(--color-white);
		padding-left: var(--padding-side);
		padding-right: var(--padding-side);
		margin-left: auto;
		margin-right: auto;

		@media (min-width: 768px) {
			height: unset;
			padding-top: 32px;
			padding-bottom: 20px;
			background-color: transparent;
		}
	}

	&__left {
		display: flex;
		height: 100%;
		align-items: center;

		@media (min-width: 768px) {
			width: auto;
			justify-content: start;
		}
	}

	&__right {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		position: relative;
	}

	&__center {
		@media (min-width: 768px) {
			display: flex;
			width: 100%;
			max-width: 480px;
			justify-content: space-between;
			align-items: center;
			margin-left: 7%;
			margin-right: 7%;
		}
	}

	&__logo {
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

	&__title {
		font-size: var(--font-size-ML);
		font-weight: var(--font-weight-regular);
	}

	&__nav-item {
		@media (min-width: 768px) {
			display: flex;
			align-items: center;
			position: relative;
		}
	}

	&__nav-link {
		@media (min-width: 768px) {
			font-size: var(--font-size-S);
		}
	}

	&__language-selector {
		margin-right: var(--space-inner);
		margin-left: var(--space-inner);

		@media (min-width: 1440px) {
			margin-right: 32px;
			margin-left: 32px;
		}
	}
}
</style>
