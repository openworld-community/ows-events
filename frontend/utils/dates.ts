import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

export type Time = { hours: number | string; minutes: number | string; seconds?: number | string };
export function getDateFromEpochInMs(epoch: number | undefined, keepTimezone = false) {
	if (!epoch) return null;
	const djs = !keepTimezone ? dayjs.utc(epoch) : dayjs(epoch);
	if (!djs.isValid()) return null;
	return djs.toDate();
}
export function getTimeFromEpochInMs(epoch: number | undefined, keepTimezone = false): Time | null {
	if (!epoch) return null;
	const djs = !keepTimezone ? dayjs.utc(epoch) : dayjs(epoch);
	if (!djs.isValid()) return null;
	return { hours: djs.hour(), minutes: djs.minute(), seconds: djs.second() };
}
/**
 *
 * @param date will be interpreted as UTC Date object. If not provided will use current date
 * @param time time to combine with the provided date. If not provided will be set to midnight
 * @returns a UTC Date object
 */
export function combineDateTime(date: Date | null, time: Time | null): Date {
	date ??= new Date();
	time ??= { hours: 0, minutes: 0, seconds: 0 };
	return dayjs
		.utc(date)
		.set('hour', +time.hours)
		.set('minute', +time.minutes)
		.set('second', +(time.seconds ?? 0))
		.toDate();
}

export function convertToLocaleString(epoch: number) {
	const {locale, locales} = useI18n()
	const locIndex = locales.value.findIndex((el: any) => el.code === locale.value)

	console.log(locales.value)

	return new Date(epoch).toLocaleString(locales.value[locIndex].iso as string, {
		timeZone: 'UTC',
		month: 'long',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit'
	});
}

export const day = 1000 * 60 * 60 * 24;
// Second date getTime() must be greater than firstDate
export const getDatesDayDifference = (firstDate: Date, secondDate: Date): number => {
	const diffTime = Math.abs(secondDate.getTime() - firstDate.getTime());
	return Math.ceil(diffTime / day);
};
