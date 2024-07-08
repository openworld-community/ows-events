import { CommonErrorsEnum } from './common-errors';
import { EventValidatorErrorTypes } from './event-validation-error';
import { SupportedLanguages, SupportedLanguagesArray } from './supportedLanguages';
import { SupportedCountries } from './supportedCountries';

export {
	CommonErrorsEnum,
	EventValidatorErrorTypes,
	SupportedLanguages,
	SupportedLanguagesArray,
	SupportedCountries
};
export type ErrorCodes = EventValidatorErrorTypes | CommonErrorsEnum;
