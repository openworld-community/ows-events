import { IRouteHandler } from '../../types';

type IApproveEventRoute = {
	Header: { Authorization: string };
	Params: { eventId: string };
};
type IApproveEventHandler = IRouteHandler<IApproveEventRoute>;

type IDeclineEventRoute = {
	Header: { Authorization: string };
	Params: { eventId: string };
};
type IDeclineEventHandler = IRouteHandler<IDeclineEventRoute>;

type IGetEventsRoute = {
	Header: { Authorization: string };
	Params: { status: string };
};
type IGetEventsHandler = IRouteHandler<IGetEventsRoute>;
