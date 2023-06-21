export const deleteImageSchema = {
	description: 'Delete image',
	tags: ['Image'],
	summary: 'Delete image',
	body: {
		type: 'object',
		properties: {
			path: { type: 'string' }
		}
	},
	response: {
		200: {}
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
			image: { isFile: true }
		}
	},
	response: {
		200: {
			type: 'object',
			properties: { path: { type: 'string' } }
		}
	},
	security: [{ authJWT: [] }]
};
