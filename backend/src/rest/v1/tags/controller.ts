import { CommonErrorsEnum } from '../../../../../common/const';
import { eventsStateController } from '../../../controllers/events-state-controller';
import {
	// IAddTagHandler,
	IGetUsedTagsHandler,
	IGetTagByEventHandler,
	IGetUsedTagsByCityHandler,
	IGetUsedTagsByCountryHandler
	// IDeleteTagsHandler
} from './type';
import { transformFromQuery } from '../../../utils/cityNameTransform';

// export const addTags: IAddTagHandler = async (request) => {
// 	const { event } = request.body;
// 	if (!event) throw new Error(CommonErrorsEnum.NO_PAYLOAD_PROVIDED);
// 	const token = request.headers.authorization;
// 	if (!token) throw new Error(CommonErrorsEnum.UNAUTHORIZED);
//
// 	const isTokenValid = UserTokenController.checkAccessToken(token);
// 	if (!isTokenValid) throw new Error(CommonErrorsEnum.WRONG_TOKEN);
// 	const jwtData = JWTController.decodeToken(token);
//
// 	event.creatorId = jwtData.id;
// 	const response = await eventsStateController.addTags(event);
//
// 	return { newtag: response };
// };

export const getUsedTags: IGetUsedTagsHandler = async () => {
	const response = await eventsStateController.findUsedTags();

	return response;
};

export const getUsedTagsByCity: IGetUsedTagsByCityHandler = async (request) => {
	const city = transformFromQuery(request.params.cityName);
	const response = await eventsStateController.findUsedTagsByCity(city);

	return response;
};

export const getUsedTagsByCountry: IGetUsedTagsByCountryHandler = async (request) => {
	const country = transformFromQuery(request.params.countryName);
	const response = await eventsStateController.findUsedTagsByCountry(country);

	return response;
};

export const getTagByEventId: IGetTagByEventHandler = async (request) => {
	const eventId = request.params.id;
	if (!eventId) throw new Error(CommonErrorsEnum.NO_PAYLOAD_PROVIDED);
	const response = await eventsStateController.findTagsByEventId(eventId);

	return response;
};

// export const deleteTag: IDeleteTagsHandler = async (request) => {
// 	const { event } = request.body;
// 	if (!event.tags || !event.id) throw new Error(CommonErrorsEnum.NO_PAYLOAD_PROVIDED);
// 	const token = request.headers.authorization;
// 	if (!token) throw new Error(CommonErrorsEnum.UNAUTHORIZED);
//
// 	const isTokenValid = UserTokenController.checkAccessToken(token);
// 	if (!isTokenValid) throw new Error(CommonErrorsEnum.WRONG_TOKEN);
// 	const jwtData = JWTController.decodeToken(token);
//
// 	event.creatorId = jwtData.id;
// 	const response = await eventsStateController.removeTags(event);
//
// 	return response;
// };
