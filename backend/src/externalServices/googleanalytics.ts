import axios from 'axios';
import { vars } from '../config/vars';

export type ISendGAEventParams = {
	client_id: string;
	events: [
		{
			name: string;
			params: Record<string, any>;
		}
	];
};

export const sendGAEvent = (data: ISendGAEventParams) => {
	const stringifiedData = JSON.stringify({
		client_id: data.client_id,
		events: data.events
	});
	axios
		.post(
			`https://www.google-analytics.com/mp/collect?measurement_id=${vars.apiKeys.googleAnalytics.measurementId}&api_secret=${vars.apiKeys.googleAnalytics.apiSecret}`,
			stringifiedData
		)
		.catch(() => {
			// eslint-disable-next-line no-console
			console.log(
				`Events ${data.events.map((event) => event.name).join(',')} from client ${
					data.client_id
				} was not sent to Google Analytics`
			);
		});
};
