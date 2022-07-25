import { PrismaClient } from "@prisma/client";
import prisma from "../lib/prismaClient";

export async function createContext(req, res) {
  return {
    prisma,
  };
}
