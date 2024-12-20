import { DONATE_PATREON_URL, DONATE_BOOSTY_URL} from '../../constants/url';
import { CryptoWalletEnum } from '../../constants/enums/crypto-wallets';

export type DataDonate = {
	method: string;
	link: string;
	color: string;
};

export type DataDonateCrypto = {
	method: string;
	account: string;
	color: string;
	icon: string;
};

export const ValuesDonate: { [key: string]: DataDonate } = {
	patreon: {
		method: 'donate.method.patreon',
		link: DONATE_PATREON_URL,
		color: '#4E4E4E'
	},
	boosty: {
		method: 'donate.method.boosty',
		link: DONATE_BOOSTY_URL,
		color: '#F16A2B'
	},
	// paypal: {
	// 	method: 'donate.method.paypal',
	// 	link: DONATE_PAYPAL_URL,
	// 	color: '#5C9AD2'
	// }
};

export const ValuesDonateCrypto: Record<string, DataDonateCrypto> = {
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
