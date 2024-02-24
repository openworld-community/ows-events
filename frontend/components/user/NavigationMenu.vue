<script setup>
import { RoutePathEnum } from '~/constants/enums/route';
const localePath = useLocalePath();
const mobile = inject('mobile');
</script>

<template>
	<div class="navigation-menu">
		<CommonButton
			:link="localePath(RoutePathEnum.USER_PROFILE)"
			class="edit-button"
			button-kind="ordinary"
			:no-border="!mobile"
			:button-text="$t('global.button.edit_profile')"
			icon-name="edit"
		/>

		<CommonButton
			:link="localePath(RoutePathEnum.USER_MY_EVENTS)"
			:button-text="$t('user.my_events.title')"
			icon-name="notebook"
			button-kind="ordinary"
			no-border
			class="link__item"
		/>
		<CommonButton
			:link="localePath(RoutePathEnum.USER_FAVOURITES)"
			:button-text="$t('user.favourites.title')"
			icon-name="heart"
			button-kind="ordinary"
			no-border
			class="link__item"
		/>

		<UserLogoutButton />
	</div>
</template>

<style scoped lang="less">
.navigation-menu {
	width: 100%;
	display: flex;
	flex-direction: column;
}

.router-link-exact-active {
	color: var(--color-accent-green-main);

	&:deep(svg) {
		color: var(--color-accent-green-main);
	}
}
.edit-button {
	width: 100%;

	@media (min-width: 768px) {
		width: max-content;
	}
}
</style>
