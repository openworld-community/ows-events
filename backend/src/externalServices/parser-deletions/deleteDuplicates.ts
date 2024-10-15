import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { vars } from '../../config/vars';

dotenv.config();

export async function deleteDuplicates() {
	const client = new mongoose.mongo.MongoClient(vars.mongo.uri);

	try {
		await client.connect();
		console.log('Connected successfully to MongoDB');
		const db = client.db('dev');
		const collection = db.collection('events');

		// Поиск дубликатов
		const duplicates = await collection
			.aggregate([
				{
					$group: {
						_id: {
							title: '$title',
							date: '$date',
							description: '$description',
							image: '$image'
						},
						uniqueIds: { $addToSet: '$_id' },
						count: { $sum: 1 }
					}
				},
				{
					$match: { count: { $gt: 1 } }
				}
			])
			.toArray();

		// Проверка наличия дубликатов и их удаление
		const totalDuplicatesRemoved = await Promise.all(
			duplicates.map(async (doc) => {
				const duplicateIds = doc.uniqueIds.slice(1); // Оставляем один документ
				const { deletedCount } = await collection.deleteMany({
					_id: { $in: duplicateIds }
				});
				return deletedCount;
			})
		).then((results) => results.reduce((acc, count) => acc + count, 0));

		if (totalDuplicatesRemoved === 0) {
			console.log('No duplicates found.');
		} else {
			console.log(`Duplicates removed: ${totalDuplicatesRemoved}`);
		}
	} catch (error) {
		console.error('An error occurred while removing duplicates:', error);
	} finally {
		await client.close();
		console.log('MongoDB connection closed');
	}
}

// eslint-disable-next-line no-console
export const deleteDuplicatesWrapper = () =>
	deleteDuplicates().then(() => {
		console.log('Duplicate events deleted');
	});

// deleteDuplicates();
