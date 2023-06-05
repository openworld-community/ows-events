import { StandardResponse } from "@common/types";
import { IRouteHandler } from "../../types";

type ITimezonesRouteProps = {
  Reply: StandardResponse<
    {
      timezoneName: string;
      timezoneOffset: string;
    }[]
  >;
};

type ITimezonesHandlerProps = IRouteHandler<ITimezonesRouteProps>;
