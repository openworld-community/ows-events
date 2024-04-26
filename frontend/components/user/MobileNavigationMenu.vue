<script setup>
import { RoutePathEnum } from '~/constants/enums/route';
import { useLogout } from '~/composables/useLogout';

const { logout } = useLogout();
const onLogoutPress = async () => {
	await logout();
};
</script>

<template>
	<div class="menu-wrapper">
		<div class="navigation-menu-mobile">
			<CommonButton
				:link="RoutePathEnum.USER_PROFILE"
				class="navigation-menu-mobile__edit-button"
				button-kind="ordinary"
				:button-text="$t('global.button.edit_profile')"
				icon-name="edit"
			/>

			<CommonButton
				:link="RoutePathEnum.USER_MY_EVENTS"
				:button-text="$t('user.my_events.title')"
				icon-name="notebook"
				button-kind="ordinary"
				no-border
				class="navigation-menu-mobile__button"
			/>
			<CommonButton
				:link="RoutePathEnum.USER_FAVOURITES"
				:button-text="$t('user.favourites.title')"
				icon-name="heart"
				button-kind="ordinary"
				no-border
				class="navigation-menu-mobile__button"
			/>
		</div>
		<slot></slot>
		<LibraryAlert
			:title="$t('user.logout.title')"
			:description-text="$t('user.logout.text')"
			@on-confirm="onLogoutPress"
		>
			<CommonButton
				class="navigation-menu-mobile__logout"
				button-kind="warning"
				no-border
				:button-text="$t('global.button.logout')"
				icon-name="logout"
			/>
		</LibraryAlert>
	</div>
</template>
<style scoped lang="less">
.menu-wrapper {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	.navigation-menu-mobile {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		gap: 10px;
		margin-bottom: 10px;
		&__edit-button {
			width: 100%;
		}
		&__button {
			width: calc(50% - 10px);

			@media (max-width: 767px) {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				height: 108px;
				background-color: var(--color-background-secondary);
				border: 1px solid var(--color-background-secondary);
				border-radius: 8px;

				transition-property: background-color, border-color;
				transition-duration: 0.3s;
				transition-timing-function: ease;

				&:deep(.button__content) {
					font-size: var(--font-size-S);
				}

				&:deep(svg) {
					color: var(--color-accent-green-main);
					width: 32px;
					height: 32px;
					margin-bottom: 8px;
				}

				&:hover,
				&:focus {
					border-color: var(--color-accent-green-main-30);
					background-color: var(--color-input-field);
				}

				&:active {
					background-color: var(--color-accent-green-main-10);
					border-color: var(--color-accent-green-main-10);
				}
			}
		}
		&__logout {
			width: 100%;
			margin-top: auto;
		}
	}
}
</style>
