export const getTimezonesSchema = {
	description: 'get time zone',
	tags: ['Time zone'],
	summary: 'get time zone',
	response: {
		200: {
			properties: {
				timezoneName: { type: 'string' },
				timezoneOffset: { type: 'string' }
			}
		}
	}
};
