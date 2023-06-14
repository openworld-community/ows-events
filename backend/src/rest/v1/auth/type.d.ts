import { TGUser } from '@common/types/user';
import { IRouteHandler } from '../../types';

export type ITelegramRoute = {
	Body: TGUser;
};

export type ITelegramHandler = IRouteHandler<ITelegramRoute>;
