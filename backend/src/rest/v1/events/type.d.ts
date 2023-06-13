import { EventOnPoster, StandardResponse } from '@common/types';
import { EventParams } from '@common/types/event';
import { FindEventParams } from '../../../controllers/events-state-controller';
import { IRouteHandler } from '../../types';

type IAddEventRoute = {
	Body: { event: EventOnPoster };
	Header: { Authorization: string };
	Reply: StandardResponse<{ id: string }>;
};
type IAddEventHandler = IRouteHandler<IAddEventRoute>;

type IGetEventRoute = {
	Reply: StandardResponse<EventOnPoster>;
	Params: EventParams;
};
type IGetEventHandler = IRouteHandler<IGetEventRoute>;

type IDeleteEventRoute = {
	Body: { id: string };
	Header: { Authorization: string };
	Reply: StandardResponse<undefined>;
};
type IDeleteEventHandler = IRouteHandler<IDeleteEventRoute>;

type IUpdateEventRoute = {
	Body: { event: EventOnPoster };
	Header: { Authorization: string };
	Reply: StandardResponse<undefined>;
};
type IUpdateEventHandler = IRouteHandler<IUpdateEventRoute>;

type IGetEventsRoute = {
	Reply: EventOnPoster[];
};
type IGetEventsHandler = IRouteHandler<IGetEventsRoute>;

type IFindEventRoute = {
	Body: FindEventParams;
	Reply: EventOnPoster[];
};
type IFindEventHandler = IRouteHandler<IFindEventRoute>;
