import { EventOnPoster, StandardResponse } from '../../common/types';
import { PaymentInfo } from '../../common/types/payment-info';

type EventPaymentPayload = {
	event: EventOnPoster;
	paymentsInfo: PaymentInfo;
};

export const getEventPayment = async (id: string) => {
	const { data } = await api.get<StandardResponse<EventPaymentPayload>>(`/payment-info/${id}`);
	return data;
};
