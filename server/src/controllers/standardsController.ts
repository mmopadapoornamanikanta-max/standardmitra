/**
 * Standards controller — placeholder for future BIS standards endpoints.
 *
 * When a real BIS data source is connected, implement these handlers to
 * serve standard details and search results. Until then they return a
 * clear "not yet configured" response rather than fake data.
 */

import type { FastifyRequest, FastifyReply } from "fastify";
import { toErrorBody, notFound } from "../lib/errors.js";

type StandardParams = { standardNumber: string };
type SearchQuery = { q: string };

export async function handleGetStandard(
  request: FastifyRequest<{ Params: StandardParams }>,
  reply: FastifyReply,
): Promise<void> {
  const err = notFound(
    `Standard "${request.params.standardNumber}" is not yet available. ` +
      "The BIS document index has not been connected.",
  );
  reply.status(err.status).send(toErrorBody(err));
}

export async function handleSearchStandards(
  request: FastifyRequest<{ Querystring: SearchQuery }>,
  reply: FastifyReply,
): Promise<void> {
  const err = notFound(
    `Standards search for "${request.query.q}" is not yet available. ` +
      "The BIS document index has not been connected.",
  );
  reply.status(err.status).send(toErrorBody(err));
}
