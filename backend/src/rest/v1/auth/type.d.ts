import { PublicLocalAuthData, TGUserData } from '@common/types/user';
import { IRouteHandler } from '../../types';

export type ITelegramRoute = {
	Querystring: TGUserData;
};

export type ITelegramHandler = IRouteHandler<ITelegramRoute>;

export type IGoogleRoute = {
	Body: {
		credential: string;
	};
};

export type IGoogleHandler = IRouteHandler<IGoogleRoute>;

export type ILocalSignupRoute = {
	Body: PublicLocalAuthData;
};

export type ILocalSignupHandler = IRouteHandler<ILocalSignupRoute>;

export type ILocalAuthRoute = {
	Body: PublicLocalAuthData;
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
