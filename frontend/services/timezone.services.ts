import type { Timezone } from '~/../common/types/location';
import type { City, Country } from '~/stores/location.store';
import { timezoneToString } from '~/utils/timezones';

export const getAllTimezones = async (): Promise<Timezone[]> => {
	if (process.server) return [];
	const local = localStorage.getItem('ALL_TIMEZONES');
	if (local) return parseJSON(local);

	const { data } = await apiRouter.timezone.getAll.useQuery({});
	if (!data.value) return [];

	localStorage.setItem('ALL_TIMEZONES', JSON.stringify(data.value));
	return data.value;
};

//TODO летят ошибки, пока не выберешь город с привязанной таймзоной
export const getTimezone = async (country: Country, city?: City) => {
	const { data } = await apiRouter.timezone.get.useQuery({ data: { city, country } });
	if (!data.value) return '';

	return timezoneToString(data.value);
};
