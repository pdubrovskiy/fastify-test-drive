import { FastifyReply, FastifyRequest } from "fastify";
import { createUser } from "./user.service";
import { CreateUserInput } from "./user.schema";

export async function registerUserHandler(
  request: FastifyRequest<{
    Body: CreateUserInput;
  }>,
  reply: FastifyReply
): Promise<void> {
  try {
    const user = await createUser(request.body);
    reply.code(201).send(user);
  } catch (err) {
    request.log.error(err, "Error creating user");
    reply.code(500).send({ message: "Error creating user" });
  }
}
