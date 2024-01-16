import path from 'path';
import mongoose from 'mongoose';
import { vars } from '../config/vars';

export const migrate = async () => {
	const client = new mongoose.mongo.MongoClient(vars.mongo.uri);
	const db = client.db();
	const events = db.collection('events');

	const pipeline = [
		{
			$match: {
				isOnline: {
					$exists: false
				}
			}
		},
		{
			$addFields: {
				isOnline: false
			}
		},
		{
			$merge: {
				into: 'events',
				on: '_id',
				whenMatched: 'replace',
				whenNotMatched: 'insert'
			}
		}
	];

	try {
		const res = await events.aggregate(pipeline).toArray();
		// eslint-disable-next-line no-console
		console.log(res);
		// eslint-disable-next-line no-console
		console.log(`Migration ${path.basename(__filename, '.ts')} successfull`);
	} catch (e) {
		// eslint-disable-next-line no-console
		console.log(`MigrationError: migration ${path.basename(__filename, '.ts')}`);
		// eslint-disable-next-line no-console
		console.error(e);
	}
};
