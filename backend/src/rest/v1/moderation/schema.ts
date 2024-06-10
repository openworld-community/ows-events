import { ItemEvent } from '../events/schema';

export const getEventsByStatusSchema = {
	description: 'get events by moderation status',
	tags: ['Moderation'],
	summary: 'Get events by moderation status',
	params: {
		type: 'object',
		properties: {
			status: { type: 'string' }
		}
	},
	response: {
		200: {
			type: 'array',
			items: ItemEvent
		}
	}
};

export const approveEventSchema = {
	description: 'approve event',
	tags: ['Moderation'],
	summary: 'Approve event',
	params: {
		type: 'object',
		properties: {
			eventId: { type: 'string' }
		}
	}
};

export const declineEventSchema = {
	description: 'decline event',
	tags: ['Moderation'],
	summary: 'Decline event',
	params: {
		type: 'object',
		properties: {
			eventId: { type: 'string' }
		}
	}
};
