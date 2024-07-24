import { DONATE_PATREON_URL, DONATE_BOOSTY_URL, DONATE_PAYPAL_URL } from '../../constants/url';
import { CryptoWalletEnum } from '../../constants/enums/crypto-wallets';
export type DonateValuesData = {
	method: String;
	account: String;
	link: String;
	color: String;
	icon: String;
};


export const ValuesSupport: { [key: string]: DonateValuesData } = {
	patreon: {
		method: 'donate.method.patreon',
		link: DONATE_PATREON_URL
	},
	boosty: {
		method: 'donate.method.boosty',
		link: DONATE_BOOSTY_URL
	},
	paypal: {
		method: 'donate.method.paypal',
		link: DONATE_PAYPAL_URL
	}
};

export const ValuesSupportKripta: Record<string, DonateValuesData> = {
	usdt: {
		method: 'donate.method.usdt',
		account: CryptoWalletEnum.USDT,
		color: '#37D7AF',
		icon: 'usdt'
	},
	usdc: {
		method: 'donate.method.usdc',
		account: CryptoWalletEnum.USDC,
		color: '#2671C4',
		icon: 'usdc'
	},
	ethereum: {
		method: 'donate.method.ethereum',
		account: CryptoWalletEnum.ETHEREUM,
		color: '#000000',
		icon: 'ethereum'
	},

	bitcoin: {
		method: 'donate.method.bitcoin',
		account: CryptoWalletEnum.BITCOIN,
		color: '#FF9500',
		icon: 'bitcoin'
	}
};
