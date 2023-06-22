import mongoose, { Schema, Document } from 'mongoose';
import { UserDbEntity } from '@common/types/user';

export type IUserDocument = Document & UserDbEntity;

const schema = new Schema<IUserDocument>(
	{
		id: {
			type: String,
			required: true
		},
		token: {
			type: String,
			required: true
		},
		username: {
			type: String
		},
		first_name: {
			type: String
		},
		last_name: {
			type: String
		},
		photo_url: {
			type: String
		},
		auth_date: {
			type: Number
		}
	},
	{
		versionKey: false,
		timestamps: true
	}
);

export const UserModel = mongoose.model<UserDbEntity>('User', schema);
