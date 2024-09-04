import { ItemEvent } from '../events/schema';

export const addTagSchema = {
	description: 'Add new tag/s',
	tags: ['Tags'],
	summary: 'Add new tag/s',
	response: {
		200: {}
	},
	body: {
		type: 'object',
		properties: {
			event: ItemEvent
		},
		required: ['event']
	},
	security: [{ authJWT: [] }]
};

export const getUsedTagsSchema = {
	description: 'get used tags',
	tags: ['Tags'],
	summary: 'Get used tags',
	response: {
		200: {
			type: 'array',
			items: { type: 'string' }
		}
	}
};

export const getUsedTagsByCitySchema = {
	description: 'get used tags',
	tags: ['Tags'],
	summary: 'Get used tags',
	params: {
		type: 'object',
		properties: {
			cityName: { type: 'string' }
		}
	},
	response: {
		200: {
			type: 'array',
			items: { type: 'string' }
		}
	}
};

export const getUsedTagsByCountrySchema = {
	description: 'get used tags by country',
	tags: ['Tags'],
	summary: 'Get used tags by country',
	params: {
		type: 'object',
		properties: {
			countryName: { type: 'string' }
		}
	},
	response: {
		200: {
			type: 'array',
			items: { type: 'string' }
		}
	}
};

export const getTagByEventSchema = {
	description: 'get tag by event id',
	tags: ['Tags'],
	summary: 'Get tag by event id',
	response: {
		200: {
			type: 'array',
			items: { type: 'string' }
		}
	},
	params: {
		type: 'object',
		properties: {
			id: {
				type: 'string',
				description: 'Event id'
			}
		}
	}
};

export const deleteTagSchema = {
	description: 'Delete tag/s',
	tags: ['Tags'],
	summary: 'Delete tag/s',
	response: {
		200: {}
	},
	body: {
		type: 'object',
		properties: {
			event: ItemEvent
		},
		required: ['event']
	},
	security: [{ authJWT: [] }]
};
