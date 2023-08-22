import { User } from "@prisma/client";
import "next-auth";

declare module "next-auth" {
  export interface Session {
    user?: User;
  }
}
