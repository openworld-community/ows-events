import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

export async function deleteByTitle(eventTitles: string[]) {
	const uri = process.env.MONGO_URII;
	if (!uri) {
		throw new Error('MONGO_URI is not defined in the environment variables.');
	}
	const client = new MongoClient(uri);
	try {
		await client.connect();
		console.log("Connected successfully to MongoDB");
		const db = client.db('dev');
		const collection = db.collection('events');

		await Promise.all(
			eventTitles.map(async (eventTitle: string) => {
				// Находим все события с заданным именем
				const events = await collection
					.find({ title: eventTitle })
					.sort({ date: -1 })
					.toArray();

				if (events.length === 0) {
					console.log(`No events found with the name '${eventTitle}'.`);
					return; // Прерываем выполнение для текущего события
				}

				const idsToDelete = events.slice(1).map((event) => event._id);

				if (idsToDelete.length > 0) {
					const deleteResult = await collection.deleteMany({ _id: { $in: idsToDelete } });
					console.log(
						`Deleted ${deleteResult.deletedCount} events with the name '${eventTitle}', keeping the latest one.`
					);
				} else {
					console.log(`Only one event found named '${eventTitle}', nothing to delete.`);
				}
			})
		);
	} catch (error) {
		console.error('An error occurred while removing events:', error);
	} finally {
		await client.close();
		console.log('MongoDB connection closed');
	}
}
// const titlesToDelete = [
//     "Museum of Broken Relationships",
//     "Permanent Vacation",
//     "Belgrade Sightseeing by Bus",
//     "Shifted order",
//     "CIRKOBALKANA",
//     "Fragilities",
//     "The magic of the ancient",
//     "After Sugimoto",
//     "Balkan food frestival",
//     "Bitef",
//     "C’est la Magie",
//     "Sweetsor",
//     "Belgrade SAXperience",
//     "Ljubica Radovic",
// ];
// deleteByTitle(titlesToDelete)