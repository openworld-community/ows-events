import { UserInfo } from '@common/types/user';
import { EventOnPoster } from '@common/types';
import { IRouteHandler } from '../../types';

type IGetTGInfoRoute = {
	Querystring: {
		token: string;
	};
};
type IGetTGInfoHandler = IRouteHandler<IGetTGInfoRoute>;

type IGetUserInfoRoute = {
	Querystring: {
		token: string;
	};
};
type IGetUserInfoHandler = IRouteHandler<IGetUserInfoRoute>;

type IChangeUserInfoRoute = {
	Body: { userInfo: UserInfo };
	Header: { Authorization: string };
};
type IChangeUserInfoHandler = IRouteHandler<IChangeUserInfoRoute>;

type IAddFavoriteEventRoute = {
	Body: { eventId: string };
	Header: { Authorization: string };
};
type IAddFavoriteEventHandler = IRouteHandler<IAddFavoriteEventRoute>;

type IRemoveFavoriteEventRoute = {
	Body: { eventId: string };
	Header: { Authorization: string };
};
type IRemoveFavoriteEventHandler = IRouteHandler<IRemoveFavoriteEventRoute>;

type IGetFavoriteEventsIdRoute = {
	Header: { Authorization: string };
	Reply: string[];
};
type IGetFavoriteEventsIdHandler = IRouteHandler<IGetFavoriteEventsIdRoute>;

type IGetFavoriteEventsRoute = {
	Header: { Authorization: string };
	Reply: EventOnPoster[];
};
type IGetFavoriteEventsHandler = IRouteHandler<IGetFavoriteEventsRoute>;
