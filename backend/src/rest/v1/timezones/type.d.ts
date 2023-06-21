import { Timezone } from '@common/types/location';
import { IRouteHandler } from '../../types';

type ITimezonesRouteProps = {
	Reply: Timezone[];
};

type ITimezonesHandlerProps = IRouteHandler<ITimezonesRouteProps>;
