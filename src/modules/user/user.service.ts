import { hashPassword } from "../../utils/hash";
import { prisma } from "../../utils/prisma";
import { CreateUserInput } from "./user.schema";
import { User } from "@prisma/client";

export async function createUser({
  password,
  ...restInput
}: CreateUserInput): Promise<User> {
  const { hash, salt } = await hashPassword(password);

  const user = await prisma.user.create({
    data: {
      ...restInput,
      password: hash,
      salt,
    },
  });

  return user;
}
