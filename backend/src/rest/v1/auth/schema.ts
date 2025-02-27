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

export const googleSchema = {
	description: 'Register through google',
	tags: ['Auth'],
	summary: 'Register through google',
	response: {
		302: {
			type: 'null',
			description: 'Redirect to special page, where token get stored on client side'
		}
	},
	body: {
		type: 'object',
		properties: {
			credential: {
				type: 'string'
			}
		}
	}
};

export const localSignupSchema = {
	description: 'Register through login/password',
	tags: ['Auth'],
	summary: 'Register through login/password',
	response: {
		302: {
			type: 'null',
			description: 'Redirect to special page, where token get stored on client side'
		}
	},
	body: {
		type: 'object',
		properties: {
			email: {
				type: 'string',
				pattern:
					'^(([^<>()[\\]\\\\.,;:\\s@"]+(\\.[^<>()[\\]\\\\.,;:\\s@"]+)*)|.(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$'
			},
			password: {
				type: 'string',
				minLength: 4,
				maxLength: 24
			}
		},
		required: ['email', 'password']
	}
};

export const localAuthSchema = {
	description: 'Login through login/password',
	tags: ['Auth'],
	summary: 'Login through login/password',
	response: {
		302: {
			type: 'null',
			description: 'Redirect to special page, where token get stored on client side'
		}
	},
	body: {
		type: 'object',
		properties: {
			email: {
				type: 'string',
				pattern:
					'^(([^<>()[\\]\\\\.,;:\\s@"]+(\\.[^<>()[\\]\\\\.,;:\\s@"]+)*)|.(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$'
			},
			password: {
				type: 'string',
				minLength: 4,
				maxLength: 24
			}
		},
		required: ['email', 'password']
	}
};

export const signoutSchema = {
	description: "Closes current users' session",
	tags: ['Auth'],
	summary: "Closes current users' session",
	security: [{ authJWT: [] }]
};

export const signoutEverywhereSchema = {
	description: "Closes all users' sessions",
	tags: ['Auth'],
	summary: "Closes all users' sessions",
	security: [{ authJWT: [] }]
};
