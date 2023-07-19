import { ItemEvent } from "../events/schema"; //TODO this looks strange

export const ItemTagEvent = {
	type: 'array',
	items: 'string'
};

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

export const getAllTagsSchema = {
	description: 'get all tags',
	tags: ['Tags'],
	summary: 'Get all tags',
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
