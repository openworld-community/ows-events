import { v4 as uuid } from 'uuid';
import mongoose, { FilterQuery } from 'mongoose';
import { EventOnPoster } from '@common/types/event';
import { PaginationOptions } from '@common/types/utils';
import { EventModel, IEventDocument } from '../models/event.model';
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

	async getPaginatedEvents(
		paginationOptions: PaginationOptions,
		query?: FindEventParams | undefined
	) {
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

		const aggregationPipeline = [
			{
				$match: queryObject
			},
			{
				$group: {
					_id: null,
					future: {
						$push: {
							$cond: [
								{
									$gt: ['$date', Date.now()]
								},
								'$$ROOT',
								'$$REMOVE'
							]
						}
					},
					past: {
						$push: {
							$cond: [
								{
									$lte: ['$date', Date.now()]
								},
								'$$ROOT',
								'$$REMOVE'
							]
						}
					}
				}
			},
			{
				$project: {
					future: {
						$sortArray: {
							input: '$future',
							sortBy: {
								date: 1
							}
						}
					},
					past: {
						$sortArray: {
							input: '$past',
							sortBy: {
								date: -1
							}
						}
					}
				}
			},
			{
				$project: {
					data: {
						$concatArrays: ['$future', '$past']
					}
				}
			},
			{
				$unwind: {
					path: '$data'
				}
			},
			{
				$replaceRoot: {
					newRoot: '$data'
				}
			}
		];

		const eventsAggregation = EventModel.aggregate(aggregationPipeline);
		const events: mongoose.AggregatePaginateResult<IEventDocument> =
			await EventModel.aggregatePaginate(eventsAggregation, paginationOptions);

		return events;
	}
}

export const eventsStateController = new EventsStateController();
