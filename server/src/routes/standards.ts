import type { FastifyInstance } from "fastify";
import { handleGetStandard, handleSearchStandards } from "../controllers/standardsController.js";

export async function standardsRoutes(app: FastifyInstance): Promise<void> {
  app.get(
    "/api/standards/search",
    {
      schema: {
        querystring: {
          type: "object",
          required: ["q"],
          properties: { q: { type: "string", minLength: 1 } },
        },
      },
    },
    handleSearchStandards,
  );

  app.get(
    "/api/standards/:standardNumber",
    {
      schema: {
        params: {
          type: "object",
          properties: { standardNumber: { type: "string" } },
        },
      },
    },
    handleGetStandard,
  );
}
