import { EventOnPoster } from '@common/types';
import {
	EventParams,
	PaginationCityQueryPayload,
	PaginationQueryPayload,
	SearchEventCityPayload,
	SearchEventPayload
} from '@common/types/event';
import { AggregatePaginateResult } from 'mongoose';
import { SupportedLanguages } from '../../../../../common/const';
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

type IFindEventsCityRoute = {
	Header: {
		'accept-language': SupportedLanguages;
	};
	Body: SearchEventCityPayload;
	Params: { cityName: string };
	Reply: EventOnPoster[];
};
type IFindEventsCityHandler = IRouteHandler<IFindEventsCityRoute>;

type IFindEventsCountryRoute = {
	Header: {
		'accept-language': SupportedLanguages;
	};
	Body: SearchEventCityPayload;
	Params: { countryName: string };
	Reply: EventOnPoster[];
};
type IFindEventsCountryHandler = IRouteHandler<IFindEventsCountryRoute>;

type IFindEventsCountryPaginatedRoute = {
	Header: {
		'accept-language': SupportedLanguages;
	};
	Body: PaginationCityQueryPayload;
	Params: { countryName: string };
	Reply: AggregatePaginateResult<EventOnPoster>;
};
type IFindEventsCountryPaginatedHandler = IRouteHandler<IFindEventsCountryPaginatedRoute>;

type IFindEventsCityPaginatedRoute = {
	Header: {
		'accept-language': SupportedLanguages;
	};
	Body: PaginationCityQueryPayload;
	Params: { cityName: string };
	Reply: AggregatePaginateResult<EventOnPoster>;
};
type IFindEventsCityPaginatedHandler = IRouteHandler<IFindEventsCityPaginatedRoute>;

type IFindEventPaginatedRoute = {
	Header: {
		'accept-language': SupportedLanguages;
	};
	Body: PaginationQueryPayload;
	Reply: AggregatePaginateResult<EventOnPoster>;
};
type IFindEventPaginatedHandler = IRouteHandler<IFindEventPaginatedRoute>;
