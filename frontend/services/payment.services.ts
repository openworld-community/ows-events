import { api } from '@/helpers/axios';
import { EventOnPoster, StandardResponse } from '../../common/types';
import { PaymentInfo } from '../../common/types/payment-info';

type EventPaymentPayload = {
	event: EventOnPoster;
	paymantsInfo: PaymentInfo;
};

export const getEventPayment = async (id: string) => {
	const { data } = await api.get<StandardResponse<EventPaymentPayload>>(`/event/payment-info/${id}`);
	return data;
};
