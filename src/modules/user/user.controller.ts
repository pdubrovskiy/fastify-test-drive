import { User } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";
import { verifyPassword } from "../../utils/hash";
import { CreateUserInput, LoginInput } from "./user.schema";
import { createUser, findUserByEmail, findUsers } from "./user.service";

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

export async function loginHandler(
  request: FastifyRequest<{ Body: LoginInput }>,
  reply: FastifyReply
): Promise<{
  accessToken: string;
}> {
  const { email, password } = request.body;
  const user = await findUserByEmail(email);
  if (!user) {
    return reply.code(401).send({
      message: "Invalid email or password",
    });
  }
  const { salt, password: hash, ...userData } = user;

  const correctPassword = await verifyPassword({
    candidatePassword: password,
    hash,
    salt,
  });
  if (!correctPassword) {
    return reply.code(401).send({
      message: "Invalid email or password",
    });
  }

  return { accessToken: reply.server.jwt.sign({ ...userData }) };
}

export async function getUsersHandler(): Promise<Array<Partial<User>>> {
  const users = await findUsers();

  return users;
}
