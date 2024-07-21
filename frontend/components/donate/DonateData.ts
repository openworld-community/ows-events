import { DONATE_PATREON_URL } from '../../constants/url';
export type DonateValuesData = {
	method: string;
	text: string;
	//link: string;
};

export const ValuesSupport: { [key: string]: DonateValuesData } = {
	patreon: {
		method: 'donate.method.patreon',
		link: DONATE_PATREON_URL
	},
	boosty: {
		method: 'donate.method.boosty',
		link: DONATE_PATREON_URL
	},
	paypal: {
		method: 'donate.method.paypal',
		link: DONATE_PATREON_URL
	}
};
