import fs from 'fs';
import { IAddRegistrationHandler } from './type';

// eslint-disable-next-line consistent-return
export const addRegistration: IAddRegistrationHandler = async (request) => {
	const data = await request.body;
	if (!data) {
		return {
			type: 'error'
		};
	}

	const oldRegistrations = !fs.existsSync('assets/db/registrations.json')
		? '[]'
		: fs.readFileSync('assets/db/registrations.json', 'utf-8') || '[]';

	const registrations = JSON.parse(oldRegistrations);

	registrations.push({ ...data, date: new Date() });

	fs.writeFileSync('assets/db/registrations.json', JSON.stringify(registrations, null, 2));
};
