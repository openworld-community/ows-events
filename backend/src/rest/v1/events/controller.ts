import jwt from 'jsonwebtoken';
import { EventOnPoster } from '@common/types';
import { eventsStateController } from '../../../controllers/events-state-controller';
import {
	IAddEventHandler,
	IDeleteEventHandler,
	IFindEventHandler,
	IGetEventHandler,
	IGetEventsHandler,
	IUpdateEventHandler
} from './type';
import { ITokenData } from '../../types';
import { eventsValidator } from './../../../validators/event-validator';

export const addEvent: IAddEventHandler = async (request, reply) => {
	const token = request.headers.authorization;
	if (!token) {
		return reply.status(401).send({
			type: 'error'
		});
	}

	const jwtData = jwt.verify(token, 'secret') as ITokenData;
	if (!jwtData.id) {
		return reply.status(401).send({
			type: 'error'
		});
	}

	const body = request.body as { event: EventOnPoster | undefined };
	if (!body) {
		return {
			type: 'error'
		};
	}

	const validationResult = eventsValidator.validateEvent(body);

	if (!validationResult.isValid) {
		return {
			type: 'error',
			errors: validationResult.errors
		};
	}

	const { event } = body;
	if (!event) {
		return {
			type: 'error'
		};
	}

	event.creatorId = jwtData.id;
	const newPostId = await eventsStateController.addEvent(event);

	return {
		type: 'success',
		data: { id: newPostId }
	};
};

export const getEvents: IGetEventsHandler = async (): Promise<EventOnPoster[]> =>
	(await eventsStateController.getEvents()).slice(0, 100);

export const getEvent: IGetEventHandler = async (request) => {
	const eventId = request.params.id;
	const event = await eventsStateController.getEvent(eventId);
	if (!event) {
		return {
			type: 'error',
			errors: ['Event not found']
		};
	}
	return {
		type: 'success',
		data: event
	};
};

export const deleteEvent: IDeleteEventHandler = async (request, reply) => {
	const token = request.headers.authorization;
	if (!token) {
		return reply.status(401).send({
			type: 'error',
			errors: ['No token']
		});
	}

	const jwtData = jwt.verify(token, 'secret') as ITokenData;
	if (!jwtData.id) {
		return reply.status(401).send({
			type: 'error',
			errors: ['Wrong token']
		});
	}
	const oldEvent = await eventsStateController.getEvent(request.body.id);
	if (oldEvent?.creatorId !== String(jwtData.id)) {
		return reply.status(403).send({
			type: 'error'
		});
	}

	await eventsStateController.deleteEvent(request.body.id);
	return {
		type: 'success',
		data: undefined
	};
};

export const updateEvent: IUpdateEventHandler = async (request, reply) => {
	const token = request.headers.authorization;
	if (!token) {
		return reply.status(401).send({
			type: 'error'
		});
	}

	const jwtData = jwt.verify(token, 'secret') as ITokenData;
	if (!jwtData.id) {
		return reply.status(401).send({
			type: 'error'
		});
	}

	const oldEvent = await eventsStateController.getEvent(request.body.event.id);

	if (oldEvent?.creatorId !== String(jwtData.id)) {
		return reply.status(403).send({
			type: 'error'
		});
	}

	const body = request.body as { event: EventOnPoster | undefined };
	if (!body) {
		return {
			type: 'error'
		};
	}

	const { event } = body;
	if (!event) {
		return {
			type: 'error'
		};
	}

	await eventsStateController.updateEvent(event);
	return {
		type: 'success',
		data: undefined
	};
};

export const findEvents: IFindEventHandler = async (request) => {
	const { searchLine, country, city } = request.body;

	return (await eventsStateController.getEvents({ searchLine, country, city })).slice(0, 100);
};
