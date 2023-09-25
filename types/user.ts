import { Prisma } from "@prisma/client";

export type User = Prisma.UserGetPayload<{
  include: { properties: true };
}>;
