import { CommonErrorsEnum } from './common-errors';
import { EventValidatorErrorTypes } from './event-validation-error';
import { SupportedLanguages, SupportedLanguagesArray } from './supportedLanguages';

export { CommonErrorsEnum, EventValidatorErrorTypes, SupportedLanguages, SupportedLanguagesArray };
export type ErrorCodes = EventValidatorErrorTypes | CommonErrorsEnum;
