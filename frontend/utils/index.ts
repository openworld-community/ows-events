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

export function getFirstParam(param: ReturnType<typeof useRoute>['params'][string]) {
	return typeof param === 'string' ? param : param[0];
}
