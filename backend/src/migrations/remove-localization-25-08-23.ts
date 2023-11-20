import mongoose from 'mongoose';
import path from 'path';
import { vars } from '../config/vars';

/* Title: Migration to delocalized description
	Reason: Too much problem with localization;

	Changes:
		Previous description type and mongoose schema:
			{
				description: {
					[Key in SupportedLanguages]: string
				},
				originDescriptionLanguage: SupportedLanguages | 'undefined'
			}
		New description type and mongoose schema:
			{
				description: string
			}
*/

export const migrate = async () => {
	const client = new mongoose.mongo.MongoClient(vars.mongo.uri);
	const db = client.db();
	const events = db.collection('events');
	const eventsCursor = events.find({});

	// eslint-disable-next-line no-restricted-syntax
	for await (const event of eventsCursor) {
		if (event.description && typeof event.description === 'object') {
			const description = event.description[event.originDescriptionLang];
			await events.findOneAndUpdate(event, {
				$set: {
					description
				}
			});
		}
	}

	await eventsCursor.close();
	console.log(`Migration ${path.basename(__filename, '.ts')} successfull`);
	return 'success';
};
