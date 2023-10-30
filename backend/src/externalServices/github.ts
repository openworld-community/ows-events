import { Octokit } from '@octokit/rest';
import cityTimezones from 'city-timezones';
import moment from 'moment-timezone';
import { EventDbEntity } from '@common/types/event';
import { EventTypes } from '../../../common/const/eventTypes';
import { sleep } from '../utils/sleep';
import { EventModel } from '../models/event.model';
import { countriesAndCitiesController } from '../controllers/countries-and-cities.controller';
import { capitalizeFirstLetter } from '../utils/capitalizeFirstLetter';
import { vars } from '../config/vars';

const octokit = new Octokit({
	auth: vars.apiKeys.github.parsing
});

export const parseGithub = () => {
	const data = octokit.rest.repos.getContent({
		owner: 'philippranzhin',
		repo: 'peredelanoconf',
		path: 'upcoming-events'
	});

	data.then(async (res: any) => {
		if (!Array.isArray(res.data)) {
			return;
		}
		const filesArrayPromise = res.data
			.filter((file: any) => file.name?.split('-').length !== 1)
			.reduce(async (lastPromise: any, metadata: any) => {
				const accum = await lastPromise;
				await sleep(300);
				const fileData = await octokit.rest.repos.getContent({
					owner: 'philippranzhin',
					repo: 'peredelanoconf',
					path: metadata.path
				});
				return [...accum, fileData];
			}, Promise.resolve([]));
		const filesArray = await filesArrayPromise;
		filesArray.reduce(async (lastPromise: any, file: any) => {
			try {
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				const accum = await lastPromise;
				await sleep(300);
				// @ts-ignore
				const buf = Buffer.from(file.data.content, 'base64');
				const text = buf.toString('utf-8');
				// @ts-ignore
				const splittedName: string[] = file.data.name.split('-');
				if (splittedName.length === 1) return;
				const strDate = splittedName.pop()?.split('.').slice(0, -1).reverse().join('-');
				if (!strDate) return;
				const date = new Date(strDate).getTime();
				const place = splittedName.map(capitalizeFirstLetter).join(' ');
				const country = countriesAndCitiesController.getCountryByCity(place);
				const title = `Peredelanoconf ${splittedName}`;
				const url =
					text
						.split('(')
						?.filter((item) => item.trim().startsWith('https://t.me/'))[0]
						?.split(')')[0]
						?.trim() || '';
				const location = {
					country,
					city: place,
					address: ''
				};
				const timezoneName =
					cityTimezones.lookupViaCity(place)[0]?.timezone ||
					cityTimezones.findFromCityStateProvince(place)[0]?.timezone ||
					cityTimezones.findFromCityStateProvince(country)[0]?.timezone;
				const timezoneOffset = moment.tz(timezoneName).format('Z');
				const renderedText = await octokit.rest.markdown.render({
					text,
					context: 'philippranzhin/peredelanoconf'
				});
				const fixedLinksText = renderedText.data.replace(
					/(\/\.\/)/gi,
					'https://github.com/philippranzhin/peredelanoconf/blob/main/'
				);
				const removeHeadingLinksText = fixedLinksText.replace(
					/<a class="heading-link\b[^>]*>(.*?)<\/a>/gi,
					'$1'
				);
				const event: EventDbEntity = {
					date,
					title,
					url,
					description: removeHeadingLinksText,
					creatorId: 'peredelanoParser',
					location,
					timezone: {
						timezoneName,
						timezoneOffset
					},
					price: null,
					type: EventTypes.PARSED,
					durationInSeconds: 0,
					id: file.data.name.replace('.md', ''),
					image: ''
				};
				await EventModel.findOneAndUpdate({ url }, event, { upsert: true });
			} catch (e) {
				console.log(e);
			}
		}, Promise.resolve([]));
		// eslint-disable-next-line no-console
	}).then(() => console.log('Peredelano events from Github parsed succesfully'));
};
