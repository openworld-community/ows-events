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
import { TokenData } from '../../types';

export const addEvent: IAddEventHandler = async (request, reply) => {
	const token = request.headers.authorization;
	if (!token) {
		return reply.status(401).send({
			type: 'error'
		});
	}

	const jwtData = jwt.verify(token, 'secret') as TokenData;
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
	const { event } = body;
	if (!event) {
		return {
			type: 'error'
		};
	}

	const newPostId = eventsStateController.addEvent(event);
	return {
		type: 'success',
		data: { id: newPostId }
	};
};

export const getEvents: IGetEventsHandler = async (): Promise<EventOnPoster[]> =>
	eventsStateController.getEvents().slice(0, 100);

export const getEvent: IGetEventHandler = async (request): Promise<EventOnPoster | undefined> => {
	const eventId = request.params.id;
	return eventsStateController.getEvent(eventId);
};

export const deleteEvent: IDeleteEventHandler = async (request, reply) => {
	const token = request.headers.authorization;
	if (!token) {
		return reply.status(401).send({
			type: 'error'
		});
	}

	const jwtData = jwt.verify(token, 'secret') as TokenData;
	if (!jwtData.id) {
		return reply.status(401).send({
			type: 'error'
		});
	}
	const oldEvent = eventsStateController.getEvent(request.body.id);

	if (oldEvent?.creatorId !== jwtData.id) {
		return reply.status(403).send({
			type: 'error'
		});
	}

	eventsStateController.deleteEvent(request.body.id);
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

	const jwtData = jwt.verify(token, 'secret') as TokenData;
	if (!jwtData.id) {
		return reply.status(401).send({
			type: 'error'
		});
	}

	const oldEvent = eventsStateController.getEvent(request.body.event.id);

	if (oldEvent?.creatorId !== jwtData.id) {
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

	eventsStateController.updateEvent(event);
	return {
		type: 'success',
		data: undefined
	};
};

export const findEvents: IFindEventHandler = async (request) => {
	const { searchLine, country, city } = request.body;

	return eventsStateController.getEvents({ searchLine, country, city }).slice(0, 100);
};
