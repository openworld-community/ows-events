import { StandardResponse } from "@common/types";
import { IRouteHandler } from "../../types";

type IGetCountriesRouteProps = {
  Reply: string[];
};

type IGetCountriesHandlerProps = IRouteHandler<IGetCountriesRouteProps>;

type IGetCitiesByCountryRouteProps = {
  Params: { country: string };
  Body: { country: string };
};
type IGetCitiesByCountryHandlerProps =
  IRouteHandler<IGetCitiesByCountryRouteProps>;

type IGetMetaRouteProps = {
  Params: { country: string; city: string };
  Body: StandardResponse<{
    country: string;
    city: string;
    timezone: string;
    timezoneOffset: string;
  }>;
};
type IGetMetaHandlerProps = IRouteHandler<IGetMetaRouteProps>;