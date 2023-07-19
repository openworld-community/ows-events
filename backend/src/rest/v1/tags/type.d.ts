import { EventOnPoster } from '@common/types';
import { EventParams } from '@common/types/event';
import { FindEventParams } from '../../../controllers/events-state-controller';
import { IRouteHandler } from '../../types';

type IAddTagRoute = {
	Body: { event: EventOnPoster };
	Header: { Authorization: string };
	Reply: undefined;
};
type IAddTagHandler = IRouteHandler<IAddTagRoute>;

type IGetAllTagsRoute = {
    Reply: string[];
};
type IGetAllTagsHandler = IRouteHandler<IGetAllTagsRoute>;

type IDeleteTagsRoute = {
	Body: { event: EventOnPoster };
	Header: { Authorization: string };
	Reply: undefined;
};
type IDeleteTagsHandler = IRouteHandler<IDeleteTagsRoute>;

type IGetTagByEventRoute = {
    Params: { id: string };
    Reply: string[];
};
type IGetTagByEventHandler = IRouteHandler<IGetTagByEventRoute>;

