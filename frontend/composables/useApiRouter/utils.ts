import { API_URL } from '~/constants/url';

type ApiRouter = { [K in string]: ApiRouter | ReturnType<typeof defineRoute> };
export function defineRouter<T extends ApiRouter>(router: T) {
	return router;
}

type Refify<T> = T extends object
	? {
			[K in keyof T]: T[K] | Ref<T[K]> | Refify<Extract<T[K], object>>;
	  }
	: T | Ref<T>;
type Fetchify<T> = ReturnType<typeof useFetch<T>>;
type Routify<T extends (data: any) => any> = T extends () => any
	? T extends (data?: infer P) => infer R
		? unknown extends P
			? () => Fetchify<R>
			: (data?: Refify<P>) => Fetchify<R>
		: never
	: T extends (data: infer P) => infer R
	? (data: Refify<P>) => Fetchify<R>
	: never;

/**
 * Specify a function and the wrapper will transform its type
 * to conform with the excpected shape
 */
export function defineRoute<T extends ((data: any) => any) | void = void>(
	routeCallback: T extends (data: any) => any ? Routify<T> : 'DO NOT USE ME WITHOUT A GENERIC'
) {
	return { useFetch: routeCallback };
}

/**
 * Overrides baseURL to be of our backend server
 */
export function useBackendFetch<T>(
	request: Parameters<typeof useFetch<T>>[0],
	opts: Parameters<typeof useFetch<T>>[1] = {}
) {
	opts.baseURL ??= API_URL;
	return useFetch<T>(request, opts);
}

export type DeepPartial<T> = { [K in keyof T]?: DeepPartial<T[K]> };
