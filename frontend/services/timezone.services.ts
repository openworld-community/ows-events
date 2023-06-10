import type { Timezone } from '~/../common/types/location';
import { timezoneToString } from '~/utils/timezones';

export const getAllTimezones = async (): Promise<Timezone[]> => {
	const local = localStorage.getItem('ALL_TIMEZONES');
	if (local) return parseJSON(local);

	const { data } = await apiRouter.timezone.getAll.useQuery();
	if (!data.value || data.value.type !== 'success') return [];

	localStorage.setItem('ALL_TIMEZONES', JSON.stringify(data.value.data));
	return data.value.data;
};

type _Args = { country: string; city: string };
//TODO летят ошибки, пока не выберешь город с привязанной таймзоной
export const getTimezone = async ({ city, country }: _Args) => {
	const { data } = await apiRouter.timezone.get.useQuery({ city, country });
	if (!data.value || data.value.type !== 'success') return '';

	return timezoneToString(data.value.data);
};
