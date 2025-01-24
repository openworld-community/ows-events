export const getEventsSitemapDataSchema = {
	description: 'get events data for sitemap',
	tags: ['Sitemap'],
	summary: 'Get events data for sitemap',
	response: {
		200: {
			type: 'array',
			items: {
				eventId: { type: 'string' },
				updatedAt: { type: 'date' }
			}
		}
	}
};

export const getCitiesSitemapDataSchema = {
	description: 'get used countries data for sitemap',
	tags: ['Sitemap'],
	summary: 'Get used cities data for sitemap',
	response: {
		200: {
			type: 'array',
			items: {
				city: { type: 'string' },
				updatedAt: { type: 'date' }
			}
		}
	}
};

export const getCountriesSitemapDataSchema = {
	description: 'get used countries data for sitemap',
	tags: ['Sitemap'],
	summary: 'Get used countries data for sitemap',
	response: {
		200: {
			type: 'array',
			items: {
				country: { type: 'string' },
				updatedAt: { type: 'date' }
			}
		}
	}
};
