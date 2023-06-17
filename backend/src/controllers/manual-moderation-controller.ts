import { FilterQuery } from 'mongoose';
import { EventModel, IEventDocument } from '../models/event.model';

export class Controller {
	async getEvents(status?: string) {
		const filter: FilterQuery<IEventDocument> = status
			? { 'meta.moderation.status': status }
			: {};
		const events = await EventModel.find(filter);
		return events;
	}

	async inProgress(eventId: string, problems: string[]) {
		await EventModel.updateOne(
			{ id: eventId },
			{
				$set: {
					'meta.moderation.status': 'in-progress',
					'meta.moderation.problems': problems
				}
			}
		);
	}

	async approve(eventId: string) {
		await EventModel.updateOne(
			{ id: eventId },
			{
				$set: { 'meta.moderation.status': 'approved' }
			}
		);
	}

	async decline(eventId: string) {
		await EventModel.updateOne(
			{ id: eventId },
			{
				$set: { 'meta.moderation.status': 'declined' }
			}
		);
	}
}

export const manualModerationController = new Controller();
