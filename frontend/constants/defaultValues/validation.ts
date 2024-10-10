import type { CurrencyType } from '../../../common/const/price';

export const LINK_MAX_LENGTH = 2048;
export const PRICE_MAX_VALUE = 999999;

export const ORGANIZER_MAX_LENGTH = 70;
export const EVENT_TITLE_MAX_LENGTH = 90;

export const EVENT_DESCRIPTION_MAX_LENGTH = 1500;
export const EVENT_ADDRESS_MAX_LENGTH = 255;
export const ALLOWED_IMAGE_SIZE = 2; //Mb
export const ALLOWED_IMAGE_EXTENSIONS = ['webp', 'png', 'svg', 'jpeg', 'jpg'];

export const PASSWORD_MIN_LENGTH = 4;
export const PASSWORD_MAX_LENGTH = 24;

export const NUMBER_DECIMALS_BY_CURRENCY: Record<CurrencyType, number> = {
	USD: 2,
	EUR: 2,
	RSD: 2,
	ETH: 8,
	BTC: 8,
	USDC: 6,
	USDT: 4
};
