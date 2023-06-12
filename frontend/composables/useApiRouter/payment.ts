import type { PaymentInfo } from '~/../common/types/payment-info';
import { defineQuery, useBackendFetch } from './utils';
import type { EventOnPoster, StandardResponse } from '~/../common/types';

export const payment = {
	get: defineQuery<
		(input: {
			eventId: string;
		}) => StandardResponse<{ event: EventOnPoster; paymentsInfo: PaymentInfo }>
	>((input) => {
		return useBackendFetch(`payment-info/${input.eventId}`);
	})
};
