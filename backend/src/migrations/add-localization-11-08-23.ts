import mongoose from 'mongoose';
import { vars } from '../config/vars';
// import { sleep } from '../utils/sleep';
import { SupportedLanguages, SupportedLanguagesArray } from '../../../common/const';
import { compareArrays } from '../utils/compareArrays';
import { localize } from '../utils/localization/localize';
import { sleep } from '../utils/sleep';

/*  Title: Migration to localized description
	Reason: Need to translate description to user language;

	Changes:
		Previous description type and mongoose schema:
			{
				description: string
			}
		New description type and mongoose schema:
			{
				description: {
					[Key in SupportedLanguages]: string
				},
				originDescriptionLanguage: SupportedLanguages | 'undefined'
			}
*/

export const migrate = async () => {
	const client = new mongoose.mongo.MongoClient(vars.mongo.uri);
	const db = client.db();
	const events = db.collection('events');
	const eventsCursor = events.find({});

	// eslint-disable-next-line no-restricted-syntax
	for await (const event of eventsCursor) {
		const existingLanguages = Object.keys(event.description) as SupportedLanguages[];
		if (!compareArrays(existingLanguages, SupportedLanguagesArray)) {
			const eventDescription =
				event.description !== '' ? event.description : 'No description';
			await sleep(100);
			const localizedDescription = await localize(eventDescription);
			await events.findOneAndUpdate(event, {
				$set: {
					description: localizedDescription.localizationObject,
					originDescriptionLang: localizedDescription.originLanguage
				}
			});
		}
	}

	await eventsCursor.close();
	return 'success';
};
