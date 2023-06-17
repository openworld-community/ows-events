import { TGUser } from '@common/types/user';
import { IRouteHandler } from '../../types';

export type ITelegramRoute = {
	Querystring: TGUser;
};

export type ITelegramHandler = IRouteHandler<ITelegramRoute>;
