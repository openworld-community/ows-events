import { LocalAuthInfo, TGUser } from '@common/types/user';
import { IRouteHandler } from '../../types';

export type ITelegramRoute = {
	Querystring: TGUser;
};

export type ITelegramHandler = IRouteHandler<ITelegramRoute>;

export type ILocalSignupRoute = {
	Body: LocalAuthInfo;
};

export type ILocalSignupHandler = IRouteHandler<ILocalSignupRoute>;

export type ILocalAuthRoute = {
	Body: LocalAuthInfo;
};

export type ILocalAuthHandler = IRouteHandler<ILocalAuthRoute>;

export type ISignoutRoute = {
	Headers: {
		Authorization: string;
	};
};

export type ISignoutHandler = IRouteHandler<ISignoutRoute>;

export type ISignoutEverywhereRoute = {
	Headers: {
		Authorization: string;
	};
};

export type ISignoutEverywhereHandler = IRouteHandler<ISignoutEverywhereRoute>;
