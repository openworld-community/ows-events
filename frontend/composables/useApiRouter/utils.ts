import type { UseFetchOptions } from 'nuxt/app';
import { API_URL } from '~/constants/url';
import type { ServerErrors } from '~/i18n/locales/ru/errors';
import { useUserStore } from '../../stores/user.store';

type ApiRouter = {
	[K in string]: ApiRouter | ReturnType<typeof defineQuery> | ReturnType<typeof defineMutation>;
};

export function defineRouter<T extends ApiRouter>(router: T) {
	return router;
}

/**
 * Helper to determine the shape of a single argument function
 * - If it has 1 required, 1 optional or 0 arguments.
 * @returns `[Parameter, ReturnValue]`
 */
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
/**
 * Helper for `defineQuery` & `defineMutation`
 *
 * Determines if data(essentially input) is required, optional or even exists in provided query/mutation
 * @see {@link defineQuery}
 * @see {@link defineMutation}
 */
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
/**
 * Helper for `defineQuery`
 * @see {@link defineQuery}
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
/**
 * Helper for `defineMutation`
 * @see {@link defineMutation}
 */
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
		/**
		 * If query requires no arguments you need to provide an empty obejct
		 */
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
	modifiers: { auth?: boolean; noDefaults?: boolean } = {}
) {
	if (modifiers.noDefaults)
		return (opts_: UseFetchOptions<T> = {}) => useFetch(request, Object.assign(opts, opts_));

	opts.baseURL ??= API_URL;

	if (modifiers.auth) {
		const userStore = useUserStore()
		if (!userStore.isAuthorized) {
			throw new Error('You are not authorized');
		}
		const token = useCookie('token').value;
		if (!token) {
			throw new Error('Token not found');
		}
		opts.headers
			? Object.assign(opts.headers, { Authorization: token })
			: (opts.headers = { Authorization: token });
	}

	if (opts.body) {
		opts.method ??= 'POST';
	}
	return async (opts_: UseFetchOptions<T> = {}) => {
		const getData = () => useFetch(request, Object.assign(opts, opts_));
		if (process.server) return await getData();

		const data = await getData();
		if (data.error.value) {
			// todo - переделать эту проверку когда бэк уже стандартизирует вывод своих ошибок везде
			if (data.error.value?.data?.message) {
				const errorMessage: keyof typeof ServerErrors = data.error.value.data.message;

				const { $errorToast, $i18n } = useNuxtApp();
				$errorToast($i18n.t(`error.${errorMessage}`));
			} else {
				console.error(data.error.value);
			}
		}
		return data;
	};
}
