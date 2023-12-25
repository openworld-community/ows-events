import { parsePeredelano } from '../externalServices/googledocs';
import { getTimestamp, TimestampTypesEnum } from '../utils/get-timestamp';

export const startSchedule = () => {
	// Parse peredelano events once per day
	const peredelanoInterval = getTimestamp({ type: TimestampTypesEnum.DAYS, value: 1 });
	setInterval(parsePeredelano, peredelanoInterval);
};
