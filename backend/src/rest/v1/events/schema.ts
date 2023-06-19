export const ItemEvent = {
	type: 'object',
	properties: {
		id: { type: 'string' },
		creatorId: { type: 'string' },
		title: { type: 'string' },
		description: { type: 'string' },
		date: { type: 'number' },
		durationInSeconds: { type: 'number' },
		image: { type: 'string' },
		location: {
			type: 'object',
			properties: {
				country: { type: 'string' },
				city: { type: 'string' }
			}
		},
		price: { type: 'string' },
		timezone: {
			type: 'object',
			properties: {
				timezoneName: { type: 'string' },
				timezoneOffset: { type: 'string' }
			},
			required: ['timezoneName', 'timezoneOffset']
		},
		url: { type: 'string' }
	}
};

export const getEventsSchema = {
	description: 'get all events',
	tags: ['Events'],
	summary: 'Get all events',
	response: {
		200: {
			type: 'array',
			items: ItemEvent
		}
	}
};

export const getEventSchema = {
	description: 'get event by id',
	tags: ['Events'],
	summary: 'Get event by id',
	response: {
		200: {
			type: 'object',
			properties: {
				type: { type: 'string' },
				data: { ItemEvent }
			}
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

export const addEventSchema = {
	description: 'Add new event',
	tags: ['Events'],
	summary: 'Add new event',
	response: {
		201: {
			type: 'object',
			properties: {
				type: { type: 'string' },
				data: {
					type: 'object',
					id: { type: 'string' }
				}
			}
		}
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

export const deleteEventSchema = {
	description: 'Delete event',
	tags: ['Events'],
	summary: 'Delete event',
	response: {
		200: {}
	},
	body: {
		type: 'object',
		properties: { id: { type: 'string' } },
		required: ['id']
	},
	security: [{ authJWT: [] }]
};

export const updateEventSchema = {
	description: 'Update event',
	tags: ['Events'],
	summary: 'Update event',
	response: {
		200: {}
	},
	body: {
		type: 'object',
		properties: ItemEvent.properties
	},
	security: [{ authJWT: [] }]
};

export const findEventsSchema = {
	description: 'Update event',
	tags: ['Events'],
	summary: 'Update event',
	response: {
		200: {
			type: 'array',
			items: ItemEvent
		}
	},
	body: {
		type: 'object',
		properties: {
			searchLine: { type: 'string' },
			city: { type: 'string' },
			country: { type: 'string' }
		}
	},
	security: [{ authJWT: [] }]
};
