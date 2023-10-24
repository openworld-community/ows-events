import type { Timezone } from '~/../common/types/location';
import type { City, Country } from '~/stores/location.store';
import { LocalStorageEnum } from '../constants/enums/common';

export const timezoneToString = (timezone: Timezone) => {
	return `${timezone.timezoneName} ${timezone.timezoneOffset}`;
};

export const stringToTimezone = (timezone: string) => {
	const [timezoneName, timezoneOffset] = timezone.split(' ');
	return { timezoneName, timezoneOffset };
};

export const getAllTimezones = async (): Promise<Timezone[]> => {
	if (process.server) return [];
	const local = localStorage.getItem(LocalStorageEnum.TIMEZONES);
	if (local) return parseJSON(local);

	const { data } = await apiRouter.timezone.getAll.useQuery({});
	if (!data.value) return [];

	localStorage.setItem(LocalStorageEnum.TIMEZONES, JSON.stringify(data.value));
	return data.value;
};

//TODO летят ошибки, пока не выберешь город с привязанной таймзоной
export const getTimezone = async (country: Country, city?: City) => {
	const { data } = await apiRouter.timezone.get.useQuery({ data: { city, country } });
	if (!data.value) return '';
	return timezoneToString(data.value);
};
