import dayjs from 'dayjs';
export type Time = { hours: number | string; minutes: number | string; seconds?: number | string };
export function getDateFromEpochInMs(epoch: number | undefined) {
	if (!epoch) return null;
	const djs = dayjs(epoch);
	if (!djs.isValid()) return null;
	return djs.toDate();
}
export function getTimeFromEpochInMs(epoch: number | undefined): Time | null {
	if (!epoch) return null;
	const djs = dayjs(epoch);
	if (!djs.isValid()) return null;
	return { hours: djs.hour(), minutes: djs.minute(), seconds: djs.second() };
}

/**
 * @returns UTC epoch time
 */
export function combineDateTime(date: Date | null, time: Time | null): Date {
	if (!date || !time) return new Date();
	return dayjs(date)
		.set('hour', +time.hours)
		.set('minute', +time.minutes - date.getTimezoneOffset())
		.set('second', +(time.seconds ?? 0))
		.toDate();
}
export function convertToLocaleString(epoch: number) {
	return new Date(epoch).toLocaleString('ru', {
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
