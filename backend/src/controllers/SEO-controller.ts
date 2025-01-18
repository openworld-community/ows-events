import { PipelineStage, SortValues } from 'mongoose';
import { ICitySitemapData, ICountrySitemapData, IEventSitemapData } from '@common/types/service';
import { EventModel } from '../models/event.model';

class SEOController {
	async getSitemapEventsData(): Promise<IEventSitemapData[]> {
		const pipeline = [
			{
				$match: {
					$expr: {
						$and: [
							{
								$gte: [
									{
										$add: [
											'$date',
											{
												$multiply: [1000, '$durationInSeconds']
											}
										]
									},
									{
										$toDouble: '$$NOW'
									}
								]
							}
						]
					},
					'meta.moderation.status': { $nin: ['declined', 'in-progress'] }
				}
			},
			{
				$project: {
					id: 1,
					updatedAt: 1
				}
			}
		];

		const sortObject: string | Record<string, SortValues> | PipelineStage.Sort['$sort'] = {
			date: 'ascending'
		};

		const futureEvents = await EventModel.aggregate(pipeline).sort(sortObject).exec();
		return futureEvents;
	}

	async getUsedCitiesSitemapData() {
		const pipeline = [
			{
				$match: {
					'location.country': {
						$in: ['Serbia', 'Montenegro']
					},
					'meta.moderation.status': {
						$nin: ['declined', 'in-progress']
					},
					'location.city': {
						$nin: ['']
					},
					$expr: {
						$gte: [
							{
								$add: [
									'$date',
									{
										$multiply: [1000, '$durationInSeconds']
									}
								]
							},
							Date.now()
						]
					}
				}
			},
			{
				$group: {
					_id: '$location.city',
					updatedAt: {
						$max: '$updatedAt'
					}
				}
			},
			{
				$project: {
					city: '$_id',
					updatedAt: 1
				}
			}
		];

		const cities: ICitySitemapData[] = await EventModel.aggregate(pipeline).exec();
		return cities;
	}

	async getUsedCountriesSitemapData() {
		const pipeline = [
			{
				$match: {
					'location.country': {
						$in: ['Serbia', 'Montenegro']
					},
					'meta.moderation.status': {
						$nin: ['declined', 'in-progress']
					},
					$expr: {
						$gte: [
							{
								$add: [
									'$date',
									{
										$multiply: [1000, '$durationInSeconds']
									}
								]
							},
							Date.now()
						]
					}
				}
			},
			{
				$group: {
					_id: '$location.country',
					updatedAt: {
						$max: '$updatedAt'
					}
				}
			},
			{
				$project: {
					country: '$_id',
					updatedAt: 1
				}
			}
		];

		const countries: ICountrySitemapData[] = await EventModel.aggregate(pipeline).exec();
		return countries;
	}
}

export const seoController = new SEOController();
