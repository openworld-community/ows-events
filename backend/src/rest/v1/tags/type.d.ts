import { EventOnPoster } from '@common/types';
import { IRouteHandler } from '../../types';

type IAddTagRoute = {
	Body: { event: EventOnPoster };
	Header: { Authorization: string };
	Reply: undefined;
};
type IAddTagHandler = IRouteHandler<IAddTagRoute>;

type IGetUsedTagsRoute = {
	Reply: string[];
};
type IGetUsedTagsHandler = IRouteHandler<IGetUsedTagsRoute>;

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
