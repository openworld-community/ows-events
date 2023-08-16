import { EventOnPoster } from '@common/types';
import { EventParams } from '@common/types/event';
import { SupportedLanguages } from '../../../../../common/const';
import { FindEventParams } from '../../../controllers/events-state-controller';
import { IRouteHandler } from '../../types';

type IAddEventRoute = {
	Body: { event: EventOnPoster };
	Header: { Authorization: string };
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

type IFindEventRoute = {
	Header: {
		'accept-language': SupportedLanguages;
	};
	Body: FindEventParams;
	Reply: EventOnPoster[];
};
type IFindEventHandler = IRouteHandler<IFindEventRoute>;
