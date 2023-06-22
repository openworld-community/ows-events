const Registration = {
	eventId: { type: 'string' },
	telegramNickname: { type: 'string' },
	name: { type: 'string' },
	profession: { type: 'string' },
	workplace: { type: 'string' },
	experienceInStartups: { type: 'string' },
	fromYouKnow: { type: 'string' },
	beenEarly: { type: 'string' },
	fromWhichCity: { type: 'string' },
	email: { type: 'string' },
	personaldataAgree: { type: 'boolean' },
	feeAgree: { type: 'boolean' },
}


export const addRegistrationSchema = {
	description: 'Registration',
	tags: ['Registration'],
	summary: 'Registration',
	body: {
		type: 'object',
		properties: Registration
	},
	response: {
		200: {
			type: 'object',
			properties: Registration
		}
	}
};