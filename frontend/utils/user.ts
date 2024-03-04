export const getUserName = (name: string, lastName: string) => {
	const { t } = useI18n();
	if (name && lastName) {
		return `${t('user.greeting')}, ${name} ${lastName}`;
	}
	if (name && !lastName) {
		return `${t('user.greeting')}, ${name}`;
	}
	if (!name && lastName) {
		return `${t('user.greeting')}, ${lastName}`;
	} else return `${t('user.greeting')}, ${t('user.user')}`;
};
