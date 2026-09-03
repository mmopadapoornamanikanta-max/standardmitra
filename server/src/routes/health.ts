import type { FastifyInstance } from "fastify";

export async function healthRoutes(app: FastifyInstance): Promise<void> {
  app.get("/api/health", async (_request, reply) => {
    reply.status(200).send({ status: "ok" });
  });
}
