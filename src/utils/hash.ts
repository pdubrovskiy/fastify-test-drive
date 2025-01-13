import crypto from "crypto";
import { promisify } from "util";

export async function hashPassword(password: string): Promise<{
  hash: string;
  salt: string;
}> {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = (
    await promisify(crypto.pbkdf2)(password, salt, 1000, 64, "sha512")
  ).toString("hex");

  return { hash, salt };
}

export async function verifyPassword({
  candidatePassword,
  salt,
  hash,
}: {
  candidatePassword: string;
  salt: string;
  hash: string;
}): Promise<boolean> {
  const candidateHash = (
    await promisify(crypto.pbkdf2)(candidatePassword, salt, 1000, 64, "sha512")
  ).toString("hex");

  return candidateHash === hash;
}
