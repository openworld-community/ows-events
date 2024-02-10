import { ItemEvent } from '../events/schema';

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

const userInfoWithId = {
	type: 'object',
	properties: {
		last_name: { type: 'string' },
		first_name: { type: 'string' },
		nickname: { type: 'string' },
		company: { type: 'string' },
		email: { type: 'string' },
		phone: { type: 'string' },
		id: { type: 'string' }
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
		200: userInfoWithId
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

export const addFavoriteEventSchema = {
	description: 'Add event to favorite events',
	tags: ['User'],
	summary: 'Add event to favorite events',
	body: {
		type: 'object',
		properties: {
			eventId: {
				type: 'string'
			}
		},
		required: ['eventId']
	}
};

export const removeFavoriteEventSchema = {
	description: 'Remove event from favorite events',
	tags: ['User'],
	summary: 'Remove event from favorite events',
	body: {
		type: 'object',
		properties: {
			eventId: {
				type: 'string'
			}
		},
		required: ['eventId']
	}
};

export const getFavoriteEventsIdSchema = {
	description: 'Get id of favorite events',
	tags: ['User'],
	summary: 'Get id of favorite events',
	response: {
		200: {
			type: 'array',
			items: { type: 'string' }
		}
	}
};

export const getFavoriteEventsSchema = {
	description: 'Get favorite events',
	tags: ['User'],
	summary: 'Get favorite events',
	response: {
		200: {
			type: 'array',
			items: ItemEvent
		}
	}
};
