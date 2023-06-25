import type { Timezone } from '~/../common/types/location';

export const timezoneToString = (timezone: Timezone) => {
	return `${timezone.timezoneName} ${timezone.timezoneOffset}`;
};

export const stringToTimezone = (timezone: string) => {
	const [timezoneName, timezoneOffset] = timezone.split(' ');
	return { timezoneName, timezoneOffset };
};
