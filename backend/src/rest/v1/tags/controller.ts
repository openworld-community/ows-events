import jwt from 'jsonwebtoken';
import { EventOnPoster } from '@common/types';
import { CommonErrorsEnum } from '../../../../../common/const';
import { eventsStateController } from '../../../controllers/events-state-controller';
import {
	IAddTagHandler,
	IGetAllTagsHandler,
    IGetTagByEventHandler,
	IDeleteTagsHandler,
} from './type';
import { ITokenData } from '../../types';
import { vars } from '../../../config/vars';

export const addTags: IAddTagHandler = async (request) => {
	const { event } = request.body;

	const response = await eventsStateController.addTags(event);

	return { newtag: response };
};

export const getAllTags: IGetAllTagsHandler = async () => {
	const response = await eventsStateController.findAllTags()

    return response;
}

export const getTagByEventId: IGetTagByEventHandler = async (request) => {
	const eventId = request.params.id;
	const response = await eventsStateController.findTagsByEventId(eventId)

    return response
}

export const deleteTag: IDeleteTagsHandler = async (request) => {
    const { id, tags } = request.body.event;
    if(!tags || !id) throw new Error(CommonErrorsEnum.NO_PAYLOAD_PROVIDED);
	const response = await eventsStateController.removeTags(id, tags)
    return response;
}

