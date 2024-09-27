import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config()

export async function deleteExpired() {
	const uri = process.env.MONGO_URII;
	if (!uri) {
		throw new Error('MONGO_URI is not defined in the environment variables.');
	}
	const client = new MongoClient(uri);

	try {
		await client.connect();
		console.log("Connected successfully to MongoDB");
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

// deleteExpired();