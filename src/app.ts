import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import fastifyJwt from "@fastify/jwt";
import { userRoutes } from "./modules/user/user.route";
import { userSchemas } from "./modules/user/user.schema";

const PORT = 3000;
const fastify = Fastify({ logger: true });

fastify.register(fastifyJwt, {
  secret: "nkgdfjltjl3l4n39gdj3emmgo49",
});

fastify.decorate(
  "auth",
  async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      await request.jwtVerify();
    } catch (err) {
      return reply.send(err);
    }
  }
);

fastify.get("/healthcheck", async (req, res) => ({
  status: "Ok",
}));

async function main(): Promise<void> {
  for (const schema of userSchemas) {
    fastify.addSchema(schema);
  }

  fastify.register(userRoutes, { prefix: "api/users" });

  try {
    await fastify.listen({ port: PORT });

    fastify.log.info(`Server works on port: ${PORT}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

main();
