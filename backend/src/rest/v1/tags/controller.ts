// import jwt from 'jsonwebtoken';
import { CommonErrorsEnum } from '../../../../../common/const';
import { eventsStateController } from '../../../controllers/events-state-controller';
import {
	// IAddTagHandler,
	IGetUsedTagsHandler,
	IGetTagByEventHandler
	// IDeleteTagsHandler
} from './type';
// import { ITokenData } from '../../types';
// import { vars } from '../../../config/vars';

// export const addTags: IAddTagHandler = async (request) => {
// 	const { event } = request.body;
// 	if (!event) throw new Error(CommonErrorsEnum.NO_PAYLOAD_PROVIDED);
// 	const token = request.headers.authorization;
// 	if (!token) throw new Error(CommonErrorsEnum.UNAUTHORIZED);
//
// 	const jwtData = jwt.verify(token, vars.secret) as ITokenData;
// 	if (!jwtData.id) throw new Error(CommonErrorsEnum.WRONG_TOKEN);
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
// 	const jwtData = jwt.verify(token, vars.secret) as ITokenData;
// 	if (!jwtData.id) throw new Error(CommonErrorsEnum.WRONG_TOKEN);
//
// 	event.creatorId = jwtData.id;
// 	const response = await eventsStateController.removeTags(event);
//
// 	return response;
// };
