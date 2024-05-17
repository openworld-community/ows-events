import mongoose, { Schema, Document, CallbackError } from 'mongoose';
import { UserDbEntity } from '@common/types/user';
import { createHash } from 'node:crypto';
import crypto from 'crypto';
import { UserRoles, UserRolesArray } from '../../../common/const/userRoles';

export type IUserDocument = Document &
	UserDbEntity & {
		isValidPassword: (password: string) => boolean;
	};

const schema = new Schema<IUserDocument>(
	{
		telegram: {
			id: {
				type: String
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
		google: {
			userid: {
				type: String
			},
			exp: {
				type: Number
			},
			iat: {
				type: Number
			}
		},
		localAuth: {
			email: {
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
		},
		role: {
			type: String,
			enum: UserRolesArray,
			default: UserRoles.USER
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

// eslint-disable-next-line func-names
schema.methods.isValidPassword = function (password: string) {
	const receivedPassword = createHash('sha256')
		.update(String(password).padStart(64, this.localAuth.salt))
		.digest('base64');
	const isCorrect = receivedPassword === this.localAuth.password;
	return isCorrect;
};

export const UserModel = mongoose.model<UserDbEntity>('User', schema);
