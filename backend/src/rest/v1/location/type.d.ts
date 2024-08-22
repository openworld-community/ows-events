import { Timezone } from '@common/types/location';
import { IRouteHandler } from '../../types';
import { SupportedLanguages } from '../../../../../common/const';

type IGetCountriesRouteProps = {
	Reply: Promise<string[]>;
};

type IGetCountriesHandlerProps = IRouteHandler<IGetCountriesRouteProps>;

type IGetCitiesRouteProps = {
	Reply: Promise<string[]>;
};

type IGetCitiesHandlerProps = IRouteHandler<IGetCitiesRouteProps>;

type IGetCitiesByCountryRouteProps = {
	Params: { country: SupportedCountries };
	Body: { country: string };
};
type IGetCitiesByCountryHandlerProps = IRouteHandler<IGetCitiesByCountryRouteProps>;

type IGetLocalizedCityRouteProps = {
	Headers: {
		'accept-language': SupportedLanguages;
	};
	Params: { city: string };
};
type IGetLocalizedCityHandlerProps = IRouteHandler<IGetLocalizedCityRouteProps>;

type IGetLocalizedCountryRouteProps = {
	Headers: {
		'accept-language': SupportedLanguages;
	};
	Params: { country: string };
};
type IGetLocalizedCountryHandlerProps = IRouteHandler<IGetLocalizedCountryRouteProps>;

type IGetMetaRouteProps = {
	Params: { country: string; city: string };
	Reply: {
		country: string;
		city: string;
	} & Timezone;
};
type IGetMetaHandlerProps = IRouteHandler<IGetMetaRouteProps>;

type IGetUsedCitiesRouteProps = {
	Body: { country: string };
};
type IGetUsedCitiesHandlerProps = IRouteHandler<IGetUsedCitiesRouteProps>;
