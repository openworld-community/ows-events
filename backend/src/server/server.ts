import fastify from "fastify";
import cors from "@fastify/cors";
import path from "path";
import Static from "@fastify/static";
import Multipart from "@fastify/multipart";

import {eventApi, eventsApi, imageApi} from '../rest/v1/events/router';
import { locationApi } from "../rest/v1/events/router";
import { timezonesApi } from "../rest/v1/events/router";
import { paymentInfoApi } from "../rest/v1/events/router";


const server = fastify({
  logger: true,
});

server.register(cors, {});

server.register(Multipart);

fastify.default({
  maxParamLength: 1000,
});

server.register(Static, {
  root: path.join(__dirname, "../frontend/dist/"),
});

server.register(Static, {
  root: path.join(__dirname, "./assets/img"),
  prefix: "/image/",
  decorateReply: false,
});

// eventsApi is a plugin
server.register(eventsApi, { prefix: "/api/events" });
server.register(locationApi, { prefix: "/api/location"});
server.register(timezonesApi, { prefix: "/api/timezones"});
server.register(eventApi, { prefix: "/api/event"});
server.register(paymentInfoApi, { prefix: "/api/payment-info"});
server.register(imageApi, { prefix: "/api/image"});


server.setNotFoundHandler(function (req, reply) {
  reply.sendFile("index.html");
});

server.listen({ port: 7080, host: "0.0.0.0" }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});


// server.get<{
//   Reply: StandardResponse<Registration>;
//   Params: eventParams;
// }>(
//   "/api/registration/:id",
//   async (request, reply): Promise<StandardResponse<Registration>> => {
//     const eventId = request.params.id;
//     const data = await fsP.readFile("assets/db/registrations.json", {
//       encoding: "utf-8",
//     });
//     if (!data) {
//       return {
//         type: "error",
//       };
//     }
//     const info = JSON.parse(data);
//     if (!info) {
//       return {
//         type: "error",
//       };
//     }

//     const eventRegistration = info.filter(
//       (item: Registration) => item.eventId === eventId
//     );
//     return eventRegistration;
//   }
// );
