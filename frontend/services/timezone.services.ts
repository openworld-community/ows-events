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
	const local = sessionStorage.getItem(LocalStorageEnum.TIMEZONES);
	if (local) return parseJSON(local);

	const { data } = await apiRouter.timezone.getAll.useQuery({});
	if (!data.value) return [];

	sessionStorage.setItem(LocalStorageEnum.TIMEZONES, JSON.stringify(data.value));
	return data.value;
};

export const getTimezone = async (country: Country, city?: City) => {
	if (!country && !city) return

	const { data } = await apiRouter.timezone.get.useQuery({ data: { city, country } });
	if (!data.value) return '';
	return timezoneToString(data.value);
};
