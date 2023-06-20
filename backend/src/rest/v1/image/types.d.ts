import { StandardResponse } from '@common/types';
import { IRouteHandler } from '../../types';

type IDeleteImageRouteProps = {
	Body: { path: string };
	Reply: StandardResponse<undefined>;
};
type IDeleteImageHandlerProps = IRouteHandler<IDeleteImageRouteProps>;

type IAddImageRouteProps = {
	Body: { image: string };
	Reply: StandardResponse<{ path: string }>;
};
type IAddImageHandlerProps = IRouteHandler<IAddImageRouteProps>;
