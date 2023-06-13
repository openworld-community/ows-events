export const deleteImageSchema = {
	description: 'Dellete image',
	tags: ['Image'],
	summary: 'Dellete image',
	body: {
		type: 'object',
		properties: {
			path: { type: 'string' }
		},
	},
	response: {
		200: { success: { type: 'string' } } 
	},
	security: [{ authJWT: [] }]
};

export const addImageSchema = {
	description: 'Add image',
	tags: ['Image'],
	summary: 'Add image',
	consumes: ['multipart/form-data'],
	body: {
		type: 'object',
		properties: {
			image: { type: 'string', format: 'binary' }
		},
	},
	response: {
		200: { path: { type: 'string' } }
	},
	security: [{ authJWT: [] }]
};

