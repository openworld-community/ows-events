import PublicGoogleSheetsParser from 'public-google-sheets-parser';
import { Octokit } from '@octokit/rest';
import moment from 'moment-timezone';
import cityTimezones from 'city-timezones';
import { EventOnPoster } from '@common/types';
import { countriesAndCitiesController } from '../controllers/countries-and-cities.controller';
import { EventTypes } from '../../../common/const/eventTypes';
import { translatePeredelanoPlaceName } from './translationForParser';
import { eventsStateController } from '../controllers/events-state-controller';
import { vars } from '../config/vars';

type ParsedEvent = {
	id: number;
	continent: string;
	city: string;
	link: string;
	date?: string;
	img: string;
	'github repository'?: string;
	description: string;
	price?: number;
	discount?: number;
	'partner price'?: number;
};

const googleSheetId = vars.apiKeys.googledocs.peredelanoConfSheetId;
const githubKey = vars.apiKeys.github.parsing;

const getHTMLFromGithubMD = async (link: string) => {
	const octokit = new Octokit({
		auth: githubKey
	});

	try {
		const fileData = await octokit.rest.repos.getContent({
			owner: 'philippranzhin',
			repo: 'peredelanoconf',
			path: link
		});
		// @ts-ignore
		const buf = Buffer.from(fileData.data.content, 'base64');
		const text = buf.toString('utf-8');
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
		return removeHeadingLinksText;
	} catch (e) {
		return null;
	}
};
export const parsePeredelano = () => {
	if (googleSheetId !== '' && githubKey !== '') return;

	const parser = new PublicGoogleSheetsParser(googleSheetId);

	parser.parse().then((events: ParsedEvent[]) => {
		events.forEach(async (event) => {
			if (!event.date) return;
			const tmpEventDate = event.date.match(/(\(.*?\))/);
			if (!tmpEventDate) return;
			if (!tmpEventDate[0]) return;
			const eventDateArr = tmpEventDate[0].slice(1, -1).split(',');
			if (!eventDateArr[0] || !eventDateArr[1] || !eventDateArr[2]) return;
			const eventDate = new Date(
				Number(eventDateArr[0]),
				Number(eventDateArr[1]),
				Number(eventDateArr[2])
			);
			const place = await translatePeredelanoPlaceName(event.city);
			if (!place?.name) return;
			const eventTitle = `Peredelano ${event.city}`;
			const eventCity = place.type === 'city' ? place.name : 'Unknown';
			const eventCountry =
				place.type === 'country'
					? place.name
					: countriesAndCitiesController.getCountryByCity(eventCity);
			const eventImg = event.img;
			const eventLink = event.link;
			const eventTimezoneName =
				cityTimezones.lookupViaCity(eventCity)[0]?.timezone ||
				cityTimezones.findFromCityStateProvince(eventCountry)[0]?.timezone;
			const eventTimezoneOffset = moment.tz(eventTimezoneName).format('Z');
			const hasGithub = !!event['github repository'];
			const githubDirectory = event['github repository']
				?.replace('https://github.com/philippranzhin/peredelanoconf/blob/main/', '')
				.split('/')[0];
			const githubFilename = event['github repository']
				?.replace('https://github.com/philippranzhin/peredelanoconf/blob/main/', '')
				.split('/')[1]
				.split('-')[0];
			const formattedGithubLink = `${githubDirectory}/${githubFilename}.md`;
			const parsedMarkdown = hasGithub
				? await getHTMLFromGithubMD(formattedGithubLink)
				: null;
			const eventDescription =
				hasGithub && parsedMarkdown ? parsedMarkdown : event.description;
			const location = {
				country: eventCountry,
				city: eventCity,
				address: ''
			};
			const hasEventPrice = event.price && event['partner price'] && event.discount;
			const eventPrice = hasEventPrice
				? {
						maxValue: event.price || null,
						minValue: event['partner price'] || event.discount || null,
						value: event.discount || event.price || event['partner price'] || null,
						currency: 'USD'
				  }
				: null;

			const eventData: EventOnPoster = {
				date: eventDate.getTime(),
				title: eventTitle,
				url: eventLink,
				description: eventDescription,
				creatorId: 'peredelanoParser',
				location,
				timezone: {
					timezoneName: eventTimezoneName,
					timezoneOffset: eventTimezoneOffset
				},
				price: eventPrice,
				type: EventTypes.PARSED,
				durationInSeconds: 0,
				id: `${eventTitle}-${eventDate.toISOString().split('T')[0]}`,
				image: eventImg
			};
			await eventsStateController.addEvent(eventData);
		});
	});
};
