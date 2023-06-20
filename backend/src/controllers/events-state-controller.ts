import { v4 as uuid } from 'uuid';
import { FilterQuery } from 'mongoose';
import { EventOnPoster } from '@common/types/event';
import { EventModel } from '../models/event.model';
import { imageController } from './image-controller';

export type FindEventParams = {
	searchLine?: string;
	city?: string;
	country?: string;
};

class EventsStateController {
	async addEvent(event: EventOnPoster) {
		const id = uuid();
		const eventWithId = { ...event, id };
		const newEvent = new EventModel(eventWithId);
		await newEvent.save().catch((e) => {
			// eslint-disable-next-line no-console
			console.error(e);
		});
		return id;
	}

	async getEvents(query?: FindEventParams | undefined): Promise<EventOnPoster[]> {
		const queryObject: FilterQuery<EventOnPoster> = {};
		if (query?.searchLine) {
			queryObject.$text = { $search: query.searchLine };
		}
		if (query?.country) {
			queryObject['location.country'] = query?.country;
		}
		if (query?.city) {
			queryObject['location.city'] = query?.city;
		}
		queryObject['meta.moderation.status'] = { $nin: ['declined', 'in-progress'] };

		const events: EventOnPoster[] = await EventModel.find(queryObject, { meta: 0 });
		return events;
	}

	async getEvent(id: string) {
		const event = await EventModel.findOne(
			{
				id
			},
			{ meta: 0 }
		);
		return event;
	}

	async updateEvent(data: EventOnPoster) {
		const event = await EventModel.findOneAndUpdate(
			{ id: data.id },
			{
				$set: data
			}
		);

		return event;
	}

	async deleteEvent(id: string) {
		const event = await EventModel.findOne({
			id
		});
		if (event?.image) await imageController.deleteImg(`.${event.image}`);

		await EventModel.deleteOne({ id });
	}
}

export const eventsStateController = new EventsStateController();
