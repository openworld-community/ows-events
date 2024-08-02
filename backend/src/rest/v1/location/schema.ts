export const getCountriesSchema = {
	description: 'get all countries',
	tags: ['Location'],
	summary: 'Get all countries',
	response: {
		200: {
			type: 'array',
			items: { type: 'string' }
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
			type: 'array',
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
				timezoneName: { type: 'string' },
				timezoneOffset: { type: 'string' }
			}
		}
	}
};

export const getUsedCountriesSchema = {
	description: 'get used countries',
	tags: ['Location'],
	summary: 'Get used countries',
	response: {
		200: {
			type: 'array',
			items: { type: 'string' }
		}
	}
};

export const getUsedCitiesByCountrySchema = {
	description: 'get used cities by country',
	tags: ['Location'],
	summary: 'Get used cities by country',
	params: {
		type: 'object',
		properties: {
			country: { type: 'string' }
		}
	},
	response: {
		200: {
			type: 'array',
			items: { type: 'string' }
		}
	}
};

export const getUsedCitiesSchema = {
	description: 'get used cities (in Serbia and Montenegro)',
	tags: ['Location'],
	summary: 'Get used cities',
	response: {
		200: {
			type: 'array',
			items: {
				type: 'object',
				properties: {
					en: { type: 'string' },
					ru: { type: 'string' },
					cities: {
						type: 'array',
						items: {
							type: 'object',
							properties: {
								ru: { type: 'string' },
								en: { type: 'string' }
							}
						}
					}
				}
			}
		}
	}
};

export const getLocalizedCitySchema = {
	description: 'get localized city name',
	tags: ['Location'],
	summary: 'Get localized city name',
	response: {
		200: {
			type: 'string'
		}
	}
};

export const getLocalizedCountrySchema = {
	description: 'get localized country name',
	tags: ['Location'],
	summary: 'Get localized country name',
	response: {
		200: {
			type: 'string'
		}
	}
};
