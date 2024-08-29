import { EventOnPoster } from '@common/types';
import { EventParams, SearchEventPayload } from '@common/types/event';
import { SupportedLanguages } from '../../../../../common/const';
import { IRouteHandler } from '../../types';

type IAddEventRoute = {
	Body: { event: EventOnPoster };
	Reply: { id: string };
};
type IAddEventHandler = IRouteHandler<IAddEventRoute>;

type IGetEventRoute = {
	Header: {
		'Accept-Language': SupportedLanguages;
	};
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
	Header: {
		'accept-language': SupportedLanguages;
	};
	Reply: EventOnPoster[];
};
type IGetEventsHandler = IRouteHandler<IGetEventsRoute>;

type IGetMyEventsRoute = {
	Header: {
		Authorization: string;
		'accept-language': SupportedLanguages;
	};
	Reply: EventOnPoster[];
};
type IGetMyEventsHandler = IRouteHandler<IGetMyEventsRoute>;

type IFindEventRoute = {
	Header: {
		'accept-language': SupportedLanguages;
	};
	Body: SearchEventPayload;
	Reply: EventOnPoster[];
};
type IFindEventHandler = IRouteHandler<IFindEventRoute>;
