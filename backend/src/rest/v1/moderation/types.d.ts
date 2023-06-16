import { IRouteHandler } from '../../types';

type IApproveEventRoute = {
	Body: {
		eventId: string;
	};
};
type IApproveEventHandler = IRouteHandler<IApproveEventRoute>;

type IDeclineEventRoute = {
	Body: {
		eventId: string;
	};
};
type IDeclineEventHandler = IRouteHandler<IDeclineEventRoute>;

type IGetEventsRoute = {
	Body: {
		status?: string;
	};
};
type IGetEventsHandler = IRouteHandler<IGetEventsRoute>;
