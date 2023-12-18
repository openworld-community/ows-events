import mongoose from 'mongoose';
import { describe, expect, test, beforeAll, afterAll } from '@jest/globals';
import { vars } from '../src/config/vars';
import { translatePeredelanoPlaceName } from '../src/externalServices/translationForParser';

const { mongo } = vars;

describe('test places translations for peredelanoconf parser', () => {
	beforeAll(async () => {
		await mongoose.connect(mongo.uri);
	});

	afterAll(async () => {
		await mongoose.connection.close();
	});

	test('should translate russian name of city or country to english', async () => {
		const testCity = {
			russian: 'Санкт-Петербург',
			english: 'St. Petersburg'
		};
		const result = await translatePeredelanoPlaceName(testCity.russian);
		expect(result).toEqual(testCity.english);
	});
});
