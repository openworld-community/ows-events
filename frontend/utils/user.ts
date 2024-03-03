export const getUserName = (name: string) => {
	const { t } = useI18n();
	if (name) {
		return `${name}`;
	} else return t('user.user');
};

export const getLastName = (lastName: string) => {
	if (lastName) {
		return `${lastName}`;
	}
};
