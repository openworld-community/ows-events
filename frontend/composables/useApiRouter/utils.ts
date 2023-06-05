import { API_URL } from '~/constants/url';

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

type Refify<T> = T extends object
	? {
			[K in keyof T]: T[K] | Ref<T[K]> | Refify<Extract<T[K], object>>;
	  }
	: T | Ref<T>;
type Fetchify<T> = ReturnType<typeof useFetch<T>>;
export function defineAPIRoute<T extends (input: any) => any>(
	callback: T extends () => any
		? T extends (input?: infer P) => infer R
			? unknown extends P
				? () => Fetchify<R>
				: (input?: Refify<P>) => Fetchify<R>
			: never
		: T extends (input: infer P) => infer R
		? (input: Refify<P>) => Fetchify<R>
		: never
) {
	return callback;
}

type A = ReturnType<typeof defineAPIRoute>;
type B = ReturnType<typeof defineAPIRoute<(a: '5') => '345'>>;
type C = ReturnType<typeof defineAPIRoute<(b?: 'dfsa') => 'dsa'>>;
type D = ReturnType<typeof defineAPIRoute<(a: 'sfda', b: 'ds') => 'fsd'>>;
type E = ReturnType<typeof defineAPIRoute<(a: 'sfda', b?: 'ds') => 'fsd'>>;
type F = ReturnType<typeof defineAPIRoute<() => 'fsd'>>;

type A2 = ((a: string, b?: string, c?: number) => 'd') extends (a: string) => 'd' ? true : false;
const a = { id: 'st' } instanceof Proxy;
