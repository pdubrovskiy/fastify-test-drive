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

export function buildApp() {
  const fastify = Fastify({
    http2: true,
    https: {
      allowHTTP1: true,
      key: fs.readFileSync(path.join(__dirname, "..", "https", "fastify.key")),
      cert: fs.readFileSync(
        path.join(__dirname, "..", "https", "fastify.cert")
      ),
    },
    logger: {
      level: "info",
      transport: {
        target: "pino-pretty",
      },
    },
  });

  fastify.register(fastifyJwt, {
    secret: process.env.JWT_SECRET || "",
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

  // Register schemas
  for (const schema of [...userSchemas, ...productSchemas]) {
    fastify.addSchema(schema);
  }

  // Register Swagger
  fastify.register(swagger, {
    openapi: {
      info: {
        title: "Test Drive API",
        description: "Testing the Fastify swagger API",
        version: "0.1.0",
      },
    },
  });
  fastify.register(swaggerUi, {
    routePrefix: "/docs",
  });

  // Register routes
  fastify.register(userRoutes, { prefix: "api/users" });
  fastify.register(productRoutes, { prefix: "api/products" });

  return fastify;
}
