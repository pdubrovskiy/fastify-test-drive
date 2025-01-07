import Fastify from "fastify";
import { userRoutes } from "./modules/user/user.route";
import { userSchemas } from "./modules/user/user.schema";

const fastify = Fastify({ logger: true });
const PORT = 3000;

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

    fastify.log.info(`Server works on ${PORT} port`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

main();
