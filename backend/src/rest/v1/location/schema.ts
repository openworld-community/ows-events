
export const getCountriesSchema = {
	description: 'get all countries',
	tags: ['Location'],
	summary: 'Get all countries',
	response: {
		200: {
			type: 'object',
			country: { type: 'string' }
		}
	}
};

export const getCitiesByCountrySchema = {
	description: 'get by countries',
	tags: ['Location'],
	summary: 'Get by countries',
	params: {
		type: 'object',
		properties: {
			country: { type: 'string' }
		}
	},
	response: {
		200: {
			type: 'object',
			items: { type: 'string' }
		}
	}
};


export const getMetaSchema = {
	description: 'get by countries',
	tags: ['Location'],
	summary: 'Get by countries',
	params: {
		type: 'object',
		properties: {
			country: { type: 'string' },
			city: { type: 'string' }
		}
	},
	response: {
		200: {
			type: 'object',
			properties: {
				country: { type: 'string' },
				city: { type: 'string' },
				timezone: { type: 'string' },
				timezoneOffset: { type: 'string' }
			}
		},

	}
}


export const getUsedCountriesSchema = {
	description: 'get used countries',
	tags: ['Location'],
	summary: 'Get used countries',
	response: {
		200: {
			type: 'object',
			items: { type: 'string' }
		}
	}
};
