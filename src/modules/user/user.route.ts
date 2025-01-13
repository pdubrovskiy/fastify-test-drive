import { FastifyInstance } from "fastify";
import { loginHandler, registerUserHandler } from "./user.controller";
import { $ref } from "./user.schema";

export async function userRoutes(fastify: FastifyInstance): Promise<void> {
  fastify.post(
    "/",
    {
      schema: {
        body: $ref("createUserSchema"),
        response: {
          201: $ref("createUserResponseSchema"),
        },
      },
    },
    registerUserHandler
  );

  fastify.post(
    "/login",
    {
      schema: {
        body: $ref("loginSchema"),
        response: {
          200: $ref("loginResponseSchema"),
        },
      },
    },
    loginHandler
  );
}
