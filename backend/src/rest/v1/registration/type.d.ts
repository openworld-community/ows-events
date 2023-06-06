import { Registration } from "@common/types/registration";
import { StandardResponse } from "@common/types";
import { IRouteHandler } from "../../types";

type IAddRegistrationRoute = {
  Body: Registration;
  Reply: StandardResponse<Registration>;
};

type IAddRegistrationHandler = IRouteHandler<IAddRegistrationRoute>;
