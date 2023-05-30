type Timezone = {
	timezoneName: string;
	timezoneOffset: string;
};

export const timezoneConverter = (timezone: Timezone) => {
	return `${timezone.timezoneName} ${timezone.timezoneOffset}`;
};

export const timezoneDeconverter = (timezone: string) => {
	const timezoneName = timezone.split(' ')[0];
	const timezoneOffset = timezone.split(' ')[1];
	return {
		timezoneName,
		timezoneOffset
	};
};
