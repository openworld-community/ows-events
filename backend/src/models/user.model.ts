import mongoose, { Schema, Document } from 'mongoose';
import { UserDbEntity } from '@common/types/user';

export type IUserDocument = Document & UserDbEntity;

const schema = new Schema<IUserDocument>(
	{
		telegram: {
			id: {
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
		userInfo: {
			last_name: {
				type: String,
				default: ''
			},
			first_name: {
				type: String,
				default: ''
			},
			nickname: {
				type: String,
				default: ''
			},
			company: {
				type: String,
				default: ''
			},
			email: {
				type: String,
				default: ''
			},
			phone: {
				type: String,
				default: ''
			}
		},
		favorites: {
			type: [String]
		},
		id: {
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
