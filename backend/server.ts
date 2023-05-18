import fastify from "fastify";
import { EventOnPoster } from "@common/types/event";
import cors from "@fastify/cors";

const server = fastify({
  logger: true,
});

server.register(cors, {});

server.get("/api/events", async (request, reply): Promise<EventOnPoster[]> => {
  return [1, 2, 3, 4, 5, 6, 7].map((i) => {
    return {
      id: i.toString(),
      title: "title " + i.toString(),
      description: "description " + i.toString(),
      date: Date.now() + 1000 * 60 * 60 * 24,
      durationInSeconds: 60 * 60,
      image: "https://picsum.photos/200/300",
      location: "location " + i.toString(),
      price: 1,
    };
  });
});

server.listen({ port: 7080 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
