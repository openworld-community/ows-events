import { Timezone } from '@common/types/location';
import { IRouteHandler } from '../../types';

type IGetCountriesRouteProps = {
	Reply: string[];
};

type IGetCountriesHandlerProps = IRouteHandler<IGetCountriesRouteProps>;

type IGetCitiesByCountryRouteProps = {
	Params: { country: string };
	Body: { country: string };
};
type IGetCitiesByCountryHandlerProps = IRouteHandler<IGetCitiesByCountryRouteProps>;

type IGetMetaRouteProps = {
	Params: { country: string; city: string };
	Reply: {
		country: string;
		city: string;
	} & Timezone;
};
type IGetMetaHandlerProps = IRouteHandler<IGetMetaRouteProps>;
