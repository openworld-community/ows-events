import { api } from '~/helpers/axios';
import { StandardResponse } from '../../common/types';
import { timezoneConverter } from '~/helpers/timezones';

type AllTimezonesResponse = {
	timezoneName: string;
	timezoneOffset: string;
};

export const getAllTimezones = async (): Promise<AllTimezonesResponse[]> => {
	const local = localStorage.getItem('ALL_TIMEZONES');
	//TODO зачем очищать пустой ключ?
	if (!local) {
		localStorage.removeItem('ALL_TIMEZONES');
	} else {
		return JSON.parse(local) as AllTimezonesResponse[];
	}

	const { data } = await api.get<StandardResponse<AllTimezonesResponse[]>>('/timezones');
	if (!data || data.type === 'error') {
		return [];
	}
	localStorage.setItem('ALL_TIMEZONES', JSON.stringify(data.data));
	return data.data;
};

type TimezonePayload = {
	country: string;
	city: string;
};

type TimezoneResponse = {
	country: string;
	city: string;
	timezoneName: string;
	timezoneOffset: string;
};

//TODO летят ошибки, пока не выберешь город с привязанной таймзоной
export const getTimezoneByCountryAndCity = async (payload: TimezonePayload) => {
	let timezone = '';
	await api
		.get<StandardResponse<TimezoneResponse>>(
			`/location/meta/${payload.country}/${payload.city}`
		)
		.then(({ data }) => {
			if (data.type === 'error') {
				return;
			}
			timezone = timezoneConverter(data.data);
		});
	return timezone;
};
