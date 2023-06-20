export enum CommonErrorsEnum {
	UNAUTHORIZED = 'unauthorized',
	WRONG_TOKEN = 'wrong-token',
	FORBIDDEN = 'forbidden',
	EVENT_NOT_FOUND = 'event-not-found',
	NO_IMAGE_TO_DELETE = 'no-image-to-delete',
	IMAGE_DELETION_ERROR = 'image-deletion-error',
	NO_IMAGE_TO_ADD = 'no-image-to-add',
	IMAGE_ENCODING_ERROR = 'image-encoding-problem',
	IMAGE_ADDITION_ERROR = 'image-addition-error',
	IMAGE_TOO_LARGE = 'image-too-large',
	UNKNOWN_IMAGE_ROUTE_ERROR = 'unknown-image-route-error',
	PAYMENT_INFO_NOT_FOUND = 'payment-info-not-found',
	PAYMENT_INFO_FILE_NOT_EXIST = 'payment-info-file-not-exist',
	PAYMENT_INFO_FILE_PARSE_ERROR = 'paymant-info-file-parse-error',
	EVENT_ALREADY_EXISTS = 'event-already-exists'
}
