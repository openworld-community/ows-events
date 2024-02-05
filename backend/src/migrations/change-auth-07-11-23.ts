import path from 'path';
import mongoose from 'mongoose';
import { vars } from '../config/vars';

/*  Title: Migration to change user structure
	Reason: Addition of custom user info and preparation to use multiple auth services;

	Changes:
		Previous user type and mongoose schema:
			{
				telegram: {
					id: string;
					first_name: string;
					last_name: string;
					username: string;
					photo_url: string;
					auth_date: number;
				};
				userInfo: {
					last_name: string;
					first_name: string;
					nickname: string;
					company: string;
					email: string;
					phone: string;
				};
				token: string;
			}
		New user type and mongoose schema:
			{
				telegram: {
					id: string;
					first_name: string;
					last_name: string;
					username: string;
					photo_url: string;
					auth_date: number;
				};
				userInfo: {
					last_name: string;
					first_name: string;
					nickname: string;
					company: string;
					email: string;
					phone: string;
				};
				id: string;
			}
*/

export const migrate = () => {
	const client = new mongoose.mongo.MongoClient(vars.mongo.uri);
	const db = client.db();
	const users = db.collection('users');
	users
		.updateMany({ id: { $exists: false } }, [
			{
				$addFields: {
					id: '$telegram.id'
				}
			}
		])
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
