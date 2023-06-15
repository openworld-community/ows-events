import { eventsValidator } from './event-validator';

const listWithBadWords: string[] = [
	'пидор',
    'пидорас',
    'пидорок',
    'пидр',
	'негр',
	'пизда',
	'хуе',
	'блять',
	'ебал',
	'ебло',
	'ебля',
	'ебу',
	'еби',
	'ебёт',
	'ебнутый',
	'хуею'
];

const listWithoutBadWords = ['test'];

listWithBadWords.forEach((badWord) => {
	if (eventsValidator.validateString(badWord)) {
		console.error(`Bad word ${badWord} is not validated`);
	}
});

listWithoutBadWords.forEach((goodWord) => {
	if (!eventsValidator.validateString(goodWord)) {
		console.error(`Good word ${goodWord} is validated`);
	}
});
