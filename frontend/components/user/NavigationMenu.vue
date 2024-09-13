<script setup>
import { RoutePathEnum } from '~/constants/enums/route';
import { useLogout } from '~/composables/useLogout';

const { logout } = useLogout();
const onLogoutPress = async () => {
	await logout();
};
</script>

<template>
	<div class="navigation-menu">
		<CommonButton
			:link="RoutePathEnum.USER_PROFILE"
			class="navigation-menu__button"
			button-kind="ordinary"
			no-border
			:button-text="$t('global.button.edit_profile')"
			icon-name="edit"
		/>

		<CommonButton
			:link="RoutePathEnum.USER_MY_EVENTS"
			:button-text="$t('user.my_events.title')"
			icon-name="notebook"
			button-kind="ordinary"
			no-border
			class="navigation-menu__button"
		/>
		<CommonButton
			:link="RoutePathEnum.USER_FAVOURITES"
			:button-text="$t('user.favourites.title')"
			icon-name="heart"
			button-kind="ordinary"
			no-border
			class="navigation-menu__button"
		/>

		<LibraryAlert
			:title="$t('user.logout.title')"
			:description-text="$t('user.logout.text')"
			@on-confirm="onLogoutPress"
		>
			<CommonButton
				class="navigation-menu__button"
				button-kind="warning"
				no-border
				:button-text="$t('global.button.logout')"
				icon-name="logout"
			/>
		</LibraryAlert>
	</div>
</template>

<style scoped lang="less">
.navigation-menu {
	width: 250px;
	display: flex;
	flex-direction: column;
	transition: width 0.7s ease-in-out, height 0.7s ease-in-out;

	&__button {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: left;
	}
}

.router-link-exact-active {
	color: var(--color-white);
	background-color: var(--color-accent-green-main);

	&:deep(svg) {
		color: var(--color-white);
	}
}
</style>
