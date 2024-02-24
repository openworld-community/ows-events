<script setup>
import { useUserStore } from '~/stores/user.store';
import { CookieNameEnum } from '~/constants/enums/common';
import { RoutePathEnum } from '~/constants/enums/route';

const localePath = useLocalePath();
const userStore = useUserStore();
const tokenCookie = useCookie(CookieNameEnum.TOKEN);
const userCookie = useCookie(CookieNameEnum.TG_USER);

const logout = async () => {
	tokenCookie.value = null;
	userCookie.value = null;
	userStore.$patch({ userInfo: null });
	await navigateTo(localePath(`${RoutePathEnum.AUTH}`));
};
</script>

<template>
	<CommonButton
		class="logout-button"
		button-kind="warning"
		no-border
		:button-text="$t('global.button.logout')"
		icon-name="logout"
		@click="logout()"
	/>
</template>

<style scoped lang="less">
.logout-button {
	width: 100%;
	margin-top: auto;

	@media (min-width: 768px) {
		justify-content: flex-start;
		margin-top: unset;
		width: 226px;
	}

	@media (min-width: 1440px) {
		width: 250px;
	}
}
</style>
