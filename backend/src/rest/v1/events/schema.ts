export const ItemEvent = {
	type: 'object',
	properties: {
		id: { type: 'string' },
		creatorId: { type: 'string' },
		title: { type: 'string', maxLength: 90 },
		description: { type: 'string', maxLength: 1500 },
		date: { type: 'number' },
		durationInSeconds: { type: 'number' },
		image: { type: 'string' },
		isOnline: { type: 'boolean' },
		location: {
			type: 'object',
			properties: {
				country: { type: 'string' },
				city: { type: 'string' },
				address: { type: 'string', maxLength: 255 }
			}
		},
		price: {
			type: 'object',
			nullable: true,
			properties: {
				minValue: { type: 'number' },
				value: { type: 'number' },
				maxValue: { type: 'number' },
				currency: { type: 'string' }
			}
		},
		timezone: {
			type: 'object',
			properties: {
				timezoneName: { type: 'string' },
				timezoneOffset: { type: 'string' }
			},
			required: ['timezoneName', 'timezoneOffset']
		},
		url: { type: 'string', maxLength: 2048 },
		tags: {
			type: 'array',
			items: { type: 'string' }
		},
		organizer: {
			type: 'string',
			maxLength: 70
		},
		type: {
			type: 'string',
			enum: ['parsed', 'paid', 'user-generated']
		}
	}
};

export const PaginatedResponseSchema = {
	type: 'object',
	properties: {
		docs: {
			type: 'array',
			items: ItemEvent
		},
		totalDocs: { type: 'number' },
		// used events per page number
		limit: { type: 'number' },
		// current page number
		page: { type: 'number' },
		// total number of pages for matching events
		totalPages: { type: 'number' },
		// is previous page exists (i.e. false for page 1)
		hasPrevPage: { type: 'number' },
		// is next page exists (i.e. false for last page)
		hasNextPage: { type: 'boolean' },
		// previous page number
		prevPage: { type: 'number' },
		// next page number
		nextPage: { type: 'number' }
	}
};

export const EventQuerySchema = {
	type: 'object',
	properties: {
		searchLine: { type: 'string' },
		city: { type: 'string' },
		country: { type: 'string' },
		tags: { type: 'array', items: { type: 'string' } },
		startDate: { type: 'number' },
		endDate: { type: 'number' }
	}
};

export const PaginationOptionsSchema = {
	type: 'object',
	properties: {
		page: { type: 'number' },
		limit: { type: 'number' }
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

export const getMyEventsSchema = {
	description: 'get events, created by user',
	tags: ['Events'],
	summary: 'Get all events',
	response: {
		200: {
			type: 'array',
			items: ItemEvent
		}
	},
	security: [{ authJWT: [] }]
};
export const getEventSchema = {
	description: 'get event by id',
	tags: ['Events'],
	summary: 'Get event by id',
	response: { 200: ItemEvent },
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
	parameters: [
		{
			name: 'lang',
			in: 'header',
			description: 'Language from supported languages',
			schema: {
				type: 'string'
			},
			required: true
		}
	],
	response: {
		201: {
			type: 'object',
			properties: { id: { type: 'string' } }
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
	description: 'find events',
	tags: ['Events'],
	summary: 'Find events',
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
			country: { type: 'string' },
			tags: { type: 'array', items: { type: 'string' } },
			startDate: { type: 'number' },
			endDate: { type: 'number' }
		}
	},
	security: [{ authJWT: [] }]
};

export const findEventsByCitySchema = {
	description: 'find events by city',
	tags: ['Events'],
	summary: 'Find events by city',
	response: {
		200: {
			type: 'array',
			items: ItemEvent
		}
	},
	params: {
		type: 'object',
		properties: {
			cityName: {
				type: 'string',
				description: 'City in which event hold'
			}
		}
	},
	body: {
		type: 'object',
		properties: {
			searchLine: { type: 'string' },
			tags: { type: 'array', items: { type: 'string' } },
			startDate: { type: 'number' },
			endDate: { type: 'number' }
		}
	},
	security: [{ authJWT: [] }]
};

export const findEventsByCountrySchema = {
	description: 'find events by country',
	tags: ['Events'],
	summary: 'Find events by country',
	response: {
		200: {
			type: 'array',
			items: ItemEvent
		}
	},
	params: {
		type: 'object',
		properties: {
			countryName: {
				type: 'string',
				description: 'Country in which event hold'
			}
		}
	},
	body: {
		type: 'object',
		properties: {
			searchLine: { type: 'string' },
			tags: { type: 'array', items: { type: 'string' } },
			startDate: { type: 'number' },
			endDate: { type: 'number' }
		}
	},
	security: [{ authJWT: [] }]
};

export const findEventsPaginatedSchema = {
	description: 'find events with pagination',
	tags: ['Events'],
	summary: 'Find events with pagination',
	response: {
		200: PaginatedResponseSchema
	},
	body: {
		type: 'object',
		properties: {
			query: EventQuerySchema,
			options: PaginationOptionsSchema
		}
	},
	security: [{ authJWT: [] }]
};

export const findEventsByCityPaginatedSchema = {
	description: 'find events by city with pagination',
	tags: ['Events'],
	summary: 'Find events by city with pagination',
	response: {
		200: PaginatedResponseSchema
	},
	params: {
		type: 'object',
		properties: {
			cityName: {
				type: 'string',
				description: 'City in which event hold'
			}
		}
	},
	body: {
		type: 'object',
		properties: {
			query: EventQuerySchema,
			options: PaginationOptionsSchema
		}
	},
	security: [{ authJWT: [] }]
};

export const findEventsByCountryPaginatedSchema = {
	description: 'find events by country with pagination',
	tags: ['Events'],
	summary: 'Find events by country with pagination',
	response: {
		200: PaginatedResponseSchema
	},
	params: {
		type: 'object',
		properties: {
			countryName: {
				type: 'string',
				description: 'Country in which event hold'
			}
		}
	},
	body: {
		type: 'object',
		properties: {
			query: EventQuerySchema,
			options: PaginationOptionsSchema
		}
	},
	security: [{ authJWT: [] }]
};
