import fastify from "fastify";
import { EventOnPoster } from "@common/types/event";

const server = fastify();

server.get("/ping", async (request, reply) => {
  return "pong\n";
});

server.get("/api/events", async (request, reply): Promise<EventOnPoster[]> => {
  return [
    {
      id: "1",
      title: "title",
      description: "description",
      date: Date.now() + 1000 * 60 * 60 * 24,
      durationInSeconds: 60 * 60,
      image: null,
      price: 1,
    },
  ];
});

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
