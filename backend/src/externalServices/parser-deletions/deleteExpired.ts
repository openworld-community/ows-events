import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { vars } from '../../config/vars';

dotenv.config();

export async function deleteExpired() {
	const client = new mongoose.mongo.MongoClient(vars.mongo.uri);

	try {
		await client.connect();
		console.log('Connected successfully to MongoDB');
		const database = client.db('dev');
		const collection = database.collection('events');

		// Получаем текущую дату и отнимаем один день
		const oneDayAgo = new Date();
		oneDayAgo.setDate(oneDayAgo.getDate() - 1);

		// Запрос на удаление событий, которые закончились и имеют durationInSeconds = 0
		const result = await collection.deleteMany({
			date: { $lt: oneDayAgo.getTime() },
			durationInSeconds: 0
		});

		console.log(`${result.deletedCount} events were deleted.`);
	} finally {
		await client.close();
		console.log('MongoDB connection closed');
	}
}

// eslint-disable-next-line no-console
export const deleteExpiredWrapper = () =>
	deleteExpired().then(() => {
		console.log('Expired events deleted');
	});
// deleteExpired();
