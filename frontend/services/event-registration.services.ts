import { api } from '@/helpers/axios';
import { StandardResponse } from '../../common/types';
import { PaymentInfo } from '../../common/types/payment-info';
import { Registration } from '../../common/types/registration';

//TODO добавить запись в localStorage для формы ивента
export const sendFormAboutRegistration = async (data: Registration) => {
	await api.post('/event/registration', data).then(() => {
		localStorage.setItem('REGISTRATION', 'true');
		localStorage.setItem('REGISTRATION_DATA', JSON.stringify(data));
	});
};

export const getEventRegistration = async (id: string) => {
	const { data } = await api.get<StandardResponse<PaymentInfo>>(`/events/registration/${id}`);
	return data;
};
