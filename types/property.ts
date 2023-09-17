import { Prisma } from "@prisma/client";

export type Property = Prisma.PropertyGetPayload<{
  include: { address: true; categories: true };
}>;
