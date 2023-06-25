import moment from 'moment-timezone';
import { ITimezonesHandlerProps } from './type';
import { type Timezone } from '../../../../../common/types/location';

const allTimezones: Timezone[] = moment.tz.names().map((name) => ({
	timezoneName: name,
	timezoneOffset: moment.tz(name).format('Z')
}));

export const getTimezones: ITimezonesHandlerProps = async () => allTimezones;
