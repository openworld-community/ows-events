import { v4 as uuid } from 'uuid';
import { FilterQuery } from 'mongoose';
import { EventDbEntity, EventOnPoster, SearchEventPayload } from '@common/types/event';
import { EventModel } from '../models/event.model';
import { imageController } from './image-controller';
import { localize } from '../utils/localization/localize';

class EventsStateController {
	async addEvent(event: EventOnPoster) {
		const id = uuid();
		const { originLanguage, localizationObject } = await localize(event.description);
		const localizedEvent = {
			...event,
			id,
			...{
				description: localizationObject,
				originDescriptionLanguage: originLanguage
			}
		};
		const newEvent = new EventModel(localizedEvent);
		await newEvent.save().catch((e) => {
			// eslint-disable-next-line no-console
			console.error(e);
		});
		return id;
	}

	async getEvents(query?: SearchEventPayload | undefined): Promise<EventDbEntity[]> {
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
		if (query?.date) {
			queryObject.$and = [
				{ date: { $gte: query.date?.from || 0 } },
				{ date: { $lt: query.date?.to || Number.MAX_SAFE_INTEGER } }
			];
		}
		queryObject['meta.moderation.status'] = { $nin: ['declined', 'in-progress'] };

		const futureEvents = await EventModel.find(
			{ ...queryObject, date: { $gt: Date.now() } },
			{},
			{
				sort: {
					date: 'ascending'
				}
			}
		).exec();

		return futureEvents.map((event) => event.toObject());
	}

	async getEvent(id: string) {
		const event = await EventModel.findOne(
			{
				id
			},
			{ meta: 0 }
		).exec();
		return event?.toObject();
	}

	async updateEvent(event: EventOnPoster) {
		const { originLanguage, localizationObject } = await localize(event.description);
		const localizedEvent = {
			...event,
			...{
				description: localizationObject,
				originDescriptionLanguage: originLanguage
			}
		};
		const updatedEvent = await EventModel.findOneAndUpdate(
			{ id: localizedEvent.id },
			{
				$set: localizedEvent
			}
		);

		return updatedEvent;
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
		const tags = await EventModel.distinct('tags');

		return tags;
	}

	async findTagsByEventId(id: string) {
		const event = await EventModel.findOne({ id }, { _id: 0, tags: 1 });

		return event?.tags;
	}

	async removeTags(data: EventOnPoster) {
		const event = await EventModel.findOneAndUpdate(
			{ id: data.id },
			{
				$pull: { tags: { $in: data.tags } }
			}
		);

		return event;
	}

	async getUserEvents(userId: string) {
		const events = await EventModel.find(
			{ creatorId: userId },
			{},
			{
				sort: {
					date: 'descending'
				}
			}
		).exec();

		return events.map((event) => event.toObject());
	}
}

export const eventsStateController = new EventsStateController();
