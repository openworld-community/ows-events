import fs from "fs";
import fsP from "fs/promises";
import { PaymentInfo } from "@common/types/payment-info";
import { eventsStateController } from "../../../controllers/events-state-controller";
import {
  IGetJSONPaymentInfoHandlerProps,
  IGetPaymentInfoHandlerProps,
} from "./type";

export const getPaymentInfo: IGetPaymentInfoHandlerProps = async (request) => {
  const event = eventsStateController.getEvent(request.params.id);
  if (!event) {
    return {
      type: "error",
      errors: ["Event not found"],
    };
  }

  const paymentsFileMd = `assets/presets/${request.params.id}.md`;
  if (fs.existsSync(paymentsFileMd)) {
    return {
      type: "success",
      data: {
        event,
        paymentsInfo: {
          id: event.id,
          type: "markdown",
          source: fs.readFileSync(paymentsFileMd, "utf-8"),
        },
      },
    };
  }

  const paymentsFile = "assets/presets/payments-info.json";

  const paymentsInfo = JSON.parse(
    fs.existsSync(paymentsFile)
      ? fs.readFileSync(paymentsFile, "utf-8")
      : "[]" || "[]"
  ) as PaymentInfo[];

  if (!paymentsInfo?.length) {
    return {
      type: "error",
      errors: ["Payments not found"],
    };
  }

  const eventPaymentsInfo = paymentsInfo.filter(
    (p) => p.id === request.params.id
  );

  return {
    type: "success",
    data: {
      event,
      paymentsInfo: eventPaymentsInfo[0],
    },
  };
};

export const getJSONPaymentInfo: IGetJSONPaymentInfoHandlerProps = async (
  request
) => {
  const eventId = request.params.id;
  const data = await fsP.readFile("assets/presets/payments-info.json", {
    encoding: "utf-8",
  });
  if (!data) {
    return {
      type: "error",
    };
  }
  const info = JSON.parse(data);
  if (!info) {
    return {
      type: "error",
    };
  }

  const eventPaymentInfo = info.filter(
    (item: PaymentInfo) => item.id === eventId
  );
  return {
    type: "success",
    data: eventPaymentInfo,
  };
};
