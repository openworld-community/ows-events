import * as yup from '../../yup';
import { toTypedSchema } from '@vee-validate/yup';
import { type Time } from '../../../common/types/event';
import {
	LINK_MAX_LENGTH,
	PRICE_MAX_VALUE,
	ORGANIZER_MAX_LENGTH,
	EVENT_DESCRIPTION_MAX_LENGTH,
	EVENT_TITLE_MAX_LENGTH,
	EVENT_ADDRESS_MAX_LENGTH,
	NUMBER_DECIMALS_BY_CURRENCY
} from '~/constants/defaultValues/validation';
import { Tags } from '../../../common/const/tags';
import type { CurrencyType } from '../../../common/const/price';

export const eventValidationSchema = toTypedSchema(
	yup.object().shape({
		title: yup.string().trim().required().max(EVENT_TITLE_MAX_LENGTH),
		organizer: yup.string().trim().max(ORGANIZER_MAX_LENGTH),
		description: yup.string().trim().required().max(EVENT_DESCRIPTION_MAX_LENGTH),
		tags: yup
			.array()
			.compact((i) => i === Tags.ONLINE)
			.max(6),
		startDate: yup.date().required(),
		startTime: yup.object().required(),
		endDate: yup
			.date()
			.nullable()
			.test('is-date-less', 'validation.test.endDate', function (endDate) {
				if (endDate) {
					const { startDate } = this.parent;

					const diff = duration(startDate, null, endDate, null);

					return diff >= 0;
				}
				return true;
			}),
		endTime: yup
			.object()
			.shape({
				hours: yup.mixed(),
				minutes: yup.mixed(),
				seconds: yup.mixed()
			})
			.nullable()
			.when(['endDate'], {
				is: (val: Date | null) => val !== null,
				then: (schema) =>
					schema
						.required()
						.test('is-time-less', 'validation.test.endTime', function (endTime: Time) {
							if (endTime) {
								const { startDate, startTime, endDate } = this.parent;

								const diff = duration(startDate, startTime, endDate, endTime);

								return diff > 0;
							}

							return true;
						})
			}),

		isOnline: yup.boolean(),
		location: yup.object().when(['isOnline'], {
			is: (val: boolean) => val !== true,
			then: (schema) =>
				schema.shape({
					country: yup.string().required(),
					city: yup.string().required(),
					address: yup.string().trim().required().max(EVENT_ADDRESS_MAX_LENGTH)
				}),
			otherwise: (schema) =>
				schema.shape({
					country: yup.string().nullable(),
					city: yup.string().nullable(),
					address: yup.string().trim().max(EVENT_ADDRESS_MAX_LENGTH).nullable()
				})
		}),

		image: yup.string(),
		price: yup.object().when(['isFree'], {
			is: (val: boolean) => val !== true,
			then: (schema) =>
				schema.shape({
					val: yup
						.number()
						.transform((val) => (isNaN(val) ? undefined : val))
						.positive()
						.max(PRICE_MAX_VALUE)

						.test('price', 'validation.test.price.bitcoin', function (val: Number) {
							const currency = this.parent.currency as CurrencyType;
							if (
								currency &&
								val &&
								(val.toString().split('.')[1]?.length >
									NUMBER_DECIMALS_BY_CURRENCY[currency] ||
									Number(val.toString().split('-')[1]) >
										NUMBER_DECIMALS_BY_CURRENCY[currency])
								//in case number less then 1 js turn it into scientific form 1e-7 so we need hack against this)
							) {
								return false;
							}

							return true;
						})

						.required(),

					currency: yup.string<CurrencyType>().required()
				})
		}),

		timezone: yup.string().required(),
		url: yup.string().isValidLink().max(LINK_MAX_LENGTH).required(),
		isFree: yup.boolean()
	})
);
