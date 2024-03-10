<script setup>
import { RoutePathEnum } from '~/constants/enums/route';
import { useLogout } from '~/composables/useLogout';
const localePath = useLocalePath();
const { logout } = useLogout();
const onLogoutPress = () => {
	logout();
};
</script>

<template>
	<div class="navigation-menu">
		<CommonButton
			:link="localePath(RoutePathEnum.USER_PROFILE)"
			class="navigation-menu__button"
			button-kind="ordinary"
			no-border
			:button-text="$t('global.button.edit_profile')"
			icon-name="edit"
		/>

		<CommonButton
			:link="localePath(RoutePathEnum.USER_MY_EVENTS)"
			:button-text="$t('user.my_events.title')"
			icon-name="notebook"
			button-kind="ordinary"
			no-border
			class="navigation-menu__button"
		/>
		<CommonButton
			:link="localePath(RoutePathEnum.USER_FAVOURITES)"
			:button-text="$t('user.favourites.title')"
			icon-name="heart"
			button-kind="ordinary"
			no-border
			class="navigation-menu__button"
		/>

		<LibraryDialog
			class="navigation-menu__button"
			button-kind="warning"
			:dialogTitleText="$t('user.logout.title')"
      		:dialogDescriptionText="$t('user.logout.text')"
			:dialogCustomFunction=onLogoutPress
			:dialogCustomFunctionDescription="$t('user.logout.title')"
    	>
			<CommonButton
			class="navigation-menu__button"
			button-kind="warning"
			no-border
			:button-text="$t('global.button.logout')"
			icon-name="logout"
			/>
		</LibraryDialog>
	</div>
</template>

<style scoped lang="less">
.navigation-menu {
	width: 200px;
	display: flex;
	flex-direction: column;

	@media (min-width: 100px) {
		width: 255px;
	}

	&__button {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: left;
	}
}

.router-link-exact-active {
	color: var(--color-accent-green-main);
	background-color: var(--color-input-field);

	&:deep(svg) {
		color: var(--color-accent-green-main);
	}
}
</style>
