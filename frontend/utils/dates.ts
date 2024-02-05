import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import type { Timezone } from '../../common/types/location';
import { getUserTimezoneName } from '../services/timezone.services';

dayjs.extend(utc);
export type Time = { hours: number | string; minutes: number | string; seconds?: number | string };
export const dateNow = Date.now();

export const getDateFromEpochInMs = (epoch: number | undefined, keepTimezone = false) => {
	if (!epoch) return null;
	const djs = !keepTimezone ? dayjs.utc(epoch) : dayjs(epoch);
	if (!djs.isValid()) return null;
	return djs.toDate();
};

export const getTimeFromEpochInMs = (
	epoch: number | undefined,
	keepTimezone = false
): Time | null => {
	if (!epoch) return null;
	const djs = !keepTimezone ? dayjs.utc(epoch) : dayjs(epoch);
	if (!djs.isValid()) return null;
	return { hours: djs.hour(), minutes: djs.minute(), seconds: djs.second() };
};

/**
 *
 * @param date will be interpreted as UTC Date object. If not provided will use current date
 * @param time time to combine with the provided date. If not provided will be set to midnight
 * @returns a UTC Date object
 */
export const combineDateTime = (date: Date | null, time: Time | null): Date => {
	date ??= new Date();
	time ??= { hours: 0, minutes: 0, seconds: 0 };
	return dayjs
		.utc(date)
		.set('hour', +time.hours)
		.set('minute', +time.minutes)
		.set('second', +(time.seconds ?? 0))
		.toDate();
};

export const convertToLocaleString = (epoch: number, timezoneName?: string) => {
	const { locale } = useI18n();

	return new Date(epoch).toLocaleString(locale.value, {
		month: 'long',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
		timeZone: timezoneName ?? 'UTC'
	});
};

export const convertEventDateToLocaleString = (
	epoch: number,
	isOnline: boolean,
	eventTimezone: Timezone
) => {
	let time: number;
	if (isOnline) {
		// учитывает разницу между часовым поясом мероприятия и пользователя
		time = epoch - parseInt(eventTimezone.timezoneOffset) * 1000 * 60 * 60;
		return convertToLocaleString(time, getUserTimezoneName());
	} else {
		time = epoch;
		return convertToLocaleString(time);
	}
};

export const day = 1000 * 60 * 60 * 24;
// Second date getTime() must be greater than firstDate
export const getDatesDayDifference = (firstDate: Date, secondDate: Date): number => {
	const diffTime = Math.abs(secondDate.getTime() - firstDate.getTime());
	return Math.ceil(diffTime / day);
};

export const roundTime = (date, interval) => {
	return Math.ceil(new Date(date).getTime() / (interval * 60 * 1000)) * (interval * 60 * 1000);
};
