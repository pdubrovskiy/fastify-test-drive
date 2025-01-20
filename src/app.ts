import fastifyJwt from "@fastify/jwt";
import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import { withRefResolver } from "fastify-zod";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import productRoutes from "./modules/product/product.route";
import { productSchemas } from "./modules/product/product.schema";
import { userRoutes } from "./modules/user/user.route";
import { userSchemas } from "./modules/user/user.schema";

const PORT = 3000;
const fastify = Fastify({ logger: true });

declare module "fastify" {
  interface FastifyInstance {
    auth: any;
  }
}

declare module "@fastify/jwt" {
  interface FastifyJWT {
    user: {
      id: number;
      email: string;
      name: string;
    };
  }
}

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
  for (const schema of [...userSchemas, ...productSchemas]) {
    fastify.addSchema(schema);
  }

  await fastify.register(swagger, {
    openapi: {
      info: {
        title: "Test Drive API",
        description: "Testing the Fastify swagger API",
        version: "0.1.0",
      },
    },
  });

  await fastify.register(swaggerUi, {
    routePrefix: "/docs",
  });

  fastify.register(userRoutes, { prefix: "api/users" });
  fastify.register(productRoutes, { prefix: "api/products" });

  try {
    await fastify.listen({ port: PORT });

    fastify.log.info(`Server works on port: ${PORT}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

main();
