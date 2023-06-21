import { IRouteHandler } from '../../types';

type IDeleteImageRouteProps = {
	Body: { path: string };
	Reply: undefined;
};
type IDeleteImageHandlerProps = IRouteHandler<IDeleteImageRouteProps>;

type IAddImageRouteProps = {
	Body: { image: string };
	Reply: { path: string };
};
type IAddImageHandlerProps = IRouteHandler<IAddImageRouteProps>;
