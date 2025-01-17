import type {
	IEventSitemapData,
	ICitySitemapData,
	ICountrySitemapData
} from '@common/types/service';
import { SupportedLanguages } from '../../../../../common/const';
import type { IRouteHandler } from '../../types';

export type IGetEventsSitemapDataRoute = {
	Header: {
		'accept-language': SupportedLanguages;
	};
	Reply: IEventSitemapData[];
};
export type IGetEventsSitemapDataHandler = IRouteHandler<IGetEventsSitemapDataRoute>;

export type IGetCitiesSitemapDataRoute = {
	Header: {
		'accept-language': SupportedLanguages;
	};
	Reply: ICitySitemapData[];
};
export type IGetCitiesSitemapDataHandler = IRouteHandler<IGetCitiesSitemapDataRoute>;

export type IGetCountriesSitemapDataRoute = {
	Header: {
		'accept-language': SupportedLanguages;
	};
	Reply: ICountrySitemapData[];
};
export type IGetCountriesSitemapDataHandler = IRouteHandler<IGetCountriesSitemapDataRoute>;
