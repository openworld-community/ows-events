import { TGUser } from '@common/types/user';
import { IRouteHandler } from '../../types';

export type ITelegramRoute = {
	Querystring: TGUser;
};

export type ITelegramHandler = IRouteHandler<ITelegramRoute>;

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
