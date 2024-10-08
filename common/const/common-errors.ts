export enum CommonErrorsEnum {
	UNAUTHORIZED = 'unauthorized',
	WRONG_TOKEN = 'wrong_token',
	FORBIDDEN = 'forbidden',
	EVENT_NOT_FOUND = 'event_not_found',
	NO_IMAGE_TO_DELETE = 'no_image_to_delete',
	IMAGE_DELETION_ERROR = 'image_deletion_error',
	NO_IMAGE_TO_ADD = 'no_image_to_add',
	IMAGE_ENCODING_ERROR = 'image_encoding_problem',
	IMAGE_ADDITION_ERROR = 'image_addition_error',
	IMAGE_TOO_LARGE = 'image_too_large',
	UNKNOWN_IMAGE_ROUTE_ERROR = 'unknown_image_route_error',
	PAYMENT_INFO_NOT_FOUND = 'payment_info_not_found',
	PAYMENT_INFO_FILE_NOT_EXIST = 'payment_info_file_not_exist',
	TIMEZONE_CITY_NOT_FOUND = 'timezone_city_not_found',
	USER_DOES_NOT_EXIST = 'user_does_not_exist',
	USER_ALREADY_EXIST = 'user_already_exist',
	WRONG_LOGIN_OR_PASSWORD = 'wrong_login_or_password',
	NO_PAYLOAD_PROVIDED = 'no_payload_provided',
	PAYMENT_INFO_FILE_PARSE_ERROR = 'paymant_info_file_parse_error',
	EVENT_ALREADY_EXISTS = 'event_already_exists',
	EVENT_SENT_ON_MODERATION = 'event_sent_on_moderation',
	// юзкейсы ошибок выше не пока не нашел, но енум через дефисы не хавает
	PASSWORD_TOO_SHORT = 'PASSWORD_TOO_SHORT',
	PASSWORD_TOO_LONG = 'PASSWORD_TOO_LONG',
	PASSWORD_MISMATCH = 'PASSWORD_MISMATCH',
	INVALID_EMAIL = 'INVALID_EMAIL',
	REQUIRED_FIELD = 'REQUIRED_FIELD',
	// Для страниц ошибок
	ERROR_PAGE_ERROR = 'ERROR_PAGE_ERROR',
	ERROR_PAGE_PAGE = 'ERROR_PAGE_PAGE',
	ERROR_PAGE_NOT_FOUND = 'ERROR_PAGE_NOT_FOUND',
	ERROR_PAGE_GO_HOME = 'ERROR_PAGE_GO_HOME',
	ERROR_PAGE_SERVER_ERROR = 'ERROR_PAGE_SERVER_ERROR',
	ERROR_DEFAULT_MESSAGE = 'ERROR_DEFAULT_MESSAGE',
	NOT_FOUND_BY_ID = 'NOT_FOUND_BY_ID',
	CITY_NOT_FOUND = 'CITY_NOT_FOUND',
	COUNTRY_NOT_FOUND = 'COUNTRY_NOT_FOUND',
	NO_EVENTS_IN_CITY = 'NO_EVENTS_IN_CITY',
	NO_EVENTS_IN_COUNTRY = 'NO_EVENTS_IN_COUNTRY'
}
