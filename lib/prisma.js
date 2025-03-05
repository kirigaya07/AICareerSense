import { PrismaClient } from "@prisma/client";

// Create a single instance of PrismaClient and export it for database interactions.
export const db = globalThis.prisma || new PrismaClient();

/*
  To prevent creating multiple PrismaClient instances in development mode,
  we store the instance in `globalThis.prisma`.

  - In production: A new PrismaClient instance is created.
  - In development: The instance is stored globally to avoid unnecessary re-instantiations
    due to hot reloading, which could lead to database connection issues.
*/

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = db;
}
