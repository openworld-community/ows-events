import { Octokit } from '@octokit/rest';
import cityTimezones from 'city-timezones';
import moment from 'moment-timezone';
import { v4 as uuid } from 'uuid';
import { EventDbEntity } from '@common/types/event';
import { ILocalizedObject } from '@common/types/localization';
import { EventTypes } from '../../../common/const/eventTypes';
import { localize } from '../utils/localization/localize';
import { sleep } from '../utils/sleep';
import { EventModel } from '../models/event.model';
import { countriesAndCitiesController } from '../controllers/countries-and-cities.controller';
import { capitalizeFirstLetter } from '../utils/capitalizeFirstLetter';

const octokit = new Octokit({
	auth: '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'
});

export const parseGithub = () => {
	const data = octokit.rest.repos.getContent({
		owner: 'philippranzhin',
		repo: 'peredelanoconf',
		path: 'upcoming-events'
	});

	data.then(async (res) => {
		if (!Array.isArray(res.data)) {
			return;
		}
		const filesArrayPromise = res.data
			.filter((file) => file.name?.split('-').length !== 1)
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
				console.log(place, country, timezoneName, timezoneOffset);
				const { localizationObject, originLanguage } = await localize(text);
				const keys = Object.keys(localizationObject);
				const localizedHtmlPromise = keys.reduce(async (lastPromise2, key) => {
					const obj = await lastPromise2;
					await sleep(300);
					const renderedText = await octokit.rest.markdown.render({
						// @ts-ignore
						text: localizationObject[key]
					});
					// @ts-ignore
					obj[key] = renderedText.data;
					return obj;
				}, Promise.resolve({} as ILocalizedObject));
				const localizedHtml = await localizedHtmlPromise;
				const event: EventDbEntity = {
					date,
					title,
					url,
					description: localizedHtml,
					creatorId: 'peredelanoParser',
					location,
					originDescriptionLanguage: originLanguage,
					timezone: {
						timezoneName,
						timezoneOffset
					},
					price: null,
					type: EventTypes.PARSED,
					durationInSeconds: 0,
					id: uuid(),
					image: ''
				};
				await EventModel.findOneAndUpdate({ url }, event, { upsert: true });
			} catch (e) {
				console.log(e);
			}
		}, Promise.resolve([]));
	});
};
