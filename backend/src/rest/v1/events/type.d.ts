import { EventOnPoster } from '@common/types';
import { EventParams, SearchEventPayload } from '@common/types/event';
import { IRouteHandler } from '../../types';

type IAddEventRoute = {
	Body: { event: EventOnPoster };
	Header: { Authorization: string };
	Reply: { id: string };
};
type IAddEventHandler = IRouteHandler<IAddEventRoute>;

type IGetEventRoute = {
	Reply: EventOnPoster;
	Params: EventParams;
};
type IGetEventHandler = IRouteHandler<IGetEventRoute>;

type IDeleteEventRoute = {
	Body: { id: string };
	Header: { Authorization: string };
	Reply: undefined;
};
type IDeleteEventHandler = IRouteHandler<IDeleteEventRoute>;

type IUpdateEventRoute = {
	Body: { event: EventOnPoster };
	Header: { Authorization: string };
	Reply: undefined;
};
type IUpdateEventHandler = IRouteHandler<IUpdateEventRoute>;

type IGetEventsRoute = {
	Reply: EventOnPoster[];
};
type IGetEventsHandler = IRouteHandler<IGetEventsRoute>;

type IFindEventRoute = {
	Body: SearchEventPayload;
	Reply: EventOnPoster[];
};
type IFindEventHandler = IRouteHandler<IFindEventRoute>;
