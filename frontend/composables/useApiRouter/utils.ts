import type { UseFetchOptions } from 'nuxt/app';
import { API_URL } from '~/constants/url';

type ApiRouter = {
	[K in string]: ApiRouter | ReturnType<typeof defineQuery> | ReturnType<typeof defineMutation>;
};
export function defineRouter<T extends ApiRouter>(router: T) {
	return router;
}

type inferFunctionSignature<T extends (data: any) => any> = T extends () => any
	? T extends (data?: infer P) => infer R
		? unknown extends P
			? [void, R]
			: [P | undefined, R]
		: never
	: T extends (data: infer P) => infer R
	? [P, R]
	: never;
type Refify<T> = T extends object
	? {
			[K in keyof T]: T[K] | Ref<T[K]> | Refify<Extract<T[K], object>>;
	  }
	: T | (T extends undefined ? never : Ref<T>);
type Fetchify<T> = ReturnType<typeof useBackendFetch<T>>;
type Datatify<
	T extends (data: any) => any,
	P extends inferFunctionSignature<T>[0] = inferFunctionSignature<T>[0]
> = [P] extends [void]
	? { data?: undefined }
	: P & undefined extends never
	? { data: P }
	: { data?: P };
/*
	Couldn't find an easier way to handle a function which can have 0, 1 optional or 1 required argument
	and then would output a function with the same arguments signature so I had to resort to this.
 */
type Querify<
	T extends (data: any) => any,
	P extends inferFunctionSignature<T>[0] = inferFunctionSignature<T>[0],
	R extends inferFunctionSignature<T>[1] = inferFunctionSignature<T>[1]
> = [P] extends [void]
	? () => Fetchify<R>
	: P & undefined extends never
	? (data: Refify<P>) => Fetchify<R>
	: (data?: Refify<P>) => Fetchify<R>;
type Mutify<
	T extends (data: any) => any,
	P extends inferFunctionSignature<T>[0] = inferFunctionSignature<T>[0],
	R extends inferFunctionSignature<T>[1] = inferFunctionSignature<T>[1]
> = [P] extends [void]
	? () => Fetchify<R>
	: P & undefined extends never
	? (data: P) => Fetchify<R>
	: (data?: P) => Fetchify<R>;
/**
 * Specify a function and the wrapper will transform its type
 * to conform with the expected shape of a query.
 *
 * `(input: string) => number` gets converted to `(input: string | Ref<string>) => typeof useFetch<number>`
 *
 * If `input` is an object only its keys will get converted to `Ref`, not the object itself -
 * otherwise accessing input properties would have been difficult.
 */
export function defineQuery<T extends ((data: any) => any) | void = void>(
	routeCallback: T extends (data: any) => any
		? Querify<T>
		: (_: any) => () => 'DO NOT USE ME WITHOUT A GENERIC'
) {
	return {
		useQuery: (
			args: Datatify<typeof routeCallback> & {
				opts?: Parameters<ReturnType<typeof routeCallback>>[0];
			}
		) => routeCallback(args.data)(args.opts) as ReturnType<ReturnType<typeof routeCallback>>
	};
}

/**
 * Specify a function and the wrapper will transform its type
 * to conform with the excpected shape of a mutation
 *
 * `(input: string) => number` gets converted to `(input: string) => typeof useFetch<number>`
 */
export function defineMutation<T extends ((data: any) => any) | void = void>(
	routeCallback: T extends (data: any) => any
		? Mutify<T>
		: (_: any) => () => 'DO NOT USE ME WITHOUT A GENERIC'
) {
	return {
		useMutation: (
			args: Datatify<typeof routeCallback> & {
				opts?: Parameters<ReturnType<typeof routeCallback>>[0];
			}
		) => routeCallback(args.data)(args.opts) as ReturnType<ReturnType<typeof routeCallback>>
	};
}

/**
 * Provides some common defaults for calls to our backend API
 */
export function useBackendFetch<T>(
	request: Parameters<typeof useFetch>[0],
	opts: UseFetchOptions<T> = {},
	{ auth, noDefaults }: { auth?: boolean; noDefaults?: boolean } = {}
) {
	if (noDefaults) return (opts: UseFetchOptions<T> = {}) => useFetch(request, opts);

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
	return (opts_: UseFetchOptions<T> = {}) => useFetch(request, Object.assign(opts, opts_));
}
