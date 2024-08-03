import { hash, compare } from "bcryptjs";
import jwt from "jsonwebtoken";

export async function hashPassword(password: string) {
  const hashedPassword = await hash(password, 12);
  return hashedPassword;
}

export async function verifyPassword(password: string, hashedPassword: string) {
  const isValid = await compare(password, hashedPassword);
  return isValid;
}

export function generateToken(payload: any) {
  return jwt.sign(payload, process.env.SECRET_KEY!);
}
