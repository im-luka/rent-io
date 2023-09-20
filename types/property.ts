import { Prisma } from "@prisma/client";
import { Pagination } from "./pagination";

export type Property = Prisma.PropertyGetPayload<{
  include: { address: true; categories: true };
}>;

export type PropertyWithPagination = {
  properties: Property[];
  pagination: Pagination;
};
