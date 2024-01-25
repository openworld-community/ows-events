export const getFilterPlaceholder = (
	multiple: boolean,
	name: string,
	list: string | string[] | { [key: string]: string }[] | Set<string>,
	model: string | string[],
	showKey: string,
	returnKey: string
): string => {
	const { $i18n } = useNuxtApp();
	if ((!multiple && model) || (multiple && model.length)) {
		if (multiple) {
			if (showKey) {
				return [...list]
					.reduce((acc: string[], el: { [key: string]: string }) => {
						if (model.includes(el[returnKey])) {
							acc.push(el[showKey]);
						}
						return acc;
					}, [])
					.join(', ');
			}
			return (model as string[]).join(', ');
		} else {
			if (showKey) {
				return [...list].find((el: { [key: string]: string }) => el[returnKey] === model)[
					showKey
				];
			}
			return model as string;
		}
	} else {
		return $i18n.t(`home.filter.${name}.placeholder`);
	}
};

export default { getFilterPlaceholder };
