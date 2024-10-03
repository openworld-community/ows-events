import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import type { Timezone } from '../../common/types/location';
import { getUserTimezoneName } from '../services/timezone.services';
import { RouteNameEnum } from '~/constants/enums/route';

dayjs.extend(utc);
export type Time = { hours: number | string; minutes: number | string; seconds?: number | string };
export const dateNow = Date.now();

export const dateFromQueryToFilter = (order: 'first' | 'second', date?: string) => {
	if (!date) return null;
	let hh = 0;
	let mm = 0;
	let ss = 0;
	if (order === 'second') {
		hh = 23;
		mm = 59;
		ss = 59;
	}
	//using UTC allow get time without adding user timezone (it can be - or +, - led date to previous day)
	//we can parse string to get year, month and day date.split('-'), month should be used month-1
	const timeObj = {
		year: new Date(date).getUTCFullYear(),
		month: new Date(date).getUTCMonth(),
		day: new Date(date).getUTCDate()
	};
	const newDate = +new Date(timeObj.year, timeObj.month, timeObj.day, hh, mm, ss);

	const timezoneOffset = new Date().getTimezoneOffset() * 60 * 1000;
	const dateTS = newDate ? newDate - timezoneOffset : null;

	return dateTS;
};

export const getDateFromQuery = (
	queryDate: string | undefined,
	routeName: string,
	keepTimezone = false
): Date => {
	if (routeName !== RouteNameEnum.HOME) return;
	if (!queryDate) return null;
	const djs = !keepTimezone ? dayjs.utc(queryDate) : dayjs(queryDate);

	if (!djs.isValid()) return null;
	return djs.toDate();
};

export const getFirstDateFromFilters = (date: Date) => {
	const startDate = new Date(date).setHours(0, 0, 0);

	//Приводим таймзону времени устройства юзера к миллисекундам
	// dayjs(startDate).utc(true)
	// dayjs(endDate).utc(true) можно сделать так, но понятнее не сильно становится
	const timezoneOffset = new Date().getTimezoneOffset() * 60 * 1000;

	// Перевод в UTC 0
	const startDateTS = startDate ? startDate - timezoneOffset : null;

	return startDateTS;
};

export const getSecondDateFromFilters = (date: Date) => {
	const endDate = new Date(date).setHours(23, 59, 59);

	//Приводим таймзону времени устройства юзера к миллисекундам
	// dayjs(startDate).utc(true)
	// dayjs(endDate).utc(true) можно сделать так, но понятнее не сильно становится
	const timezoneOffset = new Date().getTimezoneOffset() * 60 * 1000;

	// Перевод в UTC 0

	const endDateTS = endDate ? endDate - timezoneOffset : null;

	return endDateTS;
};

export const getDateFromEpochInMs = (epoch: number | undefined, keepTimezone = false) => {
	if (!epoch) return null;
	const date = new Date(epoch);
	const djs = !keepTimezone ? dayjs.utc(epoch) : dayjs(epoch);
	if (!djs.isValid()) return null;
	const timeObj = {
		year: date.getUTCFullYear(),
		month: date.getUTCMonth(),
		day: date.getUTCDate()
	};
	return new Date(timeObj.year, timeObj.month, timeObj.day);
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
	const timeObj = {
		year: new Date(date).getFullYear(),
		month: new Date(date).getMonth(),
		day: new Date(date).getDate()
	};
	const newDate = new Date(
		timeObj.year,
		timeObj.month,
		timeObj.day,
		Number(time.hours),
		Number(time.minutes),
		Number(time.seconds)
	);
	return newDate;
};

export const duration = (
	dateStart: Date | null,
	timeStart: Time | null,
	dateEnd: Date | null,
	timeEnd: Time | null
) => {
	const start = combineDateTime(dateStart, timeStart).getTime();
	const end = combineDateTime(dateEnd, timeEnd).getTime();
	const diff = Math.floor((end - start) / 1000);

	return diff;
};

export const convertToLocaleString = (epoch: number, timezoneName?: string) => {
	const { locale } = useI18n();
	const date = new Intl.DateTimeFormat(locale.value, {
		month: 'long',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
		timeZone: timezoneName ?? 'UTC'
	}).format(epoch);
	return date;
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

export const convertToISOString = (epoch: number, timezoneOffset?: string) => {
	const result = dayjs(epoch).utc().format('YYYY-MM-DDTHH:mm:ss');
	return timezoneOffset ? `${result}${timezoneOffset}` : result;
};

export const convertEventDateToISOString = (
	epoch: number,
	isOnline: boolean,
	eventTimezone: Timezone
) => {
	let time: number;
	if (isOnline) {
		// учитывает разницу между часовым поясом мероприятия и пользователя
		time = epoch - parseInt(eventTimezone.timezoneOffset) * 1000 * 60 * 60;
		return convertToISOString(time, eventTimezone.timezoneOffset);
	} else {
		time = epoch;

		return convertToISOString(time);
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

export const formatDate = (date, isOnline, timezone, duration) => {
	if (duration) {
		return `${convertEventDateToLocaleString(date, isOnline, timezone)} - 

	${convertEventDateToLocaleString(date + duration * 1000, isOnline, timezone)}`;
	}
	return convertEventDateToLocaleString(date, isOnline, timezone);
};
