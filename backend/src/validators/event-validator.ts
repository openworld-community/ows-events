import { type EventOnPoster, type PostEventPayload } from '@common/types/event';
import { EventValidatorErrorTypes } from '@common/types/event-validation-error';

type ValidateInput = PostEventPayload | { event: EventOnPoster | undefined };

type EventValidatorResult = {
	isValid: boolean;
	errors: string[];
};

const EXCLUDE_LIST = ['хуй', 'негр', 'ниггер', 'нигер'];
const EXCLUDE_LIST_REGEXP = [
	'.*расты',
	'.*расы',
	'пид(a|о|p){1}.*',
	'.*пизд.*',
	'.*ху(й|е|я|ю){1}.*',
	'.*бл(я|л|a|у){1}.*',
	'.*еби.*',
	'.*ебё.*',
	'.*ебн.*'
];

class EventsValidator {
	public validateEvent(_event: ValidateInput | undefined): EventValidatorResult {
		if (!_event) {
			return {
				isValid: false,
				errors: [EventValidatorErrorTypes.EVENT_IS_NOT_DEFINED]
			};
		}
		const { event } = _event;
		const prevalidationEventResult = this.prevalidationEvent(_event);

		if (!event) {
			return {
				isValid: false,
				errors: [EventValidatorErrorTypes.EVENT_IS_NOT_DEFINED]
			};
		}

		if (!prevalidationEventResult.isValid) {
			return prevalidationEventResult;
		}

		const titleIsClean = this.validateString(event.title);
		const descriptionIsClean = this.validateString(event.description);

		if (!titleIsClean || !descriptionIsClean) {
			const errors: string[] = [];
			if (!titleIsClean) {
				errors.push(EventValidatorErrorTypes.TITLE_IS_NOT_CLEAN);
			}
			if (!descriptionIsClean) {
				errors.push(EventValidatorErrorTypes.DESCRIPTION_IS_NOT_CLEAN);
			}
			return {
				isValid: false,
				errors
			};
		}

		return {
			isValid: true,
			errors: []
		};
	}

	public prevalidationEvent(_event: ValidateInput): EventValidatorResult {
		const { event } = _event;
		if (!event) {
			return {
				isValid: false,
				errors: [EventValidatorErrorTypes.EVENT_IS_NOT_DEFINED]
			};
		}
		const errors: string[] = [
			...this.validateTitle(event.title),
			...this.validateDescription(event.description),
			...this.validateDate(event.date),
			...this.validateDuration(event.durationInSeconds),
			...this.validateLocation(event.location),
			...this.validateImage(event.image),
			...this.validateUrl(event.url)
		];

		return {
			isValid: errors.length === 0,
			errors
		};
	}

	public validateString(line: string): boolean {
		const words = line.split(' ').filter((x) => x);
		const directIncluding = EXCLUDE_LIST.some((excludeWord) =>
			words.some((word) => {
				const isExcludeWord = excludeWord === word;
				if (isExcludeWord) {
					// eslint-disable-next-line no-console
					console.warn('directIncluding', word);
				}
				return isExcludeWord;
			})
		);

		if (directIncluding) {
			return false;
		}
		const regexpIncluding = EXCLUDE_LIST_REGEXP.some((regexp) =>
			words.some((word) => {
				const isByRegexp = new RegExp(regexp, 'gm').test(word);
				if (isByRegexp) {
					// eslint-disable-next-line no-console
					console.warn('regexpIncluding', word);
				}
				return isByRegexp;
			})
		);
		if (regexpIncluding) {
			return false;
		}
		return !directIncluding;
	}

	private validateTitle(title: string): string[] {
		const errors: string[] = [];
		if (!title) {
			errors.push(EventValidatorErrorTypes.TITLE_IS_NOT_DEFINED);
		} else if (title.length < 3) {
			errors.push(EventValidatorErrorTypes.TITLE_IS_TOO_SHORT);
		} else if (title.length > 100) {
			errors.push(EventValidatorErrorTypes.TITLE_IS_TOO_LONG);
		}
		return errors;
	}

	private validateDescription(description: string): string[] {
		const errors: string[] = [];
		if (!description) {
			errors.push(EventValidatorErrorTypes.DESCRIPTION_IS_NOT_DEFINED);
		} else if (description.length < 30) {
			errors.push(EventValidatorErrorTypes.DESCRIPTION_IS_TOO_SHORT);
		} else if (description.length > 1000) {
			errors.push(EventValidatorErrorTypes.DESCRIPTION_IS_TOO_LONG);
		}
		return errors;
	}

	private validateDate(date: number): string[] {
		const errors: string[] = [];
		if (!date) {
			errors.push(EventValidatorErrorTypes.START_DATE_IS_NOT_DEFINED);
		} else if (date < Date.now()) {
			errors.push(EventValidatorErrorTypes.START_DATE_IS_IN_THE_PAST);
		}
		return errors;
	}

	private validateDuration(duration: number): string[] {
		const errors: string[] = [];
		if (duration && duration < 0) {
			errors.push(EventValidatorErrorTypes.DURATION_IS_NEGATIVE);
		}
		return errors;
	}

	private validateLocation(location: { country: string; city: string }): string[] {
		const errors: string[] = [];

		if (!location) {
			errors.push(EventValidatorErrorTypes.LOCATION_IS_NOT_DEFINED);
		} else {
			if (!location.country) {
				errors.push(EventValidatorErrorTypes.COUNTRY_IS_NOT_DEFINED);
			}
			if (!location.city) {
				errors.push(EventValidatorErrorTypes.CITY_IS_NOT_DEFINED);
			}
		}

		return errors;
	}

	private validateImage(image: string): string[] {
		const errors: string[] = [];
		if (!image) {
			return [];
		}
		if (image.length < 3) {
			errors.push(EventValidatorErrorTypes.IMAGE_LINK_IS_TOO_SHORT);
		} else if (image.length > 100) {
			errors.push(EventValidatorErrorTypes.IMAGE_LINK_IS_TOO_LONG);
		}
		return errors;
	}

	private validateUrl(url: string): string[] {
		const errors: string[] = [];
		if (!url) {
			errors.push(EventValidatorErrorTypes.URL_IS_NOT_DEFINED);
		} else if (url.length < 3) {
			errors.push(EventValidatorErrorTypes.URL_IS_TOO_SHORT);
		} else if (url.length > 100) {
			errors.push(EventValidatorErrorTypes.URL_IS_TOO_LONG);
		}
		return errors;
	}
}

export const eventsValidator = new EventsValidator();
