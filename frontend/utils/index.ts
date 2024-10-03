/**
 * Необходимо указать дженерик для возвращаемого типа.
 * @param string значение, которое нужно пропарсить
 * @param fallback значение на случай, если парсинг выдаст ошибку
 * @returns пропаршенный json того типа, который указан в дженерике
 */
export function parseJSON<T>(string: string, fallback?: T) {
	try {
		return JSON.parse(string) as T;
	} catch (e) {
		if (fallback !== undefined) {
			console.error(`Error while parsing JSON\n${e}`);
			return fallback;
		}
		console.log('Error while parsing JSON');
		throw e;
	}
}

export function getFirstParam(param: ReturnType<typeof useRoute>['params'][string]): string {
	return typeof param === 'string' ? param : param[0];
}
export function getFirstQuery(query: ReturnType<typeof useRoute>['query'][string]) {
	if (!query) return '';
	return typeof query === 'string' ? query : query[0] ?? '';
}

export const getRouteName = (fullRouteName: string | undefined) => {
	if (!fullRouteName) return `UnknownPage: path ${fullRouteName}`;
	return fullRouteName.split('___')[0];
};

export const capitalize = (str: string) => {
	return str.slice(0, 1).toUpperCase() + str.slice(1);
};

export const transformFromQuery = (param: string) => {
	return capitalize(param.split('-').map(capitalize).join(' '));
};

export const transformToQuery = (param: string) => {
	return param.toLowerCase().split(' ').join('-');
};
