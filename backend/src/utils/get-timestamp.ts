export enum TIMESTAMP_TYPES {
  MILLISECONDS = 'ms',
  SECONDS = 's',
  MINUTES = 'm',
  HOURS = 'h',
  DAYS = 'd',
  WEEKS = 'w'
}

const ONE_MILLISECOND = 1;
const ONE_SECOND = ONE_MILLISECOND * 60;
const ONE_MINUTE = ONE_SECOND * 60;
const ONE_HOUR = ONE_MINUTE*60;
const ONE_DAY = ONE_HOUR*24;
const ONE_WEEK = ONE_DAY*7;

const TimestampTypeValues = {
  [TIMESTAMP_TYPES.MILLISECONDS]: ONE_MILLISECOND,
  [TIMESTAMP_TYPES.SECONDS]: ONE_SECOND,
  [TIMESTAMP_TYPES.MINUTES]: ONE_MINUTE,
  [TIMESTAMP_TYPES.HOURS]: ONE_HOUR,
  [TIMESTAMP_TYPES.DAYS]: ONE_DAY,
  [TIMESTAMP_TYPES.WEEKS]: ONE_WEEK,
};

export type getTimestampParams = {
  value: number,
  type: TIMESTAMP_TYPES,
}

export const getTimestamp = ({value, type}: getTimestampParams) => {
  return TimestampTypeValues[type]*value
}
