<script setup lang="ts">
import { RouteNameEnum } from '@/constants/enums/route';

const route = useRoute();

const scrollToTop = () => {
	window.scrollTo({ top: 0, behavior: 'smooth' });
};
</script>

<template>
	<header class="header">
		<div class="header__container">
			<div class="header__left">
				<NuxtLink
					v-if="route.name === RouteNameEnum.HOME"
					:to="{ name: RouteNameEnum.HOME }"
					class="header__navigation-link"
					:aria-label="$translate('home.button.afisha_logo_aria')"
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
					:link="{ name: RouteNameEnum.HOME }"
					is-icon
					icon-name="back"
					button-kind="ordinary"
					:alt="$translate('global.button.back')"
				/>
			</div>

			<div
				v-if="route.name !== RouteNameEnum.ABOUT"
				class="header__right"
			>
				<!--        TODO: вернуться при доработке подписки-->
				<!--				<HeaderSubscriptionExpired-->
				<!--					v-if="route.name === RouteNameEnum.HOME"-->
				<!--					class="header__subscription"-->
				<!--				/>-->
				<HeaderNavigation />
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
		margin-right: 12px;
	}

	&__right {
		display: flex;
		justify-content: flex-end;
		text-align: center;
		padding: 14px 0;
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
