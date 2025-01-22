import fastifyJwt from "@fastify/jwt";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import { withRefResolver } from "fastify-zod";
import fs from "node:fs";
import path from "path";
import productRoutes from "./modules/product/product.route";
import { productSchemas } from "./modules/product/product.schema";
import { userRoutes } from "./modules/user/user.route";
import { userSchemas } from "./modules/user/user.schema";

const fastify = Fastify({
  http2: true,
  https: {
    allowHTTP1: true,
    key: fs.readFileSync(path.join(__dirname, "..", "https", "fastify.key")),
    cert: fs.readFileSync(path.join(__dirname, "..", "https", "fastify.cert")),
  },
  logger: {
    level: "info",
    transport: {
      target: "pino-pretty",
    },
  },
});

const port = Number(process.env.PORT) || 3000;

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
    await fastify.listen({ port });

    fastify.log.info(`Server works on port: ${port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

main();
