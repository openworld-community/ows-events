export enum TimestampTypesEnum {
	MILLISECONDS = 'ms',
	SECONDS = 's',
	MINUTES = 'm',
	HOURS = 'h',
	DAYS = 'd',
	WEEKS = 'w'
}

const ONE_MILLISECOND = 1;
const ONE_SECOND = ONE_MILLISECOND * 1000;
const ONE_MINUTE = ONE_SECOND * 60;
const ONE_HOUR = ONE_MINUTE * 60;
const ONE_DAY = ONE_HOUR * 24;
const ONE_WEEK = ONE_DAY * 7;

const TimestampTypeValues = {
	[TimestampTypesEnum.MILLISECONDS]: ONE_MILLISECOND,
	[TimestampTypesEnum.SECONDS]: ONE_SECOND,
	[TimestampTypesEnum.MINUTES]: ONE_MINUTE,
	[TimestampTypesEnum.HOURS]: ONE_HOUR,
	[TimestampTypesEnum.DAYS]: ONE_DAY,
	[TimestampTypesEnum.WEEKS]: ONE_WEEK
};

export type GetTimestampParams = {
	value: number;
	type: TimestampTypesEnum;
};

export const getTimestamp = ({ value, type }: GetTimestampParams) =>
	TimestampTypeValues[type] * value;
