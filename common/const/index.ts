import { CommonErrorsEnum } from './common-errors';
import { EventValidatorErrorTypes } from './event-validation-error';

export { CommonErrorsEnum, EventValidatorErrorTypes };
export type ErrorCodes = EventValidatorErrorTypes | CommonErrorsEnum;
