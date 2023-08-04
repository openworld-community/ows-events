import fs from 'fs';
import { IAddRegistrationHandler } from './type';
import { CommonErrorsEnum } from '../../../../../common/const';

// eslint-disable-next-line consistent-return
export const addRegistration: IAddRegistrationHandler = async (request) => {
	const data = await request.body;
	if (!data) throw new Error(CommonErrorsEnum.NO_PAYLOAD_PROVIDED);

	const oldRegistrations = !fs.existsSync('assets/db/registrations.json')
		? '[]'
		: fs.readFileSync('assets/db/registrations.json', 'utf-8') || '[]';

	const registrations = JSON.parse(oldRegistrations);

	registrations.push({ ...data, date: new Date() });

	fs.writeFileSync('assets/db/registrations.json', JSON.stringify(registrations, null, 2));
};
