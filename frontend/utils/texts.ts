export const getFilterPlaceholder = (multiply: boolean, name: string, list: string[] | { [key: string]: string }[], model: string | string[], showKey: string, returnKey: string): string => {
	const {$i18n} = useNuxtApp()
	if (
		(!multiply && model) ||
		(multiply && model.length)
	) {
		if (multiply) {
			if (showKey) {
				return list
					.reduce((acc: string[], el: { [key: string]: string }) => {
						if (model.includes(el[returnKey])) {
							acc.push(el[showKey]);
						}
						return acc;
					}, [])
					.join(', ');
			}
			return model.join(', ');
		}
		else {
			if (showKey) {
				return list.find(
					(el: { [key: string]: string }) =>
						el[returnKey] === model
				)[showKey];
			}
			return model as string
		}
	} else {
		return $i18n.t(`home.filter.${name}.placeholder`);
	}
};

export default {getFilterPlaceholder}