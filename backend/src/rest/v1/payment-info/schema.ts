import { ItemEvent } from '../events/schema';

const paymentsInfo = {
	type: 'object',
	properties: {
		id: { type: 'string' },
		items: {
			type: 'object',
			properties: {
				name: { type: 'string' },
				link: { type: 'string' },
				account: { type: 'string' },
				price: { type: 'string' }
			}
		}
	}
};

export const getPaymentInfoSchema = {
	description: 'PaymentInfo',
	tags: ['Payment Info'],
	summary: 'PaymentInfo',
	response: {
		200: {
			type: 'object',
			properties: {
				event: ItemEvent,
				paymentsInfo
			}
		}
	},
	params: {
		type: 'object',
		properties: {
			id: { type: 'string' }
		}
	}
};

export const getJSONPaymentInfoSchema = {
	description: 'PaymentInfo',
	tags: ['Payment all Info'],
	summary: 'Payment all Info',
	response: {
		200: {
			type: 'object',
			properties: {
				type: { type: 'string' },
				id: { type: 'string' },
				rows: {
					type: 'array',
					items: paymentsInfo.properties.items
				}
			}
		}
	},
	params: {
		type: 'object',
		properties: {
			id: { type: 'string' }
		}
	}
};
