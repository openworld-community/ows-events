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

	test('should translate russian name Санкт-Петербург to english name Saint Petersburg', async () => {
		const testData = {
			input: 'Санкт-Петербург',
			output: 'Saint Petersburg'
		};
		const result = await translatePeredelanoPlaceName(testData.input);
		expect(result).toEqual(testData.output);
	});

	test('should translate russian name Черногория to english name Montenegro', async () => {
		const testData = {
			input: 'Черногория',
			output: 'Montenegro'
		};
		const result = await translatePeredelanoPlaceName(testData.input);
		expect(result).toEqual(testData.output);
	});

	test('should translate russian name Лондон to english name London', async () => {
		const testData = {
			input: 'Лондон',
			output: 'London'
		};
		const result = await translatePeredelanoPlaceName(testData.input);
		expect(result).toEqual(testData.output);
	});

	test('should translate russian name Париж to english name Paris', async () => {
		const testData = {
			input: 'Париж',
			output: 'Paris'
		};
		const result = await translatePeredelanoPlaceName(testData.input);
		expect(result).toEqual(testData.output);
	});

	test('should translate russian name Будапешт to english name Budapest', async () => {
		const testData = {
			input: 'Будапешт',
			output: 'Budapest'
		};
		const result = await translatePeredelanoPlaceName(testData.input);
		expect(result).toEqual(testData.output);
	});

	test('should translate russian name Милан to english name Milan', async () => {
		const testData = {
			input: 'Милан',
			output: 'Milan'
		};
		const result = await translatePeredelanoPlaceName(testData.input);
		expect(result).toEqual(testData.output);
	});

	test('should translate russian name Копенгаген to english name Copenhagen', async () => {
		const testData = {
			input: 'Копенгаген',
			output: 'Copenhagen'
		};
		const result = await translatePeredelanoPlaceName(testData.input);
		expect(result).toEqual(testData.output);
	});

	test('should translate russian name Стокгольм to english name Stockholm', async () => {
		const testData = {
			input: 'Стокгольм',
			output: 'Stockholm'
		};
		const result = await translatePeredelanoPlaceName(testData.input);
		expect(result).toEqual(testData.output);
	});

	test('should translate russian name Лиссабон to english name Lisbon', async () => {
		const testData = {
			input: 'Лиссабон',
			output: 'Lisbon'
		};
		const result = await translatePeredelanoPlaceName(testData.input);
		expect(result).toEqual(testData.output);
	});

	test('should translate russian name Дубай to english name Dubai', async () => {
		const testData = {
			input: 'Дубай',
			output: 'Dubai'
		};
		const result = await translatePeredelanoPlaceName(testData.input);
		expect(result).toEqual(testData.output);
	});

	test('should translate russian name Пномпень to english name Phnom Penh', async () => {
		const testData = {
			input: 'Пномпень',
			output: 'Phnom Penh'
		};
		const result = await translatePeredelanoPlaceName(testData.input);
		expect(result).toEqual(testData.output);
	});

	test('should translate russian name Германия to english name Germany', async () => {
		const testData = {
			input: 'Ханой',
			output: 'Hanoi'
		};
		const result = await translatePeredelanoPlaceName(testData.input);
		expect(result).toEqual(testData.output);
	});

	test('should translate russian name Душанбе to english name Dushanbe', async () => {
		const testData = {
			input: 'Душанбе',
			output: 'Dushanbe'
		};
		const result = await translatePeredelanoPlaceName(testData.input);
		expect(result).toEqual(testData.output);
	});

	test('should translate russian name Германия to english name Germany', async () => {
		const testData = {
			input: 'Баку',
			output: 'Baku'
		};
		const result = await translatePeredelanoPlaceName(testData.input);
		expect(result).toEqual(testData.output);
	});

	test('should translate russian name Бали to english name Bali', async () => {
		const testData = {
			input: 'Бали',
			output: 'Bali'
		};
		const result = await translatePeredelanoPlaceName(testData.input);
		expect(result).toEqual(testData.output);
	});

	test('should translate russian name Стамбул to english name Istanbul', async () => {
		const testData = {
			input: 'Стамбул',
			output: 'Istanbul'
		};
		const result = await translatePeredelanoPlaceName(testData.input);
		expect(result).toEqual(testData.output);
	});

	test('should translate russian name Кейптаун to english name Cape Town', async () => {
		const testData = {
			input: 'Кейптаун',
			output: 'Cape Town'
		};
		const result = await translatePeredelanoPlaceName(testData.input);
		expect(result).toEqual(testData.output);
	});

	test('should translate russian name Тбилиси to english name Tbilisi', async () => {
		const testData = {
			input: 'Тбилиси',
			output: 'Tbilisi'
		};
		const result = await translatePeredelanoPlaceName(testData.input);
		expect(result).toEqual(testData.output);
	});

	test('should translate russian name Ташкент to english name Tashkent', async () => {
		const testData = {
			input: 'Ташкент',
			output: 'Tashkent'
		};
		const result = await translatePeredelanoPlaceName(testData.input);
		expect(result).toEqual(testData.output);
	});

	test('should translate russian name Сингапур to english name Singapore', async () => {
		const testData = {
			input: 'Сингапур',
			output: 'Singapore'
		};
		const result = await translatePeredelanoPlaceName(testData.input);
		expect(result).toEqual(testData.output);
	});

	test('should translate russian name Манила to english name Manila', async () => {
		const testData = {
			input: 'Манила',
			output: 'Manila'
		};
		const result = await translatePeredelanoPlaceName(testData.input);
		expect(result).toEqual(testData.output);
	});

	test('should translate russian name Осло to english name Oslo', async () => {
		const testData = {
			input: 'Осло',
			output: 'Oslo'
		};
		const result = await translatePeredelanoPlaceName(testData.input);
		expect(result).toEqual(testData.output);
	});

	test('should translate russian name Анкара to english name Ankara', async () => {
		const testData = {
			input: 'Анкара',
			output: 'Ankara'
		};
		const result = await translatePeredelanoPlaceName(testData.input);
		expect(result).toEqual(testData.output);
	});

	test('should translate russian name Вроцлав to english name Wroclaw', async () => {
		const testData = {
			input: 'Вроцлав',
			output: 'Wroclaw'
		};
		const result = await translatePeredelanoPlaceName(testData.input);
		expect(result).toEqual(testData.output);
	});

	test('should translate russian name Любляна to english name Ljubljana', async () => {
		const testData = {
			input: 'Любляна',
			output: 'Ljubljana'
		};
		const result = await translatePeredelanoPlaceName(testData.input);
		expect(result).toEqual(testData.output);
	});

	test('should translate russian name Вена to english name Vienna', async () => {
		const testData = {
			input: 'Вена',
			output: 'Vienna'
		};
		const result = await translatePeredelanoPlaceName(testData.input);
		expect(result).toEqual(testData.output);
	});

	test('should translate russian name Дублин to english name Dublin', async () => {
		const testData = {
			input: 'Дублин',
			output: 'Dublin'
		};
		const result = await translatePeredelanoPlaceName(testData.input);
		expect(result).toEqual(testData.output);
	});

	test('should translate russian name Батуми to english name Batumi', async () => {
		const testData = {
			input: 'Батуми',
			output: 'Batumi'
		};
		const result = await translatePeredelanoPlaceName(testData.input);
		expect(result).toEqual(testData.output);
	});

	test('should translate russian name Астана to english name Astana', async () => {
		const testData = {
			input: 'Астана',
			output: 'Astana'
		};
		const result = await translatePeredelanoPlaceName(testData.input);
		expect(result).toEqual(testData.output);
	});

	test('should translate russian name Пхукет to english name Phuket', async () => {
		const testData = {
			input: 'Пхукет',
			output: 'Phuket'
		};
		const result = await translatePeredelanoPlaceName(testData.input);
		expect(result).toEqual(testData.output);
	});
	test('should translate russian name Анталия to english name Antalya', async () => {
		const testData = {
			input: 'Анталия',
			output: 'Antalya'
		};
		const result = await translatePeredelanoPlaceName(testData.input);
		expect(result).toEqual(testData.output);
	});
	test('should translate russian name Ереван to english name Yerevan', async () => {
		const testData = {
			input: 'Ереван',
			output: 'Yerevan'
		};
		const result = await translatePeredelanoPlaceName(testData.input);
		expect(result).toEqual(testData.output);
	});
	test('should translate russian name Бишкек to english name Bishkek', async () => {
		const testData = {
			input: 'Бишкек',
			output: 'Bishkek'
		};
		const result = await translatePeredelanoPlaceName(testData.input);
		expect(result).toEqual(testData.output);
	});
	test('should translate russian name Амстердам to english name Amsterdam', async () => {
		const testData = {
			input: 'Амстердам',
			output: 'Amsterdam'
		};
		const result = await translatePeredelanoPlaceName(testData.input);
		expect(result).toEqual(testData.output);
	});
	test('should translate russian name Буэнос-Айрес to english name Buenos Aires', async () => {
		const testData = {
			input: 'Буэнос-Айрес',
			output: 'Buenos Aires'
		};
		const result = await translatePeredelanoPlaceName(testData.input);
		expect(result).toEqual(testData.output);
	});
	test('should translate russian name Кипр to english name Cyprus', async () => {
		const testData = {
			input: 'Кипр',
			output: 'Cyprus'
		};
		const result = await translatePeredelanoPlaceName(testData.input);
		expect(result).toEqual(testData.output);
	});
	test('should translate russian name Германия to english name Germany', async () => {
		const testData = {
			input: 'Германия',
			output: 'Germany'
		};
		const result = await translatePeredelanoPlaceName(testData.input);
		expect(result).toEqual(testData.output);
	});

	test('should translate russian name Алматы to english name Almaty', async () => {
		const testData = {
			input: 'Алматы',
			output: 'Almaty'
		};
		const result = await translatePeredelanoPlaceName(testData.input);
		expect(result).toEqual(testData.output);
	});

	test('should translate russian name Бангкок to english name Bangkok', async () => {
		const testData = {
			input: 'Бангкок',
			output: 'Bangkok'
		};
		const result = await translatePeredelanoPlaceName(testData.input);
		expect(result).toEqual(testData.output);
	});
});
