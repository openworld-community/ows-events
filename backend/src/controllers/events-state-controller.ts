import { v4 as uuid } from 'uuid';
import { FilterQuery } from 'mongoose';
import { EventDbEntity, EventOnPoster, SearchEventPayload } from '@common/types/event';
import { EventModel } from '../models/event.model';
import { imageController } from './image-controller';

class EventsStateController {
	async addEvent(event: EventOnPoster) {
		const id = uuid();
		const eventWithId = {
			...event,
			id
		};
		const newEvent = new EventModel(eventWithId);
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
		if (query?.tags && query?.tags.length !== 0) {
			queryObject.tags = { $in: query?.tags };
		}
		queryObject['meta.moderation.status'] = { $nin: ['declined', 'in-progress'] };

		const pipeline = [
			{
				$match: {
					...queryObject,
					$expr: {
						$gte: [
							{
								$add: ['$date', { $multiply: [1000, '$durationInSeconds'] }]
							},
							{
								$toDouble: '$$NOW'
							}
						]
					}
				}
			}
		];
		const futureEvents = await EventModel.aggregate(pipeline)
			.sort({ date: 'ascending' })
			.exec();
		return futureEvents;
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
		const updatedEvent = await EventModel.findOneAndUpdate(
			{ id: event.id },
			{
				$set: event
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

	async findUsedTags() {
		const tags = await EventModel.distinct('tags', { date: { $gt: Date.now() } });

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
