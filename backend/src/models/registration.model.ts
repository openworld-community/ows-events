import mongoose, { Schema, Document } from 'mongoose';
import { Registration } from '@common/types/registration';

export type IRegistrationDocument = Document & Registration;

const schema = new Schema<IRegistrationDocument>(
	{
		id: {
			type: String,
			required: true
		},
		eventId: {
			type: String,
			required: true
		},
		telegramNickname: {
			type: String,
			required: true
		},
		name: {
			type: String,
			required: true
		},
		profession: {
			type: String,
			required: true
		},
		workplace: {
			type: String,
			required: true
		},
		experienceInStartups: {
			type: String,
			required: true
		},
		fromYouKnow: {
			type: String,
			required: true
		},
		beenEarly: {
			type: String,
			required: true
		},
		fromWhichCity: {
			type: String,
			required: true
		},
		email: {
			type: String,
			required: true
		},
		personaldataAgree: {
			type: Boolean,
			required: true
		},
		feeAgree: {
			type: Boolean,
			required: true
		}
	},
	{
		versionKey: false,
		timestamps: true
	}
);

schema.index({
	title: 'text',
	description: 'text',
	'location.city': 'text',
	'location.country': 'text'
});

export const RegistrationModel = mongoose.model<Registration>('Registration', schema);
