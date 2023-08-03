import moment from 'moment-timezone';
import { type Timezone } from '@common/types/location';
import { ITimezonesHandlerProps } from './type';

const allTimezones: Timezone[] = moment.tz.names().map((name) => ({
	timezoneName: name,
	timezoneOffset: moment.tz(name).format('Z')
}));

export const getTimezones: ITimezonesHandlerProps = async () => allTimezones;
