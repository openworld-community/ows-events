import moment from 'moment-timezone';
import { ITimezonesHandlerProps } from './type';

const allTimezones = moment.tz.names().map((name) => ({
	timezoneName: name,
	timezoneOffset: moment.tz(name).format('Z')
}));

export const getTimezones: ITimezonesHandlerProps = async () => ({
	type: 'success',
	data: allTimezones
});
