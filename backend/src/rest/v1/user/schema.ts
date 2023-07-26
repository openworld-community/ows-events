const UserSchema = {
	telegram: {
		type: 'object',
		properties: {
			id: { type: 'string' },
			first_name: { type: 'string' },
			last_name: { type: 'string' },
			username: { type: 'string' },
			photo_url: { type: 'string' }
		}
	},
	userInfo: {
		type: 'object',
		properties: {
			last_name: { type: 'string' },
			first_name: { type: 'string' },
			nickname: { type: 'string' },
			company: { type: 'string' },
			email: { type: 'string' },
			phone: { type: 'string' }
		}
	}
};

export const getTGInfoByTokenSchema = {
	description: 'get user telegram info by token',
	tags: ['User'],
	summary: 'Get user telegram info by token',
	response: {
		200: UserSchema.telegram
	}
};

export const getUserInfoByTokenSchema = {
	description: 'get user info by token',
	tags: ['User'],
	summary: 'Get user info by token',
	response: {
		200: UserSchema.userInfo
	}
};

export const changeUserInfoSchema = {
	description: 'Change user info',
	tags: ['User'],
	summary: 'Change user info',
	body: {
		type: 'object',
		properties: {
			userInfo: UserSchema.userInfo
		},
		required: ['userInfo']
	}
};
