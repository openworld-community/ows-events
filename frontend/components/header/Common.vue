<script setup lang="ts">
import { RouteNameEnum } from '../../constants/enums/route';

const { translate } = useTranslation();
const route = useRoute();

const scrollToTop = () => {
	window.scrollTo({ top: 0, behavior: 'smooth' });
};

const router = useRouter();
const isFromHome = ref(false);
router.beforeEach((_, from, next) => {
	isFromHome.value = from.name === RouteNameEnum.HOME;
	next();
});

const isNavbarOpen = ref<boolean>(false);
const navbarToggle = () => {
	isNavbarOpen.value = !isNavbarOpen.value;
};

const sidebar = ref(null);
const navigationBurger = ref(null);

onClickOutside(sidebar, () => navbarToggle(), { ignore: [navigationBurger] });
</script>

<template>
	<header class="header">
		<div class="header__container">
			<div class="header__left">
				<NuxtLink
					v-if="route.name === RouteNameEnum.HOME"
					:to="{ name: RouteNameEnum.HOME }"
					class="header__navigation-link"
					:aria-label="translate('home.button.afisha_logo_aria')"
					@click.prevent="scrollToTop"
				>
					<CommonIcon
						name="peredelano-afisha"
						width="86"
						height="40"
						alt="Peredelano Афиша"
					/>
				</NuxtLink>
				<CommonButton
					v-else
					is-icon
					icon-name="back"
					button-kind="ordinary"
					:alt="translate('global.button.back')"
					:link="!isFromHome ? { name: RouteNameEnum.HOME } : undefined"
					@click="isFromHome && router.back()"
				/>
			</div>
			<div class="header__right">
				<!--        TODO: вернуться при доработке подписки-->
				<!--				<HeaderSubscriptionExpired-->
				<!--					v-if="route.name === RouteNameEnum.HOME"-->
				<!--					class="header__subscription"-->
				<!--				/>-->
				<HeaderNavigationBurger
					v-if="route.name === RouteNameEnum.HOME"
					ref="navigationBurger"
					:is-cross="isNavbarOpen"
					:aria-label="
						isNavbarOpen
							? translate('component.header.button.close')
							: translate('component.header.button.open')
					"
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
		margin-left: 12px;
		gap: 18px;
	}

	&__subscription {
		display: flex;
		max-width: max-content;
	}

	&__navigation-link {
		height: 100%;
		align-items: center;
		display: flex;
	}
}
</style>
