import { Timezone } from '@common/types/location';

export const getTimezonesSchema = {
	description: 'get time zone',
	tags: ['Time zone'],
	summary: 'get time zone',
	response: {
		200: {
			type: 'object',
			properties: {
				timezoneName: { type: 'string' },
				timezoneOffset: { type: 'string' }
			} satisfies Record<keyof Timezone, {}>
		}
	}
};
