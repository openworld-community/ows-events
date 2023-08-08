import { AggregatePaginateResult } from 'mongoose';
import { EventOnPoster } from '@common/types';
import { EventParams } from '@common/types/event';
import { PaginationOptions } from '@common/types/utils';
import { FindEventParams } from '../../../controllers/events-state-controller';
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

type IFindPaginateEventRoute = {
	Body: FindEventParams & { paginationOptions: PaginationOptions };
	Reply: AggregatePaginateResult<EventOnPoster>;
};
type IFindPaginateEventHandler = IRouteHandler<IFindPaginateEventRoute>;

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
	Body: FindEventParams;
	Reply: EventOnPoster[];
};
type IFindEventHandler = IRouteHandler<IFindEventRoute>;
