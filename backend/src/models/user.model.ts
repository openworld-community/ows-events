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
		userNickName: {
			type: String,
			required: true
		},
		firstNickName: {
			type: String,
			required: true
		},
		lastNickName: {
			type: String,
			required: true
		}
	},
	{
		versionKey: false,
		timestamps: true
	}
);

export const UserModel = mongoose.model<UserDbEntity>('User', schema);
