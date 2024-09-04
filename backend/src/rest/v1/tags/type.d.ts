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

type IGetUsedTagsByCityRoute = {
	Params: { cityName: string };
	Reply: string[];
};
type IGetUsedTagsByCityHandler = IRouteHandler<IGetUsedTagsByCityRoute>;

type IGetUsedTagsByCountryRoute = {
	Params: { countryName: string };
	Reply: string[];
};
type IGetUsedTagsByCountryHandler = IRouteHandler<IGetUsedTagsByCountryRoute>;

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
