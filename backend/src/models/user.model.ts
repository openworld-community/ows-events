import mongoose, { Schema, Document, CallbackError } from 'mongoose';
import { UserDbEntity } from '@common/types/user';
import { createHash } from 'node:crypto';
import crypto from 'crypto';

export type IUserDocument = Document &
	UserDbEntity & {
		isValidPassword: (password: string) => boolean;
	};

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
		localAuth: {
			login: {
				type: String
			},
			password: {
				type: String
			},
			salt: {
				type: String
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

schema.pre('save', async function save(next) {
	try {
		if (!this.isModified('localAuth.password')) {
			return next();
		}
		const salt = crypto.randomBytes(16).toString('base64');
		this.localAuth.salt = salt;
		this.localAuth.password = createHash('sha256')
			.update(String(this.localAuth.password).padStart(64, salt))
			.digest('base64');

		return next();
	} catch (error) {
		return next(error as CallbackError);
	}
});

schema.methods.isValidPassword = function (password: string) {
	const receivedPassword = createHash('sha256')
		.update(String(password).padStart(64, this.salt))
		.digest('base64');
	const isCorrect = receivedPassword === this.password;
	return isCorrect;
};

export const UserModel = mongoose.model<UserDbEntity>('User', schema);
