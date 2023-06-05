import { events } from './useApiRouter/events';
const router = { events };

export const useAPI = (function <T extends Record<string, Record<string, (data: any) => any>>>(
	router: T
) {
	function callback<C extends keyof T, A extends keyof T[C]>(
		context: C,
		action: A,
		data: Parameters<T[C][A]>[0]
	): ReturnType<T[C][A]> {
		return router[context][action](data);
	}
	return callback;
})(router);

export const lma = 5;
