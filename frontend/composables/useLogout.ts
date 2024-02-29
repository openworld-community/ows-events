import { useUserStore } from '~/stores/user.store';
import { CookieNameEnum } from '~/constants/enums/common';
import { RoutePathEnum } from '~/constants/enums/route';

export const useLogout = () => {
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
	return { logout };
};
