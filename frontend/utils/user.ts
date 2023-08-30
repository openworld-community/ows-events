import { useUserStore } from '../stores/user.store';

export const getUserName = () => {
	const userStore = useUserStore();
	const { t } = useI18n();
	if (userStore.userInfo?.first_name && userStore.userInfo?.last_name) {
		return `${userStore.userInfo.first_name} ${userStore.userInfo.last_name}`;
	} else if (userStore.userInfo?.first_name) {
		return userStore.userInfo.first_name;
	} else if (userStore.userInfo?.last_name) {
		return userStore.userInfo.last_name;
	} else return t('user.user');
};
