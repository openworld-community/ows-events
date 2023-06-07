import { UseFetchOptions } from 'nuxt/app';
import { API_URL } from '~/constants/url';

type ApiRouter = {
	[K in string]: ApiRouter | ReturnType<typeof defineQuery> | ReturnType<typeof defineMutation>;
};
export function defineRouter<T extends ApiRouter>(router: T) {
	return router;
}

type Refify<T> = T extends object
	? {
			[K in keyof T]: T[K] | Ref<T[K]> | Refify<Extract<T[K], object>>;
	  }
	: T | Ref<T>;
type Fetchify<T> = ReturnType<typeof useFetch<T>>;
type Querify<T extends (data: any) => any> = T extends () => any
	? T extends (data?: infer P) => infer R
		? unknown extends P
			? () => Fetchify<R>
			: (data?: Refify<P>) => Fetchify<R>
		: never
	: T extends (data: infer P) => infer R
	? (data: Refify<P>) => Fetchify<R>
	: never;
type Mutify<T extends (data: any) => any> = T extends () => any
	? T extends (data?: infer P) => infer R
		? unknown extends P
			? () => Fetchify<R>
			: (data?: P) => Fetchify<R>
		: never
	: T extends (data: infer P) => infer R
	? (data: P) => Fetchify<R>
	: never;

/**
 * Specify a function and the wrapper will transform its type
 * to conform with the excpected shape
 */
export function defineQuery<T extends ((data: any) => any) | void = void>(
	routeCallback: T extends (data: any) => any ? Querify<T> : 'DO NOT USE ME WITHOUT A GENERIC'
) {
	return { useQuery: routeCallback };
}
/**
 * Specify a function and the wrapper will transform its type
 * to conform with the excpected shape
 */
export function defineMutation<T extends ((data: any) => any) | void = void>(
	routeCallback: T extends (data: any) => any ? Mutify<T> : 'DO NOT USE ME WITHOUT A GENERIC'
) {
	return { useMutation: routeCallback };
}

/**
 * Provides some common defaults for calls to our backend API
 */
export function useBackendFetch<T>(
	request: Parameters<typeof useFetch>[0],
	opts: UseFetchOptions<T> = {},
	auth?: boolean
) {
	opts.baseURL ??= API_URL;
	if (auth) {
		const token = useCookie('token').value;
		if (!token) {
			throw new Error('You are not authorized');
		}
		opts.headers
			? Object.assign(opts.headers, { Authorization: token })
			: (opts.headers = { Authorization: token });
	}
	if (opts.body) {
		opts.method ??= 'POST';
	}
	return useFetch(request, opts);
}

export type DeepPartial<T> = { [K in keyof T]?: DeepPartial<T[K]> };
