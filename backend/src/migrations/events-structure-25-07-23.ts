import path from 'path';
import mongoose from 'mongoose';
import { vars } from '../config/vars';


export const migrate = () => {
	const client = new mongoose.mongo.MongoClient(vars.mongo.uri);
	const db = client.db();
	const events = db.collection('events');
	events
		.updateMany(
            { },
            [{ $addFields: {
                    type: {
                        $cond: [ {$eq: ['$creatorId', 'parser'] }, 'parsed', 'user-generated' ]
                    }
                }
            }]
        )
		.then((res) => {
			// eslint-disable-next-line no-console
			console.log(`Migration ${path.basename(__filename, '.ts')} successfull`);
			// eslint-disable-next-line no-console
			console.log(res);
		})
		.catch((e) => {
			// eslint-disable-next-line no-console
			console.log(`MigrationError: migration ${path.basename(__filename, '.ts')}`);
			// eslint-disable-next-line no-console
			console.error(e);
		});
};
