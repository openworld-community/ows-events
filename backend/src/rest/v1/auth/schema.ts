export const telegramSchema = {
	description: 'Login/register through telegram',
	tags: ['Auth'],
	summary: 'Login through telegram',
	response: {
		302: {
			type: 'null',
			description: 'Redirect to special page, where token get stored on client side'
		}
	},
	querystring: {
		type: 'object',
		properties: {
			id: {
				type: 'string'
			},
			first_name: {
				type: 'string'
			},
			last_name: {
				type: 'string'
			},
			username: {
				type: 'string'
			},
			photo_url: {
				type: 'string'
			},
			auth_date: {
				type: 'number'
			}
		}
	}
};
