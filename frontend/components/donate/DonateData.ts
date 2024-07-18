//import { DONATE_PATREON_URL } from '../../constants/url';
export type DonateValuesData = {
	method: string;
	text: string;
	//link: string;
};

export const ValuesSupport: { [key: string]: DonateValuesData } = {
	patreon: {
		method: 'donate.method.patreon',
		text: 'donate.text.patreon'
		//link: DONATE_PATREON_URL
	},
	boosty: {
		method: 'donate.method.boosty',
		text: 'donate.text.boosty'
		//link: DONATE_PATREON_UR
	},
	paypal: {
		method: 'donate.method.paypal',
		text: 'donate.text.paypal'
		//link: DONATE_PATREON_UR
	}
};
