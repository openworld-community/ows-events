import { v4 as uuid } from 'uuid';
import { FilterQuery, PipelineStage, SortValues, AggregatePaginateResult } from 'mongoose';
import { EventDbEntity, EventOnPoster, SearchEventPayload } from '@common/types/event';
import { PaginationOptions } from '@common/types/pagination';
import { CommonErrorsEnum, SupportedLanguages } from '../../../common/const';
import { EventModel, IEventDocument } from '../models/event.model';
import { imageController } from './image-controller';
import { countriesAndCitiesController } from './countries-and-cities.controller';
import { vars } from '../config/vars';

class EventsStateController {
	async addEvent(event: EventOnPoster) {
		const id = uuid();
		const normalizedEvent = await this.normalizeEventLocation(event);
		const eventWithId = {
			...normalizedEvent,
			id
		};
		const newEvent = new EventModel(eventWithId);
		await newEvent.save().catch((e) => {
			// eslint-disable-next-line no-console
			console.error(e);
		});
		return newEvent.id;
	}

	async localizeEventLocation(event: EventOnPoster, lang: SupportedLanguages) {
		if (event.isOnline) return event;
		const localizedEvent = { ...event };
		localizedEvent.location.country =
			await countriesAndCitiesController.getLocalizedCountryName(
				event.location.country,
				lang
			);
		localizedEvent.location.city = await countriesAndCitiesController.getLocalizedCityName(
			event.location.city,
			lang
		);
		return localizedEvent;
	}

	async normalizeEventLocation(event: EventOnPoster) {
		if (event.isOnline) return event;
		const normalizedEvent = { ...event };
		const englishCityName = await countriesAndCitiesController.getLocalizedCityName(
			event.location.city,
			SupportedLanguages.ENGLISH
		);
		const englishCountryName = await countriesAndCitiesController.getLocalizedCountryName(
			event.location.country,
			SupportedLanguages.ENGLISH
		);
		normalizedEvent.location.city = englishCityName;
		normalizedEvent.location.country = englishCountryName;
		return normalizedEvent;
	}

	async getEvents(
		lang: SupportedLanguages,
		isOnline: boolean,
		query?: SearchEventPayload | undefined
	): Promise<EventDbEntity[]> {
		const queryObject: FilterQuery<EventOnPoster> = {
			$and: [],
			$expr: {
				$and: [
					{
						$gte: [
							{
								$add: ['$date', { $multiply: [1000, '$durationInSeconds'] }]
							},
							{
								$toDouble: '$$NOW'
							}
						]
					}
				]
			}
		};
		const sortObject: string | Record<string, SortValues> | PipelineStage.Sort['$sort'] = {};
		if (query?.searchLine) {
			queryObject.$text = { $search: query.searchLine };
		}
		if (query?.country) {
			const englishCountryName = await countriesAndCitiesController.getLocalizedCountryName(
				query?.country,
				SupportedLanguages.ENGLISH
			);
			const countryQuery = isOnline
				? { $and: [{ 'location.country': englishCountryName }, { isOnline }] }
				: { 'location.country': englishCountryName };
			queryObject.$and?.push(countryQuery);
			sortObject.isOnline = 'ascending';
		}
		if (query?.city) {
			const englishCityName = await countriesAndCitiesController.getLocalizedCityName(
				query?.city,
				SupportedLanguages.ENGLISH
			);
			const cityQuery = isOnline
				? { $or: [{ 'location.city': englishCityName }, { isOnline }] }
				: { 'location.city': englishCityName };
			queryObject.$and?.push(cityQuery);
			sortObject.isOnline = 'ascending';
		}
		if (query?.startDate) {
			const startDateQuery = {
				$lte: [
					query.startDate,
					{ $add: ['$date', { $multiply: [1000, '$durationInSeconds'] }] }
				]
			};
			queryObject.$expr.$and.push(startDateQuery);
		}
		if (query?.endDate) {
			const endDateQuery = {
				$gte: [query.endDate, '$date']
			};
			queryObject.$expr.$and.push(endDateQuery);
		}
		if (query?.tags && query?.tags.length !== 0) {
			queryObject.tags = { $in: query?.tags };
		}
		if (queryObject.$and?.length === 0) {
			delete queryObject.$and;
		}
		queryObject['meta.moderation.status'] = { $nin: ['declined', 'in-progress'] };

		sortObject.date = 'ascending';

		const pipeline = [
			{
				$match: {
					...queryObject
				}
			}
		];

		const futureEvents = await EventModel.aggregate(pipeline).sort(sortObject).exec();
		return Promise.all(
			futureEvents.map(async (event) => this.localizeEventLocation(event, lang))
		);
	}

