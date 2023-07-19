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

		const pastEvents = await EventModel.find(
			{ ...queryObject, date: { $lte: Date.now() } },
			{},
			{
				sort: {
					date: 'descending'
				}
			}
		);
		const futureEvents = await EventModel.find(
			{ ...queryObject, date: { $gt: Date.now() } },
			{},
			{
				sort: {
					date: 'ascending'
				}
			}
		);

		const events = futureEvents.concat(pastEvents);

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
		if (event?.image && !event.image.includes('https://') && !event.image.includes('http://'))
			try {
				await imageController.deleteImg(`.${event.image}`);
			} catch (e) {
				// eslint-disable-next-line no-console
				console.log(e);
			}

		await EventModel.deleteOne({ id });
	}

	async addTags(data: EventOnPoster) {
		const event = await EventModel.findOneAndUpdate(
			{ id: data.id },
            { 
                $addToSet: { tags: { $each: data.tags } } 
            }
		);

		return event;
	}

	async findAllTags() {
		const tags = await EventModel.distinct("tags");

		return tags;
	}

	async findTagsByEventId(id: string) {
		const event = await EventModel.findOne({id: id}, {_id: 0, tags: 1 });
		return event?.tags;
	}

	async removeTags(id: string, tags: string[] ) { 
		const event = await EventModel.findOneAndUpdate(
			{ id: id },
            { 
                $pull: { tags: { $in: tags } }
            }
		);

		return event;
	}
}

export const eventsStateController = new EventsStateController();
