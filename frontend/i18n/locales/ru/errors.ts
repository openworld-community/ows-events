import { type ErrorCodes } from '@/../common/const';
import { CommonErrorsEnum, EventValidatorErrorTypes } from '@/../common/const';

const ServerErrors: {
	[key in ErrorCodes]: string;
} = {
	[EventValidatorErrorTypes.EVENT_IS_NOT_DEFINED]: 'Мероприятие не определено',
	TITLE_IS_NOT_DEFINED: 'Заголовок не определен',
	TITLE_IS_TOO_SHORT: 'Заголовок слишком короткий',
	TITLE_IS_TOO_LONG: 'Заголовок слишком длинный',
	DESCRIPTION_IS_NOT_DEFINED: 'Описание не определено',
	DESCRIPTION_IS_TOO_SHORT: 'Описание слишком короткое',
	DESCRIPTION_IS_TOO_LONG: 'Описание слишком длинное',
	START_DATE_IS_NOT_DEFINED: 'Дата начала не определена',
	START_DATE_IS_IN_THE_PAST: 'Дата начала в прошлом',
	DURATION_IS_NEGATIVE: 'Длительность отрицательная',
	LOCATION_IS_NOT_DEFINED: 'Место проведения не определено',
	COUNTRY_IS_NOT_DEFINED: 'Страна не определена',
	CITY_IS_NOT_DEFINED: 'Город не определен',
	IMAGE_LINK_IS_TOO_SHORT: 'Ссылка на изображение слишком короткая',
	IMAGE_LINK_IS_TOO_LONG: 'Ссылка на изображение слишком длинная',
	URL_IS_NOT_DEFINED: 'Ссылка на мероприятие не определена',
	URL_IS_TOO_SHORT: 'Ссылка на мероприятие слишком короткая',
	URL_IS_TOO_LONG: 'Ссылка на мероприятие слишком длинная',
	TITLE_IS_NOT_CLEAN: 'В заголовоке ненормативная лексика',
	DESCRIPTION_IS_NOT_CLEAN: 'В описании ненормативная лексика',
	[CommonErrorsEnum.EVENT_NOT_FOUND]: 'Мероприятие не найдено',
	'image-addition-error': 'Ошибка при добавлении изображения',
	'image-deletion-error': 'Ошибка при удалении изображения',
	'image-encoding-problem': 'Ошибка формата изображения',
	'image-too-large': 'Файл изображения слишком большой',
	'no-image-to-add': 'Файл изображения не найден',
	'no-image-to-delete': 'Файл изображения не найден',
	'paymant-info-file-parse-error': 'Ошибка при ',
	'payment-info-file-not-exist': 'Метод оплаты не задан',
	'payment-info-not-found': 'Метод оплаты не найден',
	'unknown-image-route-error': 'Непредвиденная ошибка при обработке изображения',
	'wrong-token': 'Ваш токен авторизации поврежден',
	forbidden: 'Ошибка допуска',
	unauthorized: 'У вас нет доступа к данному ресурсу',
	'event-already-exists': 'Данное мероприятие	уже существует',
	'event-sent-on-moderation': 'Мероприятие отправлено на модерацию',
	'no-payload-provided': 'ОТправлен пустой запрос',
	'timezone-city-not-found': 'Не удалось найти часовой пояс по указанным параметрам',
	'user-does-not-exist': 'Пользователь не найден'
};

export default ServerErrors;