	async getPaginatedEvents(
		lang: SupportedLanguages,
		isOnline: boolean,
		paginationOptions: PaginationOptions,
		query?: SearchEventPayload | undefined
	): Promise<AggregatePaginateResult<EventDbEntity>> {
		const queryObject: FilterQuery<EventOnPoster> = {
			$and: [],
			$expr: {
				$and: [
					{
						$gte: [
							{
								$add: ['$date', { $multiply: [1000, '$durationInSeconds'] }]
							},
							{
								$toDouble: '$$NOW'
							}
						]
					}
				]
			}
		};
		const sortObject: string | Record<string, SortValues> | PipelineStage.Sort['$sort'] = {};
		if (query?.searchLine) {
			queryObject.$text = { $search: query.searchLine };
		}
		if (query?.country) {
			const englishCountryName = await countriesAndCitiesController.getLocalizedCountryName(
				query?.country,
				SupportedLanguages.ENGLISH
			);
			const countryQuery = isOnline
				? { $and: [{ 'location.country': englishCountryName }, { isOnline }] }
				: { 'location.country': englishCountryName };
			queryObject.$and?.push(countryQuery);
			sortObject.isOnline = 'ascending';
		}
		if (query?.city) {
			const englishCityName = await countriesAndCitiesController.getLocalizedCityName(
				query?.city,
				SupportedLanguages.ENGLISH
			);
			const cityQuery = isOnline
				? { $or: [{ 'location.city': englishCityName }, { isOnline }] }
				: { 'location.city': englishCityName };
			queryObject.$and?.push(cityQuery);
			sortObject.isOnline = 'ascending';
		}
		if (query?.startDate) {
			const startDateQuery = {
				$lte: [
					query.startDate,
					{ $add: ['$date', { $multiply: [1000, '$durationInSeconds'] }] }
				]
			};
			queryObject.$expr.$and.push(startDateQuery);
		}
		if (query?.endDate) {
			const endDateQuery = {
				$gte: [query.endDate, '$date']
			};
			queryObject.$expr.$and.push(endDateQuery);
		}
		if (query?.tags && query?.tags.length !== 0) {
			queryObject.tags = { $in: query?.tags };
		}
		if (queryObject.$and?.length === 0) {
			delete queryObject.$and;
		}
		queryObject['meta.moderation.status'] = { $nin: ['declined', 'in-progress'] };

		sortObject.date = 'ascending';
		sortObject.id = 'ascending';

		const pipeline = [
			{
				$match: {
					...queryObject
				}
			}
		];

		const aggregate = EventModel.aggregate<IEventDocument>(pipeline).sort(sortObject);
		const futureEvents = await EventModel.aggregatePaginate<EventDbEntity>(
			aggregate,
			paginationOptions
		);
		const localizedDocs = await Promise.all(
			futureEvents.docs.map(async (event) => this.localizeEventLocation(event, lang))
		);
		futureEvents.docs = localizedDocs;
		return futureEvents;
	}

	async getEvent(id: string, lang: SupportedLanguages = SupportedLanguages.ENGLISH) {
		const event = await EventModel.findOne(
			{
				id
			},
			{ meta: 0 }
		).exec();
		if (!event) throw new Error(CommonErrorsEnum.EVENT_NOT_FOUND);
		return this.localizeEventLocation(event?.toObject(), lang);
	}

	async updateEvent(event: EventOnPoster) {
		const normalizedEvent = await this.normalizeEventLocation(event);
		const updatedEvent = await EventModel.findOneAndUpdate(
			{ id: event.id },
			{
				$set: normalizedEvent
			}
		);

		return updatedEvent;
	}

	async deleteEvent(id: string) {
		const event = await EventModel.findOne({
			id
		});
		if (
			(event?.image &&
				!event.image.includes('https://') &&
				!event.image.includes('http://')) ||
			event?.image.includes(`https://${vars.s3.bucket}.fsn1.your-objectstorage.com/`)
		)
			try {
				await imageController.deleteImg(event.image);
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
		const tags = await EventModel.distinct('tags', {
			'meta.moderation.status': { $nin: ['declined', 'in-progress'] },
			$expr: {
				$gte: [{ $add: ['$date', { $multiply: [1000, '$durationInSeconds'] }] }, Date.now()]
			}
		});

		return tags;
	}

	async findUsedTagsByCity(city: string) {
		const tags = await EventModel.distinct('tags', {
			'location.city': city,
			'meta.moderation.status': { $nin: ['declined', 'in-progress'] },
			$expr: {
				$gte: [{ $add: ['$date', { $multiply: [1000, '$durationInSeconds'] }] }, Date.now()]
			}
		});

		return tags;
	}

	async findUsedTagsByCountry(country: string) {
		const tags = await EventModel.distinct('tags', {
			'location.country': country,
			'meta.moderation.status': { $nin: ['declined', 'in-progress'] },
			$expr: {
				$gte: [{ $add: ['$date', { $multiply: [1000, '$durationInSeconds'] }] }, Date.now()]
			}
		});
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

	async getUserEvents(userId: string, lang: SupportedLanguages) {
		const events = await EventModel.find(
			{ creatorId: userId },
			{},
			{
				sort: {
					date: 'descending'
				}
			}
		).exec();

		return Promise.all(
			events.map(async (event) => this.localizeEventLocation(event?.toObject(), lang))
		);
	}
}

export const eventsStateController = new EventsStateController();
