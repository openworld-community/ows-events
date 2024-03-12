import { CommonErrorsEnum, EventValidatorErrorTypes } from '../../../../common/const';

export default {
	[EventValidatorErrorTypes.EVENT_IS_NOT_DEFINED]: 'Event is not defined',
	[EventValidatorErrorTypes.TITLE_IS_NOT_DEFINED]: 'Title is not defined',
	[EventValidatorErrorTypes.TITLE_IS_TOO_SHORT]: 'Title is too short',
	[EventValidatorErrorTypes.TITLE_IS_TOO_LONG]: 'Title is too long',
	[EventValidatorErrorTypes.DESCRIPTION_IS_NOT_DEFINED]: 'Description is not defined',
	[EventValidatorErrorTypes.DESCRIPTION_IS_TOO_SHORT]: 'Description is too short',
	[EventValidatorErrorTypes.DESCRIPTION_IS_TOO_LONG]: 'Description is too long',
	[EventValidatorErrorTypes.START_DATE_IS_NOT_DEFINED]: 'Start date is not defined',
	[EventValidatorErrorTypes.START_DATE_IS_IN_THE_PAST]: 'Start date is in the past',
	[EventValidatorErrorTypes.DURATION_IS_NEGATIVE]: 'Duration is negative',
	[EventValidatorErrorTypes.LOCATION_IS_NOT_DEFINED]: 'Location is not defined',
	[EventValidatorErrorTypes.COUNTRY_IS_NOT_DEFINED]: 'Country is not defined',
	[EventValidatorErrorTypes.CITY_IS_NOT_DEFINED]: 'City is not defined',
	[EventValidatorErrorTypes.IMAGE_LINK_IS_TOO_SHORT]: 'Image link is too short',
	[EventValidatorErrorTypes.IMAGE_LINK_IS_TOO_LONG]: 'Image link is too long',
	[EventValidatorErrorTypes.URL_IS_NOT_DEFINED]: 'Event URL is not defined',
	[EventValidatorErrorTypes.URL_IS_TOO_SHORT]: 'Event URL is too short',
	[EventValidatorErrorTypes.URL_IS_TOO_LONG]: 'Event URL is too long',
	[EventValidatorErrorTypes.TITLE_IS_NOT_CLEAN]: 'Inappropriate language in the title',
	[EventValidatorErrorTypes.DESCRIPTION_IS_NOT_CLEAN]:
		'Inappropriate language in the description',
	[CommonErrorsEnum.EVENT_NOT_FOUND]: 'Event not found',
	[CommonErrorsEnum.IMAGE_ADDITION_ERROR]: 'Error adding image',
	[CommonErrorsEnum.IMAGE_DELETION_ERROR]: 'Error deleting image',
	[CommonErrorsEnum.IMAGE_ENCODING_ERROR]: 'Image format error',
	[CommonErrorsEnum.IMAGE_TOO_LARGE]: 'Image file is too large',
	[CommonErrorsEnum.NO_IMAGE_TO_ADD]: 'Image file not found',
	[CommonErrorsEnum.NO_IMAGE_TO_DELETE]: 'Image file not found',
	[CommonErrorsEnum.PAYMENT_INFO_FILE_PARSE_ERROR]: 'Error in ',
	[CommonErrorsEnum.PAYMENT_INFO_FILE_NOT_EXIST]: 'Payment method not specified',
	[CommonErrorsEnum.PAYMENT_INFO_NOT_FOUND]: 'Payment method not found',
	[CommonErrorsEnum.UNKNOWN_IMAGE_ROUTE_ERROR]: 'Unexpected error while processing the image',
	[CommonErrorsEnum.WRONG_TOKEN]: 'Your authentication token is invalid',
	[CommonErrorsEnum.FORBIDDEN]: 'Access error',
	[CommonErrorsEnum.UNAUTHORIZED]: "You don't have access to this resource",
	[CommonErrorsEnum.EVENT_ALREADY_EXISTS]: 'This event already exists',
	[CommonErrorsEnum.EVENT_SENT_ON_MODERATION]: 'Event sent for moderation',
	[CommonErrorsEnum.NO_PAYLOAD_PROVIDED]: 'Empty request payload sent',
	[CommonErrorsEnum.TIMEZONE_CITY_NOT_FOUND]:
		'Could not find a time zone for the specified parameters',
	[CommonErrorsEnum.USER_DOES_NOT_EXIST]: 'User not found',
	[CommonErrorsEnum.USER_ALREADY_EXIST]: 'User already exists',
	[CommonErrorsEnum.PASSWORD_TOO_SHORT]: 'Password must be longer than 4 symbols',
	[CommonErrorsEnum.PASSWORD_TOO_LONG]: 'Password must be no longer than 24 symbols',
	[CommonErrorsEnum.PASSWORD_MISMATCH]: 'Password doesn\'t match',
	[CommonErrorsEnum.INVALID_EMAIL]: 'Enter a valid email address',
	[CommonErrorsEnum.REQUIRED_FIELD]: 'This field is required',
};
