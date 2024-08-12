// export type CurrencyType = 'USD' | 'EUR' | 'RSD' | 'BTC' | 'USDT' | 'USDC' | 'ETH';

export type CurrencyType = (typeof CurrencyObj)[keyof typeof CurrencyObj];
export const CurrencyObj = <const>{
	USD: 'USD',
	EUR: 'EUR',
	RSD: 'RSD',
	BTC: 'BTC',
	USDT: 'USDT',
	USDC: 'USDC',
	ETH: 'ETH'
};
