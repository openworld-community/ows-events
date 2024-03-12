import { Schema, model, ObjectId } from 'mongoose';
import { IUserDocument } from './user.model';

export enum UserTokenTypes {
	ACCESS = 'access',
	CONFIRM = 'confirm',
	RESET_PASSWORD = 'reset_password'
}
export const USER_TOKEN_TYPES_ARRAY = Object.values(UserTokenTypes);

export interface IUserToken {
	token: string;
	user: ObjectId | IUserDocument;
	type: UserTokenTypes;
	expiresAt: Date;
	createdAt?: Date;
	updatedAt?: Date;
}

const schema = new Schema<IUserToken>(
	{
		token: {
			type: String,
			required: true,
			unique: true
		},
		user: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true
		},
		type: {
			type: String,
			required: true,
			enum: USER_TOKEN_TYPES_ARRAY
		},
		expiresAt: {
			type: Date
		}
	},
	{
		versionKey: false,
		timestamps: true,
		autoCreate: true
	}
);

export const UserTokenModel = model<IUserToken>('UserToken', schema);
