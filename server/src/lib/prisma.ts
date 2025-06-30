import { PrismaClient } from "@prisma/client";

// Extend the globalThis type to include prisma
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

// globalThis.prisma: This global variable ensures that the Prisma client instance is reused across hot reloads during development.
export const prisma = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = prisma;
}
